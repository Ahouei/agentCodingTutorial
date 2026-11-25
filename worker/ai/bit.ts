/**
 * Bit's AI lines (signed-in learners only), cost-first (ai-cost-effective-prompting):
 *   1. Free first: serve an unseen line from the pool for this (chapter, section, language).
 *   2. Grow the pool only while it is below `maxPool`, on a share of taps, within the per-learner
 *      daily limit, the global per-minute limit and the monthly spend cap.
 *   3. Per candidate: exact-prompt cache (D1 ai_cache) → provider call → validate → one corrective
 *      retry → store only lines that pass (never cache garbage).
 * Every request writes one ai_usage row (cost 0 for pool hits) so spend is a simple SUM.
 */
import context from '../bitContext.json';
import { limited, sha256 } from '../api';
import { hasKey, readAi, type AiConfig, type AiKeys, type Candidate } from './config';
import { callProvider, maxTokensFor, ProviderError } from './gateway';

type L = { fa: string; en: string };
type Ctx = Record<string, { title: L; tagline: L; sections: Record<string, { title: L; gist: L; terms: string[] }> }>;
const CTX = context as Ctx;

/** Bumped when the instruction template below changes, so old pools aren't mixed with new ones. */
const TEMPLATE_VERSION = 'b1';

export const DEFAULT_PERSONA = `You are Bit, the small, cheerful robot mascot of "Zero to Hero" (از صفر تا قهرمان), a Persian-first course that teaches complete beginners to build and publish websites with agentic AI (Codex, Lovable, Claude Code), GitHub and Cloudflare. The running example is Café Sahar's website (cafe-sahar.ir). You write the one-liners Bit says when a learner taps him.

Every line is fun AND useful: a light joke, pun or robot quirk, plus one concrete, correct tip or insight about the given topic.
- At most 160 characters, one sentence or two short ones, at most one emoji.
- Warm and encouraging; never sarcastic about the learner; no shaming.
- Facts must be accurate and still true: no prices, limits, version numbers or URLs. If unsure, give general good practice.
- No politics, religion, romance, or anything unsafe for a classroom.
- Persian: natural, light conversational Persian; technical terms stay in Latin script (Commit, DNS, Worker); Persian digits.
- English: plain, friendly English.
- Never say you are an AI or a language model; you are Bit.`;

export function promptVersion(cfg: AiConfig) {
  // Short, stable fingerprint of what shapes the output: persona + template.
  let h = 0;
  const s = (cfg.persona || DEFAULT_PERSONA) + TEMPLATE_VERSION;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return `pv${(h >>> 0).toString(36)}`;
}

export function topic(slug: string, section: string | undefined) {
  const c = CTX[slug];
  if (!c) return null;
  const ids = Object.keys(c.sections);
  const sec = section && c.sections[section] ? section : ids[0];
  return { slug, section: sec, c, s: c.sections[sec] };
}

const SCHEMA = {
  type: 'object',
  properties: { lines: { type: 'array', items: { type: 'string' } } },
  required: ['lines'],
  additionalProperties: false,
};

function buildUser(t: NonNullable<ReturnType<typeof topic>>, lang: 'fa' | 'en', n: number, avoid: string[]) {
  const lines = [
    `Topic: chapter "${t.c.title[lang]}", section "${t.s.title[lang]}".`,
    t.c.tagline[lang] && `Chapter in one line: ${t.c.tagline[lang]}`,
    t.s.gist[lang] && `What this section teaches: ${t.s.gist[lang]}`,
    t.s.terms.length ? `Key terms here: ${t.s.terms.join(', ')}` : '',
    `Language of the lines: ${lang === 'fa' ? 'Persian (فارسی)' : 'English'}.`,
    avoid.length ? `Lines Bit already says (write NEW ones: different jokes, different tips):\n${avoid.map((a) => `- ${a}`).join('\n')}` : '',
    `Write ${n} new lines, each with a different angle on this section.`,
    `Return STRICT JSON only: {"lines": ["...", "..."]}`,
  ];
  return lines.filter(Boolean).join('\n');
}

const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();

/** Keep only usable lines. Soft issues are repaired (whitespace, quotes); bad ones dropped. */
function validate(text: string, lang: 'fa' | 'en', existing: string[]): string[] {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(text.slice(start, end + 1));
  } catch {
    return [];
  }
  const arr = (parsed as { lines?: unknown })?.lines;
  if (!Array.isArray(arr)) return [];
  const seen = new Set(existing.map(norm));
  const out: string[] = [];
  for (const raw of arr) {
    if (typeof raw !== 'string') continue;
    const s = raw.replace(/\s+/g, ' ').replace(/^["«“]+|["»”]+$/g, '').trim();
    if (s.length < 12 || s.length > 220) continue;
    if (/https?:|www\.|<\/?[a-z]/i.test(s)) continue;
    if (lang === 'fa' && !/[؀-ۿ]/.test(s)) continue;
    if (seen.has(norm(s))) continue;
    seen.add(norm(s));
    out.push(s);
  }
  return out;
}

type Usage = { source: string; provider?: string; model?: string; tokensIn?: number; tokensOut?: number; cost?: number; ok?: boolean; error?: string };
async function logUsage(db: D1Database, userId: string | null, u: Usage) {
  await db
    .prepare('INSERT INTO ai_usage (at, user_id, task, source, provider, model, tokens_in, tokens_out, cost_usd, ok, error) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)')
    .bind(Date.now(), userId, 'bit_line', u.source, u.provider ?? null, u.model ?? null, u.tokensIn ?? 0, u.tokensOut ?? 0, u.cost ?? 0, u.ok === false ? 0 : 1, u.error ?? null)
    .run()
    .catch(() => {});
}

const monthStart = () => {
  const d = new Date();
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
};
export async function monthSpend(db: D1Database) {
  const r = await db.prepare('SELECT COALESCE(SUM(cost_usd), 0) c FROM ai_usage WHERE at >= ?1').bind(monthStart()).first<{ c: number }>();
  return r?.c ?? 0;
}

export type GenOutcome = { lines: string[]; candidate?: Candidate; error?: string };

/**
 * Generate new lines for one pool, trying each candidate in order. `bypass` (staff) skips the
 * per-minute limit but never the monthly cap, which is the owner's hard ceiling.
 */
export async function generate(env: AiKeys, db: D1Database, cfg: AiConfig, t: NonNullable<ReturnType<typeof topic>>, lang: 'fa' | 'en', existing: string[], userId: string | null, bypass = false): Promise<GenOutcome> {
  if ((await monthSpend(db)) >= cfg.monthlyBudgetUsd) {
    await logUsage(db, userId, { source: 'denied', ok: false, error: 'monthly_budget' });
    return { lines: [], error: 'monthly_budget' };
  }
  const system = cfg.persona || DEFAULT_PERSONA;
  const user = buildUser(t, lang, cfg.batch, existing.slice(-6));
  let lastError = 'no_candidate';
  for (const cand of cfg.chain) {
    if (!hasKey(env, cand.provider)) continue;
    const price = cfg.prices[cand.model] ?? { in: 0, out: 0 };
    // Exact-prompt cache first, per candidate.
    const key = await sha256(['bit_line', cand.provider, cand.model, cfg.effort, norm(system), norm(user)].join('|'));
    const cached = await db.prepare('SELECT value FROM ai_cache WHERE key = ?1').bind(key).first<{ value: string }>();
    if (cached) {
      const lines = validate(cached.value, lang, existing);
      if (lines.length) {
        await logUsage(db, userId, { source: 'cache', provider: cand.provider, model: cand.model });
        return { lines, candidate: cand };
      }
    }
    if (!bypass && (await limited(db, `ai-gen:${cand.provider}:${cand.model}`, cfg.globalGenPerMinute, 60_000))) {
      lastError = 'global_rate';
      continue;
    }
    const req = { system, user, schema: SCHEMA, maxTokens: maxTokensFor(price.out, cfg.batch), effort: cfg.effort };
    try {
      let res = await callProvider(env, cand, req);
      let cost = (res.tokensIn * price.in + res.tokensOut * price.out) / 1e6;
      let lines = validate(res.text, lang, existing);
      // One bounded corrective retry when fewer than half the lines are usable.
      if (lines.length < Math.ceil(cfg.batch / 2)) {
        const retry = await callProvider(env, cand, { ...req, user: `${user}\n\nYour previous reply could not be used. Reply with STRICT JSON only, exactly {"lines": [...]}, with ${cfg.batch} lines in ${lang === 'fa' ? 'Persian' : 'English'}, each 12 to 160 characters.` });
        cost += (retry.tokensIn * price.in + retry.tokensOut * price.out) / 1e6;
        res = { text: retry.text, tokensIn: res.tokensIn + retry.tokensIn, tokensOut: res.tokensOut + retry.tokensOut };
        lines = validate(retry.text, lang, existing);
      }
      await logUsage(db, userId, { source: 'ai', provider: cand.provider, model: cand.model, tokensIn: res.tokensIn, tokensOut: res.tokensOut, cost, ok: lines.length > 0, error: lines.length ? undefined : 'unusable' });
      if (!lines.length) {
        lastError = 'unusable';
        continue;
      }
      // Don't cache garbage: only a reply that produced usable lines is persisted.
      await db
        .prepare('INSERT OR REPLACE INTO ai_cache (key, value, provider, model, created_at) VALUES (?1, ?2, ?3, ?4, ?5)')
        .bind(key, JSON.stringify({ lines }), cand.provider, cand.model, Date.now())
        .run();
      return { lines, candidate: cand };
    } catch (e) {
      const msg = e instanceof ProviderError ? e.message : 'error';
      await logUsage(db, userId, { source: 'ai', provider: cand.provider, model: cand.model, ok: false, error: msg });
      lastError = msg;
      if (e instanceof ProviderError && !e.retryable) break;
    }
  }
  return { lines: [], error: lastError };
}

export async function storeLines(db: D1Database, poolKey: string, t: NonNullable<ReturnType<typeof topic>>, lang: string, pv: string, cand: Candidate, lines: string[]) {
  const now = Date.now();
  const stmts = lines.map((text) =>
    db
      .prepare('INSERT INTO bit_lines (pool_key, slug, section, lang, text, provider, model, prompt_version, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9) RETURNING id')
      .bind(poolKey, t.slug, t.section, lang, text, cand.provider, cand.model, pv, now),
  );
  const res = await db.batch<{ id: number }>(stmts);
  return res.map((r, i) => ({ id: r.results?.[0]?.id ?? 0, text: lines[i] }));
}

export const poolKeyOf = (slug: string, section: string, lang: string, pv: string) => `${slug}:${section}:${lang}:${pv}`;

/** POST /api/bit/line — { slug, section?, lang, seen: number[] } → { line: {id, text} | null, source } */
export async function handleBitLine(r: Request, env: AiKeys, db: D1Database, user: { userId: string; role: string }) {
  const body = (await r.json().catch(() => null)) as { slug?: unknown; section?: unknown; lang?: unknown; seen?: unknown } | null;
  const lang = body?.lang === 'en' ? 'en' : 'fa';
  const t = typeof body?.slug === 'string' ? topic(body.slug, typeof body.section === 'string' ? body.section : undefined) : null;
  if (!t) return { status: 400, body: { error: 'bad_request' } };
  const cfg = await readAi(db);
  if (!cfg.enabled || !cfg.chain.some((c) => hasKey(env, c.provider))) return { status: 200, body: { line: null, source: 'off' } };
  const staff = user.role !== 'learner';
  if (!staff && (await limited(db, `bit-tap:${user.userId}`, cfg.userPerMinute, 60_000))) return { status: 429, body: { line: null, source: 'slow_down' } };

  const seen = new Set(Array.isArray(body?.seen) ? (body!.seen as unknown[]).filter((x): x is number => Number.isInteger(x)).slice(-300) : []);
  const pv = promptVersion(cfg);
  const poolKey = poolKeyOf(t.slug, t.section, lang, pv);
  const { results } = await db.prepare('SELECT id, text FROM bit_lines WHERE pool_key = ?1 AND hidden = 0 ORDER BY id').bind(poolKey).all<{ id: number; text: string }>();
  const pool = results ?? [];
  const unseen = pool.filter((l) => !seen.has(l.id));

  const serve = async (l: { id: number; text: string }, source: string) => {
    await db.prepare('UPDATE bit_lines SET served = served + 1 WHERE id = ?1').bind(l.id).run();
    if (source === 'pool') await logUsage(db, user.userId, { source: 'pool' });
    return { status: 200, body: { line: l, source } };
  };

  const full = pool.length >= cfg.maxPool;
  const wantGrow = !full && (unseen.length === 0 || pool.length < cfg.batch || Math.random() * 100 < cfg.growPercent);
  if (!wantGrow && unseen.length) return serve(unseen[Math.floor(Math.random() * unseen.length)], 'pool');

  // Per-learner daily generation limit (staff exempt).
  let allowed = true;
  if (!staff) {
    const day = Date.now() - (Date.now() % 86_400_000);
    const n = await db.prepare("SELECT COUNT(*) n FROM ai_usage WHERE user_id = ?1 AND source = 'ai' AND at >= ?2").bind(user.userId, day).first<{ n: number }>();
    allowed = (n?.n ?? 0) < cfg.userGenPerDay;
  }
  if (allowed) {
    const out = await generate(env, db, cfg, t, lang, pool.map((l) => l.text), user.userId, staff);
    if (out.lines.length && out.candidate) {
      const stored = await storeLines(db, poolKey, t, lang, pv, out.candidate, out.lines);
      return serve(stored[0], 'ai');
    }
  }
  // Could not (or may not) grow: anything from the pool beats nothing; the client falls back to its own lines.
  const any = unseen.length ? unseen : pool;
  if (any.length) return serve(any[Math.floor(Math.random() * any.length)], 'pool');
  return { status: 200, body: { line: null, source: allowed ? 'unavailable' : 'limit' } };
}

/**
 * Admin API (/api/admin/*), following the owner's admin-panel pattern (admin-panel-design,
 * saas-auth-security-baseline):
 *
 * - ONE guard for every route: the caller's role is re-read from the database (and the
 *   OWNER_EMAIL secret) on every request, scoped by the session's user id. Revoking an admin
 *   takes effect on their next request. Nothing about identity comes from the request body.
 * - Every state change writes an audit row (who, what, which record, old → new).
 * - Settings are live (D1), sanitized server-side like any user input.
 * - Learner-facing announcements go draft → preview → publish; only one is live at a time.
 * - Owner-only: granting/removing admin. Nobody can block, demote or delete the owner or themselves.
 */
import { sanitize, type Progress } from '../src/lib/progressMerge';
import { json, roleOf, sameOrigin, sessionUser, type Env, type Role } from './api';
import { clean, defaults, emailDayKey, readSettings, SETTING_DEFS, SETTING_KEYS } from './settings';
import { DEFAULT_AI, evictAi, hasKey, PROVIDERS, readAi, sanitizeAi } from './ai/config';
import { DEFAULT_PERSONA, generate, poolKeyOf, promptVersion, storeLines, topic } from './ai/bit';
import { catalogueIsStale, catalogueStatus, isRegistered, listModels, syncAll } from './ai/registry';

type Actor = { id: string; email: string; role: Role };
const DAY = 24 * 3600 * 1000;

async function audit(db: D1Database, a: Actor, action: string, targetType: string, targetId: string, detail?: unknown) {
  await db
    .prepare('INSERT INTO audit_log (at, actor_id, actor_email, action, target_type, target_id, detail) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)')
    .bind(Date.now(), a.id, a.email, action, targetType, targetId, detail === undefined ? null : JSON.stringify(detail))
    .run();
}

function parseProgress(text: string | null | undefined): Progress {
  if (!text) return sanitize(null);
  try {
    return sanitize(JSON.parse(text));
  } catch {
    return sanitize(null);
  }
}

function summary(p: Progress) {
  const q = Object.values(p.quizzes);
  return {
    done: Object.keys(p.done).length,
    labs: Object.keys(p.labs).length,
    answered: q.length,
    correct: q.filter((x) => x.correct).length,
    position: p.position?.slug ?? null,
  };
}

async function body(r: Request): Promise<Record<string, unknown> | null> {
  try {
    const b = await r.json();
    return b && typeof b === 'object' && !Array.isArray(b) ? (b as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/* ───────────── Announcements: validation ───────────── */

const TONES = ['info', 'celebrate', 'warn'] as const;
const str = (v: unknown, max: number, min = 0) => (typeof v === 'string' && v.trim().length >= min && v.trim().length <= max ? v.trim() : null);
function cleanLink(v: unknown): string | null {
  if (v === undefined || v === '') return '';
  if (typeof v !== 'string' || v.length > 300) return null;
  if (/^\/[A-Za-z0-9/_\-#?=&.]*$/.test(v)) return v; // internal path
  try {
    const u = new URL(v);
    return u.protocol === 'https:' ? u.toString() : null;
  } catch {
    return null;
  }
}
function cleanAnnouncement(b: Record<string, unknown>) {
  const tone = TONES.includes(b.tone as (typeof TONES)[number]) ? (b.tone as string) : null;
  const out = {
    tone,
    title_fa: str(b.title_fa, 120, 1),
    title_en: str(b.title_en, 120, 1),
    body_fa: str(b.body_fa ?? '', 400),
    body_en: str(b.body_en ?? '', 400),
    link: cleanLink(b.link),
  };
  const bad = Object.entries(out)
    .filter(([, v]) => v === null)
    .map(([k]) => k);
  return bad.length ? { error: bad } : { value: out as { [K in keyof typeof out]: string } };
}

/* ───────────── Router ───────────── */

export async function handleAdmin(r: Request, env: Env, db: D1Database, url: URL, ctx?: ExecutionContext): Promise<Response> {
  const path = url.pathname.slice('/api/admin'.length); // e.g. /overview
  const s = await sessionUser(r, env, false);
  if (!s) return json({ error: 'signed_out' }, 401);
  // The guard: role from a fresh read, never from the request.
  const fresh = await db.prepare('SELECT role, status FROM users WHERE id = ?1').bind(s.userId).first<{ role: string; status: string }>();
  const role = fresh && fresh.status !== 'blocked' ? roleOf(env, s.email, fresh.role) : 'learner';
  if (role === 'learner') return json({ error: 'forbidden' }, 403);
  if (r.method !== 'GET' && !sameOrigin(r)) return json({ error: 'bad_origin' }, 403);
  const me: Actor = { id: s.userId, email: s.email, role };
  const noStore = { 'Cache-Control': 'no-store' };
  const ok = (data: unknown, status = 200) => json(data, status, noStore);

  if (path === '/me' && r.method === 'GET') return ok({ email: me.email, role: me.role, id: me.id });

  /* ── Overview ── */
  if (path === '/overview' && r.method === 'GET') {
    const now = Date.now();
    const [counts, active, signups, tokens, emailRow, settings, rows] = await Promise.all([
      db
        .prepare(
          `SELECT COUNT(*) total,
             SUM(created_at > ?1) new7, SUM(created_at > ?2) new30,
             SUM(status = 'blocked') blocked, SUM(role = 'admin') admins
           FROM users`,
        )
        .bind(now - 7 * DAY, now - 30 * DAY)
        .first<Record<string, number | null>>(),
      db
        .prepare('SELECT COUNT(DISTINCT user_id) a7, SUM(expires_at > ?2) live FROM sessions WHERE last_seen > ?1')
        .bind(now - 7 * DAY, now)
        .first<{ a7: number; live: number | null }>(),
      db
        .prepare('SELECT CAST(created_at / 86400000 AS INTEGER) d, COUNT(*) n FROM users WHERE created_at > ?1 GROUP BY d ORDER BY d')
        .bind(now - 30 * DAY)
        .all<{ d: number; n: number }>(),
      db
        .prepare('SELECT COUNT(*) sent, SUM(used_at IS NOT NULL) used FROM login_tokens WHERE created_at > ?1')
        .bind(now - DAY)
        .first<{ sent: number; used: number | null }>(),
      db.prepare('SELECT n FROM rate WHERE key = ?1').bind(emailDayKey(now)).first<{ n: number }>(),
      readSettings(db),
      db.prepare('SELECT data FROM progress LIMIT 20000').all<{ data: string }>(),
    ]);
    // Aggregate learning data across synced learners (signed-in only; anonymous learners stay private on their device).
    const done: Record<string, number> = {};
    const labs: Record<string, number> = {};
    const quizzes: Record<string, { n: number; correct: number }> = {};
    const position: Record<string, number> = {};
    const doneHist: Record<number, number> = {};
    for (const row of rows.results ?? []) {
      const p = parseProgress(row.data);
      for (const k of Object.keys(p.done)) done[k] = (done[k] ?? 0) + 1;
      for (const k of Object.keys(p.labs)) labs[k] = (labs[k] ?? 0) + 1;
      for (const [k, q] of Object.entries(p.quizzes)) {
        const e = (quizzes[k] ??= { n: 0, correct: 0 });
        e.n++;
        if (q.correct) e.correct++;
      }
      if (p.position) position[p.position.slug] = (position[p.position.slug] ?? 0) + 1;
      const c = Object.keys(p.done).length;
      doneHist[c] = (doneHist[c] ?? 0) + 1;
    }
    return ok({
      users: {
        total: counts?.total ?? 0,
        new7: counts?.new7 ?? 0,
        new30: counts?.new30 ?? 0,
        blocked: counts?.blocked ?? 0,
        admins: counts?.admins ?? 0,
        active7: active?.a7 ?? 0,
        liveSessions: active?.live ?? 0,
      },
      signups: signups.results ?? [],
      signin24h: { sent: tokens?.sent ?? 0, used: tokens?.used ?? 0 },
      emailsToday: { sent: emailRow?.n ?? 0, cap: settings.emails_per_day },
      settings,
      learning: { learners: rows.results?.length ?? 0, done, labs, quizzes, position, doneHist },
      now,
    });
  }

  /* ── Learners ── */
  if (path === '/users' && r.method === 'GET') {
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase().slice(0, 120);
    const now = Date.now();
    const { results } = await db
      .prepare(
        `SELECT u.id, u.email, u.created_at, u.role, u.status, p.data, p.updated_at,
           (SELECT MAX(last_seen) FROM sessions s WHERE s.user_id = u.id) last_seen,
           (SELECT COUNT(*) FROM sessions s WHERE s.user_id = u.id AND s.expires_at > ?2) sessions
         FROM users u LEFT JOIN progress p ON p.user_id = u.id
         WHERE ?1 = '' OR u.email LIKE '%' || ?1 || '%'
         ORDER BY u.created_at DESC LIMIT 500`,
      )
      .bind(q, now)
      .all<{ id: string; email: string; created_at: number; role: string; status: string; data: string | null; updated_at: number | null; last_seen: number | null; sessions: number }>();
    const total = await db.prepare('SELECT COUNT(*) n FROM users').first<{ n: number }>();
    return ok({
      total: total?.n ?? 0,
      users: (results ?? []).map((u) => ({
        id: u.id,
        email: u.email,
        createdAt: u.created_at,
        role: roleOf(env, u.email, u.role),
        status: u.status,
        lastSeen: u.last_seen,
        sessions: u.sessions,
        syncedAt: u.updated_at,
        ...summary(parseProgress(u.data)),
      })),
    });
  }

  const userMatch = path.match(/^\/users\/([0-9a-f-]{36})(\/action)?$/);
  if (userMatch) {
    const id = userMatch[1];
    const u = await db.prepare('SELECT id, email, created_at, role, status FROM users WHERE id = ?1').bind(id).first<{ id: string; email: string; created_at: number; role: string; status: string }>();
    if (!u) return ok({ error: 'not_found' }, 404);
    const targetRole = roleOf(env, u.email, u.role);

    if (!userMatch[2] && r.method === 'GET') {
      const [p, sessions, history] = await Promise.all([
        db.prepare('SELECT data, updated_at FROM progress WHERE user_id = ?1').bind(id).first<{ data: string; updated_at: number }>(),
        db.prepare('SELECT id_hash, created_at, last_seen, expires_at FROM sessions WHERE user_id = ?1 ORDER BY last_seen DESC').bind(id).all<{ id_hash: string; created_at: number; last_seen: number; expires_at: number }>(),
        db.prepare("SELECT id, at, actor_email, action, detail FROM audit_log WHERE target_type = 'user' AND target_id = ?1 ORDER BY id DESC LIMIT 30").bind(id).all(),
      ]);
      return ok({
        user: { id: u.id, email: u.email, createdAt: u.created_at, role: targetRole, status: u.status },
        progress: parseProgress(p?.data),
        syncedAt: p?.updated_at ?? null,
        sessions: (sessions.results ?? []).map((x) => ({ ref: x.id_hash.slice(0, 10), createdAt: x.created_at, lastSeen: x.last_seen, expiresAt: x.expires_at, live: x.expires_at > Date.now() })),
        history: history.results ?? [],
      });
    }

    if (userMatch[2] && r.method === 'POST') {
      const b = await body(r);
      const action = typeof b?.action === 'string' ? b.action : '';
      const self = u.id === me.id;
      const protectedTarget = targetRole === 'owner' || self;
      const deny = (why: string) => ok({ error: why }, 403);
      switch (action) {
        case 'block':
        case 'unblock': {
          if (protectedTarget) return deny('protected');
          if (targetRole === 'admin' && me.role !== 'owner') return deny('owner_only');
          const next = action === 'block' ? 'blocked' : 'active';
          if (u.status === next) return ok({ ok: true, unchanged: true });
          const stmts = [db.prepare('UPDATE users SET status = ?1 WHERE id = ?2').bind(next, id)];
          if (next === 'blocked') stmts.push(db.prepare('DELETE FROM sessions WHERE user_id = ?1').bind(id));
          await db.batch(stmts);
          await audit(db, me, `user.${action}`, 'user', id, { email: u.email, from: u.status, to: next });
          return ok({ ok: true });
        }
        case 'signout': {
          const res = await db.prepare('DELETE FROM sessions WHERE user_id = ?1').bind(id).run();
          await audit(db, me, 'user.signout_everywhere', 'user', id, { email: u.email, sessions: res.meta.changes ?? 0 });
          return ok({ ok: true });
        }
        case 'make_admin':
        case 'remove_admin': {
          if (me.role !== 'owner') return deny('owner_only');
          if (protectedTarget) return deny('protected');
          const next = action === 'make_admin' ? 'admin' : 'learner';
          if (u.role === next) return ok({ ok: true, unchanged: true });
          await db.prepare('UPDATE users SET role = ?1 WHERE id = ?2').bind(next, id).run();
          await audit(db, me, `user.${action}`, 'user', id, { email: u.email, from: u.role, to: next });
          return ok({ ok: true });
        }
        case 'reset_progress': {
          const p = await db.prepare('SELECT data FROM progress WHERE user_id = ?1').bind(id).first<{ data: string }>();
          await db.prepare('DELETE FROM progress WHERE user_id = ?1').bind(id).run();
          await audit(db, me, 'user.reset_progress', 'user', id, { email: u.email, before: summary(parseProgress(p?.data)) });
          return ok({ ok: true });
        }
        case 'delete': {
          if (protectedTarget) return deny('protected');
          if (targetRole === 'admin' && me.role !== 'owner') return deny('owner_only');
          if (b?.confirm !== u.email) return ok({ error: 'confirm_mismatch' }, 400);
          await db.batch([
            db.prepare('DELETE FROM progress WHERE user_id = ?1').bind(id),
            db.prepare('DELETE FROM sessions WHERE user_id = ?1').bind(id),
            db.prepare('DELETE FROM users WHERE id = ?1').bind(id),
          ]);
          await audit(db, me, 'user.delete', 'user', id, { email: u.email });
          return ok({ ok: true });
        }
        default:
          return ok({ error: 'bad_action' }, 400);
      }
    }
  }

  /* ── Settings ── */
  if (path === '/settings' && r.method === 'GET') {
    const [values, meta] = await Promise.all([
      readSettings(db),
      db.prepare('SELECT key, updated_at, updated_by FROM settings').all<{ key: string; updated_at: number; updated_by: string }>(),
    ]);
    return ok({ values, defaults: defaults(), defs: SETTING_DEFS, meta: meta.results ?? [] });
  }
  if (path === '/settings' && r.method === 'PUT') {
    const b = await body(r);
    const changes = b && typeof b.values === 'object' && b.values ? (b.values as Record<string, unknown>) : null;
    if (!changes || !Object.keys(changes).length) return ok({ error: 'bad_request' }, 400);
    const bad = Object.entries(changes)
      .filter(([k, v]) => clean(k, v) === undefined)
      .map(([k]) => k);
    if (bad.length) return ok({ error: 'invalid', keys: bad }, 400);
    const before = await readSettings(db);
    const now = Date.now();
    const diff: Record<string, { from: unknown; to: unknown }> = {};
    const stmts = [];
    for (const k of SETTING_KEYS) {
      if (!(k in changes)) continue;
      const v = clean(k, changes[k])!;
      if (before[k] === v) continue;
      diff[k] = { from: before[k], to: v };
      stmts.push(
        db
          .prepare('INSERT INTO settings (key, value, updated_at, updated_by) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(key) DO UPDATE SET value = ?2, updated_at = ?3, updated_by = ?4')
          .bind(k, JSON.stringify(v), now, me.email),
      );
    }
    if (stmts.length) {
      await db.batch(stmts);
      await audit(db, me, 'settings.update', 'settings', Object.keys(diff).join(','), diff);
    }
    return ok({ ok: true, values: await readSettings(db), changed: Object.keys(diff) });
  }

  /* ── Announcements: draft → preview → publish ── */
  if (path === '/announcements' && r.method === 'GET') {
    const { results } = await db.prepare('SELECT * FROM announcements ORDER BY updated_at DESC LIMIT 100').all();
    return ok({ announcements: results ?? [] });
  }
  if (path === '/announcements' && r.method === 'POST') {
    const b = await body(r);
    const c = b ? cleanAnnouncement(b) : { error: ['body'] };
    if ('error' in c) return ok({ error: 'invalid', fields: c.error }, 400);
    const id = crypto.randomUUID();
    const now = Date.now();
    const v = c.value!;
    await db
      .prepare(
        "INSERT INTO announcements (id, status, tone, title_fa, title_en, body_fa, body_en, link, created_at, created_by, updated_at) VALUES (?1, 'draft', ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?8)",
      )
      .bind(id, v.tone, v.title_fa, v.title_en, v.body_fa, v.body_en, v.link, now, me.email)
      .run();
    await audit(db, me, 'announcement.create', 'announcement', id, { title: v.title_en });
    return ok({ ok: true, id });
  }
  const annMatch = path.match(/^\/announcements\/([0-9a-f-]{36})(?:\/(publish|unpublish|duplicate))?$/);
  if (annMatch) {
    const id = annMatch[1];
    const a = await db.prepare('SELECT * FROM announcements WHERE id = ?1').bind(id).first<Record<string, string | number | null>>();
    if (!a) return ok({ error: 'not_found' }, 404);
    const now = Date.now();
    const op = annMatch[2];
    if (!op && r.method === 'PUT') {
      if (a.status !== 'draft') return ok({ error: 'not_draft' }, 409);
      const b = await body(r);
      const c = b ? cleanAnnouncement(b) : { error: ['body'] };
      if ('error' in c) return ok({ error: 'invalid', fields: c.error }, 400);
      const v = c.value!;
      await db
        .prepare('UPDATE announcements SET tone = ?2, title_fa = ?3, title_en = ?4, body_fa = ?5, body_en = ?6, link = ?7, updated_at = ?8 WHERE id = ?1')
        .bind(id, v.tone, v.title_fa, v.title_en, v.body_fa, v.body_en, v.link, now)
        .run();
      const changed = (['tone', 'title_fa', 'title_en', 'body_fa', 'body_en', 'link'] as const).filter((k) => a[k] !== v[k]);
      if (changed.length) await audit(db, me, 'announcement.edit', 'announcement', id, { fields: changed });
      return ok({ ok: true });
    }
    if (!op && r.method === 'DELETE') {
      if (a.status === 'published') return ok({ error: 'unpublish_first' }, 409);
      await db.prepare('DELETE FROM announcements WHERE id = ?1').bind(id).run();
      await audit(db, me, 'announcement.delete', 'announcement', id, { title: a.title_en, status: a.status });
      return ok({ ok: true });
    }
    if (op === 'publish' && r.method === 'POST') {
      if (a.status === 'published') return ok({ ok: true, unchanged: true });
      const prev = await db.prepare("SELECT id FROM announcements WHERE status = 'published'").all<{ id: string }>();
      await db.batch([
        db.prepare("UPDATE announcements SET status = 'archived', updated_at = ?1 WHERE status = 'published'").bind(now),
        db.prepare("UPDATE announcements SET status = 'published', published_at = ?2, published_by = ?3, updated_at = ?2 WHERE id = ?1").bind(id, now, me.email),
      ]);
      await audit(db, me, 'announcement.publish', 'announcement', id, { title: a.title_en, replaced: (prev.results ?? []).map((x) => x.id) });
      return ok({ ok: true });
    }
    if (op === 'unpublish' && r.method === 'POST') {
      if (a.status !== 'published') return ok({ ok: true, unchanged: true });
      await db.prepare("UPDATE announcements SET status = 'archived', updated_at = ?2 WHERE id = ?1").bind(id, now).run();
      await audit(db, me, 'announcement.unpublish', 'announcement', id, { title: a.title_en });
      return ok({ ok: true });
    }
    if (op === 'duplicate' && r.method === 'POST') {
      const nid = crypto.randomUUID();
      await db
        .prepare(
          "INSERT INTO announcements (id, status, tone, title_fa, title_en, body_fa, body_en, link, created_at, created_by, updated_at) SELECT ?2, 'draft', tone, title_fa, title_en, body_fa, body_en, link, ?3, ?4, ?3 FROM announcements WHERE id = ?1",
        )
        .bind(id, nid, now, me.email)
        .run();
      await audit(db, me, 'announcement.duplicate', 'announcement', nid, { from: id });
      return ok({ ok: true, id: nid });
    }
  }

  /* ── Bit & AI ── */
  if (path === '/ai' && r.method === 'GET') {
    const cfg = await readAi(db);
    const pv = promptVersion(cfg);
    const d = new Date();
    const month = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
    const [totals, byModel, daily, errors, pools] = await Promise.all([
      db
        .prepare(
          `SELECT COALESCE(SUM(cost_usd),0) cost, COUNT(*) requests,
             SUM(source='ai') ai, SUM(source='ai' AND ok=1) ai_ok, SUM(source='pool') pool, SUM(source='cache') cache, SUM(source='denied') denied,
             COUNT(DISTINCT user_id) users
           FROM ai_usage WHERE at >= ?1`,
        )
        .bind(month)
        .first<Record<string, number | null>>(),
      db
        .prepare("SELECT provider, model, COUNT(*) calls, SUM(ok=0) failed, SUM(tokens_in) tin, SUM(tokens_out) tout, SUM(cost_usd) cost FROM ai_usage WHERE at >= ?1 AND source='ai' GROUP BY provider, model ORDER BY cost DESC")
        .bind(month)
        .all(),
      db
        .prepare("SELECT CAST(at / 86400000 AS INTEGER) d, SUM(cost_usd) cost, SUM(source='ai') ai, SUM(source='pool') pool FROM ai_usage WHERE at >= ?1 GROUP BY d ORDER BY d")
        .bind(Date.now() - 14 * 86_400_000)
        .all(),
      db.prepare("SELECT at, provider, model, error FROM ai_usage WHERE ok = 0 ORDER BY id DESC LIMIT 12").all(),
      db
        .prepare('SELECT slug, section, lang, COUNT(*) n, SUM(hidden) hidden, SUM(served) served FROM bit_lines WHERE prompt_version = ?1 GROUP BY slug, section, lang ORDER BY slug, section, lang')
        .bind(pv)
        .all(),
    ]);
    return ok({
      config: cfg,
      defaults: DEFAULT_AI,
      defaultPersona: DEFAULT_PERSONA,
      promptVersion: pv,
      keys: Object.fromEntries(PROVIDERS.map((p) => [p, hasKey(env, p)])),
      usage: { totals, byModel: byModel.results ?? [], daily: daily.results ?? [], errors: errors.results ?? [] },
      pools: pools.results ?? [],
    });
  }
  if (path === '/ai' && r.method === 'PUT') {
    const b = await body(r);
    if (!b || typeof b.config !== 'object' || !b.config) return ok({ error: 'bad_request' }, 400);
    const { config, rejected } = sanitizeAi(b.config);
    if (rejected.length) return ok({ error: 'invalid', fields: rejected }, 400);
    // The chain may only name models that are active rows in the registry (never a free string).
    for (const c of config.chain) if (!(await isRegistered(db, c.provider, c.model))) return ok({ error: 'unknown_model', model: `${c.provider}/${c.model}` }, 400);
    const before = await readAi(db);
    const diff: Record<string, unknown> = {};
    for (const k of Object.keys(config) as (keyof typeof config)[]) {
      const a = JSON.stringify(before[k]);
      const z = JSON.stringify(config[k]);
      if (a !== z) diff[k] = k === 'persona' ? { from: `${before.persona.length} chars`, to: `${config.persona.length} chars` } : { from: before[k], to: config[k] };
    }
    if (Object.keys(diff).length) {
      await db
        .prepare("INSERT INTO settings (key, value, updated_at, updated_by) VALUES ('ai_config', ?1, ?2, ?3) ON CONFLICT(key) DO UPDATE SET value = ?1, updated_at = ?2, updated_by = ?3")
        .bind(JSON.stringify(config), Date.now(), me.email)
        .run();
      evictAi();
      await audit(db, me, 'ai.update', 'settings', 'ai_config', diff);
    }
    return ok({ ok: true, config, changed: Object.keys(diff), promptVersion: promptVersion(config) });
  }
  /* Model registry: the picker's source. Stale-on-read refresh runs after the response. */
  if (path === '/ai/models' && r.method === 'GET') {
    const [models, status] = await Promise.all([listModels(db), catalogueStatus(db)]);
    if (ctx && (await catalogueIsStale(db, env))) ctx.waitUntil(syncAll(db, env).catch(() => undefined));
    return ok({ models, status, keys: Object.fromEntries(PROVIDERS.map((p) => [p, hasKey(env, p)])) });
  }
  if (path === '/ai/models/sync' && r.method === 'POST') {
    const providers = await syncAll(db, env);
    await audit(db, me, 'ai.models_sync', 'ai_models', 'all', Object.fromEntries(providers.map((p) => [p.provider, p.skipped ? 'no key' : p.error ?? `+${p.added} ~${p.updated} -${p.deactivated}`])));
    return ok({ providers, models: await listModels(db), status: await catalogueStatus(db) });
  }
  if (path === '/ai/models/price' && r.method === 'PUT') {
    const b = await body(r);
    const provider = typeof b?.provider === 'string' ? b.provider : '';
    const model = typeof b?.model === 'string' ? b.model : '';
    const pin = typeof b?.in === 'number' && b.in >= 0 && b.in <= 500 ? Math.round(b.in * 1000) / 1000 : null;
    const pout = typeof b?.out === 'number' && b.out >= 0 && b.out <= 2000 ? Math.round(b.out * 1000) / 1000 : null;
    if (!provider || !model || pin === null || pout === null) return ok({ error: 'bad_request' }, 400);
    const before = await db.prepare('SELECT price_in, price_out FROM ai_models WHERE provider = ?1 AND model_id = ?2').bind(provider, model).first<{ price_in: number | null; price_out: number | null }>();
    if (!before) return ok({ error: 'not_found' }, 404);
    await db.prepare('UPDATE ai_models SET price_in = ?3, price_out = ?4 WHERE provider = ?1 AND model_id = ?2').bind(provider, model, pin, pout).run();
    await audit(db, me, 'ai.model_price', 'ai_models', `${provider}/${model}`, { in: { from: before.price_in, to: pin }, out: { from: before.price_out, to: pout } });
    return ok({ ok: true });
  }

  if (path === '/ai/lines' && r.method === 'GET') {
    const cfg = await readAi(db);
    const slug = url.searchParams.get('slug') ?? '';
    const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'fa';
    const { results } = await db
      .prepare('SELECT id, section, text, provider, model, created_at, hidden, served FROM bit_lines WHERE slug = ?1 AND lang = ?2 AND prompt_version = ?3 ORDER BY section, id DESC LIMIT 400')
      .bind(slug, lang, promptVersion(cfg))
      .all();
    return ok({ lines: results ?? [] });
  }
  const lineMatch = path.match(/^\/ai\/lines\/(\d+)$/);
  if (lineMatch) {
    const id = Number(lineMatch[1]);
    const line = await db.prepare('SELECT id, text, hidden FROM bit_lines WHERE id = ?1').bind(id).first<{ id: number; text: string; hidden: number }>();
    if (!line) return ok({ error: 'not_found' }, 404);
    if (r.method === 'POST') {
      const b = await body(r);
      if (typeof b?.hidden !== 'boolean') return ok({ error: 'bad_request' }, 400);
      await db.prepare('UPDATE bit_lines SET hidden = ?2 WHERE id = ?1').bind(id, b.hidden ? 1 : 0).run();
      await audit(db, me, b.hidden ? 'ai.line_hide' : 'ai.line_show', 'bit_line', String(id), { text: line.text });
      return ok({ ok: true });
    }
    if (r.method === 'DELETE') {
      await db.prepare('DELETE FROM bit_lines WHERE id = ?1').bind(id).run();
      await audit(db, me, 'ai.line_delete', 'bit_line', String(id), { text: line.text });
      return ok({ ok: true });
    }
  }
  if (path === '/ai/generate' && r.method === 'POST') {
    const b = await body(r);
    const lang = b?.lang === 'en' ? 'en' : 'fa';
    const t = typeof b?.slug === 'string' ? topic(b.slug, typeof b.section === 'string' ? b.section : undefined) : null;
    if (!t) return ok({ error: 'bad_request' }, 400);
    const cfg = await readAi(db);
    const pv = promptVersion(cfg);
    const poolKey = poolKeyOf(t.slug, t.section, lang, pv);
    const { results } = await db.prepare('SELECT text FROM bit_lines WHERE pool_key = ?1').bind(poolKey).all<{ text: string }>();
    // Staff: skips the per-minute limit, never the monthly budget. Works even while Bit AI is switched off (to preview).
    const out = await generate(env, db, cfg, t, lang, (results ?? []).map((x) => x.text), me.id, true);
    if (!out.lines.length || !out.candidate) return ok({ error: out.error ?? 'failed' }, 502);
    const stored = await storeLines(db, poolKey, t, lang, pv, out.candidate, out.lines);
    await audit(db, me, 'ai.generate', 'bit_pool', poolKey, { count: stored.length, model: `${out.candidate.provider}/${out.candidate.model}` });
    return ok({ ok: true, lines: stored, model: out.candidate });
  }

  /* ── Audit log ── */
  if (path === '/audit' && r.method === 'GET') {
    const q = (url.searchParams.get('q') ?? '').trim().slice(0, 120);
    const before = Number(url.searchParams.get('before') ?? '') || Number.MAX_SAFE_INTEGER;
    const { results } = await db
      .prepare(
        `SELECT id, at, actor_email, action, target_type, target_id, detail FROM audit_log
         WHERE id < ?2 AND (?1 = '' OR action LIKE '%' || ?1 || '%' OR actor_email LIKE '%' || ?1 || '%'
           OR target_id LIKE '%' || ?1 || '%' OR detail LIKE '%' || ?1 || '%')
         ORDER BY id DESC LIMIT 51`,
      )
      .bind(q, before)
      .all<{ id: number }>();
    const rows = results ?? [];
    return ok({ entries: rows.slice(0, 50), more: rows.length > 50 });
  }

  return ok({ error: 'not_found' }, 404);
}

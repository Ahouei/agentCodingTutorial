/**
 * Bit's AI configuration: one JSON row in `settings` (key `ai_config`), edited live from the admin
 * panel (Admin → Bit & AI), sanitized here on every read and write. API keys are never stored here:
 * they are Worker secrets, and the panel only sees whether each one is set.
 */
export const PROVIDERS = ['anthropic', 'gemini', 'openai', 'deepseek', 'xai'] as const;
export type Provider = (typeof PROVIDERS)[number];
export type Candidate = { provider: Provider; model: string };
export type Price = { in: number; out: number }; // USD per million tokens

export type AiConfig = {
  enabled: boolean;
  /** Tried in order; a candidate without an API key is skipped. */
  chain: Candidate[];
  /** Claude effort (thinking depth). Short creative lines need little. */
  effort: 'low' | 'medium' | 'high';
  /** Custom persona/system prompt. Empty = the built-in one. Changing it starts fresh pools. */
  persona: string;
  /** Lines generated per AI call. */
  batch: number;
  /** Lines kept per (chapter, section, language). Once full, no more AI calls for that pool. */
  maxPool: number;
  /** While a pool is not full: % of taps that also add new lines (the rest are served from the pool). */
  growPercent: number;
  /** Taps per learner per minute. */
  userPerMinute: number;
  /** AI generations a learner can trigger per UTC day. */
  userGenPerDay: number;
  /** AI generations per minute across everyone (protects shared provider rate limits). */
  globalGenPerMinute: number;
  /** Hard spend cap per calendar month (UTC), across everyone. */
  monthlyBudgetUsd: number;
  /** Price table used for cost tracking ($ per million tokens). */
  prices: Record<string, Price>;
};

export const DEFAULT_AI: AiConfig = {
  // On by default: nothing runs until an API key exists, and the monthly budget caps spend.
  enabled: true,
  chain: [
    { provider: 'anthropic', model: 'claude-opus-5-5' },
    { provider: 'gemini', model: 'gemini-3.8-flash' },
  ],
  effort: 'low',
  persona: '',
  batch: 5,
  maxPool: 24,
  growPercent: 25,
  userPerMinute: 12,
  userGenPerDay: 6,
  globalGenPerMinute: 20,
  monthlyBudgetUsd: 5,
  prices: {
    'claude-opus-5-5': { in: 4, out: 20 },
    'claude-sonnet-5-5': { in: 2, out: 10 },
    'claude-haiku-5-5': { in: 0.1, out: 0.5 },
    'gemini-3.8-flash': { in: 1.5, out: 7.5 },
  },
};

const MODEL = /^[a-z0-9][a-z0-9.\-_:/]{1,79}$/i;
const int = (v: unknown, min: number, max: number, d: number) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : d);
const num = (v: unknown, min: number, max: number, d: number) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v * 100) / 100)) : d);

/** Returns a fully valid config. With `strict`, also returns the list of fields that were rejected. */
export function sanitizeAi(raw: unknown): { config: AiConfig; rejected: string[] } {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const d = DEFAULT_AI;
  const rejected: string[] = [];
  let chain = d.chain;
  if ('chain' in r) {
    const c = Array.isArray(r.chain)
      ? (r.chain as unknown[])
          .filter((x): x is Candidate => !!x && typeof x === 'object' && PROVIDERS.includes((x as Candidate).provider) && typeof (x as Candidate).model === 'string' && MODEL.test((x as Candidate).model))
          .slice(0, 4)
      : [];
    if (c.length && c.length === (r.chain as unknown[]).length) chain = c.map(({ provider, model }) => ({ provider, model }));
    else rejected.push('chain');
  }
  const prices: Record<string, Price> = { ...d.prices };
  if (r.prices && typeof r.prices === 'object')
    for (const [k, v] of Object.entries(r.prices as Record<string, unknown>)) {
      if (!MODEL.test(k) || !v || typeof v !== 'object') continue;
      const p = v as Record<string, unknown>;
      prices[k] = { in: num(p.in, 0, 200, 0), out: num(p.out, 0, 1000, 0) };
    }
  const persona = typeof r.persona === 'string' ? r.persona.trim().slice(0, 3000) : d.persona;
  if (typeof r.persona === 'string' && r.persona.length > 3000) rejected.push('persona');
  const config: AiConfig = {
    enabled: typeof r.enabled === 'boolean' ? r.enabled : d.enabled,
    chain,
    effort: r.effort === 'low' || r.effort === 'medium' || r.effort === 'high' ? r.effort : d.effort,
    persona,
    batch: int(r.batch, 3, 8, d.batch),
    maxPool: int(r.maxPool, 6, 80, d.maxPool),
    growPercent: int(r.growPercent, 0, 100, d.growPercent),
    userPerMinute: int(r.userPerMinute, 1, 60, d.userPerMinute),
    userGenPerDay: int(r.userGenPerDay, 0, 100, d.userGenPerDay),
    globalGenPerMinute: int(r.globalGenPerMinute, 1, 200, d.globalGenPerMinute),
    monthlyBudgetUsd: num(r.monthlyBudgetUsd, 0, 1000, d.monthlyBudgetUsd),
    prices,
  };
  return { config, rejected };
}

// Hot cache: the config is read on every tap; keep it per isolate for 20 s (admin saves evict it).
let hot: { at: number; config: AiConfig } | null = null;
export async function readAi(db: D1Database): Promise<AiConfig> {
  if (hot && Date.now() - hot.at < 20_000) return hot.config;
  let raw: unknown = null;
  try {
    const row = await db.prepare("SELECT value FROM settings WHERE key = 'ai_config'").first<{ value: string }>();
    raw = row ? JSON.parse(row.value) : null;
  } catch {
    /* missing or malformed row: defaults */
  }
  const config = sanitizeAi(raw).config;
  hot = { at: Date.now(), config };
  return config;
}
export function evictAi() {
  hot = null;
}

export type AiKeys = { ANTHROPIC_API_KEY?: string; GEMINI_API_KEY?: string; OPENAI_API_KEY?: string; DEEPSEEK_API_KEY?: string; XAI_API_KEY?: string };
export const KEY_NAME: Record<Provider, keyof AiKeys> = {
  anthropic: 'ANTHROPIC_API_KEY',
  gemini: 'GEMINI_API_KEY',
  openai: 'OPENAI_API_KEY',
  deepseek: 'DEEPSEEK_API_KEY',
  xai: 'XAI_API_KEY',
};
export const hasKey = (env: AiKeys, p: Provider) => !!env[KEY_NAME[p]];

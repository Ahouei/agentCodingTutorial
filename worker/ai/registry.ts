/**
 * Model registry that maintains itself (llm-provider-registry):
 *  - Catalogue readers ask each provider what it offers right now (one spec per provider).
 *  - The sync writes into `ai_models`, the one table every surface reads (picker, chain validation,
 *    cost tracking). Curated rows (source='seed') are never touched by the sweep; curated wins on
 *    collision; a provider that errored or returned nothing deactivates nothing; a model must be
 *    missing twice in a row before it is deactivated; nothing is ever deleted.
 *  - Stale-on-read: listing kicks a background refresh after 12 h. Admin "sync now" returns the
 *    per-provider errors, the operator's window into which keys actually work.
 */
import { hasKey, KEY_NAME, PROVIDERS, type AiKeys, type Provider } from './config';

type CatalogueModel = { modelId: string; label: string; created?: number };
type Catalogue = { provider: Provider; models: CatalogueModel[]; error?: string };
export type SyncSummary = { provider: Provider; added: number; updated: number; deactivated: number; total: number; error?: string; skipped?: boolean };

const STALE_MS = 12 * 3600 * 1000;

/* ───────── which listed ids can actually answer a chat prompt ───────── */

// Exclusion, never an allowlist: a new chat model must appear without a code change.
const NOT_CHAT = /(embed|embedding|tts|whisper|transcri|audio|realtime|speech|dall-e|image|imagen|veo|video|moderation|search-preview|computer-use|sora|davinci|babbage|aqa|lyria|robotics|native-audio|live|nano-banana|deep-research|antigravity)/i;
const callable = (p: Provider, id: string) => {
  if (NOT_CHAT.test(id)) return false;
  if (p === 'openai') return /^(gpt-|o\d|chatgpt-)/i.test(id) || !/^(text-|ft:|omni-)/i.test(id);
  return true;
};

/* ───────── catalogue readers ───────── */

type Spec = { url: (key: string) => string; headers: (key: string) => Record<string, string>; read: (body: unknown) => CatalogueModel[] };

function readOpenAiShape(p: Provider) {
  return (body: unknown): CatalogueModel[] => {
    const rows = (body as { data?: unknown })?.data;
    if (!Array.isArray(rows)) return [];
    return rows.flatMap((row) => {
      const r = row as { id?: unknown; name?: unknown; display_name?: unknown; created?: unknown };
      if (typeof r.id !== 'string' || !r.id || !callable(p, r.id)) return [];
      const label = typeof r.display_name === 'string' && r.display_name ? r.display_name : typeof r.name === 'string' && r.name ? r.name : r.id;
      return [{ modelId: r.id, label, ...(typeof r.created === 'number' ? { created: r.created } : {}) }];
    });
  };
}
const bearer = (key: string) => ({ Authorization: `Bearer ${key}` });

const SPECS: Record<Provider, Spec> = {
  anthropic: {
    url: () => 'https://api.anthropic.com/v1/models?limit=200',
    headers: (key) => ({ 'x-api-key': key, 'anthropic-version': '2023-06-01' }),
    read: (body) => {
      const rows = (body as { data?: unknown })?.data;
      if (!Array.isArray(rows)) return [];
      return rows.flatMap((row) => {
        const r = row as { id?: unknown; display_name?: unknown; created_at?: unknown };
        if (typeof r.id !== 'string' || !r.id) return [];
        const created = typeof r.created_at === 'string' ? Math.floor(Date.parse(r.created_at) / 1000) : undefined;
        return [{ modelId: r.id, label: typeof r.display_name === 'string' && r.display_name ? r.display_name : r.id, ...(created && Number.isFinite(created) ? { created } : {}) }];
      });
    },
  },
  gemini: {
    url: () => 'https://generativelanguage.googleapis.com/v1beta/models?pageSize=200',
    headers: (key) => ({ 'x-goog-api-key': key }),
    read: (body) => {
      const rows = (body as { models?: unknown })?.models;
      if (!Array.isArray(rows)) return [];
      return rows.flatMap((row) => {
        const r = row as { name?: unknown; displayName?: unknown; supportedGenerationMethods?: unknown };
        if (typeof r.name !== 'string') return [];
        const methods = Array.isArray(r.supportedGenerationMethods) ? r.supportedGenerationMethods : [];
        if (methods.length > 0 && !methods.includes('generateContent')) return [];
        const modelId = r.name.replace(/^models\//, '');
        if (!modelId || !callable('gemini', modelId)) return [];
        return [{ modelId, label: typeof r.displayName === 'string' && r.displayName ? r.displayName : modelId }];
      });
    },
  },
  openai: { url: () => 'https://api.openai.com/v1/models', headers: bearer, read: readOpenAiShape('openai') },
  deepseek: { url: () => 'https://api.deepseek.com/v1/models', headers: bearer, read: readOpenAiShape('deepseek') },
  xai: { url: () => 'https://api.x.ai/v1/models', headers: bearer, read: readOpenAiShape('xai') },
};

async function fetchCatalogue(env: AiKeys, p: Provider): Promise<Catalogue> {
  const key = env[KEY_NAME[p]]!;
  const spec = SPECS[p];
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12_000);
  try {
    const res = await fetch(spec.url(key), { headers: spec.headers(key), signal: ctrl.signal });
    if (!res.ok) {
      // Keep the status and a short excerpt; mask anything key-like the body may echo back.
      const raw = await res.text().catch(() => '');
      let msg = raw;
      try {
        const j = JSON.parse(raw) as { error?: { message?: unknown } | string; message?: unknown };
        msg = typeof j.error === 'string' ? j.error : typeof j.error?.message === 'string' ? j.error.message : typeof j.message === 'string' ? j.message : raw;
      } catch {
        /* not JSON */
      }
      const detail = msg.replace(/\s+/g, ' ').replace(/[A-Za-z0-9_\-]{24,}/g, '…').trim().slice(0, 160);
      return { provider: p, models: [], error: `HTTP ${res.status}${detail ? `: ${detail}` : ''}` };
    }
    const models = spec.read(await res.json());
    // An empty "success" is treated as an error: it must never switch a provider off.
    return models.length ? { provider: p, models } : { provider: p, models: [], error: 'The provider returned no usable models.' };
  } catch (e) {
    return { provider: p, models: [], error: (e as Error)?.name === 'AbortError' ? 'timeout' : 'network error' };
  } finally {
    clearTimeout(timer);
  }
}

async function syncProvider(db: D1Database, cat: Catalogue): Promise<SyncSummary> {
  const now = Date.now();
  const base = { provider: cat.provider, added: 0, updated: 0, deactivated: 0, total: cat.models.length };
  await db
    .prepare('INSERT INTO ai_catalogue (provider, synced_at, ok, error, models) VALUES (?1, ?2, ?3, ?4, ?5) ON CONFLICT(provider) DO UPDATE SET synced_at = ?2, ok = ?3, error = ?4, models = ?5')
    .bind(cat.provider, now, cat.error ? 0 : 1, cat.error ?? null, cat.models.length)
    .run();
  if (cat.error) return { ...base, error: cat.error }; // errored or empty: touch nothing

  const [ownRes, curatedRes] = await Promise.all([
    db.prepare("SELECT model_id, active FROM ai_models WHERE provider = ?1 AND source = 'catalogue'").bind(cat.provider).all<{ model_id: string; active: number }>(),
    db.prepare("SELECT model_id FROM ai_models WHERE provider = ?1 AND source != 'catalogue'").bind(cat.provider).all<{ model_id: string }>(),
  ]);
  const own = new Map((ownRes.results ?? []).map((r) => [r.model_id, r]));
  const curated = new Set((curatedRes.results ?? []).map((r) => r.model_id));
  const listed = new Set<string>();
  const stmts: D1PreparedStatement[] = [];
  let added = 0;
  let updated = 0;
  let deactivated = 0;
  for (const m of cat.models) {
    listed.add(m.modelId);
    if (curated.has(m.modelId)) {
      // Curated wins on collision; just record that the provider still offers it.
      stmts.push(db.prepare('UPDATE ai_models SET last_seen_at = ?3 WHERE provider = ?1 AND model_id = ?2').bind(cat.provider, m.modelId, now));
      continue;
    }
    if (own.has(m.modelId)) updated++;
    else added++;
    stmts.push(
      db
        .prepare(
          `INSERT INTO ai_models (id, provider, model_id, display_name, source, active, created, last_seen_at, missing_streak)
           VALUES (?1, ?2, ?3, ?4, 'catalogue', 1, ?5, ?6, 0)
           ON CONFLICT(id) DO UPDATE SET display_name = ?4, active = 1, created = COALESCE(?5, created), last_seen_at = ?6, missing_streak = 0`,
        )
        .bind(`cat:${cat.provider}:${m.modelId}`, cat.provider, m.modelId, m.label.slice(0, 120), m.created ?? null, now),
    );
  }
  // Sweep only our own rows; deactivate after two consecutive misses (debounced), never delete.
  for (const [id, row] of own) {
    if (listed.has(id) || !row.active) continue;
    stmts.push(db.prepare("UPDATE ai_models SET missing_streak = missing_streak + 1, active = CASE WHEN missing_streak + 1 >= 2 THEN 0 ELSE active END WHERE id = ?1").bind(`cat:${cat.provider}:${id}`));
    deactivated++; // counted as "missing"; actually switched off on the second miss
  }
  for (let i = 0; i < stmts.length; i += 50) await db.batch(stmts.slice(i, i + 50));
  return { ...base, added, updated, deactivated };
}

/** Sync every provider that has a key, concurrently; each provider is written on its own. */
export async function syncAll(db: D1Database, env: AiKeys): Promise<SyncSummary[]> {
  return Promise.all(
    PROVIDERS.map(async (p) => {
      if (!hasKey(env, p)) return { provider: p, added: 0, updated: 0, deactivated: 0, total: 0, skipped: true };
      return syncProvider(db, await fetchCatalogue(env, p));
    }),
  );
}

/** Fail safe: if the table isn't there yet (code deployed before the migration), "not stale". */
export async function catalogueIsStale(db: D1Database, env: AiKeys): Promise<boolean> {
  try {
    const keyed = PROVIDERS.filter((p) => hasKey(env, p));
    if (!keyed.length) return false;
    const { results } = await db.prepare('SELECT provider, synced_at FROM ai_catalogue').all<{ provider: string; synced_at: number }>();
    const at = new Map((results ?? []).map((r) => [r.provider, r.synced_at]));
    return keyed.some((p) => !at.has(p) || Date.now() - (at.get(p) ?? 0) > STALE_MS);
  } catch {
    return false;
  }
}

export type RegistryModel = { provider: Provider; model_id: string; display_name: string; source: string; created: number | null; price_in: number | null; price_out: number | null };

/** Active models, ranked: curated first, then newest, then by label. */
export async function listModels(db: D1Database): Promise<RegistryModel[]> {
  try {
    const { results } = await db
      .prepare(
        `SELECT provider, model_id, display_name, source, created, price_in, price_out FROM ai_models WHERE active = 1
         ORDER BY provider, CASE source WHEN 'catalogue' THEN 1 ELSE 0 END, created IS NULL, created DESC, display_name`,
      )
      .all<RegistryModel>();
    return results ?? [];
  } catch {
    return [];
  }
}

export async function catalogueStatus(db: D1Database) {
  try {
    const { results } = await db.prepare('SELECT provider, synced_at, ok, error, models FROM ai_catalogue').all();
    return results ?? [];
  } catch {
    return [];
  }
}

/** Is this exact (provider, model) an active registry row? The server never trusts a raw model string. */
export async function isRegistered(db: D1Database, provider: string, model: string) {
  const r = await db.prepare('SELECT 1 x FROM ai_models WHERE provider = ?1 AND model_id = ?2 AND active = 1').bind(provider, model).first();
  return !!r;
}

export async function registryPrice(db: D1Database, provider: string, model: string) {
  return db
    .prepare('SELECT price_in, price_out FROM ai_models WHERE provider = ?1 AND model_id = ?2')
    .bind(provider, model)
    .first<{ price_in: number | null; price_out: number | null }>()
    .catch(() => null);
}

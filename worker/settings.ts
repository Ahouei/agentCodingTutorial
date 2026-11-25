/**
 * Live-editable operational settings (admin panel → Settings).
 * Stored in D1 (`settings` table), read on every request that needs them, so a change
 * takes effect on the next request with no redeploy. Every write is sanitized here:
 * unknown keys are rejected, numbers are bounded, booleans must be booleans.
 */
type BoolDef = { type: 'bool'; def: boolean };
type IntDef = { type: 'int'; def: number; min: number; max: number };

export const SETTING_DEFS = {
  /** Emergency switch: when false, only admins can get a sign-in link. */
  signin_enabled: { type: 'bool', def: true } as BoolDef,
  /** When false, existing learners can sign in but no new account is created. */
  new_accounts_enabled: { type: 'bool', def: true } as BoolDef,
  /** Sign-in requests per IP per minute. */
  start_ip_per_min: { type: 'int', def: 5, min: 1, max: 60 } as IntDef,
  /** Sign-in emails per address per 10 minutes. */
  start_email_per_10min: { type: 'int', def: 3, min: 1, max: 20 } as IntDef,
  /** Cost cap: sign-in emails sent per UTC day, across everyone. 0 stops all email. */
  emails_per_day: { type: 'int', def: 300, min: 0, max: 10000 } as IntDef,
};

export type SettingKey = keyof typeof SETTING_DEFS;
export type Settings = { [K in SettingKey]: (typeof SETTING_DEFS)[K] extends BoolDef ? boolean : number };

export const SETTING_KEYS = Object.keys(SETTING_DEFS) as SettingKey[];

export function defaults(): Settings {
  return Object.fromEntries(SETTING_KEYS.map((k) => [k, SETTING_DEFS[k].def])) as Settings;
}

/** Returns the clean value, or undefined when the value is not acceptable for that key. */
export function clean(key: string, value: unknown): boolean | number | undefined {
  if (!(key in SETTING_DEFS)) return undefined;
  const d = SETTING_DEFS[key as SettingKey] as BoolDef | IntDef;
  if (d.type === 'bool') return typeof value === 'boolean' ? value : undefined;
  if (typeof value !== 'number' || !Number.isInteger(value)) return undefined;
  return value < d.min || value > d.max ? undefined : value;
}

export async function readSettings(db: D1Database): Promise<Settings> {
  const out = defaults() as Record<string, boolean | number>;
  try {
    const { results } = await db.prepare('SELECT key, value FROM settings').all<{ key: string; value: string }>();
    for (const r of results ?? []) {
      try {
        const v = clean(r.key, JSON.parse(r.value));
        if (v !== undefined) out[r.key] = v;
      } catch {
        /* a malformed row falls back to its default */
      }
    }
  } catch {
    /* table missing (migration not applied yet): defaults */
  }
  return out as Settings;
}

export const UTC_DAY = 24 * 3600 * 1000;
export const emailDayKey = (now = Date.now()) => `email-day:${Math.floor(now / UTC_DAY)}`;

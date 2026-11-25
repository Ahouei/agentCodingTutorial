/**
 * Browser storage that can never crash the app (QA-01).
 *
 * Reads are shape-checked: a value that parses but has the wrong type
 * (null, an array where an object is expected, a number where a string is…)
 * falls back to the default instead of reaching components.
 * Every access is wrapped: private mode, blocked or full storage all degrade to the default.
 */

export type Guard<T> = (v: unknown) => v is T;

export const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** Same broad type as the fallback: object↔object (not array/null), array↔array, primitive↔same typeof. */
function sameShape<T>(v: unknown, fallback: T): v is T {
  if (Array.isArray(fallback)) return Array.isArray(v);
  if (isRecord(fallback)) return isRecord(v);
  return typeof v === typeof fallback && v !== null;
}

export function readStore<T>(key: string, fallback: T, guard?: Guard<T>): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    const v: unknown = JSON.parse(raw);
    if (guard ? guard(v) : sameShape(v, fallback)) return v as T;
    return fallback;
  } catch {
    return fallback;
  }
}

export function writeStore(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the app keeps working in memory */
  }
}

export function removeStore(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** A record whose values are all `true` (e.g. done chapters). */
export const isTrueMap = (v: unknown): v is Record<string, true> =>
  isRecord(v) && Object.values(v).every((x) => x === true);

/** Keep only the keys of `fallback` whose stored value has the same shape. */
export function mergeShape<T extends Record<string, unknown>>(stored: unknown, fallback: T): T {
  if (!isRecord(stored)) return fallback;
  const out: Record<string, unknown> = { ...fallback };
  for (const k of Object.keys(fallback)) {
    if (k in stored && sameShape(stored[k], fallback[k])) out[k] = stored[k];
  }
  return out as T;
}

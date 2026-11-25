import { readStore, writeStore } from './storage';

/**
 * Asks the server for one of Bit's AI lines for this chapter section (signed-in learners only).
 * The server serves from a shared pool first and only calls the AI to grow it; `seen` keeps a
 * learner from hearing the same line twice. Returns null on any problem: the caller falls back
 * to Bit's built-in lines.
 */
const SEEN = 'zth:bit-seen';
const isIds = (v: unknown): v is number[] => Array.isArray(v) && v.every((x) => Number.isInteger(x));

export async function fetchBitLine(slug: string, section: string | undefined, lang: 'fa' | 'en'): Promise<string | null> {
  const seen = readStore<number[]>(SEEN, [], isIds);
  try {
    const r = await fetch('/api/bit/line', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, section, lang, seen: seen.slice(-300) }),
    });
    if (!r.ok) return null;
    const j = (await r.json()) as { line?: { id?: unknown; text?: unknown } | null };
    const id = j.line?.id;
    const text = j.line?.text;
    if (typeof text !== 'string' || !text.trim()) return null;
    if (typeof id === 'number') writeStore(SEEN, [...seen, id].slice(-300));
    return text;
  } catch {
    return null;
  }
}

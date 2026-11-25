/**
 * Progress merge, shared by the browser and the Worker (RD-10, offline-first-sync-merge).
 *
 * Progress fields only ever accumulate, so they MAX-merge (union): a chapter done or a lab
 * completed on any device stays done. A quiz answered correctly on any device stays correct.
 * The reading position is a single "where was I" value: last-writer-wins by its timestamp.
 * Nothing a device did is ever lost, whichever device syncs first.
 */
export type QuizRecord = { picked: number; correct: boolean };
export type Position = { slug: string; section?: string; at: number };
export type Progress = {
  done: Record<string, true>;
  labs: Record<string, true>;
  quizzes: Record<string, QuizRecord>;
  position: Position | null;
};

export const EMPTY_PROGRESS: Progress = { done: {}, labs: {}, quizzes: {}, position: null };

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const SLUG = /^[a-z0-9:-]{1,80}$/;

/** Parse anything into a valid Progress, dropping malformed parts instead of failing. */
export function sanitize(v: unknown): Progress {
  if (!isObj(v)) return { ...EMPTY_PROGRESS };
  const trueMap = (x: unknown) => {
    const out: Record<string, true> = {};
    if (isObj(x)) for (const [k, val] of Object.entries(x)) if (val === true && SLUG.test(k)) out[k] = true;
    return out;
  };
  const quizzes: Record<string, QuizRecord> = {};
  if (isObj(v.quizzes))
    for (const [k, q] of Object.entries(v.quizzes))
      if (SLUG.test(k) && isObj(q) && Number.isInteger(q.picked) && (q.picked as number) >= 0 && (q.picked as number) < 8 && typeof q.correct === 'boolean')
        quizzes[k] = { picked: q.picked as number, correct: q.correct };
  let position: Position | null = null;
  const p = v.position;
  if (isObj(p) && typeof p.slug === 'string' && SLUG.test(p.slug) && typeof p.at === 'number' && Number.isFinite(p.at))
    position = { slug: p.slug, at: p.at, ...(typeof p.section === 'string' && SLUG.test(p.section) ? { section: p.section } : {}) };
  return { done: trueMap(v.done), labs: trueMap(v.labs), quizzes, position };
}

export function merge(a: Progress, b: Progress): Progress {
  const quizzes: Record<string, QuizRecord> = { ...a.quizzes };
  for (const [k, q] of Object.entries(b.quizzes)) {
    const cur = quizzes[k];
    // A correct answer on any device wins; otherwise the incoming pick (b) is kept.
    quizzes[k] = cur && cur.correct ? cur : q;
  }
  let position = a.position;
  if (b.position && (!position || b.position.at > position.at)) position = b.position;
  return { done: { ...a.done, ...b.done }, labs: { ...a.labs, ...b.labs }, quizzes, position };
}

/** Order-independent equality, to skip no-op writes (no sync churn). */
export function same(a: Progress, b: Progress): boolean {
  const canon = (p: Progress) =>
    JSON.stringify(sanitize(p), (_k, v) => (isObj(v) ? Object.fromEntries(Object.entries(v).sort(([x], [y]) => x.localeCompare(y))) : v));
  return canon(a) === canon(b);
}

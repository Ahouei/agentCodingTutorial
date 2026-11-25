import { CHAPTERS } from './index';
import type { L } from './types';

export type GlossaryEntry = { term: string; def: L; slug: string; section: string; chapterTitle: L };

/**
 * Every term defined anywhere in the course, keyed by lower-case term.
 * The first chapter that defines a term owns it (that is where it is taught).
 * Built from the existing `terms` blocks, so there is nothing extra to maintain.
 */
export const GLOSSARY: Map<string, GlossaryEntry> = (() => {
  const map = new Map<string, GlossaryEntry>();
  for (const c of CHAPTERS) {
    for (const s of c.sections) {
      for (const b of s.blocks) {
        if (b.type !== 'terms') continue;
        for (const it of b.items) {
          const key = it.term.toLowerCase();
          if (!map.has(key)) map.set(key, { term: it.term, def: it.def, slug: c.slug, section: s.id, chapterTitle: c.title });
        }
      }
    }
  }
  return map;
})();

export const GLOSSARY_LIST: GlossaryEntry[] = [...GLOSSARY.values()].sort((a, b) =>
  a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }),
);

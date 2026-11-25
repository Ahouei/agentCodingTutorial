import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { GLOSSARY, type GlossaryEntry } from '../../content/glossary';
import { href, useApp, useTx } from '../../lib/app';
import { useOverlay } from '../../lib/router';
import { BottomSheet } from '../BottomSheet';
import { Rich } from './Rich';

/**
 * Tap-a-term (RD-05): inside a chapter, the FIRST mention of any term that is
 * taught in another chapter becomes a dotted button. Tapping it opens a
 * non-modal sheet with the definition and a link to where it is taught.
 */
type Ctx = {
  /** Terms linkable in this chapter, regex-ready, longest first. */
  pattern: RegExp | null;
  claim: (term: string, owner: string) => boolean;
  open: (term: string) => void;
  active: string | null;
};
const GlossaryCtx = createContext<Ctx | null>(null);
export const useGlossary = () => useContext(GlossaryCtx);

/** Set by BlockView for running-text blocks; Rich only links terms inside one. */
export const TermScope = createContext<string | null>(null);

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function GlossaryProvider({ chapterSlug, children }: { chapterSlug: string; children: ReactNode }) {
  const { t } = useApp();
  const tx = useTx();
  const owners = useRef(new Map<string, string>());
  const [current, setCurrent] = useState<string | null>(null);
  const [open, setOpen] = useOverlay('term');

  const linkable = useMemo(() => {
    const m = new Map<string, GlossaryEntry>();
    for (const [k, e] of GLOSSARY) if (e.slug !== chapterSlug && e.term.length >= 2) m.set(e.term, e), void k;
    return m;
  }, [chapterSlug]);

  const pattern = useMemo(() => {
    const terms = [...linkable.keys()].sort((a, b) => b.length - a.length).map(esc);
    return terms.length ? new RegExp(`(?<![A-Za-z0-9])(${terms.join('|')})(?![A-Za-z0-9])`) : null;
  }, [linkable]);

  const claim = useCallback((term: string, owner: string) => {
    const o = owners.current;
    if (!o.has(term)) o.set(term, owner);
    return o.get(term) === owner;
  }, []);

  const openTerm = useCallback(
    (term: string) => {
      setCurrent(term);
      setOpen(true);
    },
    [setOpen],
  );

  const entry = current ? linkable.get(current) : undefined;
  const order = [...owners.current.keys()];
  const idx = current ? order.indexOf(current) : -1;
  const step = (d: number) => {
    if (!order.length) return;
    setCurrent(order[(idx + d + order.length) % order.length]);
  };

  return (
    <GlossaryCtx.Provider value={{ pattern, claim, open: openTerm, active: open ? current : null }}>
      {children}
      <BottomSheet open={open && !!entry} onClose={() => setOpen(false)} title={<span className="ltr">{entry?.term}</span>}>
        {entry && (
          <>
            <p className="term-def">
              <Rich text={t(entry.def)} />
            </p>
            <a className="chip" href={href.chapter(entry.slug, entry.section)} onClick={() => setOpen(false)}>
              {tx('آموزش کامل در فصل:', 'Taught in:')} {t(entry.chapterTitle)}
            </a>
            {order.length > 1 && (
              <div className="term-nav">
                <button type="button" className="btn btn--small btn--ghost" onClick={() => step(-1)}>
                  {tx('‹ اصطلاح قبلی', '‹ Previous term')}
                </button>
                <button type="button" className="btn btn--small btn--ghost" onClick={() => step(1)}>
                  {tx('اصطلاح بعدی ›', 'Next term ›')}
                </button>
              </div>
            )}
          </>
        )}
      </BottomSheet>
    </GlossaryCtx.Provider>
  );
}

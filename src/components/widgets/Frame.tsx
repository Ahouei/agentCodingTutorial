import { AnimatePresence, motion } from 'motion/react';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useApp, useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { Mascot, type Mood } from '../Mascot';
import './widgets.css';

/* ───────── Lab context: which lab this is, and how it reports completion ───────── */

type LabCtx = { id: string };
export const LabContext = createContext<LabCtx | null>(null);

/**
 * `const lab = useLab()` inside any widget.
 * Call `lab.complete()` once the learner reaches the lab's success state
 * (all items sorted, a full pipeline run, a perfect token…). It is idempotent,
 * stored per browser (and per account when signed in), and makes the Frame show
 * its "done" stamp. A chapter counts as earned when its quiz is answered and its labs are complete.
 */
export function useLab() {
  const ctx = useContext(LabContext);
  const { labs, completeLab } = useApp();
  const id = ctx?.id ?? '';
  const complete = useCallback(() => {
    if (id) completeLab(id);
  }, [id, completeLab]);
  return { id, completed: !!(id && labs[id]), complete };
}

/**
 * Shared shell for every interactive lab (RD-07 lab standard):
 *   header  ▸ "Try it" chip, title (h3), optional goal chip
 *   hint    ▸ Bit's hint, only when the action is not obvious from the title
 *   stage   ▸ the lab itself
 *   footer  ▸ secondary action (e.g. Reset) at the START, primary action at the END
 *   stamp   ▸ "done" stamp once lab.complete() was called
 *
 * Conventions (keep them consistent):
 * - All text via useApp()/useTx(); Persian first, RTL-safe (logical properties only).
 * - Motion tokens from lib/motion (EASE_OUT for enter/exit, EASE_IN_OUT for movement); transform/opacity only;
 *   UI responses ≤ 300ms; no scale(0); hover effects behind (hover:hover) and (pointer:fine).
 * - Every control ≥ 44×44px; keyboard operable; visible focus.
 * - Changing explanations in one polite live region; never announce timers or whole documents.
 * - Translate at render time (store keys/ids in state, not translated strings).
 * - Fits 320px wide without horizontal page scroll.
 */
export function Frame({
  title,
  goal,
  hint,
  mood = 'happy',
  children,
  footer,
  tint = 'var(--sky-soft)',
}: {
  title: string;
  /** One-line task, shown as a chip next to the title. */
  goal?: string;
  hint?: ReactNode;
  mood?: Mood;
  children: ReactNode;
  footer?: ReactNode;
  tint?: string;
}) {
  const tx = useTx();
  const lab = useLab();
  // Bit "says" the hint the first time the lab comes into view.
  const hintRef = useRef<HTMLDivElement>(null);
  const [talk, setTalk] = useState(false);
  useEffect(() => {
    const el = hintRef.current;
    if (!el) return;
    let tm = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setTalk(true);
        tm = window.setTimeout(() => setTalk(false), 1800);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(tm);
    };
  }, []);
  return (
    <section className="w-frame sticker" style={{ ['--w-tint' as string]: tint }} aria-label={title}>
      <header className="w-head">
        <span className="w-try">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path d="M7 4.5v15l12-7.5Z" fill="currentColor" />
          </svg>
          <span>{tx('امتحانش کنید', 'Try it')}</span>
        </span>
        <h3 className="w-title">{title}</h3>
        {goal && (
          <span className="w-goal">
            <b>{tx('هدف', 'Goal')}</b> {goal}
          </span>
        )}
        <AnimatePresence initial={false}>
          {lab.completed && (
            <motion.span
              key="stamp"
              className="w-stamp"
              initial={{ opacity: 0, transform: 'rotate(-8deg) scale(0.9)' }}
              animate={{ opacity: 1, transform: 'rotate(-8deg) scale(1)' }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {tx('انجام شد', 'Done')}
            </motion.span>
          )}
        </AnimatePresence>
      </header>
      {hint && (
        <div className="w-hint" ref={hintRef}>
          <Mascot size={40} mood={mood} follow={false} talking={talk} wave={talk} />
          <div className="w-hint-bubble">{hint}</div>
        </div>
      )}
      <div className="w-stage">{children}</div>
      {footer && <footer className="w-foot">{footer}</footer>}
    </section>
  );
}

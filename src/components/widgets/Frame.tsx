import type { ReactNode } from 'react';
import { useTx } from '../../lib/app';
import { Mascot, type Mood } from '../Mascot';
import './widgets.css';

/**
 * Shared shell for every interactive widget: a sticker card with a header
 * ("Try it" label + title + optional hint from Bit), a stage, and a footer.
 *
 * Conventions for widgets (keep them consistent):
 * - Use useApp()/useTx() for all text; Persian is primary, RTL-safe layout
 *   (logical properties, flex/grid; no left/right unless mirrored on purpose).
 * - Motion: transform/opacity only; ease-out cubic-bezier(0.23,1,0.32,1) for
 *   enter/exit, cubic-bezier(0.77,0,0.175,1) for on-screen movement;
 *   UI responses ≤ 300ms, explanatory sequences may be longer.
 * - Everything operable by keyboard and touch; buttons ≥ 44px tall.
 * - Respect reduced motion (MotionConfig reducedMotion="user" is set app-wide;
 *   for CSS keyframes add a prefers-reduced-motion rule).
 * - Stage must fit 320px wide screens without horizontal page scroll.
 */
export function Frame({
  title,
  hint,
  mood = 'happy',
  children,
  footer,
  tint = 'var(--sky-soft)',
}: {
  title: string;
  hint?: ReactNode;
  mood?: Mood;
  children: ReactNode;
  footer?: ReactNode;
  tint?: string;
}) {
  const tx = useTx();
  return (
    <section className="w-frame sticker" style={{ ['--w-tint' as string]: tint }} aria-label={title}>
      <header className="w-head">
        <span className="w-try">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path d="M7 4.5v15l12-7.5Z" fill="currentColor" />
          </svg>
          <span>{tx('امتحانش کنید', 'Try it')}</span>
        </span>
        <h4 className="w-title">{title}</h4>
      </header>
      {hint && (
        <div className="w-hint">
          <Mascot size={40} mood={mood} follow={false} />
          <div className="w-hint-bubble">{hint}</div>
        </div>
      )}
      <div className="w-stage">{children}</div>
      {footer && <footer className="w-foot">{footer}</footer>}
    </section>
  );
}

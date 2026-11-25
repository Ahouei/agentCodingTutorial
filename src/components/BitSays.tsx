import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTx } from '../lib/app';
import { EASE_OUT } from '../lib/motion';
import { type Mood } from './Mascot';
import { TapBit } from './TapBit';
import { useIdle } from '../lib/useIdle';
import './bitsays.css';

/**
 * Bit talks: a speech bubble whose text types out while Bit's mouth moves.
 * - Starts when it scrolls into view; with several lines, tap the bubble (or wait) for the next one.
 * - Screen readers get the whole line at once (the typed copy is aria-hidden).
 * - Reduced motion: the line appears complete, Bit stays still.
 */
export function BitSays({
  lines,
  mood = 'happy',
  size = 56,
  wave = false,
  cycleMs = 7000,
  sleepy = false,
  className,
}: {
  lines: string[];
  mood?: Mood;
  size?: number;
  wave?: boolean;
  /** Auto-advance between lines (0 = only on tap). */
  cycleMs?: number;
  /** Naps (Zzz) when the visitor has been idle for a while. */
  sleepy?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const tx = useTx();
  const box = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const line = lines[i % Math.max(lines.length, 1)] ?? '';
  const chars = Array.from(line);
  const typing = seen && !reduce && shown < chars.length;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Type the current line.
  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      setShown(chars.length);
      return;
    }
    setShown(0);
    let n = 0;
    const t = window.setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= chars.length) window.clearInterval(t);
    }, 26);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, i, line, reduce]);

  // Next line after a pause.
  useEffect(() => {
    if (!seen || lines.length < 2 || !cycleMs || typing) return;
    const t = window.setTimeout(() => setI((x) => x + 1), cycleMs);
    return () => window.clearTimeout(t);
  }, [seen, typing, lines.length, cycleMs, i]);

  const more = lines.length > 1;
  const idle = useIdle(sleepy ? 40000 : 2147483647);
  return (
    <div ref={box} className={`bitsays ${className ?? ''}`}>
      <TapBit size={size} mood={sleepy && idle ? 'sleep' : mood} talking={typing} wave={wave && !idle} onTap={() => (seen ? setI((x) => x + 1) : setSeen(true))} />
      <motion.div
          className="bitsays-bubble"
          initial={false}
          animate={seen ? { opacity: 1, transform: 'translateY(0px) scale(1)' } : { opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          onClick={more ? () => setI((x) => x + 1) : undefined}
        >
          <span className="sr-only">
            {seen ? line : ''}
          </span>
          <span aria-hidden className="bitsays-text">
            <span>{chars.slice(0, shown).join('')}</span>
            {/* reserve the full size so the bubble doesn't grow while typing */}
            <span className="bitsays-ghost">{chars.slice(shown).join('')}</span>
          </span>
          {more && (
            <button type="button" className="bitsays-next" onClick={(e) => (e.stopPropagation(), setI((x) => x + 1))} aria-label={tx('حرف بعدی Bit', "Bit's next line")}>
              {Array.from({ length: lines.length }, (_, k) => (
                <span key={k} className={k === i % lines.length ? 'on' : ''} />
              ))}
            </button>
          )}
        </motion.div>
    </div>
  );
}

/** Plain text of a Rich string (drops ** and ` markers), for typing it out letter by letter. */
export const plain = (s: string) => s.replace(/\*\*|`/g, '');

/**
 * Types `text` out once `start` is true. Returns how much is shown and whether it's still typing.
 * Reduced motion: the whole text at once.
 */
export function useTypewriter(text: string, start = true, speedMs = 26) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setShown(chars.length);
      return;
    }
    setShown(0);
    let n = 0;
    const t = window.setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= chars.length) window.clearInterval(t);
    }, speedMs);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, start, reduce]);
  return { typed: chars.slice(0, shown).join(''), rest: chars.slice(shown).join(''), typing: start && !reduce && shown < chars.length, done: shown >= chars.length };
}

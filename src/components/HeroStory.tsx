import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTx } from '../lib/app';
import { Mascot } from './Mascot';

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * The whole course in one looping vignette:
 * you ask → Bit plans → it works through GitHub & Cloudflare → your site is live.
 * Pauses off-screen; reduced-motion users see the finished state.
 */
export function HeroStory() {
  const tx = useTx();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const ask = tx('یک وب‌سایت برای کافه‌ام می‌خواهم: منو، ساعت کاری و فرم رزرو. روی دامنه خودم.', 'I want a website for my café: menu, opening hours and a booking form. On my own domain.');
  const steps = [
    tx('Repository در GitHub ساخته شد', 'Created the GitHub repository'),
    tx('طرح اولیه آماده شد و شما تایید کردید', 'Proposed a design, you approved it'),
    tx('کد نوشته و Push شد', 'Wrote the code and pushed it'),
    tx('Worker روی Cloudflare مستقر شد', 'Deployed a Worker on Cloudflare'),
    tx('دامنه و HTTPS وصل شد', 'Connected the domain with HTTPS'),
  ];
  const TOTAL = 3 + steps.length + 2; // typing, thinking, steps…, site, hold
  const [phase, setPhase] = useState(reduce ? TOTAL - 1 : 0);
  const [typed, setTyped] = useState(reduce ? ask.length : 0);

  // Typing the request.
  useEffect(() => {
    if (reduce || !inView || phase !== 0) return;
    if (typed >= ask.length) {
      const t = window.setTimeout(() => setPhase(1), 500);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setTyped((n) => Math.min(ask.length, n + 2)), 28);
    return () => window.clearTimeout(t);
  }, [typed, phase, inView, reduce, ask.length]);

  // Advancing the story.
  useEffect(() => {
    if (reduce || !inView || phase === 0) return;
    const wait = phase === 1 ? 1100 : phase >= TOTAL - 1 ? 3800 : 700;
    const t = window.setTimeout(() => {
      if (phase >= TOTAL - 1) {
        setTyped(0);
        setPhase(0);
      } else setPhase((p) => p + 1);
    }, wait);
    return () => window.clearTimeout(t);
  }, [phase, inView, reduce, TOTAL]);

  // Keep text in sync when language changes mid-loop.
  useEffect(() => {
    if (reduce) setTyped(ask.length);
  }, [ask, reduce]);

  const doneSteps = Math.max(0, Math.min(steps.length, phase - 1));
  const showSite = phase >= 2 + steps.length;
  const mood = phase === 0 ? 'calm' : phase === 1 ? 'think' : showSite ? 'happy' : 'wink';

  return (
    <div ref={ref} className="story sticker" aria-label={tx('نمایش کوتاه روند کار با Agent', 'A short demo of working with an agent')}>
      <div className="story-chat">
        <div className="story-you">
          <span className="story-avatar" aria-hidden>
            {tx('شما', 'You')}
          </span>
          <p className="story-bubble">
            {ask.slice(0, typed)}
            {typed < ask.length && <span className="story-caret" aria-hidden />}
          </p>
        </div>

        <div className="story-agent">
          <span className="story-bit">
            <Mascot size={46} mood={mood} follow={false} />
          </span>
          <div className="story-log" aria-live="off">
            <AnimatePresence initial={false}>
              {phase === 1 && (
                <motion.p
                  key="think"
                  className="story-thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                >
                  {tx('دارم برنامه‌ریزی می‌کنم', 'Planning')}
                  <span className="story-dots" aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                </motion.p>
              )}
            </AnimatePresence>
            <ul>
              {steps.slice(0, doneSteps).map((s, i) => (
                <motion.li
                  key={`${i}-${s}`}
                  initial={reduce ? false : { opacity: 0, filter: 'blur(4px)', transform: 'translateY(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="story-tick" aria-hidden>
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSite && (
          <motion.div
            key="site"
            className="story-site"
            initial={reduce ? false : { opacity: 0, transform: 'translateY(14px) scale(0.96)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            exit={{ opacity: 0, transform: 'translateY(8px) scale(0.98)', transition: { duration: 0.2 } }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.25 }}
          >
            <div className="story-url" dir="ltr">
              <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor" />
                <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
              </svg>
              cafe-sahar.ir
            </div>
            <div className="story-page">
              <div className="story-page-hero">
                <span className="story-cup" aria-hidden>
                  <svg width="34" height="34" viewBox="0 0 48 48">
                    <path d="M10 18h24v10a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10Z" fill="#fff4dc" stroke="#2a211b" strokeWidth="2.5" />
                    <path d="M34 21h3a5 5 0 0 1 0 10h-3" fill="none" stroke="#2a211b" strokeWidth="2.5" />
                    <path d="M18 8c0 3-3 3-3 6M25 8c0 3-3 3-3 6" fill="none" stroke="#ef6a4c" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <strong>{tx('کافه سحر', 'Café Sahar')}</strong>
                  <span>{tx('هر روز ۸ صبح تا ۱۱ شب', 'Open daily 8am–11pm')}</span>
                </div>
              </div>
              <div className="story-page-row">
                <span>{tx('منو', 'Menu')}</span>
                <span>{tx('رزرو میز', 'Book a table')}</span>
                <span>{tx('تماس', 'Contact')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { ACTS, CHAPTERS } from '../../content';
import { href, num, useApp, useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { CopyButton } from '../blocks/CopyButton';
import { Certificate } from './Certificate';
import { ACT_TINT, Icon } from '../Icon';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set3.css';

const CANDY = ['#ef6a4c', '#ffd36a', '#8fd5b5', '#a6cdf3', '#f6bccb'];

export default function HeroFinale() {
  const { t, lang, done, toggleDone } = useApp();
  const tx = useTx();
  const reduce = useReducedMotion();
  const [cheer, setCheer] = useState(false);
  const lab = useLab();

  const total = CHAPTERS.length;
  const count = CHAPTERS.filter((c) => done[c.slug]).length;
  const heroDone = !!done.hero;

  const celebrate = async () => {
    lab.complete();
    setCheer(true);
    window.setTimeout(() => setCheer(false), 1800);
    if (reduce) return;
    try {
      const { default: confetti } = await import('canvas-confetti');
      const base = { colors: CANDY, disableForReducedMotion: true, zIndex: 9999 };
      confetti({ ...base, particleCount: 90, spread: 75, startVelocity: 42, origin: { x: 0.5, y: 0.65 } });
      window.setTimeout(() => confetti({ ...base, particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.75 } }), 180);
      window.setTimeout(() => confetti({ ...base, particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.75 } }), 300);
    } catch {
      /* confetti is decoration; ignore failures */
    }
  };

  const markCourse = () => {
    toggleDone('hero', true);
    void celebrate();
  };

  const share = tx(
    'اولین وب‌سایتم را با کمک یک AI Agent ساختم و روی دامنه خودم منتشر کردم! از ایده تا Design، از GitHub تا Cloudflare، قدم به قدم. مسیر «از صفر تا قهرمان» را تمام کردم.',
    'I built my first website with an AI agent and published it on my own domain! From idea to design, from GitHub to Cloudflare, step by step. I finished the Zero to Hero journey.',
  );

  return (
    <Frame
      title={tx('قفسه جام‌های شما', 'Your trophy shelf')}
      goal={tx('سفرتان را جشن بگیرید', 'Celebrate your journey')}
      hint={tx('روی هر نشان بزنید تا به همان فصل بروید.', 'Tap any badge to jump to that chapter.')}
      tint="var(--butter-soft)"
    >
      <div className="hf-top">
        <motion.div
          animate={cheer && !reduce ? { transform: ['translateY(0px)', 'translateY(-18px)', 'translateY(0px)', 'translateY(-8px)', 'translateY(0px)'] } : { transform: 'translateY(0px)' }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          <Mascot size={130} mood={cheer || heroDone ? 'happy' : 'wink'} follow={false} float={!cheer} label={tx('Bit خوشحال', 'Bit, happy')} />
        </motion.div>
        <p className="hf-count" aria-live="polite">
          {tx(
            `${num(count, lang)} از ${num(total, lang)} فصل تمام شده`,
            `${count} of ${total} chapters finished`,
          )}
        </p>
        <div className="hf-progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={count} aria-label={tx('پیشرفت دوره', 'Course progress')}>
          <motion.span
            initial={false}
            animate={{ transform: `scaleX(${total ? count / total : 0})` }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          />
        </div>
        <div className="w-row" style={{ justifyContent: 'center' }}>
          <button type="button" className="btn btn--primary" onClick={celebrate}>
            {tx('جشن بگیریم!', 'Celebrate!')}
          </button>
          <button type="button" className="btn btn--mint" onClick={markCourse} disabled={heroDone}>
            {heroDone ? tx('دوره کامل شد ✓', 'Course complete ✓') : tx('دوره را کامل‌شده علامت بزن', 'Mark the course complete')}
          </button>
        </div>
      </div>

      <div className="hf-shelf">
        {ACTS.map((act) => {
          const chapters = CHAPTERS.filter((c) => c.act === act.id);
          const tint = ACT_TINT[act.id];
          return (
            <div key={act.id} className="hf-act" style={{ borderBottomColor: tint }}>
              <p className="hf-act-title">{t(act.title)}</p>
              <div className="hf-badges">
                {chapters.map((c) => {
                  const isDone = !!done[c.slug];
                  return (
                    <a
                      key={c.slug}
                      href={href.chapter(c.slug)}
                      className={`hf-badge ${isDone ? 'is-done' : ''}`}
                      style={{ ['--badge-tint' as string]: tint }}
                      aria-label={`${t(c.title)}: ${isDone ? tx('تمام شده', 'finished') : tx('هنوز نه', 'not yet')}`}
                    >
                      <span className="hf-badge-icon">
                        <Icon id={c.icon} size={18} tint={isDone ? tint : 'transparent'} />
                      </span>
                      <span>{t(c.title)}</span>
                      <AnimatePresence initial={false}>
                        {isDone && (
                          <motion.span
                            key="tick"
                            aria-hidden
                            initial={{ opacity: 0, transform: 'scale(0.6)' }}
                            animate={{ opacity: 1, transform: 'scale(1)' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE_OUT }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Certificate />
      <div className="hf-share">
        <p className="w-label">{tx('یک متن برای اشتراک‌گذاری', 'Something to share')}</p>
        <p>{share}</p>
        <CopyButton text={share} />
      </div>
    </Frame>
  );
}

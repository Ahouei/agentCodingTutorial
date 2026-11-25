import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ACTS, CHAPTERS, chapterIndex } from '../content';
import type { Chapter } from '../content/types';
import { href, num, useApp, useTx } from '../lib/app';
import { BlockView, Reveal } from './blocks/Blocks';
import { Rich } from './blocks/Rich';
import { ACT_TINT, Icon } from './Icon';
import { Mascot } from './Mascot';
import './chapter.css';

const EASE = [0.23, 1, 0.32, 1] as const;

export function ChapterPage({ slug, section }: { slug: string; section?: string }) {
  const tx = useTx();
  const i = chapterIndex(slug);
  if (i < 0) {
    return (
      <main id="main" className="wrap ch-missing">
        <Mascot size={120} mood="wow" />
        <h1 className="display">{tx('این فصل پیدا نشد', 'This chapter was not found')}</h1>
        <a className="btn btn--primary" href={href.home}>
          {tx('بازگشت به نقشه', 'Back to the map')}
        </a>
      </main>
    );
  }
  return <ChapterBody key={slug} chapter={CHAPTERS[i]} index={i} section={section} />;
}

function ChapterBody({ chapter: c, index, section }: { chapter: Chapter; index: number; section?: string }) {
  const { t, lang, done, toggleDone } = useApp();
  const tx = useTx();
  const act = ACTS.find((a) => a.id === c.act)!;
  const prev = CHAPTERS[index - 1];
  const next = CHAPTERS[index + 1];
  const isDone = !!done[c.slug];
  const [active, setActive] = useState(c.sections[0]?.id);
  const articleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ['start start', 'end end'] });
  const readProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [celebrate, setCelebrate] = useState(false);

  // Land at the top, or at a deep-linked section.
  useEffect(() => {
    if (section) document.getElementById(section)?.scrollIntoView({ block: 'start' });
    else window.scrollTo({ top: 0 });
  }, [section]);

  // Track which section is being read, for the rail.
  useEffect(() => {
    const els = c.sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [c]);

  const markDone = () => {
    const willBeDone = !isDone;
    toggleDone(c.slug, willBeDone);
    if (willBeDone) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 1800);
    }
  };

  return (
    <main id="main" className="ch" style={{ ['--act' as string]: ACT_TINT[c.act] }}>
      {/* ── Opening scene ── */}
      <header className="ch-hero">
        <div className="wrap ch-hero-inner">
          <nav className="ch-crumbs" aria-label={tx('مسیر', 'Breadcrumb')}>
            <a href={href.home}>{tx('نقشه راه', 'Map')}</a>
            <span aria-hidden>/</span>
            <span>{t(act.title)}</span>
          </nav>
          <div className="ch-hero-grid">
            <div>
              <motion.div
                className="ch-badge"
                initial={{ opacity: 0, transform: 'scale(0.9) rotate(-8deg)' }}
                animate={{ opacity: 1, transform: 'scale(1) rotate(-4deg)' }}
                transition={{ type: 'spring', duration: 0.6, bounce: 0.3 }}
              >
                <Icon id={c.icon} size={34} tint="var(--card)" />
              </motion.div>
              <p className="eyebrow">
                {tx('فصل', 'Chapter')} {num(index + 1, lang)} {tx('از', 'of')} {num(CHAPTERS.length, lang)} · {num(c.minutes, lang)}{' '}
                {tx('دقیقه', 'min')}
              </p>
              <motion.h1
                className="display ch-title"
                initial={{ opacity: 0, filter: 'blur(8px)', transform: 'translateY(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {t(c.title)}
              </motion.h1>
              <motion.p
                className="ch-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
              >
                {t(c.tagline)}
              </motion.p>
              {c.voice && <VoiceNote src={c.voice} />}
            </div>
            <div className="ch-bit">
              <motion.div
                className="ch-say"
                initial={{ opacity: 0, transform: 'translateY(8px) scale(0.96)' }}
                animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.35 }}
              >
                {t(c.mascotLine)}
              </motion.div>
              <Mascot size={128} mood={isDone ? 'happy' : 'calm'} float />
            </div>
          </div>
        </div>
      </header>

      <div className="wrap ch-layout">
        {/* ── Section rail ── */}
        <aside className="ch-rail" aria-label={tx('بخش‌های این فصل', 'In this chapter')}>
          <div className="ch-rail-inner">
            <p className="eyebrow">{tx('در این فصل', 'In this chapter')}</p>
            <ol>
              {c.sections.map((s, k) => (
                <li key={s.id}>
                  <a
                    href={href.chapter(c.slug, s.id)}
                    className={active === s.id ? 'is-active' : ''}
                    aria-current={active === s.id ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      history.replaceState(null, '', href.chapter(c.slug, s.id));
                    }}
                  >
                    <span className="ch-rail-num">{num(k + 1, lang)}</span>
                    {t(s.title)}
                  </a>
                </li>
              ))}
            </ol>
            <div className="ch-rail-progress" aria-hidden>
              <motion.span style={{ scaleX: readProgress }} />
            </div>
          </div>
        </aside>

        {/* ── Story ── */}
        <article className="ch-article" ref={articleRef}>
          {c.sections.map((s, k) => (
            <section key={s.id} id={s.id} className="ch-section" aria-labelledby={`${s.id}-h`}>
              <Reveal>
                <h2 id={`${s.id}-h`} className="ch-h2">
                  <span className="ch-h2-num" aria-hidden>
                    {num(k + 1, lang)}
                  </span>
                  {t(s.title)}
                </h2>
              </Reveal>
              {s.blocks.map((b, j) => (
                <Reveal key={j}>
                  <BlockView block={b} />
                </Reveal>
              ))}
            </section>
          ))}

          {/* ── How it connects ── */}
          <Reveal>
            <section className="ch-connects sticker" aria-labelledby="connects-h">
              <div className="ch-connects-head">
                <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden>
                  <circle cx="12" cy="24" r="7" fill="var(--sky)" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="36" cy="12" r="7" fill="var(--butter)" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="36" cy="36" r="7" fill="var(--mint)" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M18.5 21 29.5 15M18.5 27l11 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <h2 id="connects-h">{tx('این فصل کجای پازل است؟', 'Where this piece fits')}</h2>
              </div>
              <p>
                <Rich text={t(c.connects)} />
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section className="ch-takeaways" aria-labelledby="take-h">
              <h2 id="take-h" className="ch-h2">
                {tx('چیزهایی که با خودتان می‌برید', 'What you take with you')}
              </h2>
              <ul>
                {c.takeaways.map((k, j) => (
                  <li key={j} style={{ ['--r' as string]: `${(j % 3) - 1}deg` }}>
                    <Rich text={t(k)} />
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* ── Mark done ── */}
          <div className="ch-done">
            <button type="button" className={`btn ${isDone ? 'btn--mint' : 'btn--butter'}`} onClick={markDone} aria-pressed={isDone}>
              {isDone ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {tx('این فصل تمام شد', 'Chapter done')}
                </>
              ) : (
                tx('این فصل را تمام کردم', 'I finished this chapter')
              )}
            </button>
            <AnimatePresence>
              {celebrate && (
                <motion.div
                  className="ch-cheer"
                  initial={{ opacity: 0, transform: 'translateY(10px) scale(0.9)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                  exit={{ opacity: 0, transform: 'translateY(-6px) scale(0.98)', transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.35 }}
                  aria-live="polite"
                >
                  <Mascot size={44} mood="happy" follow={false} />
                  <span>{tx('عالی! یک قدم نزدیک‌تر به قهرمان شدن.', 'Lovely! One step closer to hero.')}</span>
                  <Sparks />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Gates ── */}
          <nav className="ch-gates" aria-label={tx('فصل قبلی و بعدی', 'Previous and next chapter')}>
            {prev ? (
              <a className="ch-gate ch-gate--prev" href={href.chapter(prev.slug)}>
                <span className="eyebrow">{tx('فصل قبلی', 'Previous')}</span>
                <strong>{t(prev.title)}</strong>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a className="ch-gate ch-gate--next sticker" href={href.chapter(next.slug)} style={{ ['--tint' as string]: ACT_TINT[next.act] }}>
                <span className="eyebrow">
                  {tx('ایستگاه بعدی', 'Next stop')} · {tx('فصل', 'Chapter')} {num(index + 2, lang)}
                </span>
                <strong className="display">{t(next.title)}</strong>
                <span className="ch-gate-tag">{t(next.tagline)}</span>
                <span className="ch-gate-arrow" aria-hidden>
                  <svg width="26" height="26" viewBox="0 0 24 24" className="flip-rtl">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ) : (
              <a className="ch-gate ch-gate--next sticker" href={href.home}>
                <span className="eyebrow">{tx('پایان سفر', 'Journey complete')}</span>
                <strong className="display">{tx('بازگشت به نقشه', 'Back to the map')}</strong>
              </a>
            )}
          </nav>
        </article>
      </div>
    </main>
  );
}

/** Tiny burst of sparks for the "chapter done" moment (rare, so delight is fine). */
function Sparks() {
  const colors = ['var(--coral)', 'var(--butter)', 'var(--mint)', 'var(--sky)', 'var(--blush)'];
  return (
    <span className="ch-sparks" aria-hidden>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <motion.i
            key={i}
            style={{ background: colors[i % colors.length] }}
            initial={{ opacity: 1, transform: 'translate(0px, 0px) scale(1)' }}
            animate={{ opacity: 0, transform: `translate(${Math.cos(a) * 46}px, ${Math.sin(a) * 34}px) scale(0.6)` }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        );
      })}
    </span>
  );
}

/**
 * The author's original voice note for this chapter. Rendered only when the
 * audio file is actually present in /public/audio, so a missing file never
 * shows a broken player.
 */
function VoiceNote({ src }: { src: string }) {
  const tx = useTx();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch(src, { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') ?? '';
        if (alive && r.ok && type.startsWith('audio')) setOk(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);
  if (!ok) return null;
  return (
    <div className="ch-voice">
      <span className="eyebrow">{tx('ویس اصلی نویسنده دوره', "The author's original voice note")}</span>
      <audio controls preload="none" src={src}>
        <track kind="captions" />
      </audio>
    </div>
  );
}

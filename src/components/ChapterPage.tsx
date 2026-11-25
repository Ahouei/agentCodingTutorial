import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ACTS, CHAPTERS, chapterIndex } from '../content';
import type { Block, Chapter } from '../content/types';
import { href, num, useApp, useTx } from '../lib/app';
import { EASE_OUT, SPRING } from '../lib/motion';
import { useOverlay } from '../lib/router';
import { usePageTitle } from '../lib/title';
import { BlockView, QuizCard, Reveal } from './blocks/Blocks';
import { GlossaryProvider } from './blocks/glossaryCtx';
import { Rich } from './blocks/Rich';
import { BottomSheet } from './BottomSheet';
import { ACT_TINT, Icon } from './Icon';
import { Mascot } from './Mascot';
import { NotFound } from './NotFound';
import './chapter.css';

export function ChapterPage({ slug, section }: { slug: string; section?: string }) {
  const i = chapterIndex(slug);
  if (i < 0) return <NotFound />;
  return <ChapterBody key={slug} chapter={CHAPTERS[i]} index={i} section={section} />;
}

/** Quiz keys and lab ids for a chapter: what "earned done" means (RD-10). */
function chapterRequirements(c: Chapter) {
  const quizKeys: string[] = [];
  const labs: string[] = [];
  let q = 0;
  const walk = (blocks: Block[]) => {
    for (const b of blocks) {
      if (b.type === 'quiz') quizKeys.push(`${c.slug}:q${q++}`);
      else if (b.type === 'review') b.items.forEach((_, i) => quizKeys.push(`${c.slug}:r${i}`));
      else if (b.type === 'widget') labs.push(b.id);
      else if (b.type === 'path') walk(b.codex); // labs/quizzes inside paths count once (codex side defines them)
    }
  };
  c.sections.forEach((s) => walk(s.blocks));
  return { quizKeys, labs: [...new Set(labs)] };
}

function ChapterBody({ chapter: c, index, section }: { chapter: Chapter; index: number; section?: string }) {
  const { t, lang, done, toggleDone, labs, quizzes, setPosition } = useApp();
  const tx = useTx();
  const act = ACTS.find((a) => a.id === c.act)!;
  const prev = CHAPTERS[index - 1];
  const next = CHAPTERS[index + 1];
  const isDone = !!done[c.slug];
  const [active, setActive] = useState(section ?? c.sections[0]?.id);
  const articleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ['start start', 'end end'] });
  const readProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [celebrate, setCelebrate] = useState(false);
  usePageTitle(t(c.title), lang);

  const req = useMemo(() => chapterRequirements(c), [c]);
  const earned = req.quizKeys.every((k) => quizzes[k]) && req.labs.every((id) => labs[id]);

  // Track which section is being read (rail, mobile bar, "resume"): the last section whose
  // top has passed 35% of the viewport; above the first section, the first one.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current = c.sections[0]?.id;
      for (const s of c.sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [c]);

  useEffect(() => {
    if (active) setPosition(c.slug, active === c.sections[0]?.id ? undefined : active);
  }, [active, c, setPosition]);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(history.state, '', href.chapter(c.slug, id));
  };

  const markDone = (on: boolean) => {
    toggleDone(c.slug, on);
    if (on) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 1800);
    }
  };

  const activeIndex = Math.max(0, c.sections.findIndex((s) => s.id === active));
  let quizCounter = 0;
  const renderBlocks = (blocks: Block[], sectionId: string) =>
    blocks.map((b, j) => {
      const quizKey = b.type === 'quiz' ? `${c.slug}:q${quizCounter++}` : undefined;
      const node = <BlockView block={b} ctx={{ slug: c.slug, quizKey, owner: `${sectionId}:${j}` }} />;
      // Reveal only what is new to the eye (RD-08): labs, quizzes, reviews. Text is simply there.
      return b.type === 'widget' || b.type === 'quiz' || b.type === 'review' ? <Reveal key={j}>{node}</Reveal> : <div key={j}>{node}</div>;
    });

  return (
    <GlossaryProvider chapterSlug={c.slug}>
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
                  style={{ viewTransitionName: `vt-${c.slug}` } as React.CSSProperties}
                  initial={{ opacity: 0, transform: 'scale(0.9) rotate(-8deg)' }}
                  animate={{ opacity: 1, transform: 'scale(1) rotate(-4deg)' }}
                  transition={SPRING}
                >
                  <Icon id={c.icon} size={34} tint="var(--card)" />
                </motion.div>
                <p className="eyebrow">
                  {tx('فصل', 'Chapter')} {num(index + 1, lang)} {tx('از', 'of')} {num(CHAPTERS.length, lang)} · {num(c.minutes, lang)}{' '}
                  {tx('دقیقه', 'min')}
                </p>
                <motion.h1
                  className="display ch-title"
                  initial={{ opacity: 0, transform: 'translateY(10px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                >
                  <Rich text={t(c.title)} />
                </motion.h1>
                <p className="ch-tagline">
                  <Rich text={t(c.tagline)} />
                </p>
                {c.voice && <VoiceNote src={c.voice.src} from={c.voice.from} to={c.voice.to} transcript={c.voice.transcript} />}
              </div>
              <div className="ch-bit">
                <motion.div
                  className="ch-say"
                  initial={{ opacity: 0, transform: 'translateY(8px) scale(0.96)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.25 }}
                >
                  <Rich text={t(c.mascotLine)} />
                </motion.div>
                {/* Still Bit: mood is the only change (RD-08). */}
                <Mascot size={128} mood={isDone ? 'happy' : 'calm'} />
              </div>
            </div>

            {/* ── Mission brief (RD-04) ── */}
            {c.mission && (
              <dl className="ch-mission">
                <div>
                  <dt>{tx('بعد از این فصل', 'After this chapter')}</dt>
                  <dd>
                    <Rich text={t(c.mission.outcome)} />
                  </dd>
                </div>
                <div>
                  <dt>{tx('زمان', 'Time')}</dt>
                  <dd>
                    {tx(`حدود ${num(c.minutes, lang)} دقیقه`, `About ${c.minutes} minutes`)}
                    {req.labs.length > 0 && tx(` · ${num(req.labs.length, lang)} تمرین`, ` · ${req.labs.length} lab${req.labs.length > 1 ? 's' : ''}`)}
                  </dd>
                </div>
                <div className="ch-mission-cafe">
                  <dt>{tx('کافه سحر در این فصل', 'Café Sahar in this chapter')}</dt>
                  <dd>
                    <Rich text={t(c.mission.cafe)} />
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </header>

        <div className="wrap ch-layout">
          {/* ── Section rail (desktop) ── */}
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
                        goToSection(s.id);
                      }}
                    >
                      <span className="ch-rail-num">{num(k + 1, lang)}</span>
                      <Rich text={t(s.title)} />
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
            {c.warmup && (
              <Reveal>
                <div className="ch-warmup">
                  <QuizCard
                    item={c.warmup}
                    quizKey={`${c.slug}:w`}
                    eyebrow={tx('گرم کردن: از فصل قبل یادتان هست؟', 'Warm-up: remember the last chapter?')}
                    compact
                  />
                </div>
              </Reveal>
            )}

            {c.sections.map((s, k) => (
              <section key={s.id} id={s.id} className="ch-section" aria-labelledby={`${s.id}-h`}>
                <Reveal>
                  <h2 id={`${s.id}-h`} className="ch-h2">
                    <span className="ch-h2-num" aria-hidden>
                      {num(k + 1, lang)}
                    </span>
                    <Rich text={t(s.title)} />
                  </h2>
                </Reveal>
                {renderBlocks(s.blocks, s.id)}
              </section>
            ))}

            {/* ── How it connects ── */}
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

            {/* ── Earned done (RD-10) ── */}
            <div className="ch-done">
              {earned && !isDone && (
                <div className="ch-earned" role="status">
                  <Mascot size={44} mood="happy" follow={false} />
                  <span>
                    {req.labs.length
                      ? tx('سؤال‌ها را جواب دادید و تمرین را انجام دادید. این فصل را تمام‌شده علامت بزنیم؟', 'You answered the questions and finished the lab. Mark this chapter done?')
                      : tx('سؤال‌ها را جواب دادید. این فصل را تمام‌شده علامت بزنیم؟', 'You answered the questions. Mark this chapter done?')}
                  </span>
                </div>
              )}
              <button type="button" className={`btn ${isDone ? 'btn--mint' : 'btn--butter'}`} onClick={() => markDone(!isDone)} aria-pressed={isDone}>
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
              {!isDone && !earned && (req.quizKeys.length > 0 || req.labs.length > 0) && (
                <span className="ch-done-hint">
                  {tx(
                    `${num(req.quizKeys.filter((k) => quizzes[k]).length, lang)} از ${num(req.quizKeys.length, lang)} سؤال · ${num(req.labs.filter((id) => labs[id]).length, lang)} از ${num(req.labs.length, lang)} تمرین`,
                    `${req.quizKeys.filter((k) => quizzes[k]).length}/${req.quizKeys.length} questions · ${req.labs.filter((id) => labs[id]).length}/${req.labs.length} labs`,
                  )}
                </span>
              )}
              <AnimatePresence>
                {celebrate && (
                  <motion.div
                    className="ch-cheer"
                    initial={{ opacity: 0, transform: 'translateY(10px) scale(0.96)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                    exit={{ opacity: 0, transform: 'translateY(-6px) scale(0.98)', transition: { duration: 0.2 } }}
                    transition={SPRING}
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
                  <strong>
                    <Rich text={t(prev.title)} />
                  </strong>
                </a>
              ) : (
                <span />
              )}
              {next ? (
                <a className="ch-gate ch-gate--next sticker" href={href.chapter(next.slug)} style={{ ['--tint' as string]: ACT_TINT[next.act] }}>
                  <span className="eyebrow">
                    {tx('ایستگاه بعدی', 'Next stop')} · {tx('فصل', 'Chapter')} {num(index + 2, lang)}
                  </span>
                  <strong className="display">
                    <Rich text={t(next.title)} />
                  </strong>
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

        {/* ── Mobile: bottom bar + sections sheet (RD-05) ── */}
        <MobileBar chapter={c} activeIndex={activeIndex} progress={readProgress} onGo={goToSection} />
      </main>
    </GlossaryProvider>
  );
}

function MobileBar({
  chapter: c,
  activeIndex,
  progress,
  onGo,
}: {
  chapter: Chapter;
  activeIndex: number;
  progress: ReturnType<typeof useSpring>;
  onGo: (id: string) => void;
}) {
  const { t, lang } = useApp();
  const tx = useTx();
  const [open, setOpen] = useOverlay('sections');
  const pending = useRef<string | null>(null);
  const dash = useTransform(progress, (v) => 1 - v);
  const nextSection = c.sections[activeIndex + 1];

  // After the sheet closes (Back entry popped), scroll to the chosen section.
  useEffect(() => {
    if (!open && pending.current) {
      const id = pending.current;
      pending.current = null;
      window.setTimeout(() => onGo(id), 30);
    }
  }, [open, onGo]);

  return (
    <>
      <div className="ch-mbar" role="navigation" aria-label={tx('ناوبری فصل', 'Chapter navigation')}>
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="ch-mbar-ring">
          <circle cx="17" cy="17" r="13" fill="none" stroke="var(--line)" strokeWidth="4" />
          <motion.circle cx="17" cy="17" r="13" fill="none" stroke="var(--coral)" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: dash }} transform="rotate(-90 17 17)" />
        </svg>
        <span className="ch-mbar-sec">
          {tx(`بخش ${num(activeIndex + 1, lang)} از ${num(c.sections.length, lang)}`, `Section ${activeIndex + 1} of ${c.sections.length}`)} ·{' '}
          <Rich text={t(c.sections[activeIndex]?.title ?? c.title)} />
        </span>
        {nextSection && (
          <button type="button" className="ch-mbar-next" onClick={() => onGo(nextSection.id)} aria-label={tx('بخش بعدی', 'Next section')}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button type="button" className="btn btn--small ch-mbar-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-haspopup="dialog">
          {tx('بخش‌ها', 'Sections')}
        </button>
      </div>
      <BottomSheet open={open} onClose={() => setOpen(false)} modal title={tx('بخش‌های این فصل', 'In this chapter')}>
        <ol className="sheet-list">
          {c.sections.map((s, k) => (
            <li key={s.id}>
              <button
                type="button"
                className={k === activeIndex ? 'is-current' : ''}
                aria-current={k === activeIndex ? 'true' : undefined}
                onClick={() => {
                  pending.current = s.id;
                  setOpen(false);
                }}
              >
                <span className="sheet-num">{num(k + 1, lang)}</span>
                <Rich text={t(s.title)} />
              </button>
            </li>
          ))}
        </ol>
      </BottomSheet>
    </>
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
            transition={{ duration: 0.8, ease: EASE_OUT }}
          />
        );
      })}
    </span>
  );
}

/**
 * The author's original voice note for this chapter: starts at this chapter's minute,
 * stops at its end, with the original transcript (QA-23). Rendered only when the audio
 * file is actually present, so a missing file never shows a broken player.
 */
function VoiceNote({ src, from = 0, to, transcript }: { src: string; from?: number; to?: number; transcript?: string }) {
  const tx = useTx();
  const [ok, setOk] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    let alive = true;
    fetch('/audio/manifest.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((m: { files?: unknown } | null) => {
        if (alive && Array.isArray(m?.files) && m.files.includes(src)) setOk(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);
  if (!ok) return null;
  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  return (
    <div className="ch-voice">
      <span className="eyebrow">
        {tx('ویس اصلی نویسنده دوره', "The author's original voice note")}
        {from || to ? ` · ${mmss(from)}${to ? `–${mmss(to)}` : ''}` : ''}
      </span>
      <audio
        ref={ref}
        controls
        preload="metadata"
        src={src}
        onLoadedMetadata={() => {
          if (ref.current && from) ref.current.currentTime = from;
        }}
        onTimeUpdate={() => {
          const a = ref.current;
          if (a && to && a.currentTime >= to) a.pause();
        }}
      >
        <track kind="captions" />
      </audio>
      {transcript && (
        <details className="ch-transcript">
          <summary>{tx('متن ویس', 'Transcript')}</summary>
          <p dir="rtl" lang="fa">
            {transcript}
          </p>
        </details>
      )}
    </div>
  );
}

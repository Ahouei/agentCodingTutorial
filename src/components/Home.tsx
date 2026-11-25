import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ACTS, CHAPTERS } from '../content';
import { href, num, useApp, useTx } from '../lib/app';
import { EASE_OUT } from '../lib/motion';
import { usePageTitle } from '../lib/title';
import { HeroStory } from './HeroStory';
import { Rich } from './blocks/Rich';
import { ACT_TINT, Icon } from './Icon';
import { Mascot } from './Mascot';

const EASE = EASE_OUT;
const LABS = CHAPTERS.flatMap((c) => c.sections.flatMap((s) => s.blocks)).filter((b) => b.type === 'widget').length;

export function Home() {
  const tx = useTx();
  const { lang, done, position, t } = useApp();
  const firstOpen = CHAPTERS.find((c) => !done[c.slug]) ?? CHAPTERS[0];
  const doneCount = CHAPTERS.filter((c) => done[c.slug]).length;
  const started = doneCount > 0 || !!position;
  // The underline under «قهرمان» is the learner's own progress line (RD-02).
  const progress = doneCount / CHAPTERS.length;
  const resumeChapter = position ? CHAPTERS.find((c) => c.slug === position.slug) : undefined;
  const resumeIndex = resumeChapter ? CHAPTERS.indexOf(resumeChapter) : -1;
  const resumeSection = resumeChapter && position?.section ? resumeChapter.sections.find((x) => x.id === position.section) : undefined;

  usePageTitle(null, lang);

  return (
    <main id="main">
      {/* ── Hero ── */}
      <section className="hero wrap">
        <div className="hero-copy">
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="hero-dot" aria-hidden />
            {tx(
              `دوره عملی و پروژه‌محور · ${num(CHAPTERS.length, lang)} فصل · بدون پیش‌نیاز برنامه‌نویسی`,
              `Hands-on, project-based · ${CHAPTERS.length} chapters · no coding background needed`,
            )}
          </motion.p>
          <motion.h1
            className="display hero-title"
            initial={{ opacity: 0, transform: 'translateY(12px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          >
            {tx('از صفر تا ', 'From zero to ')}
            <span className="hero-hl">
              {tx('قهرمان', 'hero')}
              <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden className={lang === 'fa' ? 'hero-track is-rtl' : 'hero-track'}>
                <path d="M3 14 C 50 4, 120 4, 197 12" fill="none" stroke="var(--line)" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 11" />
                <motion.path
                  d="M3 14 C 50 4, 120 4, 197 12"
                  fill="none"
                  stroke="var(--coral)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0.03, progress) }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
                />
              </svg>
            </span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            {tx(
              'یاد بگیرید هر نوع وب‌سایت و وب‌اپلیکیشنی را با کمک Agentic AI و Vibe Coding بسازید، روی دامنه خودتان منتشر کنید و نگه دارید. قدم‌به‌قدم، با «چرا» و «چطور» هر کار، حتی اگر تا امروز یک خط کد ننوشته‌اید.',
              'Learn to build any kind of website or web app with agentic AI and vibe coding, publish it on your own domain, and keep it healthy. Step by step, with the why and the how of every move, even if you have never written a line of code.',
            )}
          </motion.p>
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, transform: 'translateY(8px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          >
            <a className="btn btn--primary" href={href.chapter(firstOpen.slug)}>
              {started ? tx('ادامه سفر', 'Continue the journey') : tx('شروع سفر', 'Start the journey')}
              <Arrow />
            </a>
            <a className="btn" href="#map" onClick={scrollToMap}>
              {tx('نقشه راه را ببینید', 'See the map')}
            </a>
          </motion.div>
          <p className="hero-progress-note">
            {doneCount
              ? tx(`خط زیر «قهرمان» مسیر شماست: ${num(doneCount, lang)} از ${num(CHAPTERS.length, lang)} فصل.`, `The line under "hero" is your path: ${doneCount} of ${CHAPTERS.length} chapters.`)
              : tx('خط زیر «قهرمان» مسیر شماست؛ با هر فصل جلوتر می‌رود.', 'The line under "hero" is your path; it grows with every chapter.')}
          </p>
          {resumeChapter && (
            <a className="hero-resume" href={href.chapter(resumeChapter.slug, resumeSection?.id)}>
              <ProgressRingBig value={progress} />
              <span>
                <b>
                  {tx('ادامه از فصل', 'Continue chapter')} {num(resumeIndex + 1, lang)}: <Rich text={t(resumeChapter.title)} />
                </b>
                {resumeSection && (
                  <small>
                    {tx('بخش', 'Section')} «<Rich text={t(resumeSection.title)} />»
                  </small>
                )}
              </span>
              <Arrow />
            </a>
          )}
          <ul className="hero-facts">
            <li>
              <strong>{num(4, lang)}</strong> {tx('پرده', 'acts')}
            </li>
            <li>
              <strong>{num(LABS, lang)}</strong> {tx('تمرین تعاملی', 'interactive labs')}
            </li>
            <li>
              <strong>{tx('فارسی', 'FA')}</strong> + <strong>{tx('انگلیسی', 'EN')}</strong>
            </li>
          </ul>
        </div>
        <div className="hero-stage">
          <HeroStory />
        </div>
      </section>

      {/* ── How every chapter works ── */}
      <section className="method wrap" aria-labelledby="method-title">
        <h2 id="method-title" className="display method-title">
          {tx('هر فصل، یک داستان کوچک', 'Every chapter is a small story')}
        </h2>
        <ol className="method-steps">
          {[
            ['why', tx('چرا؟', 'Why'), tx('اول می‌فهمید این کار به چه دردی می‌خورد.', 'First you see what problem this solves.'), 'var(--sky)'],
            ['how', tx('چطور؟', 'How'), tx('بعد قدم‌به‌قدم، با زبان ساده.', 'Then the steps, in plain words.'), 'var(--mint)'],
            ['try', tx('امتحان کنید', 'Try it'), tx('با یک تمرین تعاملی دستتان گرم می‌شود.', 'A hands-on lab makes it click.'), 'var(--butter)'],
            ['prompt', tx('به Agent بگویید', 'Tell your agent'), tx('یک Prompt آماده برای کپی.', 'A ready prompt to copy.'), 'var(--blush)'],
            ['link', tx('اتصال‌ها', 'Connect'), tx('می‌بینید این قطعه کجای پازل است.', 'See where the piece fits the puzzle.'), 'var(--coral)'],
          ].map(([k, title, text, tint], i) => (
            <motion.li
              key={k}
              className="method-step"
              initial={{ opacity: 0, transform: 'translateY(10px) rotate(0deg)' }}
              whileInView={{ opacity: 1, transform: `translateY(0px) rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
              style={{ ['--tint' as string]: tint }}
            >
              <span className="method-num">{num(i + 1, lang)}</span>
              <strong>{title}</strong>
              <span>{text}</span>
            </motion.li>
          ))}
        </ol>
      </section>

      <JourneyMap />

      {/* ── Author note ── */}
      <section className="author wrap">
        <div className="author-card sticker">
          <Mascot size={92} mood="wink" ambient />
          <div>
            <p className="eyebrow">{tx('درباره این دوره', 'About this course')}</p>
            <p className="author-text">
              {tx(
                'این مسیر از روی ویس‌های آموزشی نویسنده دوره ساخته شده، با اصلاح نکته‌های فنی، به‌روزرسانی با مستندات رسمی و اضافه شدن هر قدمی که برای رسیدن از ایده تا یک سایت زنده لازم است. هر جا گفته‌ای نیاز به دقت بیشتری داشت، با برچسب «تصور رایج، تصحیح‌شده» مشخص شده است.',
                "This path is built from the course author's voice lessons, with technical points corrected, checked against official docs, and every missing step added to get from an idea to a live site. Wherever something needed more precision, you'll see a \"common mix-up, corrected\" note.",
              )}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

function scrollToMap(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="flip-rtl">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────────────────── Journey map ───────────────────────── */

function JourneyMap() {
  const tx = useTx();
  const { t, lang, done } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const trail = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  let n = 0;

  return (
    <section id="map" className="map" aria-labelledby="map-title">
      <div className="wrap">
        <div className="map-head">
          <p className="eyebrow">{tx('نقشه راه', 'The map')}</p>
          <h2 id="map-title" className="display map-title">
            {tx('سفر شما، ایستگاه به ایستگاه', 'Your journey, stop by stop')}
          </h2>
          <p className="map-sub">
            {tx(
              'به ترتیب جلو بروید یا هر جا که دوست دارید بپرید. پیشرفتتان فقط در همین مرورگر ذخیره می‌شود.',
              'Go in order or jump anywhere. Your progress is saved in this browser only.',
            )}
          </p>
        </div>

        <div className="map-body" ref={ref}>
          <div className="map-trail" aria-hidden>
            <motion.div className="map-trail-fill" style={{ scaleY: trail }} />
          </div>

          {ACTS.map((act) => (
            <div key={act.id} className="map-act">
              <motion.div
                className="map-gate"
                style={{ ['--tint' as string]: ACT_TINT[act.id] }}
                initial={{ opacity: 0, transform: 'scale(0.96)' }}
                whileInView={{ opacity: 1, transform: 'scale(1)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="map-gate-num">{num(act.id, lang)}</span>
                <div>
                  <h3 className="display">{t(act.title)}</h3>
                  <p>{t(act.subtitle)}</p>
                </div>
              </motion.div>

              <ol className="map-stops">
                {CHAPTERS.filter((c) => c.act === act.id).map((c) => {
                  n += 1;
                  const isDone = !!done[c.slug];
                  return (
                    <motion.li
                      key={c.slug}
                      className={`map-stop ${isDone ? 'is-done' : ''}`}
                      initial={{ opacity: 0, filter: 'blur(5px)' }}
                      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <span className="map-node" style={{ ['--tint' as string]: ACT_TINT[act.id], viewTransitionName: `vt-${c.slug}` } as React.CSSProperties} aria-hidden>
                        {isDone ? (
                          <svg width="22" height="22" viewBox="0 0 24 24">
                            <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <Icon id={c.icon} size={24} tint="var(--card)" />
                        )}
                      </span>
                      <a className="map-card sticker" href={href.chapter(c.slug)}>
                        <span className="map-card-top">
                          <span className="map-card-num">
                            {tx('فصل', 'Chapter')} {num(n, lang)}
                          </span>
                          <span className="map-card-min">
                            {num(c.minutes, lang)} {tx('دقیقه', 'min')}
                          </span>
                        </span>
                        <strong className="map-card-title">{t(c.title)}</strong>
                        <span className="map-card-tag">{t(c.tagline)}</span>
                        {isDone && <span className="map-card-done">{tx('تمام شد', 'Done')}</span>}
                      </a>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          ))}

          <div className="map-finish">
            <Mascot size={110} mood="happy" ambient />
            <p className="display">{tx('و حالا شما یک قهرمان هستید.', 'And now, you are a hero.')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressRingBig({ value }: { value: number }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden className="hero-resume-ring">
      <circle cx="22" cy="22" r="18" fill="none" stroke="var(--line)" strokeWidth="5" />
      <motion.circle
        cx="22"
        cy="22"
        r="18"
        fill="none"
        stroke="var(--mint-ink)"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        initial={{ strokeDashoffset: 1 }}
        animate={{ strokeDashoffset: 1 - value }}
        transition={{ duration: 0.9, ease: EASE }}
        transform="rotate(-90 22 22)"
      />
    </svg>
  );
}

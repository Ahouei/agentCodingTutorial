import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { EASE_IN_OUT as EASE_MOVE, EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set3.css';


type Feature = 'hero' | 'menu' | 'hours' | 'mobile' | 'form';
type Kind = 'good' | 'vague' | 'rewrite';
type Phase = 'choose' | 'running' | 'review' | 'committing' | 'finished';
type Bi = { fa: string; en: string };

const ROUNDS: { feature: Feature; goal: Bi; good: Bi; vague: Bi; commit: string }[] = [
  {
    feature: 'hero',
    goal: {
      fa: 'صفحه فعلاً فقط یک خط متن ساده است. اول یک بخش Hero گرم و دلنشین لازم داریم.',
      en: 'Right now the page is one plain line of text. First we need a warm, inviting hero.',
    },
    good: {
      fa: 'بالای صفحه یک Hero بساز: اسم «کافه سحر» درشت، زیرش «قهوه، کیک، گوشه‌های دنج»، پس‌زمینه کرم و یک دکمه «دیدن منو».',
      en: 'Add a hero at the top: the name "Café Sahar" large, the line "Coffee, cake, cozy corners" under it, a cream background and one "See the menu" button.',
    },
    vague: { fa: 'قشنگ‌ترش کن.', en: 'Make it look nicer.' },
    commit: 'feat: add warm hero section',
  },
  {
    feature: 'menu',
    goal: { fa: 'مهمان‌ها می‌خواهند بدانند چه چیزی سرو می‌شود.', en: 'Guests want to know what you serve.' },
    good: {
      fa: 'زیر Hero یک بخش منو اضافه کن با سه آیتم: اسپرسو ۳ دلار، لاته ۴ دلار، کیک هویج ۵ دلار. در دسکتاپ دو ستون، در موبایل یک ستون.',
      en: 'Under the hero, add a menu section with three items: Espresso $3, Latte $4, Carrot cake $5. Two columns on desktop, one on mobile.',
    },
    vague: { fa: 'یه چیزی درباره غذا بذار.', en: 'Add some food stuff.' },
    commit: 'feat: add menu section',
  },
  {
    feature: 'hours',
    goal: { fa: 'کسی نمی‌داند کافه کی باز است و کجاست.', en: 'Nobody knows when the café is open or where it is.' },
    good: {
      fa: 'زیر منو یک کارت «امروز باز هستیم» بگذار: روزهای کاری ۸ تا ۲۰، آخر هفته ۹ تا ۱۸، و یک لینک «مسیریابی».',
      en: 'Below the menu, add an "Open today" card: weekdays 8–20, weekends 9–18, and a "Get directions" link.',
    },
    vague: { fa: 'اطلاعات رو یه جایی بذار.', en: 'Put the info somewhere.' },
    commit: 'feat: add opening hours card',
  },
  {
    feature: 'mobile',
    goal: {
      fa: 'روی گوشی خودتان سایت را باز کردید: قیمت‌های منو از کادر بیرون زده‌اند (قرمز).',
      en: 'You opened the site on your phone: the menu prices spill out of their boxes (in red).',
    },
    good: {
      fa: 'روی صفحه‌های باریک‌تر از ۴۰۰px، قیمت‌های منو از کادر بیرون می‌زنند. قیمت را زیر اسم آیتم بیاور و اندازه متن را ۱۶px نگه دار.',
      en: 'On screens narrower than 400px the menu prices overflow their boxes. Put the price under the item name and keep the text at 16px.',
    },
    vague: { fa: 'روی گوشی عجیبه، درستش کن.', en: 'It looks weird on my phone, fix it.' },
    commit: 'fix: stack menu prices on small screens',
  },
  {
    feature: 'form',
    goal: { fa: 'آخرین قدم: مهمان‌ها باید بتوانند پیام بدهند.', en: 'Last step: guests should be able to send a message.' },
    good: {
      fa: 'پایین صفحه یک فرم تماس بساز (نام، ایمیل، پیام). بعد از ارسال فقط پیام «ممنون، خبرتان می‌کنیم» نشان بده؛ فعلاً چیزی ذخیره نکن.',
      en: 'At the bottom, add a contact form (name, email, message). After sending, just show "Thanks, we will get back to you"; do not store anything yet.',
    },
    vague: { fa: 'یه راه ارتباطی اضافه کن.', en: 'Add a way to contact us.' },
    commit: 'feat: add contact form (no storage yet)',
  },
];

const REWRITE: Bi = {
  fa: 'خوب نیست. همه‌چیز را پاک کن و کل سایت را از اول بنویس.',
  en: "This isn't good. Delete everything and rewrite the whole site from scratch.",
};

const SHAS = ['a1f3c9e', '7b2d410', 'c94e1aa', '3e8f0b2', 'f0a7d63'];

const STEPS: Bi[] = [
  { fa: 'درخواست', en: 'Ask' },
  { fa: 'ساخت', en: 'Build' },
  { fa: 'پیش‌نمایش', en: 'Preview' },
  { fa: 'بازبینی', en: 'Review' },
  { fa: 'Commit', en: 'Commit' },
];

export default function VibeLoop() {
  const { t, lang } = useApp();
  const tx = useTx();
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<Phase>('choose');
  const [step, setStep] = useState(0);
  const [committed, setCommitted] = useState<Feature[]>([]);
  const [result, setResult] = useState<Kind | null>(null);
  const [commits, setCommits] = useState<{ sha: string; msg: string }[]>([]);
  const [stats, setStats] = useState({ vague: 0, rewrite: 0 });
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const r = ROUNDS[Math.min(round, ROUNDS.length - 1)];

  // Rotate option order per round so the specific one isn't always first.
  const options: { kind: Kind; text: Bi }[] = (() => {
    const base: { kind: Kind; text: Bi }[] = [
      { kind: 'good', text: r.good },
      { kind: 'vague', text: r.vague },
      { kind: 'rewrite', text: REWRITE },
    ];
    const shift = round % 3;
    return [...base.slice(shift), ...base.slice(0, shift)];
  })();

  const pick = (kind: Kind) => {
    setResult(kind);
    setPhase('running');
    setStep(0);
    timers.current.push(
      window.setTimeout(() => setStep(1), 450),
      window.setTimeout(() => setStep(2), 900),
      window.setTimeout(() => {
        setStep(3);
        setPhase('review');
        if (kind === 'vague') setStats((s) => ({ ...s, vague: s.vague + 1 }));
        if (kind === 'rewrite') setStats((s) => ({ ...s, rewrite: s.rewrite + 1 }));
      }, 1350),
    );
  };

  const commit = () => {
    // QA-07: commit exactly once. The button disappears as soon as the phase leaves 'review'.
    if (phase !== 'review' || result !== 'good') return;
    setPhase('committing');
    setStep(4);
    setCommitted((c) => [...c, r.feature]);
    setCommits((c) => [{ sha: SHAS[round], msg: r.commit }, ...c]);
    timers.current.push(
      window.setTimeout(() => {
        setResult(null);
        setStep(0);
        if (round + 1 >= ROUNDS.length) {
          setPhase('finished');
          setRound(ROUNDS.length);
        } else {
          setRound(round + 1);
          setPhase('choose');
        }
      }, 650),
    );
  };

  const discard = () => {
    setResult(null);
    setStep(0);
    setPhase('choose');
  };

  const restart = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    setRound(0);
    setPhase('choose');
    setStep(0);
    setCommitted([]);
    setResult(null);
    setCommits([]);
    setStats({ vague: 0, rewrite: 0 });
  };

  // What the preview shows right now.
  const showReview = phase === 'review' || (phase === 'running' && step >= 2);
  const { complete } = useLab();
  useEffect(() => {
    if (phase === 'finished') complete();
  }, [phase, complete]);
  const pending = showReview && result === 'good' ? [r.feature] : [];
  const features = new Set<Feature>([...committed, ...pending]);
  const guess = showReview && result === 'vague';
  const broken = showReview && result === 'rewrite';

  const mood = phase === 'finished' ? 'happy' : phase === 'running' ? 'think' : result === 'good' ? 'happy' : result ? 'wow' : 'calm';

  const message = (() => {
    if (phase === 'finished')
      return tx(
        'تمام شد! صفحه کافه در پنج دور کوچک ساخته شد و هر قدم خوب یک Commit دارد که می‌شود به آن برگشت.',
        'Done! The café page was built in five small laps, and every good step has a commit you can return to.',
      );
    if (phase === 'running') return tx('Agent دارد کار می‌کند…', 'The agent is working…');
    if (phase === 'committing') return tx('Commit شد! یک نقطه امن تازه در تاریخچه.', 'Committed! A fresh safe point in the history.');
    if (phase === 'review' && result === 'good')
      return tx(
        'دقیقاً همان چیزی شد که خواستید، چون گفتید چه چیزی، کجا و چه شکلی. پیش‌نمایش را چک کنید و Commit کنید.',
        'It came out exactly as asked, because you said what, where and how it should look. Check the preview, then commit.',
      );
    if (phase === 'review' && result === 'vague')
      return tx(
        'Agent مجبور شد حدس بزند و یک گرادیان بنفش تکراری تحویل داد. درخواست مشخص بدهید: چه چیزی، کجای صفحه، چه شکلی. گزینه‌ها را دوباره مقایسه کنید.',
        'The agent had to guess and delivered a generic purple gradient. Be specific: what, where on the page, and how it should look. Compare the options again.',
      );
    if (phase === 'review' && result === 'rewrite')
      return tx(
        'آخ! بازنویسی کامل چیزهایی را که درست کار می‌کردند هم شکست. خوشبختانه آخرین نسخه سالم در Git ذخیره است.',
        'Ouch! A full rewrite broke the parts that already worked. Luckily, the last healthy version is saved in Git.',
      );
    return t(r.goal);
  })();

  const phoneIssue = committed.includes('menu') && !features.has('mobile') && round >= 3;

  return (
    <Frame
      title={tx('حلقه Vibe Coding: صفحه یک کافه دنج', 'The vibe coding loop: a cozy café page')}
      goal={tx('صفحه کافه سحر را در پنج دور کوچک بسازید', "Build Café Sahar's page in five small laps")}
      tint="var(--butter-soft)"
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={restart}>
            {tx('از اول', 'Start over')}
          </button>
          <div className="w-row">
            <span className="w-muted">
              {tx('Commitها', 'Commits')}: {num(commits.length, lang)}
            </span>
            <span className="w-pill">
              {tx('دور', 'Lap')} {num(Math.min(round + 1, ROUNDS.length), lang)} / {num(ROUNDS.length, lang)}
            </span>
          </div>
        </>
      }
    >
      <div className="vl-top">
        <LoopRing step={step} labels={STEPS.map((s) => t(s))} lap={Math.min(round + 1, ROUNDS.length)} />
        <Preview features={features} guess={guess} broken={broken} phoneIssue={phoneIssue} />
      </div>

      <div aria-live="polite" className={`s3-bubble ${result === 'good' || phase === 'finished' ? 'is-good' : result === 'vague' ? 'is-warn' : result === 'rewrite' ? 'is-bad' : ''}`}>
        <Mascot size={44} mood={mood} follow={false} />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>

      {(phase === 'choose' || phase === 'running') && (
        <div style={{ marginTop: 16 }}>
          <p className="vl-goal">{tx('چه پیامی به Agent می‌دهید؟', 'What do you tell the agent?')}</p>
          <div className="vl-options">
            {options.map((o) => (
              <button key={o.kind} type="button" className="vl-option" disabled={phase !== 'choose'} onClick={() => pick(o.kind)}>
                <span className="vl-chat" aria-hidden>
                  <svg width="15" height="15" viewBox="0 0 24 24">
                    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>«{t(o.text)}»</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'review' && (
        <div className="s3-actions">
          {result === 'good' && (
            <button type="button" className="btn btn--mint" onClick={commit}>
              {tx('درست است؛ Commit کن', 'Looks right: commit it')}
            </button>
          )}
          {result === 'vague' && (
            <button type="button" className="btn btn--butter" onClick={discard}>
              {tx('دور بریز و مشخص‌تر بپرس', 'Discard and ask more specifically')}
            </button>
          )}
          {result === 'rewrite' && (
            <button type="button" className="btn btn--primary" onClick={discard}>
              {tx('برگرد به آخرین Commit سالم (Git)', 'Undo with Git: back to the last good commit')}
            </button>
          )}
        </div>
      )}

      {phase === 'finished' && (
        <div className="w-card" style={{ marginTop: 16 }}>
          <p style={{ margin: '0 0 6px', fontWeight: 900 }}>{tx('خلاصه این پروژه کوچک', 'This little project in numbers')}</p>
          <ul className="vl-history" style={{ gap: 4 }}>
            <li>
              {tx('Commitهای سالم', 'Healthy commits')}: <strong>{num(commits.length, lang)}</strong>
            </li>
            <li>
              {tx('درخواست‌های مبهم که دور ریخته شد', 'Vague requests thrown away')}: <strong>{num(stats.vague, lang)}</strong>
            </li>
            <li>
              {tx('بازنویسی‌های کامل که با Git برگشت', 'Full rewrites undone with Git')}: <strong>{num(stats.rewrite, lang)}</strong>
            </li>
          </ul>
          <p className="w-muted" style={{ margin: '10px 0 0' }}>
            {tx(
              'درس اصلی: قدم‌های کوچک، درخواست‌های مشخص، بازبینی قبل از ذخیره، و Commit بعد از هر قدم خوب.',
              'The lesson: small steps, specific requests, review before saving, and a commit after every good step.',
            )}
          </p>
          <div className="s3-actions">
            <button type="button" className="btn btn--small" onClick={restart}>
              {tx('یک بار دیگر', 'Play again')}
            </button>
          </div>
        </div>
      )}

      {commits.length > 0 && (
        <>
          <p className="vl-section-title">{tx('تاریخچه Git', 'Git history')}</p>
          <ul className="vl-history">
            <AnimatePresence initial={false}>
              {commits.map((c) => (
                <motion.li
                  key={c.sha}
                  layout
                  initial={{ opacity: 0, transform: 'translateY(-6px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <span className="sha">{c.sha}</span>
                  <span className="msg">{c.msg}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </>
      )}
    </Frame>
  );
}

function LoopRing({ step, labels, lap }: { step: number; labels: string[]; lap: number }) {
  const tx = useTx();
  const { lang } = useApp();
  const R = 79; // distance from center to node (px) in a 210px box
  return (
    <div className="vl-ring" role="img" aria-label={`${tx('مرحله فعلی', 'Current step')}: ${labels[step]}`}>
      <div className="vl-ring-track" />
      <motion.div
        className="vl-ring-spinner"
        animate={{ transform: `rotate(${step * 72}deg)` }}
        transition={{ duration: 0.4, ease: EASE_MOVE }}
      >
        <i />
      </motion.div>
      {labels.map((l, i) => {
        const a = ((-90 + i * 72) * Math.PI) / 180;
        return (
          <span
            key={i}
            className={`vl-node ${i === step ? 'is-on' : ''}`}
            style={{ left: 105 + Math.cos(a) * R, top: 105 + Math.sin(a) * R }}
          >
            {l}
          </span>
        );
      })}
      <div className="vl-ring-center" aria-hidden>
        <span>
          {tx('دور', 'Lap')}
          <br />
          <span style={{ fontSize: 26 }}>{num(lap, lang)}</span>
        </span>
      </div>
    </div>
  );
}

function Preview({
  features,
  guess,
  broken,
  phoneIssue,
}: {
  features: Set<Feature>;
  guess: boolean;
  broken: boolean;
  phoneIssue: boolean;
}) {
  const tx = useTx();
  const enter = {
    initial: { opacity: 0, transform: 'scale(0.96)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    transition: { duration: 0.35, ease: EASE_OUT },
  };
  return (
    <div className="vl-browser" aria-label={tx('پیش‌نمایش سایت', 'Site preview')}>
      <div className="vl-bar">
        <i />
        <i />
        <i />
        <span>preview.cafe-sahar.ir</span>
      </div>
      <div className={`vl-page ${guess ? 'is-guess' : ''}`}>
        {!features.has('hero') && !guess && <p className="vl-plain" style={{ margin: 0 }}>{tx('کافه سحر', 'Café Sahar')}</p>}
        {guess && (
          <motion.div {...enter} style={{ textAlign: 'center', padding: '20px 6px' }}>
            <b style={{ fontSize: 20, display: 'block' }}>Welcome!!!</b>
            <small>Lorem ipsum dolor sit amet</small>
          </motion.div>
        )}
        <AnimatePresence initial={false}>
          {features.has('hero') && !guess && (
            <motion.div key="hero" className="vl-hero" {...enter}>
              <b>{tx('کافه سحر', 'Café Sahar')}</b>
              <small>{tx('قهوه، کیک، گوشه‌های دنج', 'Coffee, cake, cozy corners')}</small>
              <em>{tx('دیدن منو', 'See the menu')}</em>
            </motion.div>
          )}
          {features.has('menu') && !guess && (
            <motion.div
              key="menu"
              className={`vl-menu ${phoneIssue ? 'is-cramped' : features.has('mobile') ? 'is-stacked' : ''}`}
              {...enter}
            >
              {[
                [tx('اسپرسو', 'Espresso'), '$3'],
                [tx('لاته', 'Latte'), '$4'],
                [tx('کیک هویج', 'Carrot cake'), '$5'],
              ].map(([n, p]) => (
                <div key={p}>
                  <span>{n}</span>
                  <span dir="ltr">{p}</span>
                </div>
              ))}
            </motion.div>
          )}
          {features.has('hours') && !guess && (
            <motion.div key="hours" className="vl-hours" {...enter}>
              <strong>{tx('امروز باز هستیم', 'Open today')}</strong> ·{' '}
              {tx('روزهای کاری ۸ تا ۲۰ · آخر هفته ۹ تا ۱۸', 'Weekdays 8–20 · Weekends 9–18')} ·{' '}
              <u>{tx('مسیریابی', 'Get directions')}</u>
            </motion.div>
          )}
          {features.has('form') && !guess && (
            <motion.div key="form" className="vl-form" {...enter}>
              <strong>{tx('برای ما بنویسید', 'Write to us')}</strong>
              <span />
              <span />
              <span style={{ height: 32 }} />
              <em>{tx('ارسال', 'Send')}</em>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {broken && (
            <motion.div
              key="broken"
              className="vl-broken"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <span>{tx('همه چیز از نو نوشته شد… و خراب شد', 'Everything was rewritten… and broke')}</span>
              <code>TypeError: Cannot read properties of undefined (reading 'menu')</code>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

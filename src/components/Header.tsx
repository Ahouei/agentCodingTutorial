import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { CHAPTERS } from '../content';
import { href, navigate, num, useApp, useRoute, useTx } from '../lib/app';
import { EASE_OUT } from '../lib/motion';
import { useOverlay } from '../lib/router';
import { BottomSheet } from './BottomSheet';
import { AccountSheet } from './AccountSheet';
import { useAccount } from '../lib/account';
import { AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Mascot } from './Mascot';
import './shell.css';

export function Header() {
  const { lang, setLang, cycleTheme, done, palette, setPalette } = useApp();
  const tx = useTx();
  const route = useRoute();
  const goToMap = (e: React.MouseEvent) => {
    e.preventDefault();
    if (route.name === 'home') document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else navigate(href.map);
  };
  const [more, setMore] = useOverlay('settings');
  const [accOpen, setAccOpen] = useOverlay('account');
  const acc = useAccount();
  const showAccount = acc.status === 'signed-in' || acc.status === 'signed-out';
  useEffect(() => {
    if (!acc.justSignedIn) return;
    const t = window.setTimeout(() => acc.dismissWelcome(), 4000);
    return () => window.clearTimeout(t);
  }, [acc]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  // Bit rides the reading-progress line on chapter pages, bobbing while you scroll.
  const riderX = useTransform(progress, (v) => `translateX(${(lang === 'fa' ? -1 : 1) * (1.5 + v * 97)}%)`);
  const [riding, setRiding] = useState(false);
  const [moving, setMoving] = useState(false);
  const stop = useRef(0);
  const { scrollY } = useScroll();
  // Reading milestones: Bit cheers at halfway and at the end of a chapter (once per visit).
  const [milestone, setMilestone] = useState<null | 'half' | 'end'>(null);
  const hit = useRef<{ half: boolean; end: boolean; key: string }>({ half: false, end: false, key: '' });
  const routeKey = route.name === 'chapter' ? route.slug : '';
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (route.name !== 'chapter') return;
    if (hit.current.key !== routeKey) hit.current = { half: false, end: false, key: routeKey };
    const fire = (m: 'half' | 'end') => {
      hit.current[m] = true;
      setMilestone(m);
      window.setTimeout(() => setMilestone((cur) => (cur === m ? null : cur)), 2600);
    };
    if (!hit.current.half && v > 0.5) fire('half');
    if (!hit.current.end && v > 0.97) fire('end');
  });
  useMotionValueEvent(scrollY, 'change', (y) => {
    setRiding(y > 120);
    setMoving(true);
    window.clearTimeout(stop.current);
    stop.current = window.setTimeout(() => setMoving(false), 220);
  });
  const total = CHAPTERS.length;
  const count = CHAPTERS.filter((c) => done[c.slug]).length;

  return (
    <header className="hd">
      <div className="hd-inner wrap">
        <a className="hd-brand" href={href.home}>
          <span className="hd-logo" aria-hidden>
            <Mascot size={34} mood="happy" follow={false} />
          </span>
          <span className="hd-name">
            <strong>{tx('از صفر تا قهرمان', 'Zero to Hero')}</strong>
            <span>{tx('ساخت وب با Agentic AI', 'Build the web with agentic AI')}</span>
          </span>
        </a>

        <div className="hd-actions">
          {showAccount && (
            <button
              type="button"
              className="hd-icon hd-account"
              data-state={acc.status}
              onClick={() => setAccOpen(true)}
              aria-haspopup="dialog"
              aria-label={acc.status === 'signed-in' ? tx('حساب شما', 'Your account') : tx('ورود (اختیاری)', 'Sign in (optional)')}
              title={acc.status === 'signed-in' ? acc.email ?? '' : tx('ورود (اختیاری)', 'Sign in (optional)')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <circle cx="12" cy="8.5" r="3.8" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M4.5 20c1.2-3.6 4.1-5.5 7.5-5.5s6.3 1.9 7.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <a className="hd-progress" href={href.map} onClick={goToMap} aria-label={tx(`${num(count, lang)}/${num(total, lang)} فصل تمام شده؛ رفتن به نقشه راه`, `${count}/${total} chapters done; go to the map`)}>
            <ProgressRing value={total ? count / total : 0} />
            <span>
              {num(count, lang)}/{num(total, lang)}
            </span>
          </a>
          <button type="button" className="hd-icon hd-more" onClick={() => setMore(true)} aria-label={tx('نمایش و زبان', 'Display & language')} aria-haspopup="dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <circle cx="5" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="19" cy="12" r="2" fill="currentColor" />
            </svg>
          </button>
          <a className="hd-icon hd-extra" href={href.glossary} aria-label={tx('واژه‌نامه', 'Glossary')} title={tx('واژه‌نامه', 'Glossary')}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5Zm0 15A1.5 1.5 0 0 0 6.5 21H19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 8h6M9 11.5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
          <button
            type="button"
            className="hd-icon hd-extra"
            onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
            title={tx('Switch to English', 'تغییر زبان به فارسی')}
            lang={lang === 'fa' ? 'en' : 'fa'}
          >
            {lang === 'fa' ? 'EN' : 'فا'}
          </button>
          <button
            type="button"
            className="hd-icon hd-palette hd-extra"
            onClick={() => setPalette(palette === 'candy' ? 'kashi' : 'candy')}
            aria-label={tx(`رنگ‌بندی: ${palette === 'candy' ? 'آبنباتی' : 'کاشی'}. تغییر به ${palette === 'candy' ? 'کاشی' : 'آبنباتی'}`, `Palette: ${palette === 'candy' ? 'Candy' : 'Kashi'}. Switch to ${palette === 'candy' ? 'Kashi' : 'Candy'}`)}
            title={tx('رنگ‌بندی', 'Palette')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
              <circle cx="8.5" cy="9" r="4.5" fill={palette === 'candy' ? '#ef6a4c' : '#17777a'} stroke="currentColor" strokeWidth="1.6" />
              <circle cx="15.5" cy="9" r="4.5" fill={palette === 'candy' ? '#ffd36a' : '#f2b632'} stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="15.5" r="4.5" fill={palette === 'candy' ? '#8fd5b5' : '#b8324b'} stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button type="button" className="hd-icon hd-extra" onClick={cycleTheme} aria-label={tx('تغییر حالت روشن و تیره', 'Toggle light and dark')}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="hd-sun">
              <circle cx="12" cy="12" r="4.5" fill="currentColor" />
              <path
                d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="hd-moon">
              <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
      <motion.div className="hd-bar" style={{ scaleX: progress }} aria-hidden />
      {route.name === 'chapter' && (
        <div className="hd-rider-clip" aria-hidden>
          <motion.div className={`hd-rider-track ${riding ? 'is-on' : ''}`} style={{ transform: riderX }}>
            <span className={`hd-rider ${moving ? 'is-moving' : ''}`}>
              <Mascot size={24} mood={milestone === 'end' ? 'cheer' : milestone === 'half' ? 'wow' : moving ? 'happy' : 'calm'} follow={false} />
              <AnimatePresence>
                {milestone && (
                  <motion.span
                    key={milestone}
                    className={`hd-rider-say ${milestone === 'end' ? 'hd-rider-say--end' : ''}`}
                    initial={{ opacity: 0, transform: 'translateY(-4px) scale(0.95)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                    exit={{ opacity: 0, transform: 'translateY(-2px) scale(0.98)' }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                  >
                    {milestone === 'half' ? tx('نصف راه! 🎉', 'Halfway! 🎉') : tx('تمام! حالا سؤال‌ها ✨', 'Done! Now the questions ✨')}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.div>
        </div>
      )}
      <AccountSheet open={accOpen} onClose={() => setAccOpen(false)} />
      <AnimatePresence>
        {acc.justSignedIn && (
          <motion.div
            className="welcome-toast"
            role="status"
            initial={{ opacity: 0, transform: 'translateY(-8px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-6px)' }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <div>
              <Mascot size={34} mood="happy" follow={false} />
              {tx('وارد شدید. پیشرفتتان همگام می‌شود.', 'Signed in. Your progress now syncs.')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BottomSheet open={more} onClose={() => setMore(false)} modal title={tx('نمایش و زبان', 'Display & language')}>
        <div className="hd-sheet">
          <button type="button" className="hd-sheet-row" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}>
            <span>{tx('زبان', 'Language')}</span>
            <b lang={lang === 'fa' ? 'en' : 'fa'}>{lang === 'fa' ? 'English' : 'فارسی'}</b>
          </button>
          <button type="button" className="hd-sheet-row" onClick={() => setPalette(palette === 'candy' ? 'kashi' : 'candy')}>
            <span>{tx('رنگ‌بندی', 'Palette')}</span>
            <b>{palette === 'candy' ? tx('آبنباتی ← کاشی', 'Candy → Kashi') : tx('کاشی ← آبنباتی', 'Kashi → Candy')}</b>
          </button>
          <button type="button" className="hd-sheet-row" onClick={cycleTheme}>
            <span>{tx('حالت روشن و تیره', 'Light and dark')}</span>
            <b>{tx('تغییر', 'Switch')}</b>
          </button>
          <a className="hd-sheet-row" href={href.glossary}>
            <span>{tx('واژه‌نامه همه اصطلاح‌ها', 'Glossary of all terms')}</span>
            <b>›</b>
          </a>
        </div>
      </BottomSheet>
    </header>
  );
}

export function ProgressRing({ value, size = 26 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth="4" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--mint-ink)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={false}
        animate={{ strokeDashoffset: c * (1 - value) }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      />
    </svg>
  );
}

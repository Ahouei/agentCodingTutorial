import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useState, type JSX } from 'react';
import { useTx } from '../../lib/app';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set1.css';

const MOVE = { duration: 0.6, ease: EASE_IN_OUT } as const;
const ENTER = { duration: 0.35, ease: EASE_OUT } as const;

type Role = { id: string; fa: string; en: string; doFa: string; doEn: string; hair: string; shirt: string; glyph: JSX.Element };

const g = { fill: 'none', stroke: '#2a211b', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const ROLES: Role[] = [
  {
    id: 'design',
    fa: 'طراح',
    en: 'Designer',
    doFa: 'ظاهر و حس سایت',
    doEn: 'look and feel',
    hair: '#ef6a4c',
    shirt: 'var(--blush)',
    glyph: <path d="M3 13 11 5l2 2-8 8H3Zm7-7 2 2" {...g} />,
  },
  {
    id: 'front',
    fa: 'برنامه‌نویس Frontend',
    en: 'Frontend dev',
    doFa: 'HTML، CSS، JS',
    doEn: 'HTML, CSS, JS',
    hair: '#2a211b',
    shirt: 'var(--butter)',
    glyph: <path d="m6 5-4 4 4 4M12 5l4 4-4 4" {...g} />,
  },
  {
    id: 'back',
    fa: 'برنامه‌نویس Backend',
    en: 'Backend dev',
    doFa: 'منطق، API، داده',
    doEn: 'logic, APIs, data',
    hair: '#8a5a2b',
    shirt: 'var(--sky)',
    glyph: (
      <>
        <ellipse cx="9" cy="4.5" rx="6" ry="2.3" {...g} />
        <path d="M3 4.5v8c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3v-8M3 8.5c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3" {...g} />
      </>
    ),
  },
  {
    id: 'ops',
    fa: 'DevOps و استقرار',
    en: 'DevOps / deploy',
    doFa: 'سرور و انتشار',
    doEn: 'servers, shipping',
    hair: '#5b3a8a',
    shirt: 'var(--mint)',
    glyph: <path d="M10 2.5c2.7-.7 5-.5 5-.5s.2 2.3-.5 5L9.5 12 6 8.5Zm-4 6-3-.5L5 6M9.5 12l.5 3 2-2" {...g} />,
  },
  {
    id: 'seo',
    fa: 'متخصص SEO',
    en: 'SEO specialist',
    doFa: 'دیده‌شدن در گوگل',
    doEn: 'being found',
    hair: '#c98a2b',
    shirt: 'var(--coral-soft)',
    glyph: (
      <>
        <circle cx="8" cy="8" r="5" {...g} />
        <path d="m12 12 4 4" {...g} />
      </>
    ),
  },
  {
    id: 'support',
    fa: 'پشتیبانی',
    en: 'Support',
    doFa: 'نگهداری و رفع مشکل',
    doEn: 'upkeep, fixes',
    hair: '#2f6ea6',
    shirt: 'var(--sky-soft)',
    glyph: <path d="M3 10V9a6 6 0 0 1 12 0v1M3 10h2.5v4H4a1 1 0 0 1-1-1Zm12 0h-2.5v4H14a1 1 0 0 0 1-1Zm-2.5 4c0 1.5-1.5 2-3.5 2" {...g} />,
  },
];

function Avatar({ r, size = 44 }: { r: Role; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="20" fill={r.shirt} stroke="#2a211b" strokeWidth="2" />
      <path d="M9 38c2-7 7-10 13-10s11 3 13 10" fill="#fffaf2" stroke="#2a211b" strokeWidth="2" />
      <circle cx="22" cy="18" r="8" fill="#ffe2c6" stroke="#2a211b" strokeWidth="2" />
      <path d="M14 17c0-6 4-8 8-8s8 2 8 8c-3-2-5-4-8-4s-5 2-8 4Z" fill={r.hair} stroke="#2a211b" strokeWidth="1.6" />
      <circle cx="19" cy="19" r="1.1" fill="#2a211b" />
      <circle cx="25" cy="19" r="1.1" fill="#2a211b" />
      <path d="M19.5 22.5q2.5 2 5 0" fill="none" stroke="#2a211b" strokeWidth="1.4" strokeLinecap="round" />
      <g transform="translate(27 26) scale(0.85)">
        <rect x="-1" y="-1" width="20" height="19" rx="6" fill="#fffaf2" stroke="#2a211b" strokeWidth="1.8" />
        {r.glyph}
      </g>
    </svg>
  );
}

function YouAvatar() {
  return (
    <svg width="64" height="64" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="20" fill="var(--butter)" stroke="#2a211b" strokeWidth="2" />
      <path d="M9 38c2-7 7-10 13-10s11 3 13 10" fill="#ef6a4c" stroke="#2a211b" strokeWidth="2" />
      <circle cx="22" cy="18" r="8" fill="#ffe2c6" stroke="#2a211b" strokeWidth="2" />
      <path d="M14 16c1-5 4-7 8-7s7 2 8 7c-2-1-6-2-8-4-2 2-6 3-8 4Z" fill="#2a211b" />
      <path d="M18.5 19.5q1-1 2 0M23.5 19.5q1-1 2 0" fill="none" stroke="#2a211b" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M19.5 22.5q2.5 2 5 0" fill="none" stroke="#2a211b" strokeWidth="1.4" strokeLinecap="round" />
      {/* director's beret */}
      <path d="M13 12c2-4 6-5 9-5s8 1 9 4c-5 1-13 1-18 1Z" fill="#2a211b" />
      <circle cx="22" cy="6.5" r="1.6" fill="#2a211b" />
    </svg>
  );
}

export default function TeamToAgent() {
  const tx = useTx();
  const [today, setToday] = useState(false);
  const { complete } = useLab();
  const flip = () => {
    setToday((v) => !v);
    if (!today) complete(); // seeing today's split is the lab's point
  };

  const yours = [
    tx('چشم‌انداز و هدف پروژه', 'Vision and goals'),
    tx('تصمیم‌گیری و اولویت‌ها', 'Decisions and priorities'),
    tx('بازبینی و تست کار Agent', "Reviewing and testing the agent's work"),
    tx('حساب‌ها، دسترسی‌ها و پرداخت', 'Accounts, access and payments'),
    tx('تأیید نهایی قبل از انتشار', 'Final approval before launch'),
  ];

  return (
    <Frame
      title={tx('از یک تیم شش‌نفره تا شما و یک Agent', 'From a six-person team to you and an agent')}
      goal={tx('ببینید امروز چه کسی چه کاری می‌کند', 'See who does what today')}
      hint={today ? tx('شما کارگردانید؛ من اجرا می‌کنم. ولی تصمیم آخر همیشه با شماست.', 'You direct, I do the work. The final call is always yours.') : undefined}
      mood={today ? 'wink' : 'think'}
      tint="var(--blush-soft)"
      footer={
        <button
          type="button"
          className={`btn ${today ? '' : 'btn--primary'}`}
          onClick={flip}
          aria-pressed={today}
          style={{ marginInlineStart: 'auto' }}
        >
          {today ? tx('برگرد به گذشته', 'Back to the old way') : tx('برو به امروز', 'Fast-forward to today')}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="tta-arrow">
            <path d={today ? 'M11 6 5 12l6 6M19 6l-6 6 6 6' : 'm13 6 6 6-6 6M5 6l6 6-6 6'} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      }
    >
      <LayoutGroup>
        <p className="sr-only" aria-live="polite">
          {today ? tx('نمای امروز: شما و یک Agent', 'Today: you and an agent') : tx('نمای گذشته: تیم شش‌نفره', 'The old way: a six-person team')}
        </p>
        <div>
          {!today ? (
            <div className="tta-roles">
              {ROLES.map((r) => (
                <motion.div key={r.id} layoutId={`tta-${r.id}`} className="tta-role" transition={MOVE}>
                  <motion.span layout="position" transition={MOVE}>
                    <Avatar r={r} />
                  </motion.span>
                  <motion.span layout="position" transition={MOVE}>
                    {tx(r.fa, r.en)}
                    <small>{tx(r.doFa, r.doEn)}</small>
                  </motion.span>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div className="tta-combo" layout transition={MOVE}>
              <div className="tta-duo">
                <motion.div
                  initial={{ opacity: 0, transform: 'scale(0.9)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  transition={{ ...ENTER, delay: 0.25 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 900 }}
                >
                  <YouAvatar />
                  <span>{tx('شما (کارگردان)', 'You (director)')}</span>
                </motion.div>
                <span className="tta-plus" aria-hidden>
                  +
                </span>
                <motion.div
                  initial={{ opacity: 0, transform: 'scale(0.9)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  transition={{ ...ENTER, delay: 0.35 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 900 }}
                >
                  <Mascot size={58} mood="happy" follow={false} />
                  <span>{tx('Agent (بیت)', 'Agent (Bit)')}</span>
                </motion.div>
              </div>
              <div className="tta-cols">
                <div className="tta-col">
                  <h5>{tx('کارهایی که Agent انجام می‌دهد', 'What the agent now handles')}</h5>
                  <ul>
                    {ROLES.map((r) => (
                      <motion.li key={r.id} layoutId={`tta-${r.id}`} className="tta-chip" transition={MOVE}>
                        <motion.span layout="position" transition={MOVE}>
                          <Avatar r={r} size={24} />
                        </motion.span>
                        <motion.span layout="position" transition={MOVE}>
                          {tx(r.fa, r.en)}
                        </motion.span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="tta-col" style={{ borderColor: 'var(--coral)' }}>
                  <h5>{tx('کارهایی که با شما می‌ماند', 'What stays yours')}</h5>
                  <ul>
                    <AnimatePresence>
                      {yours.map((y, i) => (
                        <motion.li
                          key={y}
                          className="tta-chip"
                          style={{ background: 'var(--butter-soft)', paddingInline: 12 }}
                          initial={{ opacity: 0, transform: 'translateY(6px)' }}
                          animate={{ opacity: 1, transform: 'translateY(0px)' }}
                          transition={{ ...ENTER, delay: 0.45 + i * 0.06 }}
                        >
                          {y}
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </LayoutGroup>
    </Frame>
  );
}

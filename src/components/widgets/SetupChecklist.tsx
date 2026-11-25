import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { DUR, EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set2.css';

const EASE = EASE_OUT;

type Item = {
  id: string;
  essential: boolean;
  title: [string, string];
  why: [string, string];
  links: { label: string; url: string }[];
};

const ITEMS: Item[] = [
  {
    id: 'email',
    essential: true,
    title: ['یک ایمیل مخصوص پروژه‌ها', 'A dedicated email for your projects'],
    why: [
      'همه حساب‌ها به آن وصل می‌شوند و بازیابی رمزها از آن انجام می‌شود؛ جدا از ایمیل شخصی، مرتب‌تر و امن‌تر است.',
      'Every account hangs off it and password recovery goes through it. Keeping it apart from your personal inbox is tidier and safer.',
    ],
    links: [{ label: 'Google Account', url: 'https://support.google.com/accounts/answer/27441' }],
  },
  {
    id: 'password-manager',
    essential: true,
    title: ['یک Password Manager', 'A password manager'],
    why: [
      'برای هر حساب یک رمز طولانی و متفاوت می‌سازد و Token و کدهای بازیابی را هم امن نگه می‌دارد.',
      'It makes a long, unique password for every account and safely stores tokens and recovery codes too.',
    ],
    links: [{ label: 'CISA: strong passwords', url: 'https://www.cisa.gov/secure-our-world/use-strong-passwords' }],
  },
  {
    id: 'github',
    essential: true,
    title: ['حساب GitHub با 2FA', 'A GitHub account with 2FA'],
    why: [
      'خانه‌ی کد شماست؛ Agent کد را آنجا Push می‌کند و Cloudflare از آنجا منتشر می‌کند. 2FA یعنی رمز تنها کافی نیست.',
      'Home for your code: the agent pushes there and Cloudflare deploys from there. 2FA means a password alone is not enough to get in.',
    ],
    links: [
      { label: 'GitHub: sign up', url: 'https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github' },
      {
        label: 'GitHub: 2FA',
        url: 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication',
      },
    ],
  },
  {
    id: 'cloudflare',
    essential: true,
    title: ['حساب Cloudflare با 2FA', 'A Cloudflare account with 2FA'],
    why: [
      'DNS، Hosting روی Workers و Databaseها اینجاست. چون به دامنه‌تان دسترسی دارد، 2FA ضروری است.',
      'Your DNS, Workers hosting and databases live here. It controls your domain, so 2FA is a must.',
    ],
    links: [
      { label: 'Cloudflare: sign up', url: 'https://developers.cloudflare.com/fundamentals/account/create-account/' },
      { label: 'Cloudflare: 2FA', url: 'https://developers.cloudflare.com/fundamentals/user-profiles/2fa/' },
    ],
  },
  {
    id: 'domain',
    essential: true,
    title: ['یک دامنه', 'A domain name'],
    why: [
      'آدرسی که مردم تایپ می‌کنند، مثل cafe-sahar.ir. از یک Registrar بخرید (یا Cloudflare Registrar) و حتماً تمدید خودکار را روشن کنید.',
      'The address people type, like cafe-sahar.ir. Buy it from a registrar (or Cloudflare Registrar) and switch on auto-renew.',
    ],
    links: [{ label: 'Cloudflare Registrar', url: 'https://developers.cloudflare.com/registrar/' }],
  },
  {
    id: 'agent',
    essential: true,
    title: ['یک حساب سازنده هوش مصنوعی: Codex یا Lovable', 'An AI builder account: Codex or Lovable'],
    why: [
      'دو مسیر اصلی دوره: Codex (از طریق ChatGPT) روی Repository خودتان کار می‌کند؛ Lovable در مرورگر از روی گفت‌وگو اپ می‌سازد و میزبانی هم دارد. Claude Code هم جایگزین قوی Codex است. یکی را که در دسترس شماست انتخاب کنید و شرایط استفاده‌اش را بخوانید.',
      'The two main paths in this course: Codex (through ChatGPT) works on your own repository; Lovable builds the app from a chat in the browser and hosts it too. Claude Code is a strong alternative to Codex. Pick one that is available to you and read its terms.',
    ],
    links: [
      { label: 'OpenAI Codex', url: 'https://developers.openai.com/codex' },
      { label: 'Lovable', url: 'https://docs.lovable.dev/introduction/getting-started' },
      { label: 'Claude Code', url: 'https://code.claude.com/docs/en/overview' },
    ],
  },
  {
    id: 'vscode',
    essential: false,
    title: ['ویرایشگر VS Code', 'VS Code editor'],
    why: ['برای دیدن و خواندن فایل‌ها روی کامپیوتر خودتان. با Agentهای ابری فعلاً اجباری نیست.', 'To open and read files on your own computer. Optional while you use cloud agents.'],
    links: [{ label: 'VS Code', url: 'https://code.visualstudio.com/' }],
  },
  {
    id: 'git',
    essential: false,
    title: ['Git روی کامپیوتر', 'Git on your computer'],
    why: ['وقتی خواستید Agent را روی سیستم خودتان اجرا کنید یا کد را دستی بگیرید.', 'For when you run an agent locally or want a copy of the code yourself.'],
    links: [{ label: 'Git downloads', url: 'https://git-scm.com/downloads' }],
  },
  {
    id: 'node',
    essential: false,
    title: ['Node.js', 'Node.js'],
    why: ['موتوری که ابزارهای وب مثل wrangler و Vite با آن اجرا می‌شوند. نسخه LTS را نصب کنید.', 'The engine that web tools like wrangler and Vite run on. Install the LTS version.'],
    links: [{ label: 'Node.js', url: 'https://nodejs.org/en/download' }],
  },
  {
    id: 'wrangler',
    essential: false,
    title: ['wrangler (CLI کلودفلر)', 'wrangler (Cloudflare CLI)'],
    why: ['ابزار خط فرمان Cloudflare برای اجرا، تست و انتشار Workerها از کامپیوتر خودتان.', "Cloudflare's command-line tool for running, testing and deploying Workers from your own machine."],
    links: [{ label: 'Install wrangler', url: 'https://developers.cloudflare.com/workers/wrangler/install-and-update/' }],
  },
];

const SPARKS = ['var(--coral)', 'var(--mint)', 'var(--sky)', 'var(--blush)', 'var(--butter)', 'var(--coral)', 'var(--mint)', 'var(--sky)'];

export default function SetupChecklist() {
  const { saved, save, lang } = useApp();
  const tx = useTx();
  const reduce = useReducedMotion();
  // QA-01: keep only known items whose stored value really is `true`.
  const [ticks, setTicks] = useState<Record<string, boolean>>(() => {
    const raw = saved<Record<string, unknown>>('setup-checklist', {});
    return Object.fromEntries(ITEMS.filter((i) => raw[i.id] === true).map((i) => [i.id, true]));
  });
  useEffect(() => save('setup-checklist', ticks), [ticks, save]);

  const toggle = (id: string) => {
    setTicks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!next[id]) delete next[id];
      return next;
    });
  };

  const essentials = ITEMS.filter((i) => i.essential);
  const doneEss = essentials.filter((i) => ticks[i.id]).length;
  const allEss = doneEss === essentials.length;
  const pct = doneEss / essentials.length;
  const { complete } = useLab();
  useEffect(() => {
    if (allEss) complete();
  }, [allEss, complete]);

  const R = 34;
  const C = 2 * Math.PI * R;

  const mood = allEss ? 'wink' : doneEss === 0 ? 'calm' : doneEss >= 4 ? 'happy' : 'think';

  const renderGroup = (essential: boolean) => (
    <ul className="sc-list">
      {ITEMS.filter((i) => i.essential === essential).map((it) => {
        const on = !!ticks[it.id];
        const inputId = `sc-${it.id}`;
        return (
          <li key={it.id} className={`sc-item ${on ? 'is-done' : ''}`}>
            <span className="sc-box">
              <input id={inputId} type="checkbox" checked={on} onChange={() => toggle(it.id)} />
              <AnimatePresence initial={false}>
                {on && (
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    aria-hidden
                    initial={{ opacity: 0, transform: 'scale(0.6)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0.8)' }}
                    transition={{ duration: DUR.press + 0.06, ease: EASE }}
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="#1d3a2c" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </span>
            <div>
              <label htmlFor={inputId} className="sc-title">
                {tx(...it.title)}
              </label>
              <p className="sc-why">{tx(...it.why)}</p>
              <div className="sc-links">
                {it.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="ltr">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <Frame
      title={tx('چک‌لیست آماده‌سازی کارگاه', 'Workshop setup checklist')}
      goal={tx(`همه ${num(6, lang)} مورد ضروری را آماده کنید`, 'Get all 6 essentials ready')}
      hint={tx('تیک‌ها در همین مرورگر ذخیره می‌شوند؛ با ورود به حساب، روی دستگاه‌های دیگر هم می‌آیند.', 'Ticks are saved in this browser; sign in to carry them to your other devices.')}
      mood={mood}
      tint="var(--mint-soft)"
      footer={
        doneEss > 0 || Object.keys(ticks).length > 0 ? (
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setTicks({})}>
            {tx('پاک کردن تیک‌ها', 'Clear the ticks')}
          </button>
        ) : undefined
      }
    >
      <div className="sc-top">
        <div className="sc-ring" aria-hidden>
          <svg width="84" height="84" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r={R} fill="none" stroke="var(--paper-2)" strokeWidth="9" />
            <motion.circle
              cx="42"
              cy="42"
              r={R}
              fill="none"
              stroke="var(--mint)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={false}
              animate={{ strokeDashoffset: C * (1 - pct) }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
              transform="rotate(-90 42 42)"
            />
            <circle cx="42" cy="42" r={R + 5.5} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
            <circle cx="42" cy="42" r={R - 5.5} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          </svg>
          <span className="sc-ring-num">
            {num(doneEss, lang)}/{num(essentials.length, lang)}
          </span>
        </div>
        <div aria-live="polite">
          <p style={{ margin: 0, fontWeight: 900 }}>
            {allEss
              ? tx('کارگاه آماده است!', 'Your workshop is ready!')
              : tx(`${num(essentials.length - doneEss, lang)} مورد ضروری مانده`, `${essentials.length - doneEss} essentials to go`)}
          </p>
          <p className="w-muted" style={{ margin: 0 }}>
            {tx('موارد اختیاری را هر وقت لازم شد نصب کنید.', 'Install the optional tools whenever you need them.')}
          </p>
        </div>
      </div>

      <p className="sc-group">{tx('ضروری‌ها', 'Essentials')}</p>
      {renderGroup(true)}

      <AnimatePresence>
        {allEss && (
          <motion.div
            className="sc-party"
            initial={{ opacity: 0, transform: 'scale(0.96)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.reveal, ease: EASE }}
          >
            {!reduce &&
              SPARKS.map((c, i) => {
                const a = (i / SPARKS.length) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className="sc-spark"
                    style={{ background: c }}
                    initial={{ opacity: 1, transform: 'translate(0px, 0px) rotate(0deg) scale(0.6)' }}
                    animate={{
                      opacity: 0,
                      transform: `translate(${Math.round(Math.cos(a) * 120)}px, ${Math.round(Math.sin(a) * 46)}px) rotate(${120 + i * 30}deg) scale(1)`,
                    }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
                    aria-hidden
                  />
                );
              })}
            <Mascot size={44} mood="happy" follow={false} />
            <span>
              {tx(
                'همه ضروری‌ها آماده‌اند. حالا وقت وصل کردن Agent به GitHub و Cloudflare است.',
                'All essentials are done. Next up: connecting your agent to GitHub and Cloudflare.',
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="sc-group">{tx('اختیاری / برای بعد', 'Optional / later')}</p>
      {renderGroup(false)}
    </Frame>
  );
}

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { Frame } from './Frame';
import './set2.css';

const EASE = [0.23, 1, 0.32, 1] as const;

type Level = 'account' | 'zone' | 'danger';
type Perm = {
  id: string;
  level: Level;
  name: string;
  weight: number;
  recommended: boolean;
  desc: [string, string];
};

const PERMS: Perm[] = [
  {
    id: 'acct-read',
    level: 'account',
    name: 'Account Settings: Read',
    weight: 2,
    recommended: true,
    desc: ['فقط دیدن اطلاعات حساب؛ ابزارها برای پیدا کردن Account ID به آن نیاز دارند.', 'View-only account info; tools need it to find your account ID.'],
  },
  {
    id: 'workers',
    level: 'account',
    name: 'Workers Scripts: Edit',
    weight: 8,
    recommended: true,
    desc: ['ساختن، به‌روزرسانی و حذف Workerها؛ بدون این، Agent نمی‌تواند منتشر کند.', 'Create, update and delete Workers. Without it the agent cannot deploy.'],
  },
  {
    id: 'd1',
    level: 'account',
    name: 'D1: Edit',
    weight: 6,
    recommended: true,
    desc: ['ساختن و نوشتن در پایگاه‌داده D1؛ برای فرم تماس پروژه پایانی دوره لازم است.', 'Create and write D1 databases; the course capstone saves its contact form in D1.'],
  },
  {
    id: 'kv',
    level: 'account',
    name: 'Workers KV Storage: Edit',
    weight: 5,
    recommended: false,
    desc: ['فقط اگر پروژه‌تان KV لازم دارد (تنظیمات، Cache).', 'Only if your project uses KV (settings, cache).'],
  },
  {
    id: 'r2',
    level: 'account',
    name: 'Workers R2 Storage: Edit',
    weight: 6,
    recommended: false,
    desc: ['فقط اگر فایل یا عکس در R2 نگه می‌دارید.', 'Only if you store files or images in R2.'],
  },
  {
    id: 'dns',
    level: 'zone',
    name: 'DNS: Edit',
    weight: 8,
    recommended: true,
    desc: ['ساختن و تغییر رکوردهای DNS برای وصل کردن دامنه.', 'Create and change DNS records to connect your domain.'],
  },
  {
    id: 'routes',
    level: 'zone',
    name: 'Workers Routes: Edit',
    weight: 4,
    recommended: true,
    desc: ['وصل کردن Worker به آدرس‌هایی روی دامنه شما.', 'Attach the Worker to addresses on your domain.'],
  },
  {
    id: 'everything',
    level: 'danger',
    name: 'All permissions: Edit',
    weight: 55,
    recommended: false,
    desc: [
      'همه‌چیز را می‌تواند تغییر دهد: پرداخت، اعضا، امنیت. عملاً مثل Global API Key است. هرگز برای Agent.',
      'Can change everything: billing, members, security. Practically a Global API Key. Never for an agent.',
    ],
  },
  {
    id: 'tokens',
    level: 'danger',
    name: 'User API Tokens: Edit',
    weight: 40,
    recommended: false,
    desc: [
      'با این مجوز، دارنده‌ی Token می‌تواند برای خودش Tokenهای قوی‌تر بسازد. یک در پشتی است.',
      'Whoever holds this can mint new, stronger tokens for themselves. It is a back door.',
    ],
  },
];

const RECOMMENDED = Object.fromEntries(PERMS.filter((p) => p.recommended).map((p) => [p.id, true])) as Record<string, boolean>;

export default function TokenBuilder() {
  const { lang } = useApp();
  const tx = useTx();
  const reduce = useReducedMotion();
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [allZones, setAllZones] = useState(false);
  const [allAccounts, setAllAccounts] = useState(false);
  const [expiry, setExpiry] = useState(false);
  const [ipFilter, setIpFilter] = useState(false);

  const flip = (id: string) => setOn((p) => ({ ...p, [id]: !p[id] }));

  const sumLevel = (l: Level) => PERMS.filter((p) => p.level === l && on[p.id]).reduce((n, p) => n + p.weight, 0);
  const raw = sumLevel('account') * (allAccounts ? 2.2 : 1) + sumLevel('zone') * (allZones ? 2.5 : 1) + sumLevel('danger');
  const score = Math.min(100, Math.round(raw * (expiry ? 0.85 : 1) * (ipFilter ? 0.85 : 1)));

  const missing = PERMS.filter((p) => p.recommended && !on[p.id]);
  const dangerOn = PERMS.some((p) => p.level === 'danger' && on[p.id]) || allZones || allAccounts;
  const extras = PERMS.filter((p) => !p.recommended && p.level !== 'danger' && on[p.id]);
  const perfect = missing.length === 0 && !dangerOn && extras.length === 0 && expiry;

  const verdict =
    score === 0
      ? tx('هنوز هیچ مجوزی ندارد؛ Agent با آن کاری نمی‌تواند بکند.', 'No permissions yet: the agent can do nothing with it.')
      : score <= 35
        ? tx('کوچک و مهارشده. اگر لو برود، خسارت محدود است.', 'Small and contained. If it leaks, the damage is limited.')
        : score <= 65
          ? tx('متوسط. ببینید همه‌ی این مجوزها واقعاً لازم‌اند؟', 'Medium. Is every one of these permissions really needed?')
          : tx('خیلی بزرگ! اگر این Token لو برود، کل حساب در خطر است.', 'Huge! If this token leaks, your whole account is at risk.');

  const meterColor = score <= 35 ? 'var(--mint-ink)' : score <= 65 ? '#8a5a00' : 'var(--coral-ink)';

  const applyRecommended = () => {
    setOn({ ...RECOMMENDED });
    setAllZones(false);
    setAllAccounts(false);
    setExpiry(true);
    setIpFilter(false);
  };

  const row = (p: Perm) => {
    const checked = !!on[p.id];
    const id = `tb-${p.id}`;
    return (
      <div key={p.id} className={`tb-row ${checked ? 'is-on' : ''} ${p.level === 'danger' ? 'is-danger' : ''}`}>
        <label htmlFor={id} style={{ cursor: 'pointer' }}>
          <span className="tb-name">{p.name}</span>
          {p.recommended && <span className="tb-badge">{tx('پیشنهادی', 'recommended')}</span>}
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          className={`s2-switch ${p.level === 'danger' ? 'is-danger' : ''}`}
          onClick={() => flip(p.id)}
        >
          <span className="sr-only">{p.name}</span>
        </button>
        <p className="tb-desc">{tx(...p.desc)}</p>
      </div>
    );
  };

  const toggle = ({ id, label, desc, value, set, danger }: { id: string; label: string; desc: string; value: boolean; set: (v: boolean) => void; danger?: boolean }) => (
    <div className={`tb-row ${value ? 'is-on' : ''} ${danger ? 'is-danger' : ''}`}>
      <label htmlFor={id} style={{ cursor: 'pointer', fontWeight: 800 }}>
        {label}
      </label>
      <button id={id} type="button" role="switch" aria-checked={value} className={`s2-switch ${danger ? 'is-danger' : ''}`} onClick={() => set(!value)}>
        <span className="sr-only">{label}</span>
      </button>
      <p className="tb-desc">{desc}</p>
    </div>
  );

  const summaryLines = [
    `Token name: agent-my-site`,
    `Permissions:`,
    ...PERMS.filter((p) => on[p.id]).map((p) => `  - ${p.level === 'zone' ? 'Zone' : p.level === 'danger' ? '!!' : 'Account'} · ${p.name}`),
    `Account resources: ${allAccounts ? 'All accounts  ⚠' : 'Include · My account'}`,
    `Zone resources:    ${allZones ? 'All zones  ⚠' : 'Include · Specific zone · my-site.com'}`,
    `Client IP filter:  ${ipFilter ? 'On (only listed IPs)' : 'Off'}`,
    `TTL / expiry:      ${expiry ? 'Expires in 90 days' : 'Never expires  ⚠'}`,
  ];

  return (
    <Frame
      title={tx('یک API Token کم‌خطر برای Agent بسازید', 'Build a low-risk API token for your agent')}
      hint={tx(
        'مجوزها را روشن و خاموش کنید و «شعاع خسارت» را ببینید: اگر این Token لو برود، چقدر از حسابتان در خطر است؟',
        'Switch permissions on and off and watch the blast radius: if this token leaked, how much of your account would be exposed?',
      )}
      mood={dangerOn ? 'wow' : perfect ? 'happy' : 'think'}
      tint="var(--butter-soft)"
    >
      <div className="tb-sticky" aria-live="polite">
        <div className="w-row" style={{ justifyContent: 'space-between' }}>
          <strong>{tx('شعاع خسارت', 'Blast radius')}</strong>
          <span style={{ fontWeight: 900, color: meterColor }}>{num(score, lang)}{tx('٪', '%')}</span>
        </div>
        <div className="tb-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score} aria-label={tx('شعاع خسارت', 'Blast radius')}>
          <motion.div
            className="tb-meter-fill"
            initial={false}
            animate={{ transform: `scaleX(${Math.max(score, 0) / 100})` }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          />
        </div>
        <span className="w-muted">{verdict}</span>
      </div>

      <div className="w-row" style={{ marginTop: 8 }}>
        <button type="button" className="btn btn--small btn--mint" onClick={applyRecommended}>
          {tx('تنظیم پیشنهادی دوره', "Use the course's recommended setup")}
        </button>
        <button
          type="button"
          className="btn btn--small btn--ghost"
          onClick={() => {
            setOn({});
            setAllZones(false);
            setAllAccounts(false);
            setExpiry(false);
            setIpFilter(false);
          }}
        >
          {tx('پاک کردن', 'Clear')}
        </button>
      </div>

      <p className="tb-group">
        <span className="s2-dot" style={{ background: 'var(--sky)' }} aria-hidden />
        {tx('مجوزهای سطح Account', 'Account permissions')}
      </p>
      <div className="tb-rows">
        {PERMS.filter((p) => p.level === 'account').map((p) => row(p))}
        {toggle({ id: 'tb-all-accounts', danger: true, label: tx('Account Resources: همه‌ی حساب‌ها', 'Account resources: all accounts'), desc: tx('بهتر است فقط حساب خودتان را انتخاب کنید.', 'Better to include only your own account.'), value: allAccounts, set: setAllAccounts })}
      </div>

      <p className="tb-group">
        <span className="s2-dot" style={{ background: 'var(--mint)' }} aria-hidden />
        {tx('مجوزهای سطح Zone (دامنه)', 'Zone (domain) permissions')}
      </p>
      <div className="tb-rows">
        {PERMS.filter((p) => p.level === 'zone').map((p) => row(p))}
        <div className="tb-row is-on">
          <span style={{ fontWeight: 800 }}>{tx('Zone Resources', 'Zone resources')}</span>
          <div className="w-toggle" role="group" aria-label={tx('محدوده دامنه', 'Zone scope')}>
            <button type="button" aria-pressed={!allZones} onClick={() => setAllZones(false)}>
              {tx('فقط یک دامنه', 'One zone')}
            </button>
            <button type="button" aria-pressed={allZones} onClick={() => setAllZones(true)}>
              {tx('همه دامنه‌ها', 'All zones')}
            </button>
          </div>
          <p className="tb-desc">
            {allZones
              ? tx('Token به همه‌ی دامنه‌های فعلی و آینده‌ی شما دسترسی دارد. لازم نیست.', 'The token reaches every domain you have now or add later. Not needed.')
              : tx('فقط my-site.com. اگر لو برود، بقیه دامنه‌ها امن می‌مانند.', 'Only my-site.com. If it leaks, your other domains stay safe.')}
          </p>
        </div>
      </div>

      <p className="tb-group">
        <span className="s2-dot" style={{ background: 'var(--butter)' }} aria-hidden />
        {tx('محافظ‌های اضافه', 'Extra guards')}
      </p>
      <div className="tb-rows">
        {toggle({ id: 'tb-expiry', label: tx('تاریخ انقضا (TTL)', 'Expiry date (TTL)'), desc: tx('Token بعد از مدتی خودش باطل می‌شود؛ قبلش یک Token تازه می‌سازید.', 'The token dies on its own after a while; you make a fresh one before then.'), value: expiry, set: setExpiry })}
        {toggle({ id: 'tb-ip', label: tx('محدودیت IP', 'Client IP filtering'), desc: tx(
            'فقط از IPهای مشخص کار می‌کند. عالی برای کامپیوتر خودتان؛ اما Agentهای ابری IP ثابت ندارند و ممکن است بلاک شوند.',
            'Works only from listed IPs. Great for your own machine, but cloud agents have no fixed IP and may get blocked.',
          ), value: ipFilter, set: setIpFilter })}
      </div>

      <p className="tb-group">
        <span className="s2-dot" style={{ background: 'var(--coral)' }} aria-hidden />
        {tx('منطقه خطر', 'Danger zone')}
      </p>
      <div className="tb-rows">
        {PERMS.filter((p) => p.level === 'danger').map((p) => row(p))}
      </div>

      <div style={{ display: 'grid', gap: 10, marginTop: 18 }} aria-live="polite">
        <AnimatePresence initial={false}>
          {missing.length > 0 && score > 0 && (
            <motion.p
              key="missing"
              className="tb-warn"
              style={{ background: 'var(--sky-soft)', color: 'var(--sky-ink)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tx('برای پروژه دوره هنوز کم دارد: ', 'Still missing for the course project: ')}
              <span className="ltr">{missing.map((m) => m.name).join(' · ')}</span>
            </motion.p>
          )}
          {dangerOn && (
            <motion.p key="danger" className="tb-warn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {tx(
                'گزینه‌ی خطرناکی روشن است. اصل «کمترین دسترسی»: فقط همان چیزی که برای این کار لازم است.',
                'A dangerous option is on. Least privilege: give only what this job needs.',
              )}
            </motion.p>
          )}
          {perfect && (
            <motion.p
              key="perfect"
              className="tb-warn"
              style={{ background: 'var(--mint-soft)', color: 'var(--mint-ink)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tx('عالی! دقیقاً همان چیزی که پروژه لازم دارد، نه بیشتر.', 'Perfect. Exactly what the project needs, nothing more.')}
            </motion.p>
          )}
        </AnimatePresence>

        <pre className="tb-summary" aria-label={tx('خلاصه Token', 'Token summary')}>
          {summaryLines.join('\n')}
        </pre>

        <div className="w-card">
          <p style={{ margin: '0 0 6px', fontWeight: 900 }}>{tx('بعد از ساختن Token:', 'After you create the token:')}</p>
          <ol style={{ margin: 0, paddingInlineStart: 22, lineHeight: 1.8 }}>
            <li>
              {tx('آن را در بخش Secrets محیط Agent بگذارید با نام ', 'Put it in your agent environment’s secrets as ')}
              <code className="inline-code">CLOUDFLARE_API_TOKEN</code>
              {tx(' (و Account ID را با نام ', ' (and the account ID as ')}
              <code className="inline-code">CLOUDFLARE_ACCOUNT_ID</code>).
            </li>
            <li>{tx('یک نسخه در Password Manager نگه دارید؛ Cloudflare فقط یک بار نشانش می‌دهد.', 'Keep a copy in your password manager; Cloudflare shows it only once.')}</li>
            <li>
              <strong>{tx('هرگز آن را در چت Paste نکنید و در Repository نگذارید.', 'Never paste it into the chat or commit it to the repository.')}</strong>
            </li>
          </ol>
        </div>
      </div>
    </Frame>
  );
}

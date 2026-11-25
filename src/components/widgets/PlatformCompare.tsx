import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import type { L } from '../../content/types';
import { num, useApp, useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { Frame, useLab } from './Frame';
import './set4.css';

/**
 * CMP · Five builders compared: a radar chart of the course's editorial scores (1–5)
 * and a scenario explorer that puts Codex and Lovable side by side.
 * Sources and score reasons: docs/research/platforms.md §6–7. Scores are judgment, not facts.
 */

type PId = 'codex' | 'lovable' | 'claude' | 'grok' | 'deepseek';
const PLATFORMS: { id: PId; name: string; color: string }[] = [
  { id: 'codex', name: 'Codex', color: 'var(--pc-codex)' },
  { id: 'lovable', name: 'Lovable', color: 'var(--pc-lovable)' },
  { id: 'claude', name: 'Claude Code', color: 'var(--pc-claude)' },
  { id: 'grok', name: 'Grok Build', color: 'var(--pc-grok)' },
  { id: 'deepseek', name: 'DeepSeek', color: 'var(--pc-deepseek)' },
];

const AXES: { label: L; short: L; why: L }[] = [
  { label: { fa: 'آسانی برای تازه‌کار', en: 'Beginner ease' }, short: { fa: 'آسانی', en: 'Ease' }, why: { fa: 'Lovable از همان چت یک سایت زنده نشان می‌دهد؛ بقیه به Repository، ترمینال یا ابزار جدا نیاز دارند.', en: 'Lovable shows a live site from the chat; the others need a repo, terminal or separate tool.' } },
  { label: { fa: 'مالکیت کد', en: 'Code ownership' }, short: { fa: 'مالکیت کد', en: 'Ownership' }, why: { fa: 'Lovable کد را همگام می‌کند، اما دانلود و ویرایش مستقیم کد پلن پولی می‌خواهد.', en: 'Lovable syncs code, but downloading/editing code directly needs a paid plan.' } },
  { label: { fa: 'Backend آماده', en: 'Backend included' }, short: { fa: 'Backend', en: 'Backend' }, why: { fa: 'فقط Lovable به‌طور پیش‌فرض Database و ورود کاربر دارد.', en: 'Only Lovable ships a database and sign-in by default.' } },
  { label: { fa: 'Hosting آماده', en: 'Hosting included' }, short: { fa: 'Hosting', en: 'Hosting' }, why: { fa: 'فقط Lovable خودش سایت را منتشر می‌کند.', en: 'Only Lovable publishes the site for you.' } },
  { label: { fa: 'کنترل و دقت', en: 'Control' }, short: { fa: 'کنترل', en: 'Control' }, why: { fa: 'Agentهای کدمحور دقیقاً همان جایی را عوض می‌کنند که می‌خواهید؛ Lovable جزئیات را پنهان می‌کند.', en: 'Code-first agents change exactly what you ask; Lovable abstracts details away.' } },
  { label: { fa: 'قدرت Agent', en: 'Agent strength' }, short: { fa: 'قدرت Agent', en: 'Agent' }, why: { fa: 'Codex و Claude Code پخته‌اند؛ Grok جدیدتر است؛ DeepSeek ارزش زیادی دارد ولی به ابزار وابسته است.', en: 'Codex and Claude Code are mature; Grok is newer; DeepSeek is great value but tool-dependent.' } },
  { label: { fa: 'صرفه هزینه', en: 'Cost' }, short: { fa: 'هزینه', en: 'Cost' }, why: { fa: 'DeepSeek در هر Token بسیار ارزان است؛ اعتبار Lovable هزینه اجرای سایت را هم می‌پردازد.', en: "DeepSeek is far cheapest per token; Lovable's credits also pay for running the app." } },
  { label: { fa: 'دسترسی از ایران', en: 'Iran access' }, short: { fa: 'دسترسی ایران', en: 'Iran access' }, why: { fa: 'سرویس‌های آمریکایی رسماً ایران را شامل نمی‌شوند؛ DeepSeek بیانیه منعی ندارد (هنوز تأییدنشده).', en: 'US services officially exclude Iran; DeepSeek has no stated ban (still unverified).' } },
];

const SCORES: Record<PId, number[]> = {
  codex: [3, 5, 2, 1, 5, 5, 4, 2],
  lovable: [5, 4, 5, 5, 3, 4, 3, 1],
  claude: [3, 5, 2, 1, 5, 5, 3, 1],
  grok: [2, 5, 2, 1, 4, 4, 3, 2],
  deepseek: [2, 5, 1, 1, 3, 4, 5, 3],
};

type SId = 'landing' | 'blog' | 'shop' | 'cafe' | 'dashboard' | 'rtl';
type Side = { steps: L[]; time: L; cost: L; risk: L };
type Scenario = { id: SId; label: L; codex: Side; lovable: Side; combo: L; helper: L };

const SCENARIOS: Scenario[] = [
  {
    id: 'landing',
    label: { fa: 'صفحه معرفی', en: 'Landing page' },
    codex: {
      steps: [
        { fa: 'Brief و AGENTS.md بنویسید', en: 'Write the brief and AGENTS.md' },
        { fa: 'Codex یک سایت ایستا در Repository می‌سازد', en: 'Codex builds a static site in the repo' },
        { fa: 'انتشار با Workers static assets', en: 'Publish with Workers static assets' },
        { fa: 'وصل کردن دامنه در Cloudflare', en: 'Connect the domain in Cloudflare' },
      ],
      time: { fa: 'یک عصر', en: 'An evening' },
      cost: { fa: 'Hosting رایگان؛ فقط پلن ChatGPT', en: 'Free hosting; just the ChatGPT plan' },
      risk: { fa: 'کم؛ چیزی برای خراب شدن نیست', en: 'Low; little can break' },
    },
    lovable: {
      steps: [
        { fa: 'یک Prompt با متن واقعی کافه', en: "One prompt with the café's real text" },
        { fa: 'صیقل با نوار ابزار Preview', en: 'Polish with the preview toolbar' },
        { fa: 'Publish روی lovable.app', en: 'Publish on lovable.app' },
        { fa: 'دامنه اختصاصی (پلن پولی)', en: 'Custom domain (paid plan)' },
      ],
      time: { fa: 'یک ساعت', en: 'An hour' },
      cost: { fa: 'برای دامنه، پلن پولی', en: 'A paid plan for the domain' },
      risk: { fa: 'کم', en: 'Low' },
    },
    combo: { fa: 'ترکیب لازم نیست: Lovable سریع‌ترین است، Codex ارزان‌ترین برای میزبانی.', en: 'No combo needed: Lovable is fastest, Codex is cheapest to host.' },
    helper: { fa: 'Claude Code برای بازبینی دوم متن و دسترس‌پذیری.', en: 'Claude Code as a second reviewer for copy and accessibility.' },
  },
  {
    id: 'blog',
    label: { fa: 'وبلاگ', en: 'Blog' },
    codex: {
      steps: [
        { fa: 'نوشته‌ها به‌صورت Markdown در Repository', en: 'Posts as Markdown in the repo' },
        { fa: 'Codex صفحه فهرست و RSS می‌سازد', en: 'Codex builds the index page and RSS' },
        { fa: 'هر Push یعنی انتشار خودکار', en: 'Every push deploys automatically' },
      ],
      time: { fa: 'یک آخر هفته', en: 'A weekend' },
      cost: { fa: 'تقریباً رایگان', en: 'Almost free' },
      risk: { fa: 'کم', en: 'Low' },
    },
    lovable: {
      steps: [
        { fa: 'وبلاگ با نوشته‌ها در Database داخلی', en: 'A blog with posts in the built-in database' },
        { fa: 'صفحه مدیریت برای نوشتن', en: 'An admin page for writing' },
        { fa: 'Publish', en: 'Publish' },
      ],
      time: { fa: 'یک عصر', en: 'An evening' },
      cost: { fa: 'اعتبار Lovable برای ساخت و اجرا', en: 'Lovable credits for building and running' },
      risk: { fa: 'متوسط؛ صفحه مدیریت باید امن باشد', en: 'Medium; the admin page must be secure' },
    },
    combo: { fa: 'نمونه اولیه در Lovable ← همگام‌سازی با GitHub ← Codex برای Markdown و RSS ← انتشار روی Cloudflare.', en: 'Prototype in Lovable → GitHub sync → Codex adds Markdown and RSS → publish on Cloudflare.' },
    helper: { fa: 'DeepSeek داخل یک Agent متن‌باز برای تولید ارزان متن‌های جانبی.', en: 'DeepSeek inside an open-source agent for low-cost side content.' },
  },
  {
    id: 'shop',
    label: { fa: 'فروشگاه کوچک', en: 'Small shop' },
    codex: {
      steps: [
        { fa: 'Stripe Checkout برای پرداخت', en: 'Stripe Checkout for payments' },
        { fa: 'Worker برای Webhook و D1 برای سفارش‌ها', en: 'A Worker for the webhook, D1 for orders' },
        { fa: 'نگهداری کلیدها فقط در Secret', en: 'Keys kept only in secrets' },
        { fa: 'تست کامل پیش از انتشار', en: 'Full tests before publishing' },
      ],
      time: { fa: 'چند روز', en: 'A few days' },
      cost: { fa: 'کارمزد درگاه + پلن ChatGPT', en: 'Payment fees + ChatGPT plan' },
      risk: { fa: 'بالا؛ پول و اطلاعات مشتری', en: 'High; money and customer data' },
    },
    lovable: {
      steps: [
        { fa: 'پرداخت از امکانات Backend داخلی', en: 'Payments from the built-in backend' },
        { fa: 'بررسی امنیتی بخش Payments پیش از انتشار', en: 'Run the Payments security check before publishing' },
        { fa: 'Publish', en: 'Publish' },
      ],
      time: { fa: 'یک روز', en: 'A day' },
      cost: { fa: 'اعتبار + کارمزد درگاه', en: 'Credits + payment fees' },
      risk: { fa: 'بالا؛ همان قواعد امنیتی', en: 'High; same security rules' },
    },
    combo: { fa: 'در هر دو مسیر، محدودیت‌های کشوری درگاه پرداخت هم اعمال می‌شود.', en: "On both paths, the payment provider's own country rules apply." },
    helper: { fa: 'Claude Code یا Codex برای بازبینی امنیتی جداگانه کد پرداخت.', en: 'Claude Code or Codex for a separate security review of the payment code.' },
  },
  {
    id: 'cafe',
    label: { fa: 'رزرو کافه سحر', en: 'Café Sahar booking' },
    codex: {
      steps: [
        { fa: 'فرم رزرو ← API روی Worker', en: 'Booking form → Worker API' },
        { fa: 'جدول رزروها در D1', en: 'A bookings table in D1' },
        { fa: 'Turnstile روی فرم و ایمیل تأیید', en: 'Turnstile on the form and a confirmation email' },
        { fa: 'تست، بعد انتشار', en: 'Tests, then publish' },
      ],
      time: { fa: 'دو یا سه روز', en: 'Two or three days' },
      cost: { fa: 'تقریباً رایگان روی Cloudflare', en: 'Almost free on Cloudflare' },
      risk: { fa: 'متوسط؛ داده مشتری', en: 'Medium; customer data' },
    },
    lovable: {
      steps: [
        { fa: '«یک فرم رزرو بساز که در Database ذخیره شود و ایمیل تأیید بفرستد»', en: '"Add a booking form saved to the database with an email confirmation"' },
        { fa: 'Database داخلی با قواعد دسترسی (RLS)', en: 'Built-in database with access rules (RLS)' },
        { fa: 'بررسی امنیتی، اشتباه‌های RLS را نشان می‌دهد', en: 'The security check flags RLS mistakes' },
      ],
      time: { fa: 'یک عصر', en: 'An evening' },
      cost: { fa: 'اعتبار Lovable', en: 'Lovable credits' },
      risk: { fa: 'متوسط؛ قواعد دسترسی را چک کنید', en: 'Medium; check the access rules' },
    },
    combo: { fa: 'در Lovable بسازید ← به GitHub بفرستید ← Codex دقیق‌ترش کند ← روی Cloudflare منتشر کنید.', en: 'Build in Lovable → export to GitHub → refine with Codex → publish on Cloudflare.' },
    helper: { fa: 'Grok Build یا Claude Code برای Plan mode پیش از تغییرهای بزرگ.', en: 'Grok Build or Claude Code for plan mode before big changes.' },
  },
  {
    id: 'dashboard',
    label: { fa: 'داشبورد داخلی', en: 'Internal dashboard' },
    codex: {
      steps: [
        { fa: 'Worker و D1 برای داده‌ها', en: 'A Worker and D1 for the data' },
        { fa: 'محدود کردن ورود فقط به کارکنان', en: 'Restrict sign-in to staff only' },
        { fa: 'نمودارها و جدول‌ها', en: 'Charts and tables' },
      ],
      time: { fa: 'چند روز', en: 'A few days' },
      cost: { fa: 'کم', en: 'Low' },
      risk: { fa: 'متوسط؛ دسترسی‌ها', en: 'Medium; access control' },
    },
    lovable: {
      steps: [
        { fa: 'ساخت داشبورد با چت', en: 'Build the dashboard by chat' },
        { fa: 'انتشار فقط برای اعضای Workspace (پلن Business)', en: 'Publish to workspace members only (Business plan)' },
      ],
      time: { fa: 'یک روز', en: 'A day' },
      cost: { fa: 'پلن Business', en: 'Business plan' },
      risk: { fa: 'کم تا متوسط', en: 'Low to medium' },
    },
    combo: { fa: 'اگر داده‌ها حساس‌اند، مسیر Codex کنترل بیشتری روی جای نگهداری داده می‌دهد.', en: 'If the data is sensitive, the Codex path gives more control over where it lives.' },
    helper: { fa: 'DeepSeek در یک Agent متن‌باز برای کارهای تکراری و ارزان.', en: 'DeepSeek in an open-source agent for cheap repetitive work.' },
  },
  {
    id: 'rtl',
    label: { fa: 'اپ فارسی و راست‌به‌چپ', en: 'Persian RTL app' },
    codex: {
      steps: [
        { fa: 'در AGENTS.md: dir="rtl"، فونت فارسی، CSS منطقی', en: 'In AGENTS.md: dir="rtl", a Persian font, logical CSS' },
        { fa: 'Codex صفحه‌ها را می‌سازد', en: 'Codex builds the pages' },
        { fa: 'تست روی گوشی واقعی', en: 'Test on a real phone' },
      ],
      time: { fa: 'مثل هر پروژه دیگر', en: 'Like any project' },
      cost: { fa: 'بدون هزینه اضافه', en: 'No extra cost' },
      risk: { fa: 'کم، اگر قواعد را بنویسید', en: 'Low, if you write the rules down' },
    },
    lovable: {
      steps: [
        { fa: 'همان قواعد را در Instructions پروژه بنویسید', en: "Put the same rules in the project's Instructions" },
        { fa: 'ساخت با چت', en: 'Build by chat' },
        { fa: 'رفتار RTL را حتماً روی گوشی امتحان کنید', en: 'Test RTL behavior on a phone' },
      ],
      time: { fa: 'سریع', en: 'Fast' },
      cost: { fa: 'اعتبار Lovable', en: 'Lovable credits' },
      risk: { fa: 'متوسط؛ رفتار RTL آن هنوز تأیید نشده', en: 'Medium; its RTL behavior is unverified' },
    },
    combo: { fa: 'قواعد RTL را یک بار بنویسید و در هر دو ابزار استفاده کنید.', en: 'Write the RTL rules once and use them in both tools.' },
    helper: { fa: 'Claude Code برای بازبینی دقیق راست‌به‌چپ و دسترس‌پذیری.', en: 'Claude Code for a careful RTL and accessibility review.' },
  },
];

/* ───────── Radar geometry ───────── */
const CX = 200;
const CY = 186;
const R = 118;
const N = AXES.length;
const angle = (i: number) => (-90 + (i * 360) / N) * (Math.PI / 180);
const pt = (i: number, v: number) => {
  const r = (R * v) / 5;
  return [CX + r * Math.cos(angle(i)), CY + r * Math.sin(angle(i))] as const;
};

export default function PlatformCompare() {
  const { t, lang } = useApp();
  const tx = useTx();
  const lab = useLab();
  const [on, setOn] = useState<Record<PId, boolean>>({ codex: true, lovable: true, claude: false, grok: false, deepseek: false });
  const [table, setTable] = useState(false);
  const [scen, setScen] = useState<SId>('cafe');
  const [seen, setSeen] = useState<SId[]>(['cafe']);

  const markDone = lab.complete;
  useEffect(() => {
    if (seen.length >= 3) markDone();
  }, [seen.length, markDone]);

  const pickScen = (id: SId) => {
    setScen(id);
    setSeen((s) => (s.includes(id) ? s : [...s, id]));
  };

  const active = PLATFORMS.filter((p) => on[p.id]);
  const s = useMemo(() => SCENARIOS.find((x) => x.id === scen)!, [scen]);

  const toggle = (id: PId) => {
    setOn((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return Object.values(next).some(Boolean) ? next : prev; // keep at least one
    });
  };

  const sideCard = (pid: 'codex' | 'lovable', side: Side) => {
    const p = PLATFORMS.find((x) => x.id === pid)!;
    return (
      <div className="pc-card" style={{ ['--c' as string]: p.color }}>
        <h5>
          <span className="ltr">{p.name}</span>
        </h5>
        <ol>
          {side.steps.map((st, i) => (
            <li key={i}>{t(st)}</li>
          ))}
        </ol>
        <div className="pc-meta">
          <span>
            <b>{tx('زمان:', 'Time:')}</b> {t(side.time)}
          </span>
          <span>
            <b>{tx('هزینه:', 'Cost:')}</b> {t(side.cost)}
          </span>
          <span>
            <b>{tx('ریسک:', 'Risk:')}</b> {t(side.risk)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Frame
      title={tx('پنج سازنده، کنار هم', 'Five builders, side by side')}
      goal={tx('دست‌کم ۳ سناریو را ببینید', 'Explore at least 3 scenarios')}
      tint="var(--sky-soft)"
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setTable((v) => !v)} aria-expanded={table}>
            {table ? tx('پنهان کردن جدول', 'Hide the table') : tx('نمایش به‌صورت جدول', 'Show as a table')}
          </button>
          <span className="w-muted">
            {tx(`${num(Math.min(seen.length, 6), lang)} از ۶ سناریو`, `${Math.min(seen.length, 6)} of 6 scenarios`)}
          </span>
        </>
      }
    >
      <div className="s4">
        <div className="pc-chips" role="group" aria-label={tx('سازنده‌ها روی نمودار', 'Builders on the chart')}>
          {PLATFORMS.map((p) => (
            <button key={p.id} type="button" className="pc-chip" aria-pressed={on[p.id]} onClick={() => toggle(p.id)} style={{ ['--c' as string]: p.color }}>
              <i aria-hidden />
              <span className="ltr">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="pc-chart">
          <svg className="pc-svg" viewBox="-70 0 540 372" role="img" aria-label={tx('نمودار راداری امتیازها؛ جدول همین داده‌ها با دکمه پایین در دسترس است.', 'Radar chart of the scores; the same data is available as a table with the button below.')} style={{ direction: 'ltr' }}>
            {[1, 2, 3, 4, 5].map((lv) => (
              <polygon
                key={lv}
                points={AXES.map((_, i) => pt(i, lv).join(',')).join(' ')}
                fill="none"
                stroke="var(--line)"
                strokeWidth={lv === 5 ? 1.6 : 1}
              />
            ))}
            {AXES.map((a, i) => {
              const [x, y] = pt(i, 5);
              const [lx, ly] = pt(i, 5.75);
              const c = Math.cos(angle(i));
              const anchor = c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle';
              return (
                <g key={i}>
                  <line x1={CX} y1={CY} x2={x} y2={y} stroke="var(--line)" strokeWidth={1} />
                  <text x={lx} y={ly + 6} textAnchor={anchor} style={{ fontSize: 19 }}>
                    <title>{t(a.label)}</title>
                    {t(a.short)}
                  </text>
                </g>
              );
            })}
            {[1, 3, 5].map((lv) => (
              <text key={lv} x={CX + 4} y={CY - (R * lv) / 5 + 12} style={{ fontSize: 14, fontWeight: 600, opacity: 0.7 }}>
                {num(lv, lang)}
              </text>
            ))}
            <AnimatePresence>
              {active.map((p) => (
                <motion.g
                  key={p.id}
                  initial={{ opacity: 0, transform: 'scale(0.92)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  exit={{ opacity: 0, transform: 'scale(0.96)', transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  style={{ transformBox: 'view-box', transformOrigin: `${CX}px ${CY}px` }}
                >
                  <polygon
                    points={SCORES[p.id].map((v, i) => pt(i, v).join(',')).join(' ')}
                    fill={p.color}
                    fillOpacity={0.12}
                    stroke={p.color}
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                  />
                  {SCORES[p.id].map((v, i) => {
                    const [x, y] = pt(i, v);
                    return <circle key={i} cx={x} cy={y} r={3.6} fill={p.color} stroke="var(--card)" strokeWidth={1.5} />;
                  })}
                </motion.g>
              ))}
            </AnimatePresence>
          </svg>

          <div className="pc-legend">
            {active.map((p) => (
              <p key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span aria-hidden style={{ width: 22, height: 4, borderRadius: 4, background: p.color, flex: 'none' }} />
                <b className="ltr">{p.name}</b>
                <span className="w-muted">
                  {tx('میانگین', 'avg')} {num((SCORES[p.id].reduce((a, b) => a + b, 0) / N).toFixed(1), lang)}
                </span>
              </p>
            ))}
            <p className="pc-note">
              {tx(
                'امتیازها (۱ تا ۵) قضاوت ویرایشی همین دوره‌اند، نه داده رسمی. دلیل هر محور در جدول آمده است.',
                "Scores (1–5) are this course's editorial judgment, not official data. The reason for each axis is in the table.",
              )}
            </p>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {table && (
            <motion.div
              key="table"
              className="pc-table-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.2 }}
              role="region"
              tabIndex={0}
              aria-label={tx('جدول امتیازها', 'Score table')}
            >
              <table className="pc-table">
                <thead>
                  <tr>
                    <th scope="col">{tx('محور', 'Axis')}</th>
                    {PLATFORMS.map((p) => (
                      <th key={p.id} scope="col" className="ltr">
                        {p.name}
                      </th>
                    ))}
                    <th scope="col">{tx('چرا', 'Why')}</th>
                  </tr>
                </thead>
                <tbody>
                  {AXES.map((a, i) => (
                    <tr key={i}>
                      <th scope="row">{t(a.label)}</th>
                      {PLATFORMS.map((p) => (
                        <td key={p.id}>{num(SCORES[p.id][i], lang)}</td>
                      ))}
                      <td style={{ minWidth: 220 }}>{t(a.why)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pc-scen">
          <h4>{tx('هر سناریو با Codex و با Lovable', 'Each scenario with Codex and with Lovable')}</h4>
          <div className="pc-chips" role="group" aria-label={tx('سناریوها', 'Scenarios')}>
            {SCENARIOS.map((x) => (
              <button key={x.id} type="button" className="pc-chip" aria-pressed={scen === x.id} onClick={() => pickScen(x.id)} style={{ ['--c' as string]: 'var(--ink)' }}>
                {seen.includes(x.id) && scen !== x.id ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                    <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <i aria-hidden />
                )}
                {t(x.label)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={scen}
              initial={{ opacity: 0, transform: 'translateY(6px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              aria-live="polite"
            >
              <div className="pc-vs">
                {sideCard('codex', s.codex)}
                {sideCard('lovable', s.lovable)}
              </div>
              <div className="pc-combo">
                <b>{tx('بهترین ترکیب: ', 'Best combo: ')}</b>
                {t(s.combo)}
                <br />
                <b>{tx('کمک جانبی: ', 'Helper: ')}</b>
                {t(s.helper)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}

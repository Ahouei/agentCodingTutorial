import { useEffect, useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useApp, useTx } from '../../lib/app';
import { isRecord } from '../../lib/storage';
import { CopyButton } from '../blocks/CopyButton';
import { Frame, useLab } from './Frame';
import './set2.css';

type Brief = {
  name: string;
  type: string;
  audience: string;
  goal: string;
  features: string[];
  pages: string;
  fa: boolean;
  en: boolean;
  style: string;
  constraints: string[];
  extra: string;
  success: string;
};

const TYPES = [
  { id: 'landing', fa: 'صفحه معرفی (Landing page)', en: 'Landing page' },
  { id: 'portfolio', fa: 'نمونه‌کار (Portfolio)', en: 'Portfolio' },
  { id: 'blog', fa: 'وبلاگ', en: 'Blog' },
  { id: 'shop', fa: 'فروشگاه کوچک', en: 'Small online shop' },
  { id: 'webapp', fa: 'Web App', en: 'Web app' },
  { id: 'dashboard', fa: 'داشبورد', en: 'Dashboard' },
];

const TYPE_EN: Record<string, string> = Object.fromEntries(TYPES.map((t) => [t.id, t.en]));

const PRESETS = [
  { id: 'cf-free', fa: 'پلن رایگان Cloudflare', en: 'Cloudflare free plan' },
  { id: 'github', fa: 'کد روی GitHub', en: 'Code on GitHub' },
  { id: 'workers', fa: 'میزبانی روی Workers', en: 'Hosted on Cloudflare Workers' },
  { id: 'mobile', fa: 'اول موبایل', en: 'Mobile first' },
  { id: 'no-paid', fa: 'بدون سرویس پولی', en: 'No paid services' },
  { id: 'a11y', fa: 'دسترس‌پذیر (WCAG AA)', en: 'Accessible (WCAG AA)' },
];

const EMPTY: Brief = {
  name: '',
  type: 'landing',
  audience: '',
  goal: '',
  features: [],
  pages: '',
  fa: true,
  en: false,
  style: '',
  constraints: [],
  extra: '',
  success: '',
};

const EXAMPLE: Brief = {
  name: 'Café Sahar (cafe-sahar.ir)',
  type: 'webapp',
  audience: 'Neighbours and visitors looking for a cosy café, mostly on their phones',
  goal: 'Show the menu and opening hours, and let guests book a table online',
  features: ['Menu with prices', 'Opening hours and map', 'Table booking form saved in D1', 'Booking form protected with Turnstile'],
  pages: 'Home, Menu, Book a table, Contact',
  fa: true,
  en: true,
  style: 'warm and friendly; cream, coffee and coral colours; large food photos',
  constraints: ['cf-free', 'github', 'workers', 'mobile'],
  extra: 'Domain: cafe-sahar.ir',
  success: 'Looks great on a 360px phone\nLoads fast on mobile data\nA booking appears in the database and Sahar gets an email',
};

type FileKind = 'AGENTS.md' | 'CLAUDE.md' | 'Lovable';

const str = (v: unknown, d: string) => (typeof v === 'string' ? v : d);
const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d);
const strs = (v: unknown, d: string[]) => (Array.isArray(v) && v.every((x) => typeof x === 'string') ? (v as string[]) : d);

/** QA-01: validate every stored field; a wrong type falls back to the default instead of crashing. */
function restore(stored: unknown): Brief {
  if (!isRecord(stored)) return { ...EXAMPLE };
  return {
    name: str(stored.name, EXAMPLE.name),
    type: TYPES.some((t) => t.id === stored.type) ? (stored.type as string) : EXAMPLE.type,
    audience: str(stored.audience, EXAMPLE.audience),
    goal: str(stored.goal, EXAMPLE.goal),
    features: strs(stored.features, EXAMPLE.features),
    pages: str(stored.pages, EXAMPLE.pages),
    fa: bool(stored.fa, EXAMPLE.fa),
    en: bool(stored.en, EXAMPLE.en),
    style: str(stored.style, EXAMPLE.style),
    constraints: strs(stored.constraints, EXAMPLE.constraints).filter((c) => PRESETS.some((p) => p.id === c)),
    extra: str(stored.extra, EXAMPLE.extra),
    success: str(stored.success, EXAMPLE.success),
  };
}

function toMarkdown(b: Brief, file: FileKind): string {
  const lines: string[] = [];
  const list = (items: string[]) => items.filter(Boolean).map((i) => `- ${i}`);
  const split = (s: string) =>
    s
      .split(/\n|,|،/)
      .map((x) => x.trim())
      .filter(Boolean);

  lines.push(`# ${b.name.trim() || 'My project'}`);
  lines.push('');
  lines.push(
    file === 'Lovable'
      ? '> Lovable project Instructions: paste into Project settings → Instructions.'
      : `> ${file}: instructions for the AI agent working in this repository.`,
  );
  lines.push('');
  lines.push('## Project summary');
  const summary = [
    `A ${TYPE_EN[b.type]?.toLowerCase() ?? 'website'}`,
    b.audience.trim() ? ` for ${b.audience.trim()}` : '',
    '.',
    b.goal.trim() ? ` Goal: ${b.goal.trim()}.` : '',
  ].join('');
  lines.push(summary.replace('..', '.'));
  lines.push('');
  if (b.features.length) {
    lines.push('## Must-have features');
    lines.push(...list(b.features));
    lines.push('');
  }
  if (split(b.pages).length) {
    lines.push('## Pages');
    lines.push(...list(split(b.pages)));
    lines.push('');
  }
  lines.push('## Languages');
  if (b.fa) lines.push('- Persian (fa): right-to-left (RTL) layout, a good Persian font, Persian digits in text');
  if (b.en) lines.push('- English (en)');
  if (!b.fa && !b.en) lines.push('- (choose at least one)');
  lines.push('');
  if (b.style.trim()) {
    lines.push('## Look and feel');
    lines.push(b.style.trim());
    lines.push('');
  }
  const cons = [...PRESETS.filter((p) => b.constraints.includes(p.id)).map((p) => p.en), ...split(b.extra)];
  if (cons.length) {
    lines.push('## Constraints');
    lines.push(...list(cons));
    lines.push('');
  }
  if (split(b.success).length) {
    lines.push('## Definition of done');
    lines.push(...list(split(b.success).map((s) => `[ ] ${s}`)));
    lines.push('');
  }
  lines.push('## How to work with me');
  lines.push('- I am not a programmer. Explain your changes in plain language.');
  lines.push('- Propose a plan and a design first, and wait for my approval before writing code.');
  lines.push('- Work in small steps on a branch; open a pull request for each feature.');
  lines.push('- Ask me when something is unclear instead of guessing.');
  lines.push('- Never commit secrets or API tokens; use environment variables.');
  return lines.join('\n');
}

/** Light syntax colouring for the markdown preview. */
function Highlighted({ md }: { md: string }) {
  const out: ReactNode[] = md.split('\n').map((l, i) => {
    const cls = l.startsWith('#') ? 'bb-md-h' : l.startsWith('- ') ? 'bb-md-li' : undefined;
    return (
      <span key={i} className={cls}>
        {l}
        {'\n'}
      </span>
    );
  });
  return <>{out}</>;
}

export default function BriefBuilder() {
  const { saved, save, lang } = useApp();
  const tx = useTx();
  const [b, setB] = useState<Brief>(() => restore(saved<Record<string, unknown>>('brief-builder', { ...EXAMPLE })));
  const [file, setFile] = useState<FileKind>('AGENTS.md');
  const { complete } = useLab();
  const filled = b.name.trim() !== '' && b.goal.trim() !== '' && b.features.length >= 3 && b.pages.trim() !== '';
  useEffect(() => {
    if (filled) complete();
  }, [filled, complete]);
  const [feature, setFeature] = useState('');

  useEffect(() => {
    const t = window.setTimeout(() => save('brief-builder', b), 250);
    return () => window.clearTimeout(t);
  }, [b, save]);

  const set = <K extends keyof Brief>(k: K, v: Brief[K]) => setB((prev) => ({ ...prev, [k]: v }));
  const md = useMemo(() => toMarkdown(b, file), [b, file]);

  const addFeature = () => {
    const v = feature.trim();
    if (!v || b.features.includes(v)) return;
    set('features', [...b.features, v]);
    setFeature('');
  };
  const onFeatureKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  const field = (id: keyof Brief, label: string, placeholder: string, multiline = false) => (
    <div>
      <label className="w-label" htmlFor={`bb-${id}`}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={`bb-${id}`}
          className="w-input"
          value={b[id] as string}
          placeholder={placeholder}
          onChange={(e) => set(id, e.target.value as never)}
          dir="auto"
        />
      ) : (
        <input
          id={`bb-${id}`}
          className="w-input"
          value={b[id] as string}
          placeholder={placeholder}
          onChange={(e) => set(id, e.target.value as never)}
          dir="auto"
        />
      )}
    </div>
  );

  return (
    <Frame
      title={tx('برگه تعریف پروژه (Brief) بسازید', 'Build your project brief')}
      goal={tx('نام، هدف، دست‌کم ۳ امکان و صفحه‌ها', 'Name, goal, at least 3 features and the pages')}
      hint={tx(
        'هم‌زمان با پر کردن فرم، فایل دستورالعمل Agent ساخته می‌شود. نمونه کافه سحر را با ایده خودتان عوض کنید.',
        "The agent's instruction file is written as you type. Swap the Café Sahar example for your own idea.",
      )}
      mood={filled ? 'happy' : 'think'}
      tint="var(--butter-soft)"
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setB({ ...EMPTY })}>
            {tx('خالی کردن فرم', 'Clear the form')}
          </button>
          <button type="button" className="btn btn--small btn--butter" onClick={() => setB({ ...EXAMPLE })}>
            {tx('پر کردن با نمونه کافه سحر', 'Fill with the Café Sahar example')}
          </button>
        </>
      }
    >
      <div className="bb-grid">
        <div className="bb-form">
          {field('name', tx('نام پروژه', 'Project name'), tx('مثلاً: کافه سحر', 'e.g. Café Sahar'))}
          <div>
            <label className="w-label" htmlFor="bb-type">
              {tx('نوع پروژه', 'Kind of project')}
            </label>
            <select id="bb-type" className="w-input" value={b.type} onChange={(e) => set('type', e.target.value)}>
              {TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {lang === 'fa' ? t.fa : t.en}
                </option>
              ))}
            </select>
          </div>
          {field('audience', tx('مخاطب', 'Audience'), tx('چه کسانی و با چه دستگاهی؟', 'Who, and on what device?'))}
          {field('goal', tx('هدف اصلی', 'Main goal'), tx('سایت باید چه نتیجه‌ای بدهد؟', 'What should the site achieve?'), true)}

          <div>
            <label className="w-label" htmlFor="bb-feature">
              {tx('امکانات ضروری (Must-have)', 'Must-have features')}
            </label>
            <div className="w-row" style={{ flexWrap: 'nowrap' }}>
              <input
                id="bb-feature"
                className="w-input"
                value={feature}
                placeholder={tx('بنویسید و Enter بزنید', 'Type and press Enter')}
                onChange={(e) => setFeature(e.target.value)}
                onKeyDown={onFeatureKey}
                dir="auto"
              />
              <button type="button" className="btn btn--small" onClick={addFeature} style={{ minHeight: 44 }}>
                {tx('افزودن', 'Add')}
              </button>
            </div>
            <div className="bb-chips">
              {b.features.map((f) => (
                <span key={f} className="bb-chip">
                  <span dir="auto">{f}</span>
                  <button type="button" aria-label={tx(`حذف ${f}`, `Remove ${f}`)} onClick={() => set('features', b.features.filter((x) => x !== f))}>
                    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {field('pages', tx('صفحه‌ها (با ویرگول جدا کنید)', 'Pages (comma separated)'), tx('خانه، منو، رزرو میز، تماس', 'Home, Menu, Book a table, Contact'))}

          <div>
            <span className="w-label">{tx('زبان‌ها', 'Languages')}</span>
            <div className="w-row">
              <button type="button" className="bb-preset" aria-pressed={b.fa} onClick={() => set('fa', !b.fa)}>
                {tx('فارسی (راست‌به‌چپ)', 'Persian (RTL)')}
              </button>
              <button type="button" className="bb-preset" aria-pressed={b.en} onClick={() => set('en', !b.en)}>
                {tx('انگلیسی', 'English')}
              </button>
            </div>
          </div>

          {field('style', tx('حس و ظاهر', 'Look and feel'), tx('سه چهار کلمه: گرم، مینیمال، شاد…', 'A few words: warm, minimal, playful…'))}

          <div>
            <span className="w-label">{tx('محدودیت‌ها', 'Constraints')}</span>
            <div className="w-row" style={{ gap: 6 }}>
              {PRESETS.map((p) => {
                const on = b.constraints.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    className="bb-preset"
                    aria-pressed={on}
                    onClick={() => set('constraints', on ? b.constraints.filter((x) => x !== p.id) : [...b.constraints, p.id])}
                  >
                    {lang === 'fa' ? p.fa : p.en}
                  </button>
                );
              })}
            </div>
            <input
              className="w-input"
              style={{ marginTop: 8 }}
              value={b.extra}
              placeholder={tx('محدودیت دیگر؟ (اختیاری)', 'Anything else? (optional)')}
              aria-label={tx('محدودیت دیگر', 'Other constraints')}
              onChange={(e) => set('extra', e.target.value)}
              dir="auto"
            />
          </div>

          {field('success', tx('معیار موفقیت (هر خط یک مورد)', 'Definition of done (one per line)'), tx('روی موبایل عالی دیده شود…', 'Looks great on mobile…'), true)}
        </div>

        <div className="bb-preview">
          <div className="bb-preview-head">
            <div className="w-toggle" role="group" aria-label={tx('نام فایل', 'File name')}>
              <button type="button" aria-pressed={file === 'AGENTS.md'} onClick={() => setFile('AGENTS.md')}>
                AGENTS.md
              </button>
              <button type="button" aria-pressed={file === 'CLAUDE.md'} onClick={() => setFile('CLAUDE.md')}>
                CLAUDE.md
              </button>
              <button type="button" aria-pressed={file === 'Lovable'} onClick={() => setFile('Lovable')}>
                {tx('Lovable Instructions', 'Lovable Instructions')}
              </button>
            </div>
            <span style={{ flex: 1 }} />
            <CopyButton text={md} className="btn btn--small btn--butter" />
          </div>
          <pre tabIndex={0} aria-label={file === 'Lovable' ? 'Lovable Instructions' : file}>
            <Highlighted md={md} />
          </pre>
          <p style={{ margin: 0, padding: '0 16px 14px', fontSize: 13, opacity: 0.75, lineHeight: 1.7 }}>
            {file === 'AGENTS.md'
              ? tx('AGENTS.md را در ریشه Repository بگذارید؛ Codex و بسیاری از Agentهای دیگر آن را می‌خوانند.', 'Put AGENTS.md in the repository root; Codex and many other agents read it.')
              : file === 'CLAUDE.md'
                ? tx('CLAUDE.md را در ریشه Repository بگذارید؛ Claude Code در شروع هر جلسه آن را می‌خواند.', 'Put CLAUDE.md in the repository root; Claude Code reads it at the start of every session.')
                : tx('در Lovable این متن را در تنظیمات پروژه، بخش Instructions بچسبانید (حداکثر ۱۰٬۰۰۰ نویسه).', 'In Lovable, paste this into Project settings → Instructions (up to 10,000 characters).')}{' '}
            {tx(
              'عنوان‌ها انگلیسی‌اند تا برای هر Agent واضح باشند، ولی متن را می‌توانید فارسی هم بنویسید؛ هر دو کار می‌کند.',
              '',
            )}
          </p>
        </div>
      </div>
    </Frame>
  );
}

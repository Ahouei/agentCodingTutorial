import { AnimatePresence, motion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import type { L } from '../../content/types';
import { num, useApp, useTx, type BuildPath } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { CopyButton } from '../blocks/CopyButton';
import { Frame, useLab } from './Frame';
import './set4.css';

/**
 * RD-01 extra · "Your next mission". Café Sahar was the course's main project; here the
 * learner repeats the whole flow for one of six other businesses. Pick one → a 6-step plan
 * and a copyable master prompt, adapted to the learner's build path (Codex or Lovable).
 */

type BId = 'bakery' | 'cart' | 'shop' | 'portfolio' | 'clinic' | 'tutor';

type Biz = {
  id: BId;
  name: L;
  /** English name used inside the (English) prompt. */
  enName: string;
  slug: string;
  blurb: L;
  pages: string;
  feature: string;
  data: string;
  dataL: L;
  tint: string;
  icon: ReactNode;
};

const ic = (d: string) => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BIZ: Biz[] = [
  {
    id: 'bakery',
    name: { fa: 'نانوایی نان شیرین', en: 'Nan-e Shirin bakery' },
    enName: 'Nan-e Shirin bakery',
    slug: 'nan-e-shirin',
    blurb: { fa: 'منوی کیک‌ها و سفارش تلفنی', en: 'Cake menu and phone orders' },
    pages: 'Home, Cakes, Order, Contact',
    feature: 'a cake pre-order form saved to the database',
    data: 'pre-orders (name, phone, cake, pickup date)',
    dataL: { fa: 'پیش‌سفارش‌ها (نام، تلفن، کیک، تاریخ تحویل)', en: 'pre-orders (name, phone, cake, pickup date)' },
    tint: 'var(--butter)',
    icon: ic('M4 13h16v6H4zM6 13V9a6 6 0 0 1 12 0v4M12 3v2'),
  },
  {
    id: 'cart',
    name: { fa: 'گاری قهوه Bean & Bit', en: 'Bean & Bit coffee cart' },
    enName: 'Bean & Bit coffee cart',
    slug: 'bean-and-bit',
    blurb: { fa: 'جای امروز گاری و منو', en: "Today's cart location and menu" },
    pages: 'Home, Menu, Where are we today',
    feature: 'a "where is the cart today" box the owner can update from a phone',
    data: 'daily locations (date, place, hours)',
    dataL: { fa: 'جای روزانه گاری (تاریخ، مکان، ساعت)', en: 'daily locations (date, place, hours)' },
    tint: 'var(--mint)',
    icon: ic('M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 9h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2'),
  },
  {
    id: 'shop',
    name: { fa: 'فروشگاه کوچک آنلاین', en: 'Small online shop' },
    enName: 'small online handmade-goods shop',
    slug: 'small-shop',
    blurb: { fa: 'چند محصول و پرداخت', en: 'A few products and checkout' },
    pages: 'Home, Products, Product page, Cart, Checkout',
    feature: 'checkout with a payment provider and an orders table',
    data: 'products and orders',
    dataL: { fa: 'محصولات و سفارش‌ها', en: 'products and orders' },
    tint: 'var(--blush)',
    icon: ic('M5 7h14l-1.5 10h-11zM9 7a3 3 0 0 1 6 0'),
  },
  {
    id: 'portfolio',
    name: { fa: 'نمونه‌کار شخصی', en: 'Personal portfolio' },
    enName: 'personal portfolio',
    slug: 'my-portfolio',
    blurb: { fa: 'معرفی، کارها و تماس', en: 'About, work and contact' },
    pages: 'Home, Projects, About, Contact',
    feature: 'a projects gallery and a contact form',
    data: 'contact messages',
    dataL: { fa: 'پیام‌های تماس', en: 'contact messages' },
    tint: 'var(--sky)',
    icon: ic('M4 6h16v12H4zM4 10h16M8 14h4'),
  },
  {
    id: 'clinic',
    name: { fa: 'نوبت‌دهی مطب', en: 'Clinic booking page' },
    enName: 'small clinic',
    slug: 'clinic-booking',
    blurb: { fa: 'ساعت‌های خالی و نوبت', en: 'Open slots and appointments' },
    pages: 'Home, Services, Book an appointment, Contact',
    feature: 'an appointment request form with available time slots',
    data: 'appointment requests (no medical details)',
    dataL: { fa: 'درخواست‌های نوبت (بدون اطلاعات پزشکی)', en: 'appointment requests (no medical details)' },
    tint: 'var(--coral-soft)',
    icon: ic('M12 5v14M5 12h14'),
  },
  {
    id: 'tutor',
    name: { fa: 'وبلاگ آموزشی', en: 'Tutoring blog' },
    enName: 'tutoring blog',
    slug: 'tutor-blog',
    blurb: { fa: 'نوشته‌ها و ثبت‌نام کلاس', en: 'Posts and class sign-up' },
    pages: 'Home, Blog, Post, Classes, Sign up',
    feature: 'blog posts and a class sign-up form',
    data: 'class sign-ups',
    dataL: { fa: 'ثبت‌نام‌های کلاس', en: 'class sign-ups' },
    tint: 'var(--sky-soft)',
    icon: ic('M4 5h10a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3zM17 8h3v11h-3'),
  },
];

function plan(b: Biz, p: BuildPath): L[] {
  const n = b.name;
  if (p === 'lovable') {
    return [
      { fa: `یک Brief یک‌صفحه‌ای برای ${n.fa} بنویسید: هدف، مخاطب، صفحه‌ها.`, en: `Write a one-page brief for ${n.en}: goal, audience, pages.` },
      { fa: 'قواعد پروژه (فارسی، dir="rtl"، رنگ‌ها) را در Instructions پروژه Lovable بگذارید.', en: 'Put the project rules (Persian, dir="rtl", colors) in the Lovable project Instructions.' },
      { fa: 'اول در حالت Plan برنامه را بخواهید و تأیید کنید، بعد بسازید.', en: 'Ask for a plan in Plan mode, approve it, then build.' },
      { fa: `داده‌ها (${b.dataL.fa}) را در Database داخلی نگه دارید و قواعد دسترسی را بررسی کنید.`, en: `Keep the data (${b.dataL.en}) in the built-in database and check the access rules.` },
      { fa: 'پیش از Publish، بررسی امنیتی را اجرا کنید و روی گوشی تست کنید.', en: 'Before publishing, run the security check and test on a phone.' },
      { fa: 'روی lovable.app منتشر کنید؛ GitHub را وصل کنید تا کد مال خودتان بماند.', en: 'Publish on lovable.app; connect GitHub so the code stays yours.' },
    ];
  }
  return [
    { fa: `یک Repository به نام ${b.slug} بسازید و Brief را بنویسید.`, en: `Create a repository called ${b.slug} and write the brief.` },
    { fa: 'AGENTS.md را با قواعد پروژه (فارسی، RTL، دسترس‌پذیری) پر کنید.', en: 'Fill AGENTS.md with the project rules (Persian, RTL, accessibility).' },
    { fa: 'از Codex بخواهید اول طرح بدهد و منتظر تأیید شما بماند.', en: 'Ask Codex to propose a design first and wait for your approval.' },
    { fa: `${b.dataL.fa} را در D1 نگه دارید و فرم را با Turnstile امن کنید.`, en: `Keep ${b.dataL.en} in D1 and protect the form with Turnstile.` },
    { fa: 'هر قابلیت در یک Branch و Pull Request؛ تست‌ها باید سبز باشند.', en: 'One branch and pull request per feature; tests must be green.' },
    { fa: 'روی Cloudflare Workers منتشر کنید و دامنه را وصل کنید.', en: 'Publish on Cloudflare Workers and connect the domain.' },
  ];
}

function prompt(b: Biz, p: BuildPath): string {
  const common = `Project: a website for ${b.enName}.
Audience: local customers, mostly on phones. Language: Persian (fa), right-to-left (dir="rtl"), with a clean Persian font; English optional later.
Pages: ${b.pages}.
Key feature: ${b.feature}.
Data to store: ${b.data}.
Design: warm, friendly, real content (no lorem ipsum), contrast at least 4.5:1, touch targets at least 44px, mobile first.`;
  if (p === 'lovable') {
    return `${common}

How to work with me:
1. Start in Plan mode: propose the sitemap, page sections and data model. Wait for my approval before building.
2. Build page by page. After each step, tell me in one short paragraph what changed.
3. Store the data in the built-in database with access rules so visitors can only create their own entries.
4. Before I publish, run the security check and list anything it flags.
5. Ask me if anything is unclear instead of guessing.`;
  }
  return `${common}

Stack and hosting: a static frontend plus a small Cloudflare Worker API, data in Cloudflare D1, Turnstile on the form, deployed with Workers static assets. Repository: ${b.slug}.

How to work with me:
1. Read AGENTS.md first. Propose a plan (sitemap, components, D1 schema) and wait for my approval.
2. Work in small steps on a branch; open a pull request per feature with a plain-language summary.
3. Add tests for the form and the API; run them and show me they pass.
4. Never put secrets in the code; use \`wrangler secret put\`.
5. Ask me if anything is unclear instead of guessing.`;
}

export default function OtherBusinesses() {
  const { t, lang, path } = useApp();
  const tx = useTx();
  const lab = useLab();
  const [pick, setPick] = useState<BId | null>(null);
  const [view, setView] = useState<BuildPath>(path);
  const b = BIZ.find((x) => x.id === pick) ?? null;
  const name = (p: BuildPath) => (p === 'codex' ? 'Codex' : 'Lovable');

  return (
    <Frame
      title={tx('مأموریت بعدی: یک کسب‌وکار دیگر', 'Next mission: another business')}
      goal={tx('یکی را انتخاب کنید و Prompt را کپی کنید', 'Pick one and copy the prompt')}
      tint="var(--butter-soft)"
      hint={tx(
        'کافه سحر را ساختید. حالا همان مسیر را برای یکی از این شش کسب‌وکار تکرار کنید؛ بهترین تمرین همین است.',
        'You built Café Sahar. Now repeat the same flow for one of these six businesses; that is the best practice there is.',
      )}
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setPick(null)} disabled={!pick}>
            {tx('انتخاب دیگر', 'Pick another')}
          </button>
          <span className="w-muted">{tx('کافه سحر همیشه پروژه اصلی دوره است.', 'Café Sahar stays the course’s main project.')}</span>
        </>
      }
    >
      <div className="s4">
        <div className="ob-grid" role="group" aria-label={tx('کسب‌وکارها', 'Businesses')}>
          {BIZ.map((x) => (
            <button key={x.id} type="button" className="ob-card" aria-pressed={pick === x.id} onClick={() => setPick(x.id)}>
              <span className="ob-badge" style={{ background: x.tint }}>
                {x.icon}
              </span>
              <b>{t(x.name)}</b>
              <span>{t(x.blurb)}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {b && (
            <motion.div
              key={`${b.id}-${view}`}
              className="ob-out"
              initial={{ opacity: 0, transform: 'translateY(8px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
            >
              <div className="w-row">
                <span style={{ fontWeight: 900 }}>{tx('مسیر ساخت:', 'Build path:')}</span>
                <div className="w-toggle" role="group" aria-label={tx('مسیر ساخت', 'Build path')}>
                  {(['codex', 'lovable'] as BuildPath[]).map((p) => (
                    <button key={p} type="button" aria-pressed={view === p} onClick={() => setView(p)}>
                      <span className="ltr">{name(p)}</span>
                    </button>
                  ))}
                </div>
              </div>
              <ol className="ob-plan">
                {plan(b, view).map((st, i) => (
                  <li key={i}>
                    <span className="n" aria-hidden>
                      {num(i + 1, lang)}
                    </span>
                    <span>{t(st)}</span>
                  </li>
                ))}
              </ol>
              <div className="ob-prompt">
                <div className="ob-prompt-head">
                  <span>{tx(`Prompt اصلی برای ${name(view)}`, `Master prompt for ${name(view)}`)}</span>
                  <span onClickCapture={() => lab.complete()}>
                    <CopyButton text={prompt(b, view)} />
                  </span>
                </div>
                <pre>{prompt(b, view)}</pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}

import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { Mascot } from '../Mascot';
import { Frame } from './Frame';
import './set1.css';

type Bucket = 'd1' | 'kv' | 'r2';
type Item = { id: string; fa: string; en: string; answer: Bucket; whyFa: string; whyEn: string };

const ITEMS: Item[] = [
  {
    id: 'orders',
    fa: 'حساب کاربران و سفارش‌ها',
    en: 'User accounts and orders',
    answer: 'd1',
    whyFa: 'سفارش‌ها به کاربرها و محصولات ربط دارند و باید بپرسید «همه سفارش‌های این کاربر» یا «فروش این ماه». این یعنی جدول و Query: کار D1.',
    whyEn: 'Orders relate to users and products, and you need questions like "all orders for this user" or "sales this month". That means tables and queries: a job for D1.',
  },
  {
    id: 'settings',
    fa: 'تنظیمات سایت و Feature Flagها',
    en: 'Site settings and feature flags',
    answer: 'kv',
    whyFa: 'مقدارهای کوچکی که همه‌جا زیاد خوانده و کم عوض می‌شوند. KV برای خواندن سریع در سراسر دنیا ساخته شده.',
    whyEn: 'Small values that are read everywhere and changed rarely. KV is built for fast reads all over the world.',
  },
  {
    id: 'photos',
    fa: 'عکس محصولات',
    en: 'Product photos',
    answer: 'r2',
    whyFa: 'عکس «فایل» است، نه ردیف جدول. فایل‌ها جایشان در R2 است و در Database فقط آدرسشان را نگه می‌دارید.',
    whyEn: 'A photo is a file, not a table row. Files belong in R2; your database only keeps their address.',
  },
  {
    id: 'sessions',
    fa: 'Session ورود و Cache موقت',
    en: 'Login sessions and temporary cache',
    answer: 'kv',
    whyFa: 'یک کلید (شناسه Session) و یک مقدار کوچک که بعد از مدتی منقضی می‌شود. KV حتی تاریخ انقضا را خودش مدیریت می‌کند.',
    whyEn: 'One key (the session ID) and a small value that expires after a while. KV can even handle the expiry for you.',
  },
  {
    id: 'blog',
    fa: 'پست‌های وبلاگ با جست‌وجو و فیلتر',
    en: 'Blog posts with search and filters',
    answer: 'd1',
    whyFa: 'فیلتر بر اساس برچسب، تاریخ یا نویسنده یعنی Query. متن پست هم داده ساختاریافته است، پس D1.',
    whyEn: 'Filtering by tag, date or author means queries. Post text is structured data too, so: D1.',
  },
  {
    id: 'pdfs',
    fa: 'فایل‌های PDF آپلودشده',
    en: 'Uploaded PDF files',
    answer: 'r2',
    whyFa: 'هر چیزی که کاربر آپلود می‌کند و یک فایل است (PDF، ویدیو، فایل زیپ) جایش R2 است.',
    whyEn: 'Anything a user uploads as a file (PDF, video, zip) goes in R2.',
  },
  {
    id: 'links',
    fa: 'لینک‌های کوتاه (کد ← آدرس)',
    en: 'Short links (code → URL)',
    answer: 'kv',
    whyFa: 'دقیقاً یک کلید و یک مقدار: «abc» ← آدرس کامل. خواندن خیلی زیاد، نوشتن کم. KV کلاسیک!',
    whyEn: 'Exactly one key and one value: "abc" → the full URL. Lots of reads, few writes. Classic KV!',
  },
  {
    id: 'counter',
    fa: 'شمارنده بازدید و لایک‌ها',
    en: 'Visit and like counters',
    answer: 'd1',
    whyFa: 'تله بود! KV برای نوشتن‌های پشت‌سرهم روی یک کلید ساخته نشده و تغییراتش با کمی تأخیر به همه‌جا می‌رسد (Eventually Consistent). شمارش دقیق را به D1 بسپارید (یا بعدها Durable Objects).',
    whyEn: 'That was a trap! KV is not built for rapid repeated writes to one key, and its changes reach everywhere with a delay (eventually consistent). Keep exact counts in D1 (or, later, Durable Objects).',
  },
];

const BUCKETS: { id: Bucket; name: string; fa: string; en: string; tint: string }[] = [
  { id: 'd1', name: 'D1', fa: 'Database با SQL: جدول، رابطه و Query', en: 'SQL database: tables, relations, queries', tint: 'var(--sky)' },
  { id: 'kv', name: 'KV', fa: 'کلید ← مقدار: کوچک، سریع، همه‌جا', en: 'Key → value: small, fast, everywhere', tint: 'var(--butter)' },
  { id: 'r2', name: 'R2', fa: 'انبار فایل: عکس، ویدیو، PDF', en: 'File storage: images, video, PDFs', tint: 'var(--mint)' },
];

export default function StoragePicker() {
  const tx = useTx();
  const { lang } = useApp();
  const [placed, setPlaced] = useState<Record<string, Bucket>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();

  const remaining = ITEMS.filter((i) => !placed[i.id]);
  const done = remaining.length === 0;

  const drop = (b: Bucket) => {
    if (!selected) return;
    const item = ITEMS.find((i) => i.id === selected)!;
    if (item.answer === b) {
      setPlaced((p) => ({ ...p, [item.id]: b }));
      setFeedback({ ok: true, text: tx(item.whyFa, item.whyEn) });
      setSelected(null);
    } else {
      setMistakes((m) => m + 1);
      if (!reduce) animate(`[data-card="${item.id}"]`, { x: [0, -7, 7, -4, 4, 0] }, { duration: 0.35 });
      const bucket = BUCKETS.find((x) => x.id === b)!;
      setFeedback({
        ok: false,
        text: tx(`${bucket.name} جای خوبی برایش نیست. راهنمایی: ${item.whyFa}`, `${bucket.name} is not the best home for it. Hint: ${item.whyEn}`),
      });
    }
  };

  const reset = () => {
    setPlaced({});
    setSelected(null);
    setMistakes(0);
    setFeedback(null);
  };

  return (
    <Frame
      title={tx('بازی مرتب‌سازی: هر داده کجا ذخیره شود؟', 'Sorting game: where should each piece of data live?')}
      hint={tx('اول یک کارت را بزنید، بعد جعبه درست را.', 'Tap a card first, then tap the right box.')}
      mood={done ? 'happy' : selected ? 'think' : 'calm'}
      tint="var(--sky-soft)"
      footer={
        <>
          <span className="w-pill" aria-live="polite">
            {tx(`درست: ${num(ITEMS.length - remaining.length, lang)} از ${num(ITEMS.length, lang)}`, `Sorted: ${ITEMS.length - remaining.length} of ${ITEMS.length}`)}
          </span>
          <span className="w-pill" style={{ background: 'var(--blush-soft)' }}>
            {tx(`اشتباه: ${num(mistakes, lang)}`, `Misses: ${mistakes}`)}
          </span>
          <button type="button" className="btn btn--small btn--ghost" onClick={reset} style={{ marginInlineStart: 'auto' }}>
            {tx('از اول', 'Reset')}
          </button>
        </>
      }
    >
      <div className="sp-cards" ref={scope} role="group" aria-label={tx('داده‌ها', 'Data')}>
        <AnimatePresence mode="popLayout">
          {remaining.map((it) => (
            <motion.button
              key={it.id}
              type="button"
              layout
              className="sp-card"
              aria-pressed={selected === it.id}
              onClick={() => {
                setSelected((s) => (s === it.id ? null : it.id));
                setFeedback(null);
              }}
              data-card={it.id}
              exit={{ opacity: 0, transform: 'scale(0.9)', transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
              transition={{ layout: { duration: 0.3, ease: [0.77, 0, 0.175, 1] } }}
            >
              {tx(it.fa, it.en)}
            </motion.button>
          ))}
        </AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, transform: 'scale(0.95)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 900 }}
          >
            <Mascot size={48} mood="happy" follow={false} />
            {mistakes === 0
              ? tx('همه درست، بدون حتی یک اشتباه! شما معمار داده‌اید.', 'All sorted without a single miss! You are a data architect.')
              : tx('همه مرتب شدند! حالا فرق D1، KV و R2 را می‌دانید.', 'All sorted! Now you know the difference between D1, KV and R2.')}
          </motion.div>
        )}
      </div>

      <div className="sp-buckets">
        {BUCKETS.map((b) => {
          const inside = ITEMS.filter((i) => placed[i.id] === b.id);
          return (
            <button
              key={b.id}
              type="button"
              className={`sp-bucket ${selected ? 'is-armed' : ''}`}
              style={{ ['--b-tint' as string]: b.tint }}
              onClick={() => drop(b.id)}
              disabled={!selected}
              aria-label={`${b.name}: ${tx(b.fa, b.en)}`}
            >
              <span className="sp-bucket-name ltr">{b.name}</span>
              <span className="sp-bucket-sub">{tx(b.fa, b.en)}</span>
              <span className="sp-placed">
                <AnimatePresence>
                  {inside.map((i) => (
                    <motion.span
                      key={i.id}
                      initial={{ opacity: 0, transform: 'translateY(-8px) scale(0.95)' }}
                      animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    >
                      {tx(i.fa, i.en)}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </span>
            </button>
          );
        })}
      </div>

      <div className="sp-feedback" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {feedback && (
            <motion.div
              key={feedback.text}
              className="w-card"
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                width: '100%',
                background: feedback.ok ? 'var(--mint-soft)' : 'var(--blush-soft)',
              }}
              initial={{ opacity: 0, transform: 'translateY(6px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              <span style={{ flex: 'none' }}>
                <Mascot size={36} mood={feedback.ok ? 'happy' : 'wow'} follow={false} />
              </span>
              <span>
                <strong>{feedback.ok ? tx('آفرین! ', 'Nice! ') : tx('اوه! ', 'Oops! ')}</strong>
                {feedback.text}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}

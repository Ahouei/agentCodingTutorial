import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { Frame, useLab } from './Frame';

type Kind = 'static' | 'dynamic' | 'edge';

const LAYERS = [
  { id: 'browser', fa: 'مرورگر کاربر', en: "Visitor's browser", tint: 'var(--sky)' },
  { id: 'frontend', fa: 'Frontend (HTML · CSS · JS)', en: 'Frontend (HTML · CSS · JS)', tint: 'var(--butter)' },
  { id: 'webserver', fa: 'Web Server / Hosting', en: 'Web server / hosting', tint: 'var(--mint)' },
  { id: 'backend', fa: 'Backend (منطق، ورود کاربر، API)', en: 'Backend (logic, login, APIs)', tint: 'var(--blush)' },
  { id: 'database', fa: 'Database', en: 'Database', tint: 'var(--coral)' },
] as const;

const ACTIVE: Record<Kind, string[]> = {
  static: ['browser', 'frontend', 'webserver'],
  dynamic: ['browser', 'frontend', 'webserver', 'backend', 'database'],
  edge: ['browser', 'frontend', 'webserver', 'backend', 'database'],
};

/**
 * Reference widget. Pick a kind of site and see which layers it needs.
 * Layers that are not needed fade back instead of disappearing, so the
 * learner sees the whole stack every time.
 */
export default function StackLayers() {
  const tx = useTx();
  const [kind, setKind] = useState<Kind>('static');
  const [seen, setSeen] = useState<Set<Kind>>(() => new Set(['static']));
  const { complete } = useLab();

  // Done once the learner has compared all three kinds of site.
  useEffect(() => {
    if (seen.size === 3) complete();
  }, [seen, complete]);

  const notes: Record<Kind, string> = {
    static: tx(
      'یک سایت ثابت (مثل صفحه معرفی یا رزومه) فقط فایل می‌فرستد. Backend و Database لازم نیست؛ ارزان، سریع و امن.',
      'A static site (a landing page, a résumé) only sends files. No backend or database needed: cheap, fast and safe.',
    ),
    dynamic: tx(
      'یک Web App (فروشگاه، داشبورد، فرم ثبت‌نام) باید چیزی را حساب کند یا ذخیره کند؛ پس Backend و Database هم وارد بازی می‌شوند.',
      'A web app (a shop, a dashboard, a sign-up form) has to compute or store things, so a backend and a database join in.',
    ),
    edge: tx(
      'روی Cloudflare همان لایه‌ها هست، اما Backend به شکل Worker روی لبه شبکه اجرا می‌شود و Database می‌تواند D1 یا KV باشد. سروری نیست که خودتان نگهداری کنید.',
      'On Cloudflare the same layers exist, but the backend runs as a Worker at the network edge and the database can be D1 or KV. There is no server for you to maintain.',
    ),
  };

  const active = ACTIVE[kind];

  return (
    <Frame
      title={tx('هر سایت به کدام لایه‌ها نیاز دارد؟', 'Which layers does each kind of site need?')}
      goal={tx('هر سه نوع سایت را مقایسه کنید', 'Compare all three kinds of site')}
      tint="var(--butter-soft)"
    >
      <div className="w-toggle w-toggle--grid" role="group" aria-label={tx('نوع سایت', 'Kind of site')}>
        {(
          [
            ['static', tx('سایت ثابت', 'Static site')],
            ['dynamic', tx('Web App', 'Web app')],
            ['edge', tx('Web App روی Cloudflare', 'Web app on Cloudflare')],
          ] as [Kind, string][]
        ).map(([k, label]) => (
          <button key={k} type="button" aria-pressed={kind === k} onClick={() => {
              setKind(k);
              setSeen((prev) => (prev.has(k) ? prev : new Set(prev).add(k)));
            }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
        {LAYERS.map((l, i) => {
          const on = active.includes(l.id);
          const label =
            kind === 'edge' && l.id === 'backend'
              ? tx('Backend → Cloudflare Worker', 'Backend → Cloudflare Worker')
              : kind === 'edge' && l.id === 'database'
                ? tx('Database → D1 / KV / R2', 'Database → D1 / KV / R2')
                : kind === 'edge' && l.id === 'webserver'
                  ? tx('Hosting → شبکه Cloudflare', 'Hosting → Cloudflare network')
                  : tx(l.fa, l.en);
          return (
            <motion.div
              key={l.id}
              animate={{ opacity: on ? 1 : 0.32, transform: on ? 'scale(1)' : 'scale(0.98)' }}
              transition={{ duration: 0.3, ease: EASE_OUT, delay: on ? i * 0.05 : 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 14,
                border: '2px solid var(--ink)',
                background: on ? l.tint : 'var(--paper-2)',
                color: on ? '#2a211b' : 'var(--ink-2)',
                fontWeight: 800,
                marginInline: `calc(${i} * clamp(2px, 1.4vw, 10px))`,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 4,
                  border: '2px solid currentColor',
                  background: on ? '#2a211b' : 'transparent',
                  flex: 'none',
                }}
              />
              <span>{label}</span>
              <span style={{ marginInlineStart: 'auto', fontSize: 13 }} className="w-muted">
                {on ? tx('لازم', 'needed') : tx('لازم نیست', 'not needed')}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        key={kind}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-card"
        style={{ marginTop: 16, marginBottom: 0 }}
        aria-live="polite"
      >
        {notes[kind]}
      </motion.p>
    </Frame>
  );
}

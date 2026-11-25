import { useEffect, useId, useRef, useState } from 'react';
import { CHAPTERS } from '../../content';
import { num, useApp, useTx } from '../../lib/app';

/**
 * Course certificate (RD-10): the learner's name and their own live website,
 * downloadable as a PNG drawn on a canvas (works offline, no server).
 */
export function Certificate() {
  const { lang, done, saved, save } = useApp();
  const tx = useTx();
  const [name, setName] = useState(() => saved<string>('cert-name', ''));
  const [site, setSite] = useState(() => saved<string>('cert-site', 'https://cafe-sahar.ir'));
  const nameId = useId();
  const siteId = useId();
  const canvas = useRef<HTMLCanvasElement>(null);
  const count = CHAPTERS.filter((c) => done[c.slug]).length;
  const total = CHAPTERS.length;
  const ready = count >= total - 1; // the finale itself may still be open
  const date = new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-GB', { dateStyle: 'long' }).format(new Date());

  useEffect(() => {
    const t = window.setTimeout(() => {
      save('cert-name', name);
      save('cert-site', site);
    }, 300);
    return () => window.clearTimeout(t);
  }, [name, site, save]);

  const cleanSite = /^https:\/\/[^\s<>"]{3,120}$/.test(site.trim()) ? site.trim() : '';

  const download = async () => {
    const c = canvas.current;
    if (!c) return;
    const W = 1600;
    const H = 1000;
    c.width = W;
    c.height = H;
    const g = c.getContext('2d');
    if (!g) return;
    await document.fonts.ready;
    const fa = lang === 'fa';
    g.fillStyle = '#fffaf2';
    g.fillRect(0, 0, W, H);
    g.strokeStyle = '#2a211b';
    g.lineWidth = 8;
    g.strokeRect(40, 40, W - 80, H - 80);
    g.setLineDash([10, 10]);
    g.lineWidth = 3;
    g.strokeStyle = '#c9b8a2';
    g.strokeRect(70, 70, W - 140, H - 140);
    g.setLineDash([]);
    ['#a6cdf3', '#8fd5b5', '#ffd36a', '#f6bccb'].forEach((col, i) => {
      g.fillStyle = col;
      g.beginPath();
      g.arc(W / 2 - 120 + i * 80, 820, 28, 0, Math.PI * 2);
      g.fill();
      g.stroke();
    });
    g.direction = fa ? 'rtl' : 'ltr';
    g.textAlign = 'center';
    g.fillStyle = '#6b5e52';
    g.font = `600 40px ${fa ? '"Vazirmatn Variable"' : '"Nunito Variable"'}, sans-serif`;
    g.fillText(fa ? 'این گواهی تأیید می‌کند که' : 'This certifies that', W / 2, 230);
    g.fillStyle = '#2a211b';
    g.font = `${fa ? '400 120px Lalezar' : '700 110px "Fraunces Variable"'}, serif`;
    g.fillText(name.trim() || (fa ? 'قهرمان' : 'Hero'), W / 2, 390);
    g.font = `500 42px ${fa ? '"Vazirmatn Variable"' : '"Nunito Variable"'}, sans-serif`;
    g.fillText(fa ? 'مسیر «از صفر تا قهرمان» را تمام کرد' : 'completed the Zero to Hero path', W / 2, 500);
    g.fillText(fa ? 'و یک وب‌سایت واقعی را با کمک Agent ساخت و منتشر کرد.' : 'and built and published a real website with an AI agent.', W / 2, 565);
    if (cleanSite) {
      g.fillStyle = '#2c7a57';
      g.font = '600 40px "JetBrains Mono Variable", monospace';
      g.direction = 'ltr';
      g.fillText(cleanSite, W / 2, 670);
      g.direction = fa ? 'rtl' : 'ltr';
    }
    g.fillStyle = '#6b5e52';
    g.font = `500 32px ${fa ? '"Vazirmatn Variable"' : '"Nunito Variable"'}, sans-serif`;
    g.fillText(`${date} · start.ahouei.site`, W / 2, 920);
    c.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'zero-to-hero-certificate.png';
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  };

  return (
    <div className="cert-wrap">
      <p className="w-label">{tx('گواهی شما', 'Your certificate')}</p>
      {!ready && (
        <p className="w-muted">
          {tx(`بعد از تمام کردن همه فصل‌ها فعال می‌شود (${num(count, lang)} از ${num(total, lang)}).`, `Unlocks when every chapter is done (${count} of ${total}).`)}
        </p>
      )}
      <div className="cert-fields">
        <div>
          <label className="w-label" htmlFor={nameId}>
            {tx('نام روی گواهی', 'Name on the certificate')}
          </label>
          <input id={nameId} className="w-input" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} dir="auto" />
        </div>
        <div>
          <label className="w-label" htmlFor={siteId}>
            {tx('آدرس سایت زنده شما', 'Your live website')}
          </label>
          <input id={siteId} className="w-input w-mono" value={site} maxLength={120} onChange={(e) => setSite(e.target.value)} dir="ltr" inputMode="url" />
        </div>
      </div>
      <div className={`cert-card ${ready ? '' : 'is-locked'}`} aria-hidden={!ready}>
        <p className="cert-t">{tx('این گواهی تأیید می‌کند که', 'This certifies that')}</p>
        <p className="cert-name">{name.trim() || tx('قهرمان', 'Hero')}</p>
        <p>
          {tx(
            'مسیر «از صفر تا قهرمان» را تمام کرد و یک وب‌سایت واقعی را با کمک Agent ساخت و منتشر کرد.',
            'completed the Zero to Hero path and built and published a real website with an AI agent.',
          )}
        </p>
        {cleanSite && <span className="cert-url">{cleanSite}</span>}
        <p className="cert-date">{date}</p>
      </div>
      <button type="button" className="btn btn--butter" onClick={download} disabled={!ready}>
        {tx('دریافت گواهی (PNG)', 'Download certificate (PNG)')}
      </button>
      <canvas ref={canvas} hidden />
    </div>
  );
}

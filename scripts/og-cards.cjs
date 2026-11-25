// Share cards (RD-11): 1200×630 PNG per chapter + home, rendered with Playwright from content metadata.
// Run after `npm run meta`:  node scripts/og-cards.cjs
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const meta = JSON.parse(fs.readFileSync(path.join(root, 'worker/meta.json'), 'utf8'));
const out = path.join(root, 'public/og');
fs.mkdirSync(out, { recursive: true });
// Fonts are embedded as data URIs: a page set with setContent() cannot load file:// fonts.
const font = (p) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(root, 'node_modules', p)).toString('base64');
const TINT = ['#a6cdf3', '#a6cdf3', '#8fd5b5', '#ffd36a', '#f6bccb'];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// Isolate each Latin run so Persian punctuation between them can't flip their order (RD-04).
const iso = (s) => esc(s).replace(/[A-Za-z][A-Za-z0-9.+#&/_-]*(?:[ ][A-Za-z0-9][A-Za-z0-9.+#&/_-]*)*/g, (m) => `<bdi>${m}</bdi>`);

const bit = `<svg viewBox="0 0 120 132" width="230" height="253" aria-hidden="true">
  <ellipse cx="60" cy="127" rx="30" ry="4" fill="#2a211b" opacity="0.12"/>
  <line x1="60" y1="22" x2="60" y2="9" stroke="#2a211b" stroke-width="3" stroke-linecap="round"/>
  <circle cx="60" cy="8" r="6" fill="#ef6a4c" stroke="#2a211b" stroke-width="2.5"/>
  <rect x="11" y="48" width="10" height="22" rx="5" fill="#8fd5b5" stroke="#2a211b" stroke-width="2.5"/>
  <rect x="99" y="48" width="10" height="22" rx="5" fill="#8fd5b5" stroke="#2a211b" stroke-width="2.5"/>
  <path d="M26 98 q-10 6 -8 16" fill="none" stroke="#2a211b" stroke-width="3" stroke-linecap="round"/>
  <path d="M94 98 q10 6 8 16" fill="none" stroke="#2a211b" stroke-width="3" stroke-linecap="round"/>
  <rect x="28" y="88" width="64" height="34" rx="14" fill="#ffe6ad" stroke="#2a211b" stroke-width="2.5"/>
  <rect x="51" y="97" width="18" height="10" rx="5" fill="#ef6a4c" stroke="#2a211b" stroke-width="2"/>
  <rect x="18" y="22" width="84" height="70" rx="26" fill="#fff0cc" stroke="#2a211b" stroke-width="2.5"/>
  <rect x="30" y="34" width="60" height="44" rx="16" fill="#243530" stroke="#2a211b" stroke-width="2"/>
  <g fill="none" stroke="#9ff0cf" stroke-width="4.5" stroke-linecap="round"><path d="M44 60 q6 -8 12 0"/><path d="M64 60 q6 -8 12 0"/></g>
  <path d="M53 68 q7 6 14 0" fill="none" stroke="#9ff0cf" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="27" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6"/><ellipse cx="93" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6"/>
</svg>`;

function card({ eyebrow, title, desc, tint }) {
  return `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:Lalezar;src:url(${font('@fontsource/lalezar/files/lalezar-arabic-400-normal.woff2')}) format('woff2');unicode-range:U+0600-06FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFF}
@font-face{font-family:Lalezar;src:url(${font('@fontsource/lalezar/files/lalezar-latin-400-normal.woff2')}) format('woff2');unicode-range:U+0000-00FF}
@font-face{font-family:Vazir;src:url(${font('@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2')}) format('woff2');font-weight:100 900;unicode-range:U+0600-06FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFF}
@font-face{font-family:Vazir;src:url(${font('@fontsource-variable/vazirmatn/files/vazirmatn-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900;unicode-range:U+0000-00FF}
*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px}
body{background:#fbf6ee;font-family:Vazir,sans-serif;color:#2a211b;display:grid;place-items:center;
background-image:radial-gradient(#e6d9c6 1.6px,transparent 1.7px);background-size:26px 26px}
.c{width:1110px;height:540px;border:4px solid #2a211b;border-radius:44px;background:#fffdf9;box-shadow:-10px 10px 0 #2a211b;
display:grid;grid-template-columns:1fr 270px;align-items:center;gap:20px;padding:44px 56px;position:relative;overflow:hidden}
.band{position:absolute;inset-inline-start:0;top:0;bottom:0;width:22px;background:${tint};border-inline-end:4px solid #2a211b}
.e{display:inline-block;font-weight:800;font-size:27px;padding:4px 20px;border-radius:999px;border:3px solid #2a211b;background:${tint}}
h1{font-family:Lalezar,serif;font-weight:400;font-size:${title.length > 34 ? 64 : 78}px;line-height:1.25;margin:22px 0 14px}
p{font-size:29px;line-height:1.7;margin:0;color:#5e5247;max-height:150px;overflow:hidden}
.f{position:absolute;bottom:30px;inset-inline-start:58px;font-weight:800;font-size:24px;color:#6b5e52;direction:ltr}
bdi{unicode-bidi:isolate}
</style></head><body><div class="c"><span class="band"></span><div><span class="e">${esc(eyebrow)}</span><h1>${iso(title)}</h1><p>${iso(desc)}</p></div><div>${bit}</div><span class="f">start.ahouei.site · از صفر تا قهرمان</span></div></body></html>`;
}

const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const jobs = [
    { slug: 'home', eyebrow: 'دوره رایگان و تعاملی · ۲۰ فصل', title: 'از صفر تا قهرمان', desc: 'ساخت و انتشار هر نوع وب‌سایت با Agentic AI و Vibe Coding؛ با Codex یا Lovable، GitHub و Cloudflare.', tint: '#ffd36a' },
  ];
  const slugs = Object.keys(meta.chapters);
  const order = JSON.parse(fs.readFileSync(path.join(root, 'worker/meta.json'), 'utf8')).order ?? slugs;
  order.forEach((slug, i) => {
    const c = meta.chapters[slug];
    jobs.push({ slug, eyebrow: `فصل ${toFa(i + 1)} از ${toFa(order.length)}`, title: c.title, desc: c.desc, tint: TINT[Math.min(4, 1 + Math.floor((i / order.length) * 4))] });
  });
  for (const j of jobs) {
    await p.setContent(card(j), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    const ok = await p.evaluate(() => document.fonts.check('78px Lalezar', 'قهرمان') && [...document.fonts].some((f) => f.family.replace(/"/g, '') === 'Lalezar' && f.status === 'loaded'));
    if (!ok) throw new Error(`Lalezar did not load for ${j.slug}`);
    await p.screenshot({ path: path.join(out, `${j.slug}.png`), type: 'png' });
  }
  console.log(`og cards: ${jobs.length} written to public/og/`);
  await b.close();
})();

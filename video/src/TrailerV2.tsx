import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, continueRender, delayRender, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Bit } from './Bit';

/**
 * Trailer v2 (20 s, 30 fps): "Zero becomes Bit → Sahar's napkin → the agent at work →
 * Codex or Lovable → live with a real booking → your turn".
 * One composition, two languages (lang prop) and any aspect ratio (1:1, 9:16): sizes scale by width,
 * the tall format adds vertical breathing room. Sound effects are synthesised (scripts/make_sfx.py).
 */
export type TrailerProps = { lang: 'fa' | 'en' };

const C = {
  paper: '#fbf6ee',
  paper2: '#f4ebdd',
  card: '#fffdf9',
  ink: '#2a211b',
  ink2: '#6b5e52',
  coral: '#ef6a4c',
  coralSoft: '#fde3da',
  butter: '#ffd36a',
  butterSoft: '#fff2cc',
  mint: '#8fd5b5',
  mintInk: '#2c7a57',
  mintSoft: '#ddf3e8',
  sky: '#a6cdf3',
  skySoft: '#e1eefb',
  blush: '#f6bccb',
  blushSoft: '#fde6ec',
  line: '#e6d9c6',
  screen: '#243530',
  coffee: '#8a5a3b',
};
const OUT = Easing.bezier(0.23, 1, 0.32, 1);
const INOUT = Easing.bezier(0.77, 0, 0.175, 1);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const rise = (f: number, start: number, dur = 16) => interpolate(f, [start, start + dur], [0, 1], { ...clamp, easing: OUT });

const T = {
  fa: {
    title: 'از صفر تا قهرمان',
    sub: 'ساخت وب‌سایت با Agentic AI، بدون کدنویسی',
    who: 'سحر',
    ask: 'یه سایت برای کافه‌م می‌خوام… ولی کدنویسی بلد نیستم!',
    prompt: 'سایت کافه سحر: منو، ساعت کاری و رزرو میز، روی دامنه خودم.',
    planning: 'Bit دارد برنامه می‌ریزد…',
    building: 'Bit دارد می‌سازد…',
    done: 'تمام شد! ✓',
    steps: ['Repository در GitHub', 'طرح اولیه، تأیید سحر', 'کد منو و فرم رزرو', 'همه تست‌ها پاس شد'],
    pick: 'مسیر خودت را انتخاب کن',
    same: 'یک نتیجه',
    others: 'و Claude Code، Grok، DeepSeek',
    live: 'زنده شد!',
    cafe: 'کافه سحر',
    hours: 'هر روز ۸ صبح تا ۱۱ شب',
    nav: ['منو', 'رزرو میز', 'تماس'],
    notif: 'رزرو میز ۴ نفره، ساعت ۲۰:۰۰ ✓',
    now: 'اکنون',
    turn: 'حالا نوبت شماست',
    stats: ['۲۰ فصل', '۲۳ تمرین', 'رایگان', 'فارسی + English'],
    credit: 'ساخته احسان',
  },
  en: {
    title: 'Zero to Hero',
    sub: 'Build websites with agentic AI, no coding needed',
    who: 'Sahar',
    ask: 'I want a website for my café… but I can’t code!',
    prompt: 'Café Sahar site: menu, opening hours and table booking, on my own domain.',
    planning: 'Bit is making a plan…',
    building: 'Bit is building…',
    done: 'Done! ✓',
    steps: ['Repository on GitHub', 'First design, Sahar approves', 'Menu and booking code', 'All tests pass'],
    pick: 'Pick your path',
    same: 'Same result',
    others: 'plus Claude Code, Grok, DeepSeek',
    live: 'It’s live!',
    cafe: 'Café Sahar',
    hours: 'Daily, 8 am to 11 pm',
    nav: ['Menu', 'Book a table', 'Contact'],
    notif: 'Table for 4 booked, 8:00 pm ✓',
    now: 'now',
    turn: 'Now it’s your turn',
    stats: ['20 chapters', '23 labs', 'Free', 'Persian + English'],
    credit: 'Made by Ehsan',
  },
};

function useFonts() {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const ar = 'U+0600-06FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF';
    const lat = 'U+0000-00FF, U+2010-2027';
    const faces = [
      new FontFace('Lalezar', `url(${staticFile('fonts/lalezar-arabic-400-normal.woff2')})`, { unicodeRange: ar }),
      new FontFace('Lalezar', `url(${staticFile('fonts/lalezar-latin-400-normal.woff2')})`, { unicodeRange: lat }),
      new FontFace('Vazir', `url(${staticFile('fonts/vazirmatn-arabic-wght-normal.woff2')})`, { weight: '100 900', unicodeRange: ar }),
      new FontFace('Vazir', `url(${staticFile('fonts/vazirmatn-latin-wght-normal.woff2')})`, { weight: '100 900', unicodeRange: lat }),
      new FontFace('Fraunces', `url(${staticFile('fonts/fraunces-latin-wght-normal.woff2')})`, { weight: '100 900' }),
      new FontFace('Nunito', `url(${staticFile('fonts/nunito-latin-wght-normal.woff2')})`, { weight: '200 1000' }),
      new FontFace('Mono', `url(${staticFile('fonts/jetbrains-mono-latin-wght-normal.woff2')})`, { weight: '100 900' }),
    ];
    Promise.all(faces.map((f) => f.load().then((l) => document.fonts.add(l))))
      .then(() => continueRender(handle))
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  }, [handle]);
}

/* ───────── layout helpers ───────── */

type Ctx = { u: number; tall: boolean; fa: boolean; t: (typeof T)['fa']; display: string; body: string };
function useCtx(lang: 'fa' | 'en'): Ctx {
  const { width, height } = useVideoConfig();
  const fa = lang === 'fa';
  const tall = height > width * 1.3;
  return {
    // The vertical format has room to spare: everything is 16% larger there.
    u: (width / 1080) * (tall ? 1.16 : 1),
    tall,
    fa,
    t: T[lang],
    display: fa ? 'Lalezar, Vazir, serif' : 'Fraunces, Georgia, serif',
    body: fa ? 'Vazir, sans-serif' : 'Nunito, sans-serif',
  };
}

/** Latin runs inside Persian text keep their own order. */
function Txt({ s }: { s: string }) {
  const parts = s.split(/([A-Za-z][A-Za-z0-9 .+\-]*[A-Za-z0-9.+]|[A-Za-z])/g);
  return (
    <>
      {parts.map((p, i) =>
        /[A-Za-z]/.test(p) ? (
          <bdi key={i} dir="ltr">
            {p}
          </bdi>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function Sticker({ children, style, u, shadow = 10 }: { children: ReactNode; style?: CSSProperties; u: number; shadow?: number }) {
  return (
    <div style={{ background: C.card, border: `${4 * u}px solid ${C.ink}`, borderRadius: 36 * u, boxShadow: `${-shadow * u}px ${shadow * u}px 0 ${C.ink}`, ...style }}>
      {children}
    </div>
  );
}

function Sfx({ at, name, volume = 0.7 }: { at: number; name: string; volume?: number }) {
  return (
    <Sequence from={at} durationInFrames={70} layout="none">
      <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
    </Sequence>
  );
}

function Check({ size, on }: { size: number; on: number }) {
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: '50%', background: on > 0.5 ? C.mint : C.line, border: `${size * 0.07}px solid ${C.ink}`, display: 'grid', placeItems: 'center' }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" style={{ transform: `scale(${on})` }}>
        <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke={C.ink} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Cup({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path d="M10 18h24v10a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10Z" fill="#fff4dc" stroke={C.ink} strokeWidth="2.5" />
      <path d="M34 21h3a5 5 0 0 1 0 10h-3" fill="none" stroke={C.ink} strokeWidth="2.5" />
      <path d="M18 8c0 3-3 3-3 6M25 8c0 3-3 3-3 6" fill="none" stroke={C.coral} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** The finished café site (used in scenes 4 and 5). `build` 0..1 assembles it. */
function MiniSite({ c, w, build }: { c: Ctx; w: number; build: number }) {
  const s = w / 820;
  const b = (i: number) => interpolate(build, [i * 0.18, i * 0.18 + 0.4], [0, 1], { ...clamp, easing: OUT });
  return (
    <div style={{ width: w, display: 'grid', gap: 22 * s, padding: 30 * s, direction: c.fa ? 'rtl' : 'ltr' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 * s, padding: 26 * s, borderRadius: 28 * s, background: C.coralSoft, opacity: b(0), transform: `translateY(${(1 - b(0)) * 16 * s}px)` }}>
        <Cup size={96 * s} />
        <div>
          <div style={{ fontFamily: c.display, fontSize: 74 * s, lineHeight: 1.15, color: C.ink }}>{c.t.cafe}</div>
          <div style={{ fontFamily: c.body, fontSize: 32 * s, color: C.ink2 }}>{c.t.hours}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16 * s }}>
        {c.t.nav.map((x, i) => (
          <div
            key={x}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: `${18 * s}px ${6 * s}px`,
              borderRadius: 22 * s,
              border: `${3.5 * s}px solid ${C.ink}`,
              background: i === 1 ? C.butter : '#fff',
              fontFamily: c.body,
              fontWeight: 900,
              fontSize: 34 * s,
              color: C.ink,
              opacity: b(1 + i * 0.5),
              transform: `scale(${0.9 + b(1 + i * 0.5) * 0.1})`,
            }}
          >
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Scene 1 · zero becomes Bit (0–80) ───────── */

function SceneZero({ c }: { c: Ctx }) {
  const f = useCurrentFrame();
  const size = (c.tall ? 360 : 330) * c.u;
  // 0–18 draw the zero · 18–30 it becomes the screen · 30–54 Bit assembles around it
  const draw = interpolate(f, [2, 18], [0, 1], { ...clamp, easing: OUT });
  const morph = interpolate(f, [18, 30], [0, 1], { ...clamp, easing: INOUT });
  const assemble = interpolate(f, [30, 56], [0, 1], clamp);
  const showBit = f >= 30;
  // Persian zero «۰» is a dot; English "0" is an oval.
  const from = c.fa ? { x: 51, y: 47, w: 18, h: 18, rx: 9 } : { x: 48, y: 40, w: 24, h: 32, rx: 12 };
  const to = { x: 30, y: 34, w: 60, h: 44, rx: 16 };
  const L = (a: number, b: number) => a + (b - a) * morph;
  const title = rise(f, 44, 18);
  const line = interpolate(f, [56, 76], [0, 1], { ...clamp, easing: OUT });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: c.fa ? 'rtl' : 'ltr', gap: (c.tall ? 46 : 20) * c.u }}>
      <div style={{ position: 'relative', width: size, height: size * 1.1 }}>
        {showBit ? (
          <Bit size={size} assemble={assemble} faceOn={interpolate(f, [48, 56], [0, 1], clamp)} mood="happy" hopAt={56} wave={f > 60} />
        ) : (
          <svg viewBox="0 0 120 132" width={size} height={size * 1.1} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
            {morph === 0 && !c.fa ? (
              <ellipse cx="60" cy="56" rx="12" ry="16" fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} transform="rotate(-90 60 56)" />
            ) : morph === 0 && c.fa ? (
              <g transform={`translate(60 56) scale(${draw}) rotate(45) translate(-60 -56)`}>
                <rect x="53" y="49" width="14" height="14" rx="5" fill={C.ink} />
              </g>
            ) : (
              <rect x={L(from.x, to.x)} y={L(from.y, to.y)} width={L(from.w, to.w)} height={L(from.h, to.h)} rx={L(from.rx, to.rx)} fill={morph > 0.5 ? C.screen : C.ink} stroke={C.ink} strokeWidth={2} />
            )}
          </svg>
        )}
      </div>
      <div style={{ textAlign: 'center', opacity: title, transform: `translateY(${(1 - title) * 22 * c.u}px)` }}>
        <div style={{ fontFamily: c.display, fontSize: (c.fa ? 150 : 128) * c.u, lineHeight: 1.1, color: C.ink, fontWeight: c.fa ? 400 : 800 }}>{c.t.title}</div>
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" style={{ width: 600 * c.u, height: 24 * c.u, display: 'block', margin: `${-8 * c.u}px auto 0` }}>
          <path d={c.fa ? 'M197 12 C 120 4, 50 4, 3 14' : 'M3 12 C 80 4, 150 4, 197 14'} fill="none" stroke={C.coral} strokeWidth="7" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - line} />
        </svg>
        <div style={{ fontFamily: c.body, fontWeight: 700, fontSize: 38 * c.u, color: C.ink2, marginTop: 10 * c.u, opacity: rise(f, 62) }}>
          <Txt s={c.t.sub} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ───────── Scene 2 · Sahar's napkin (0–85) ───────── */

function Napkin({ c, w, stain }: { c: Ctx; w: number; stain: number }) {
  const s = w / 620;
  const sk = { fill: 'none', stroke: C.ink2, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <div style={{ width: w, height: w * 0.72, background: '#fffaf0', borderRadius: 18 * s, border: `${3 * s}px solid ${C.line}`, boxShadow: `0 ${14 * s}px ${30 * s}px rgba(42,33,27,.12)`, position: 'relative', overflow: 'hidden' }}>
      <svg viewBox="0 0 620 446" width="100%" height="100%">
        {/* napkin fold lines */}
        <path d="M0 223 H620 M310 0 V446" stroke={C.line} strokeWidth="2" strokeDasharray="10 10" />
        {/* hand-drawn site sketch */}
        <path {...sk} d="M60 60 h500 v70 h-500 z" />
        <path {...sk} d="M90 95 q20 -18 40 0 M150 92 h160" />
        <path {...sk} d="M60 160 h150 v50 h-150 z M235 160 h150 v50 h-150 z M410 160 h150 v50 h-150 z" />
        <path {...sk} d="M60 240 h500 v130 h-500 z M90 280 h260 M90 310 h200 M90 340 h230" />
        <path {...sk} d="M430 270 l40 70 l40 -70" />
        {/* coffee ring */}
        <circle cx="470" cy="330" r={60} fill="none" stroke={C.coffee} strokeWidth="9" opacity={0.45 * stain} strokeDasharray="330 40" />
        <circle cx="470" cy="330" r={48} fill={C.coffee} opacity={0.08 * stain} />
      </svg>
    </div>
  );
}

function SceneNapkin({ c }: { c: Ctx }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardIn = spring({ frame: f, fps, config: { damping: 15, stiffness: 120 }, durationInFrames: 26 });
  const chars = Array.from(c.t.ask);
  const shown = Math.floor(interpolate(f, [16, 62], [0, chars.length], clamp));
  const peek = spring({ frame: f - 58, fps, config: { damping: 12 } });
  const w = (c.tall ? 660 : 620) * c.u;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: c.fa ? 'rtl' : 'ltr', padding: 80 * c.u, gap: (c.tall ? 60 : 34) * c.u }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22 * c.u, width: '100%', maxWidth: 900 * c.u, opacity: rise(f, 4) }}>
        <div style={{ flex: 'none', width: 104 * c.u, height: 104 * c.u, borderRadius: '50%', background: C.blush, border: `${4 * c.u}px solid ${C.ink}`, display: 'grid', placeItems: 'center', fontFamily: c.body, fontWeight: 900, fontSize: 30 * c.u, color: C.ink }}>
          {c.t.who}
        </div>
        <div style={{ flex: 1, background: C.coralSoft, border: `${4 * c.u}px solid ${C.ink}`, borderRadius: c.fa ? `${40 * c.u}px ${40 * c.u}px ${12 * c.u}px ${40 * c.u}px` : `${40 * c.u}px ${40 * c.u}px ${40 * c.u}px ${12 * c.u}px`, padding: `${26 * c.u}px ${36 * c.u}px`, fontFamily: c.body, fontWeight: 700, fontSize: 44 * c.u, lineHeight: 1.65, color: C.ink, minHeight: 170 * c.u }}>
          {chars.slice(0, shown).join('')}
          <span style={{ visibility: 'hidden' }}>{chars.slice(shown).join('')}</span>
        </div>
      </div>
      <div style={{ position: 'relative', transform: `translateY(${(1 - cardIn) * 260 * c.u}px) rotate(${-4 + (1 - cardIn) * -10}deg)`, opacity: Math.min(1, cardIn * 2) }}>
        <Napkin c={c} w={w} stain={interpolate(f, [30, 56], [0, 1], clamp)} />
        {/* Bit peeks over the napkin's corner */}
        <div style={{ position: 'absolute', top: -118 * c.u, [c.fa ? 'left' : 'right']: 30 * c.u, zIndex: -1, transform: `translateY(${(1 - peek) * 150 * c.u}px) rotate(${c.fa ? -8 : 8}deg)` }}>
          <Bit size={140 * c.u} mood="wow" seed={2} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ───────── Scene 3 · the agent at work (0–125) ───────── */

function StepArt({ i, p, u }: { i: number; p: number; u: number }) {
  const s = 64 * u;
  if (i === 0)
    return (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5Zm0 15A1.5 1.5 0 0 0 5.5 21H19" fill={C.skySoft} stroke={C.ink} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 7h7M8 10h5" stroke={C.ink} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  if (i === 1)
    return (
      <svg width={s} height={s} viewBox="0 0 24 24">
        {[0, 1, 2].map((k) => {
          const d = interpolate(p, [k * 0.25, k * 0.25 + 0.35], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
          return <rect key={k} x={3} y={3 + k * 6.5} width={k === 0 ? 18 : 8 + k * 4} height={5} rx={1.6} fill={[C.coral, C.butter, C.mint][k]} stroke={C.ink} strokeWidth="1.4" opacity={d} transform={`translate(0 ${(1 - d) * -8})`} />;
        })}
      </svg>
    );
  if (i === 2)
    return (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="18" rx="3" fill={C.screen} stroke={C.ink} strokeWidth="1.4" />
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={5 + (k % 2) * 2} y={6.5 + k * 3.4} width={interpolate(p, [k * 0.2, k * 0.2 + 0.3], [0, 7 + ((k * 5) % 7)], clamp)} height="1.8" rx=".9" fill={['#9ff0cf', C.butter, C.sky, '#9ff0cf'][k]} />
        ))}
      </svg>
    );
  return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={C.mintSoft} stroke={C.ink} strokeWidth="1.6" />
      <path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke={C.mintInk} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
    </svg>
  );
}

export const STEP_AT = [40, 58, 76, 94]; // frames (scene-local) when each step starts

function SceneAgent({ c }: { c: Ctx }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const win = spring({ frame: f, fps, config: { damping: 18, stiffness: 140 }, durationInFrames: 22 });
  // the napkin flies into the chat as an attachment
  const fly = interpolate(f, [0, 16], [0, 1], { ...clamp, easing: INOUT });
  const planning = f >= 18 && f < STEP_AT[0];
  const allDone = f >= STEP_AT[3] + 16;
  const rowH = 98 * c.u;
  const current = STEP_AT.reduce((acc, s, i) => (f >= s ? i : acc), 0);
  const bitY = interpolate(f, [STEP_AT[0] - 6, ...STEP_AT.slice(1).map((s) => s - 2)], [0, rowH, rowH * 2, rowH * 3], { ...clamp, easing: INOUT });
  const running = f >= STEP_AT[0] - 6 && !allDone && STEP_AT.some((s) => f > s - 8 && f < s + 4);
  const w = (c.tall ? 820 : 880) * c.u;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: c.fa ? 'rtl' : 'ltr' }}>
      <div style={{ width: w, transform: `scale(${0.94 + win * 0.06})`, opacity: win }}>
        <Sticker u={c.u} style={{ overflow: 'hidden' }}>
          {/* window bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 * c.u, padding: `${16 * c.u}px ${24 * c.u}px`, background: C.paper2, borderBottom: `${4 * c.u}px solid ${C.ink}`, direction: 'ltr' }}>
            {[C.coral, C.butter, C.mint].map((x) => (
              <span key={x} style={{ width: 20 * c.u, height: 20 * c.u, borderRadius: '50%', background: x, border: `${2.5 * c.u}px solid ${C.ink}` }} />
            ))}
            <span style={{ marginInlineStart: 14 * c.u, fontFamily: 'Mono, monospace', fontWeight: 700, fontSize: 26 * c.u, color: C.ink2 }}>agent · cafe-sahar</span>
          </div>
          <div style={{ padding: 30 * c.u, display: 'grid', gap: 22 * c.u }}>
            {/* the prompt, with the napkin attached */}
            <div style={{ display: 'flex', gap: 18 * c.u, alignItems: 'center', justifySelf: 'end', maxWidth: '88%', background: C.coralSoft, border: `${3 * c.u}px solid ${C.ink}`, borderRadius: 26 * c.u, padding: `${16 * c.u}px ${22 * c.u}px` }}>
              <div style={{ flex: 'none', transform: `scale(${2.6 - fly * 1.6}) rotate(${-4 * (1 - fly)}deg)`, transformOrigin: 'center' }}>
                <div style={{ width: 72 * c.u, height: 52 * c.u, borderRadius: 8 * c.u, background: '#fffaf0', border: `${2 * c.u}px solid ${C.line}`, display: 'grid', placeItems: 'center' }}>
                  <svg width={50 * c.u} height={34 * c.u} viewBox="0 0 620 446">
                    <path d="M60 60 h500 v70 h-500 z M60 160 h150 v50 h-150 z M235 160 h150 v50 h-150 z M410 160 h150 v50 h-150 z M60 240 h500 v130 h-500 z" fill="none" stroke={C.ink2} strokeWidth="16" />
                  </svg>
                </div>
              </div>
              <div style={{ fontFamily: c.body, fontWeight: 700, fontSize: 32 * c.u, lineHeight: 1.6, color: C.ink, opacity: rise(f, 10) }}>
                <Txt s={c.t.prompt} />
              </div>
            </div>
            {/* planning */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 * c.u, minHeight: 60 * c.u, opacity: rise(f, 16) }}>
              <span style={{ fontFamily: c.body, fontWeight: 800, fontSize: 32 * c.u, color: C.ink2 }}>
                <Txt s={allDone ? c.t.done : planning || f < STEP_AT[0] ? c.t.planning : c.t.building} />
              </span>
            </div>
            {/* the work */}
            <div style={{ position: 'relative', display: 'grid', paddingInlineStart: 120 * c.u }}>
              <div style={{ position: 'absolute', insetInlineStart: 0, top: 0, transform: `translateY(${bitY}px)` }}>
                <Bit size={92 * c.u} mood={planning ? 'think' : allDone ? 'cheer' : 'happy'} lean={running ? (c.fa ? -10 : 10) : 0} hopAt={STEP_AT[3] + 16} seed={1} />
              </div>
              {c.t.steps.map((label, i) => {
                const p = interpolate(f, [STEP_AT[i], STEP_AT[i] + 14], [0, 1], clamp);
                const on = interpolate(f, [STEP_AT[i] + 12, STEP_AT[i] + 16], [0, 1], { ...clamp, easing: Easing.out(Easing.back(3)) });
                const vis = rise(f, STEP_AT[i] - 6, 10);
                return (
                  <div key={i} style={{ height: rowH, display: 'flex', alignItems: 'center', gap: 20 * c.u, opacity: 0.25 + vis * 0.75, transform: `translateY(${(1 - vis) * 10 * c.u}px)` }}>
                    <StepArt i={i} p={p} u={c.u} />
                    <span style={{ flex: 1, fontFamily: c.body, fontWeight: 800, fontSize: 38 * c.u, color: C.ink, outline: i === current && !allDone && f >= STEP_AT[0] ? 'none' : undefined }}>
                      <Txt s={label} />
                    </span>
                    <Check size={52 * c.u} on={on} />
                  </div>
                );
              })}
            </div>
          </div>
        </Sticker>
      </div>
    </AbsoluteFill>
  );
}

/* ───────── Scene 4 · Codex or Lovable (0–110) ───────── */

function ScenePaths({ c }: { c: Ctx }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const open = spring({ frame: f - 4, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 26 });
  const build = interpolate(f, [26, 62], [0, 1], clamp);
  const colW = (c.tall ? 560 : 470) * c.u;
  const chips = ['Claude Code', 'Grok', 'DeepSeek'];
  const panel = (kind: 'codex' | 'lovable', side: 1 | -1) => {
    const dark = kind === 'codex';
    return (
      <div style={{ width: colW, transform: `translateX(${side * (1 - open) * 160 * c.u}px) rotate(${side * (1 - open) * 4}deg)`, opacity: open }}>
        <Sticker u={c.u} shadow={8} style={{ overflow: 'hidden', background: dark ? '#1f2a27' : C.blushSoft }}>
          <div style={{ padding: `${14 * c.u}px ${20 * c.u}px`, background: dark ? '#141c1a' : C.blush, borderBottom: `${4 * c.u}px solid ${C.ink}`, fontFamily: 'Mono, monospace', fontWeight: 800, fontSize: 34 * c.u, color: dark ? '#9ff0cf' : C.ink, direction: 'ltr' }}>
            {dark ? '> Codex' : '♥ Lovable'}
          </div>
          <div style={{ padding: 18 * c.u, display: 'grid', gap: 10 * c.u, minHeight: 120 * c.u, direction: 'ltr' }}>
            {(dark ? ['$ git push', '✓ tests 12/12', '✓ deploy'] : ['“Add a booking form”', '✓ preview updated', '✓ published']).map((l, i) => (
              <div key={l} style={{ fontFamily: 'Mono, monospace', fontSize: 24 * c.u, color: dark ? (i ? '#9ff0cf' : '#f7ede1') : C.ink, opacity: rise(f, 14 + i * 7, 8) }}>
                {l}
              </div>
            ))}
          </div>
          <div style={{ background: C.card, borderTop: `${4 * c.u}px solid ${C.ink}` }}>
            <MiniSite c={c} w={colW - 8 * c.u} build={build} />
          </div>
        </Sticker>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: c.fa ? 'rtl' : 'ltr', gap: (c.tall ? 56 : 30) * c.u }}>
      <div style={{ fontFamily: c.display, fontSize: 84 * c.u, color: C.ink, opacity: rise(f, 0), fontWeight: c.fa ? 400 : 800 }}>{c.t.pick}</div>
      <div style={{ display: 'flex', gap: 34 * c.u, alignItems: 'flex-start', flexDirection: c.tall ? 'column' : 'row' }}>
        {panel('codex', c.fa ? 1 : -1)}
        {panel('lovable', c.fa ? -1 : 1)}
      </div>
      <div style={{ display: 'flex', gap: 14 * c.u, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ fontFamily: c.body, fontWeight: 800, fontSize: 32 * c.u, color: C.ink2, opacity: rise(f, 64) }}>{c.fa ? 'و' : 'plus'}</span>
        {chips.map((x, i) => {
          const p = spring({ frame: f - 68 - i * 6, fps, config: { damping: 11, stiffness: 160 } });
          return (
            <span key={x} style={{ direction: 'ltr', fontFamily: 'Mono, monospace', fontWeight: 800, fontSize: 30 * c.u, padding: `${10 * c.u}px ${22 * c.u}px`, borderRadius: 999, border: `${3 * c.u}px solid ${C.ink}`, background: [C.skySoft, C.butterSoft, C.mintSoft][i], color: C.ink, transform: `scale(${0.6 + p * 0.4})`, opacity: Math.min(1, p * 1.5) }}>
              {x}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

/* ───────── Scene 5 · live, with a real booking (0–110) ───────── */

function SceneLive({ c }: { c: Ctx }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const url = 'cafe-sahar.ir';
  const typed = Math.floor(interpolate(f, [6, 26], [0, url.length], clamp));
  const lock = interpolate(f, [28, 34], [0, 1], { ...clamp, easing: Easing.out(Easing.back(3)) });
  const page = interpolate(f, [32, 58], [0, 1], clamp);
  const phone = spring({ frame: f - 56, fps, config: { damping: 13, stiffness: 120 } });
  const notif = spring({ frame: f - 68, fps, config: { damping: 16, stiffness: 160 } });
  const pw = (c.tall ? 280 : 240) * c.u;
  const bw = (c.tall ? 800 : 800) * c.u;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: c.fa ? 'rtl' : 'ltr', gap: (c.tall ? 60 : 30) * c.u }}>
      <div style={{ fontFamily: c.display, fontSize: 104 * c.u, color: C.ink, fontWeight: c.fa ? 400 : 800, transform: `scale(${0.85 + rise(f, 34, 12) * 0.15})`, opacity: rise(f, 34, 10) }}>{c.t.live}</div>
      <div style={{ position: 'relative' }}>
        <Sticker u={c.u} style={{ width: bw, overflow: 'hidden', opacity: rise(f, 0, 10), transform: `translateY(${(1 - rise(f, 0, 14)) * 30 * c.u}px)` }}>
          <div style={{ direction: 'ltr', display: 'flex', alignItems: 'center', gap: 12 * c.u, padding: `${16 * c.u}px ${24 * c.u}px`, background: C.paper2, borderBottom: `${4 * c.u}px solid ${C.ink}`, fontFamily: 'Mono, monospace', fontSize: 34 * c.u, fontWeight: 700, color: C.mintInk }}>
            <svg width={32 * c.u} height={32 * c.u} viewBox="0 0 24 24">
              <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill={lock > 0 ? C.mintInk : C.ink2} />
              <path d={`M8 10.5V8a4 4 0 0 1 8 0v${2.5 - (1 - lock) * -2}`} fill="none" stroke={lock > 0 ? C.mintInk : C.ink2} strokeWidth="2.4" transform={`translate(0 ${(1 - lock) * -2.5})`} />
            </svg>
            <span>
              https://{url.slice(0, typed)}
              {typed < url.length && <span style={{ display: 'inline-block', width: 3 * c.u, height: 34 * c.u, background: C.ink, marginInlineStart: 3 * c.u, verticalAlign: 'middle', opacity: f % 16 < 8 ? 1 : 0 }} />}
            </span>
          </div>
          <MiniSite c={c} w={bw - 8 * c.u} build={page} />
        </Sticker>
        {/* the phone with a real booking */}
        <div style={{ position: 'absolute', [c.fa ? 'left' : 'right']: (c.tall ? -10 : -105) * c.u, bottom: (c.tall ? -300 : -70) * c.u, transform: `translateY(${(1 - phone) * 420 * c.u}px) rotate(${c.fa ? -6 : 6}deg)` }}>
          <div style={{ width: pw, height: pw * 1.55, borderRadius: 46 * c.u, background: C.ink, padding: 12 * c.u, boxShadow: `0 ${24 * c.u}px ${50 * c.u}px rgba(42,33,27,.3)` }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 36 * c.u, background: `linear-gradient(160deg, ${C.butterSoft}, ${C.coralSoft})`, position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  insetInline: 12 * c.u,
                  top: 26 * c.u,
                  padding: `${14 * c.u}px ${16 * c.u}px`,
                  borderRadius: 22 * c.u,
                  background: 'rgba(255,253,249,.96)',
                  border: `${2.5 * c.u}px solid ${C.ink}`,
                  transform: `translateY(${(1 - notif) * -140 * c.u}px)`,
                  opacity: Math.min(1, notif * 1.4),
                  direction: c.fa ? 'rtl' : 'ltr',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 * c.u, fontFamily: c.body, fontWeight: 900, fontSize: 22 * c.u, color: C.ink2 }}>
                  <Cup size={28 * c.u} /> {c.t.cafe} <span style={{ marginInlineStart: 'auto', fontWeight: 700 }}>{c.t.now}</span>
                </div>
                <div style={{ fontFamily: c.body, fontWeight: 900, fontSize: 27 * c.u, color: C.ink, marginTop: 6 * c.u, lineHeight: 1.4 }}>{c.t.notif}</div>
              </div>
              <div style={{ position: 'absolute', bottom: 34 * c.u, insetInline: 0, display: 'grid', placeItems: 'center', opacity: notif }}>
                <Bit size={110 * c.u} mood="wink" seed={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ───────── Scene 6 · your turn (0–125) ───────── */

function Confetti({ f, u, w, h }: { f: number; u: number; w: number; h: number }) {
  const colors = [C.coral, C.butter, C.mint, C.sky, C.blush];
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: 70 }, (_, i) => {
        const a = random(`a${i}`) * Math.PI * 2;
        const v = (0.45 + random(`v${i}`) * 0.7) * 15 * u;
        const t = Math.max(0, f - 2);
        const x = w / 2 + Math.cos(a) * v * t;
        const y = h * 0.36 + Math.sin(a) * v * t * 0.9 + 0.16 * u * t * t;
        const life = interpolate(t, [0, 6, 70, 90], [0, 1, 1, 0], clamp);
        const sz = (10 + random(`s${i}`) * 14) * u;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: sz,
              height: sz * (random(`r${i}`) > 0.5 ? 0.45 : 1),
              borderRadius: random(`c${i}`) > 0.6 ? '50%' : 3 * u,
              background: colors[i % colors.length],
              border: `${2 * u}px solid ${C.ink}`,
              transform: `rotate(${t * (6 + random(`w${i}`) * 14)}deg)`,
              opacity: life,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}

function SceneHero({ c }: { c: Ctx }) {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const bitIn = spring({ frame: f, fps, config: { damping: 12, stiffness: 140 } });
  const press = interpolate(f, [74, 78, 86], [1, 0.95, 1], { ...clamp, easing: OUT });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: c.fa ? 'rtl' : 'ltr', gap: (c.tall ? 40 : 18) * c.u }}>
      <Confetti f={f} u={c.u} w={width} h={height} />
      <div style={{ transform: `scale(${0.7 + bitIn * 0.3})`, opacity: Math.min(1, bitIn * 2) }}>
        <Bit size={(c.tall ? 280 : 230) * c.u} mood="cheer" hopAt={6} />
      </div>
      <div style={{ fontFamily: c.display, fontSize: (c.fa ? 112 : 96) * c.u, color: C.ink, lineHeight: 1.15, fontWeight: c.fa ? 400 : 800, opacity: rise(f, 12), transform: `translateY(${(1 - rise(f, 12)) * 18 * c.u}px)` }}>{c.t.turn}</div>
      <div style={{ display: 'flex', gap: 12 * c.u, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 940 * c.u }}>
        {c.t.stats.map((s, i) => {
          const p = spring({ frame: f - 26 - i * 5, fps, config: { damping: 12, stiffness: 170 } });
          return (
            <span key={s} style={{ fontFamily: c.body, fontWeight: 900, fontSize: 36 * c.u, padding: `${10 * c.u}px ${24 * c.u}px`, borderRadius: 999, border: `${3.5 * c.u}px solid ${C.ink}`, background: [C.butterSoft, C.mintSoft, C.skySoft, C.blushSoft][i], color: C.ink, transform: `scale(${0.6 + p * 0.4})`, opacity: Math.min(1, p * 1.5) }}>
              <Txt s={s} />
            </span>
          );
        })}
      </div>
      <div style={{ opacity: rise(f, 50), transform: `translateY(${(1 - rise(f, 50)) * 16 * c.u}px) scale(${press})` }}>
        <Sticker u={c.u} shadow={8} style={{ background: C.coral, padding: `${20 * c.u}px ${48 * c.u}px`, borderRadius: 999, direction: 'ltr', fontFamily: 'Mono, monospace', fontWeight: 800, fontSize: 54 * c.u, color: C.ink }}>
          start.ahouei.site
        </Sticker>
      </div>
      <div style={{ fontFamily: c.body, fontWeight: 800, fontSize: 28 * c.u, color: C.ink2, opacity: rise(f, 80) }}>{c.t.credit} ♥</div>
    </AbsoluteFill>
  );
}

/* ───────── The film ───────── */

const SCENES = [
  { from: 0, dur: 80 }, // zero → Bit
  { from: 76, dur: 88 }, // napkin
  { from: 160, dur: 126 }, // agent
  { from: 282, dur: 106 }, // paths
  { from: 384, dur: 104 }, // live
  { from: 484, dur: 116 }, // your turn
];

export const TrailerV2 = ({ lang }: TrailerProps) => {
  useFonts();
  const c = useCtx(lang);
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const Scenes = [SceneZero, SceneNapkin, SceneAgent, ScenePaths, SceneLive, SceneHero];
  // Paper background with two soft blobs that drift through the whole film.
  const bx = Math.sin(f / 90) * 60 * c.u;
  const by = Math.cos(f / 110) * 50 * c.u;
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: 'hidden' }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${C.line} ${2 * c.u}px, transparent ${2.2 * c.u}px)`, backgroundSize: `${34 * c.u}px ${34 * c.u}px` }} />
      <div style={{ position: 'absolute', width: 640 * c.u, height: 640 * c.u, borderRadius: '50%', background: C.butterSoft, filter: `blur(${10 * c.u}px)`, opacity: 0.8, left: -200 * c.u + bx, top: -180 * c.u + by }} />
      <div style={{ position: 'absolute', width: 560 * c.u, height: 560 * c.u, borderRadius: '50%', background: C.mintSoft, filter: `blur(${10 * c.u}px)`, opacity: 0.7, right: -180 * c.u - bx, bottom: -160 * c.u - by }} />
      {SCENES.map((s, i) => {
        const S = Scenes[i];
        // Each scene: quick fade + a gentle push-in (one continuous camera feel); 6-frame overlaps.
        const op = interpolate(f, [s.from, s.from + 6, s.from + s.dur - 6, s.from + s.dur], [i === 0 ? 1 : 0, 1, 1, i === SCENES.length - 1 ? 1 : 0], clamp);
        const zoom = interpolate(f, [s.from, s.from + s.dur], [1, 1.035], clamp);
        return (
          <Sequence key={i} from={s.from} durationInFrames={s.dur}>
            <AbsoluteFill style={{ opacity: op, transform: `scale(${zoom})` }}>
              <S c={c} />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* sound design (frame-accurate) */}
      <Sfx at={1} name="draw" volume={0.5} />
      <Sfx at={20} name="whoosh" volume={0.45} />
      <Sfx at={34} name="pop" />
      <Sfx at={58} name="thud" volume={0.6} />
      <Sfx at={78} name="whoosh" volume={0.5} />
      {Array.from({ length: 14 }, (_, i) => (
        <Sfx key={`k${i}`} at={92 + i * 3} name="tick" volume={0.35} />
      ))}
      <Sfx at={136} name="pop" volume={0.5} />
      <Sfx at={160} name="whoosh" volume={0.5} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={`c${i}`} at={160 + [40, 58, 76, 94][i] + 13} name="check" volume={0.55} />
      ))}
      <Sfx at={160 + 94 + 16} name="pop" volume={0.6} />
      <Sfx at={284} name="whoosh" volume={0.55} />
      {[0, 1, 2].map((i) => (
        <Sfx key={`p${i}`} at={282 + 68 + i * 6} name="pop" volume={0.45} />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <Sfx key={`u${i}`} at={384 + 6 + i * 3} name="tick" volume={0.35} />
      ))}
      <Sfx at={384 + 28} name="snap" volume={0.7} />
      <Sfx at={384 + 34} name="pop" volume={0.55} />
      <Sfx at={384 + 68} name="ding" volume={0.75} />
      <Sfx at={486} name="sparkle" volume={0.7} />
      <Sfx at={490} name="pop" volume={0.6} />
      <Sfx at={484 + 50} name="chime" volume={0.8} />
    </AbsoluteFill>
  );
};

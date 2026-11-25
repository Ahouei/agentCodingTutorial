import { useEffect, useState } from 'react';
import { AbsoluteFill, Easing, Sequence, continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * 20-second trailer (RD-11): Bit builds Café Sahar.
 * 0–3s intro · 3–7s Sahar's request · 7–13s the agent works · 13–17.5s the live site · 17.5–20s call to action.
 * Same sticker style and palette as the site. 1080×1080 for Telegram/Instagram.
 */
const C = { paper: '#fbf6ee', card: '#fffdf9', ink: '#2a211b', ink2: '#6b5e52', coral: '#ef6a4c', coralSoft: '#fde3da', butter: '#ffd36a', mint: '#8fd5b5', sky: '#a6cdf3', blush: '#f6bccb', line: '#e6d9c6' };
const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);
const FA = 'Vazir, sans-serif';
const DISPLAY = 'Lalezar, Vazir, serif';

function useFonts() {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const faces = [
      new FontFace('Lalezar', `url(${staticFile('fonts/lalezar-arabic-400-normal.woff2')})`, { unicodeRange: 'U+0600-06FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF' }),
      new FontFace('Lalezar', `url(${staticFile('fonts/lalezar-latin-400-normal.woff2')})`, { unicodeRange: 'U+0000-00FF' }),
      new FontFace('Vazir', `url(${staticFile('fonts/vazirmatn-arabic-wght-normal.woff2')})`, { weight: '100 900', unicodeRange: 'U+0600-06FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF' }),
      new FontFace('Vazir', `url(${staticFile('fonts/vazirmatn-latin-wght-normal.woff2')})`, { weight: '100 900', unicodeRange: 'U+0000-00FF' }),
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

const rise = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT });

type BitMood = 'happy' | 'think' | 'wow' | 'cheer';

/**
 * Bit, frame-driven (no CSS animations in Remotion). Same moves as the site's Bit:
 * breathing, smooth blinks, antenna wiggle, a squash-and-stretch hop at `hopAt`, an arm
 * that rises from the shoulder and waves, a syllable-rhythm mouth while `talking`, and
 * both arms up when cheering.
 */
function Bit({
  size = 260,
  mood = 'happy',
  look = 0,
  wave = false,
  talking = false,
  hopAt,
}: {
  size?: number;
  mood?: BitMood;
  look?: number;
  wave?: boolean;
  talking?: boolean;
  hopAt?: number;
}) {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
  // Blink: eyes squash closed and open over 6 frames, every 96 frames.
  const bp = frame % 96;
  const blinkY = interpolate(bp, [88, 91, 94], [1, 0.1, 1], clamp);
  const breathe = Math.sin(frame / 17) * 1.4;
  const wiggle = Math.sin(frame / 9) * 7;
  // Hop: anticipation squash, stretch up, land squash, settle.
  let hopY = 0;
  let sx = 1;
  let sy = 1;
  if (hopAt !== undefined) {
    const t = frame - hopAt;
    const k = [0, 3, 9, 14, 18, 22];
    hopY = interpolate(t, k, [0, 2, -14, 0, -2, 0], clamp);
    sy = interpolate(t, k, [1, 0.9, 1.07, 0.93, 1.02, 1], clamp);
    sx = interpolate(t, k, [1, 1.06, 0.96, 1.05, 0.99, 1], clamp);
  }
  const cheer = mood === 'cheer';
  // Arms rotate from the shoulders.
  const raised = wave || cheer ? -95 + Math.sin(frame / 4.5) * 14 : 0;
  const leftRaised = cheer ? 95 - Math.sin(frame / 4.5) * 14 : 0;
  // Talking: an uneven rhythm built from two sines.
  const mouth = talking ? 0.35 + Math.abs(Math.sin(frame / 2.3) * 0.6 + Math.sin(frame / 5.1) * 0.35) : 1;
  const EYE = '#9ff0cf';
  const eyes =
    mood === 'happy' || cheer ? (
      <g fill="none" stroke={EYE} strokeWidth="4.5" strokeLinecap="round">
        <path d="M44 60 q6 -8 12 0" />
        <path d="M64 60 q6 -8 12 0" />
      </g>
    ) : mood === 'wow' ? (
      <g fill={EYE}>
        <circle cx="50" cy="57" r="7.5" />
        <circle cx="70" cy="57" r="7.5" />
      </g>
    ) : (
      <g fill={EYE}>
        <rect x="46" y="49" width="8" height="10" rx="4" />
        <rect x="66" y="49" width="8" height="10" rx="4" />
      </g>
    );
  return (
    <svg viewBox="0 0 120 132" width={size} height={size * 1.1} style={{ overflow: 'visible' }}>
      <ellipse cx="60" cy="127" rx={30 - breathe} ry="4" fill={C.ink} opacity="0.12" />
      <g transform={`translate(0 ${hopY + breathe * -1}) translate(60 126) scale(${sx} ${sy}) translate(-60 -126)`}>
        <g transform={`rotate(${wiggle} 60 22)`}>
          <line x1="60" y1="22" x2="60" y2="9" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="8" r="6" fill={C.coral} stroke={C.ink} strokeWidth="2.5" />
        </g>
        <rect x="11" y="48" width="10" height="22" rx="5" fill={C.mint} stroke={C.ink} strokeWidth="2.5" />
        <rect x="99" y="48" width="10" height="22" rx="5" fill={C.mint} stroke={C.ink} strokeWidth="2.5" />
        <path d="M26 98 q-10 6 -8 16" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round" transform={`rotate(${leftRaised} 26 98)`} />
        <path d="M94 98 q10 6 8 16" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round" transform={`rotate(${raised} 94 98)`} />
        <rect x="28" y="88" width="64" height="34" rx="14" fill="#ffe6ad" stroke={C.ink} strokeWidth="2.5" />
        <rect x="51" y="97" width="18" height="10" rx="5" fill={C.coral} stroke={C.ink} strokeWidth="2" />
        <rect x="18" y="22" width="84" height="70" rx="26" fill="#fff0cc" stroke={C.ink} strokeWidth="2.5" />
        <rect x="30" y="34" width="60" height="44" rx="16" fill="#243530" stroke={C.ink} strokeWidth="2" />
        <g transform={`translate(${look * 4} 0)`}>
          <g transform={`translate(0 57) scale(1 ${mood === 'happy' || cheer ? 1 : blinkY}) translate(0 -57)`}>{eyes}</g>
          {mood === 'think' ? (
            <g fill={EYE}>
              {[52, 60, 68].map((x, i) => (
                <circle key={x} cx={x} cy={70 - Math.max(0, Math.sin((frame - i * 4) / 4)) * 2.5} r="1.8" />
              ))}
            </g>
          ) : talking ? (
            <ellipse cx="60" cy="70" rx="5" ry={3.2 * mouth} fill={EYE} />
          ) : cheer ? (
            <path d="M52 66 q8 10 16 0 Z" fill={EYE} stroke={EYE} strokeWidth="2" strokeLinejoin="round" />
          ) : (
            <path d="M53 68 q7 6 14 0" fill="none" stroke={EYE} strokeWidth="3.5" strokeLinecap="round" />
          )}
        </g>
        <ellipse cx="27" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6" />
        <ellipse cx="93" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6" />
      </g>
    </svg>
  );
}

const Sticker = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: C.card, border: `4px solid ${C.ink}`, borderRadius: 36, boxShadow: `-10px 10px 0 ${C.ink}`, ...style }}>{children}</div>
);

const Lat = ({ children }: { children: React.ReactNode }) => <bdi style={{ unicodeBidi: 'isolate' }}>{children}</bdi>;

function Intro() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: f, fps, config: { damping: 200 }, durationInFrames: 22 });
  const line = rise(f, 18, 30);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: 'rtl', gap: 24 }}>
      <div style={{ transform: `translateY(${(1 - pop) * 40}px) scale(${0.92 + pop * 0.08})`, opacity: pop }}>
        <Bit size={300} wave={f > 14 && f < 84} hopAt={10} />
      </div>
      <div style={{ fontFamily: DISPLAY, fontSize: 150, color: C.ink, opacity: rise(f, 6), transform: `translateY(${(1 - rise(f, 6)) * 20}px)`, lineHeight: 1.1 }}>
        از صفر تا قهرمان
      </div>
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" style={{ width: 640, height: 26, marginTop: -26 }}>
        <path d="M197 12 C 120 4, 50 4, 3 14" fill="none" stroke={C.coral} strokeWidth="7" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - line} />
      </svg>
      <div style={{ fontFamily: FA, fontWeight: 700, fontSize: 40, color: C.ink2, opacity: rise(f, 30) }}>
        ساخت وب‌سایت با <Lat>Agentic AI</Lat>، حتی بدون برنامه‌نویسی
      </div>
    </AbsoluteFill>
  );
}

function Request() {
  const f = useCurrentFrame();
  const text = 'یک وب‌سایت برای کافه‌ام می‌خواهم: منو، ساعت کاری و رزرو میز. روی دامنه خودم.';
  const shown = Math.floor(interpolate(f, [8, 90], [0, text.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: 'rtl', padding: 90 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, opacity: rise(f, 0), width: '100%' }}>
        <div style={{ flex: 'none', width: 110, height: 110, borderRadius: '50%', background: C.blush, border: `4px solid ${C.ink}`, display: 'grid', placeItems: 'center', fontFamily: FA, fontWeight: 900, fontSize: 34 }}>سحر</div>
        <div style={{ flex: 1, background: C.coralSoft, border: `4px solid ${C.ink}`, borderRadius: '44px 44px 44px 12px', padding: '36px 44px', fontFamily: FA, fontSize: 50, lineHeight: 1.75, minHeight: 300, color: C.ink }}>
          {text.slice(0, shown)}
          {shown < text.length && <span style={{ display: 'inline-block', width: 5, height: 52, background: C.ink, verticalAlign: -8, marginInlineStart: 4, opacity: f % 20 < 10 ? 1 : 0 }} />}
        </div>
      </div>
    </AbsoluteFill>
  );
}

const STEPS: React.ReactNode[] = [
  <>ساخت <Lat>Repository</Lat> در <Lat>GitHub</Lat></>,
  <>طرح اولیه؛ سحر تأیید کرد</>,
  <>نوشتن کد منو و فرم رزرو</>,
  <>استقرار <Lat>Worker</Lat> روی <Lat>Cloudflare</Lat></>,
  <>اتصال دامنه و <Lat>HTTPS</Lat></>,
];

function Agent() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ direction: 'rtl', padding: 80, gap: 26, justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <Bit size={170} mood={f < 34 ? 'think' : 'happy'} look={Math.sin(f / 12)} hopAt={34} talking={f >= 36 && f < 80} />
        <div style={{ fontFamily: DISPLAY, fontSize: 84, color: C.ink, opacity: rise(f, 0) }}>{f < 34 ? 'دارم برنامه‌ریزی می‌کنم…' : 'Agent دست‌به‌کار شد'}</div>
      </div>
      <Sticker style={{ padding: '30px 40px', display: 'grid', gap: 18 }}>
        {STEPS.map((s, i) => {
          const t = rise(f, 30 + i * 26, 16);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: 0.18 + t * 0.82, transform: `translateY(${(1 - t) * 14}px)`, fontFamily: FA, fontWeight: 700, fontSize: 46, color: C.ink }}>
              <span style={{ flex: 'none', width: 58, height: 58, borderRadius: '50%', background: t > 0.5 ? C.mint : C.line, border: `4px solid ${C.ink}`, display: 'grid', placeItems: 'center' }}>
                {t > 0.5 && (
                  <svg width="30" height="30" viewBox="0 0 24 24">
                    <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke={C.ink} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span>{s}</span>
            </div>
          );
        })}
      </Sticker>
    </AbsoluteFill>
  );
}

function Site() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: f, fps, config: { damping: 200 }, durationInFrames: 24 });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
      <div style={{ transform: `translateY(${(1 - pop) * 60}px) scale(${0.94 + pop * 0.06})`, opacity: pop, width: 820 }}>
        <Sticker style={{ overflow: 'hidden', borderRadius: 44 }}>
          <div style={{ direction: 'ltr', display: 'flex', alignItems: 'center', gap: 12, padding: '18px 26px', background: '#f1e6d4', borderBottom: `4px solid ${C.ink}`, fontFamily: 'Mono, monospace', fontSize: 34, color: '#2c7a57', fontWeight: 600 }}>
            <svg width="30" height="30" viewBox="0 0 24 24">
              <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#2c7a57" />
              <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="#2c7a57" strokeWidth="2.4" />
            </svg>
            https://cafe-sahar.ir
          </div>
          <div style={{ padding: 36, display: 'grid', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 26, padding: 30, borderRadius: 30, background: C.coralSoft }}>
              <svg width="110" height="110" viewBox="0 0 48 48">
                <path d="M10 18h24v10a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10Z" fill="#fff4dc" stroke={C.ink} strokeWidth="2.5" />
                <path d="M34 21h3a5 5 0 0 1 0 10h-3" fill="none" stroke={C.ink} strokeWidth="2.5" />
                <path d="M18 8c0 3-3 3-3 6M25 8c0 3-3 3-3 6" fill="none" stroke={C.coral} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div>
                <div style={{ fontFamily: DISPLAY, fontSize: 88, lineHeight: 1.2 }}>کافه سحر</div>
                <div style={{ fontFamily: FA, fontSize: 36, color: C.ink2 }}>هر روز ۸ صبح تا ۱۱ شب</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 18 }}>
              {['منو', 'رزرو میز', 'تماس'].map((x, i) => (
                <div key={x} style={{ flex: 1, textAlign: 'center', padding: '20px 8px', borderRadius: 24, border: `4px solid ${C.ink}`, background: i === 1 ? C.butter : '#fff', fontFamily: FA, fontWeight: 900, fontSize: 40, opacity: rise(f, 14 + i * 6) }}>
                  {x}
                </div>
              ))}
            </div>
          </div>
        </Sticker>
      </div>
      <div style={{ position: 'absolute', top: 70, fontFamily: DISPLAY, fontSize: 70, color: C.ink, opacity: rise(f, 20) }}>یک ساعت بعد: سایت زنده است!</div>
    </AbsoluteFill>
  );
}

function Outro() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', direction: 'rtl', gap: 26 }}>
      <Bit size={230} mood="cheer" hopAt={4} />
      <div style={{ fontFamily: DISPLAY, fontSize: 96, color: C.ink, opacity: rise(f, 0) }}>نوبت شماست</div>
      <div style={{ fontFamily: FA, fontWeight: 700, fontSize: 40, color: C.ink2, opacity: rise(f, 8) }}>
        ۲۰ فصل · مسیر <Lat>Codex</Lat> یا <Lat>Lovable</Lat> · رایگان
      </div>
      <div style={{ opacity: rise(f, 14), transform: `scale(${0.96 + rise(f, 14) * 0.04})` }}>
        <Sticker style={{ background: C.coral, padding: '22px 44px', borderRadius: 999, direction: 'ltr', fontFamily: 'Mono, monospace', fontWeight: 700, fontSize: 52, color: C.ink }}>start.ahouei.site</Sticker>
      </div>
    </AbsoluteFill>
  );
}

export const Trailer = () => {
  useFonts();
  const f = useCurrentFrame();
  // Short crossfades between scenes; the background never cuts.
  const fade = (start: number, end: number) =>
    interpolate(f, [start, start + 8, end - 8, end], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: C.paper, backgroundImage: `radial-gradient(${C.line} 2px, transparent 2.2px)`, backgroundSize: '34px 34px' }}>
      <Sequence from={0} durationInFrames={92}><AbsoluteFill style={{ opacity: fade(-8, 92) }}><Intro /></AbsoluteFill></Sequence>
      <Sequence from={90} durationInFrames={122}><AbsoluteFill style={{ opacity: fade(90, 212) }}><Request /></AbsoluteFill></Sequence>
      <Sequence from={210} durationInFrames={182}><AbsoluteFill style={{ opacity: fade(210, 392) }}><Agent /></AbsoluteFill></Sequence>
      <Sequence from={390} durationInFrames={137}><AbsoluteFill style={{ opacity: fade(390, 527) }}><Site /></AbsoluteFill></Sequence>
      <Sequence from={525} durationInFrames={75}><AbsoluteFill style={{ opacity: fade(525, 608) }}><Outro /></AbsoluteFill></Sequence>
    </AbsoluteFill>
  );
};

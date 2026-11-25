import { Easing, interpolate, useCurrentFrame } from 'remotion';

/**
 * Bit for video: the site's mascot, driven frame by frame (no CSS animations in Remotion).
 * Moves: breathing, blinks, antenna wiggle, a squash-and-stretch hop at `hopAt`, arms that rise
 * from the shoulder (wave / cheer), a syllable-rhythm mouth while talking, eyes that look sideways,
 * and `assemble` (0→1) which builds Bit around his screen for the "zero becomes Bit" opening.
 */
export type BitMood = 'happy' | 'calm' | 'think' | 'wow' | 'wink' | 'cheer';

const INK = '#2a211b';
const EYE = '#9ff0cf';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export function Bit({
  size = 260,
  mood = 'happy',
  look = 0,
  wave = false,
  talking = false,
  hopAt,
  assemble = 1,
  faceOn = 1,
  lean = 0,
  seed = 0,
}: {
  size?: number;
  mood?: BitMood;
  look?: number;
  wave?: boolean;
  talking?: boolean;
  hopAt?: number;
  /** 0 = only the screen, 1 = the whole robot. Parts pop in with a stagger. */
  assemble?: number;
  /** Fades the face (eyes + mouth) in, 0..1. */
  faceOn?: number;
  /** Lean while running, in degrees. */
  lean?: number;
  /** Offsets the blink and wiggle phase so two Bits don't move in unison. */
  seed?: number;
}) {
  const now = useCurrentFrame();
  const frame = now + seed * 37;
  const bp = frame % 96;
  const blinkY = interpolate(bp, [88, 91, 94], [1, 0.1, 1], clamp);
  const breathe = Math.sin(frame / 17) * 1.4;
  const wiggle = Math.sin(frame / 9) * 7;

  let hopY = 0;
  let sx = 1;
  let sy = 1;
  if (hopAt !== undefined) {
    const t = now - hopAt;
    const k = [0, 3, 9, 14, 18, 22];
    hopY = interpolate(t, k, [0, 2, -16, 0, -2.5, 0], clamp);
    sy = interpolate(t, k, [1, 0.88, 1.08, 0.92, 1.02, 1], clamp);
    sx = interpolate(t, k, [1, 1.07, 0.95, 1.06, 0.99, 1], clamp);
  }

  // Assemble: each part scales in from its own centre, one after another.
  const part = (i: number) => interpolate(assemble, [i * 0.14, i * 0.14 + 0.3], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.8)) });
  const pop = (i: number, cx: number, cy: number) => {
    const p = part(i);
    return { transform: `translate(${cx}px, ${cy}px) scale(${Math.max(p, 0.0001)}) translate(${-cx}px, ${-cy}px)`, opacity: Math.min(1, p * 3) };
  };

  const cheer = mood === 'cheer';
  const raised = wave || cheer ? -95 + Math.sin(frame / 4.5) * 14 : 0;
  const leftRaised = cheer ? 95 - Math.sin(frame / 4.5) * 14 : 0;
  const mouthOpen = talking ? 0.35 + Math.abs(Math.sin(frame / 2.3) * 0.6 + Math.sin(frame / 5.1) * 0.35) : 1;

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
        <circle cx="52.5" cy="54.5" r="2.2" fill="#1d2a26" />
        <circle cx="72.5" cy="54.5" r="2.2" fill="#1d2a26" />
      </g>
    ) : mood === 'wink' ? (
      <g>
        <rect x="45" y="51" width="9" height="13" rx="4.5" fill={EYE} />
        <path d="M64 58 q6 -6 12 0" fill="none" stroke={EYE} strokeWidth="4.5" strokeLinecap="round" />
      </g>
    ) : mood === 'think' ? (
      <g fill={EYE}>
        <rect x="46" y="49" width="8" height="10" rx="4" />
        <rect x="66" y="49" width="8" height="10" rx="4" />
      </g>
    ) : (
      <g fill={EYE}>
        <rect x="45" y="51" width="9" height="13" rx="4.5" />
        <rect x="66" y="51" width="9" height="13" rx="4.5" />
      </g>
    );
  const blinks = !(mood === 'happy' || cheer);

  return (
    <svg viewBox="0 0 120 132" width={size} height={size * 1.1} style={{ overflow: 'visible' }}>
      <ellipse cx="60" cy="127" rx={30 - breathe} ry="4" fill={INK} opacity={0.12 * part(2)} />
      <g transform={`rotate(${lean} 60 126) translate(0 ${hopY - breathe}) translate(60 126) scale(${sx} ${sy}) translate(-60 -126)`}>
        <g style={pop(3, 60, 20)}>
          <g transform={`rotate(${wiggle} 60 22)`}>
            <line x1="60" y1="22" x2="60" y2="9" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="8" r="6" fill="#ef6a4c" stroke={INK} strokeWidth="2.5" />
            <circle cx="58" cy="6" r="1.8" fill="#fff" opacity="0.8" />
          </g>
        </g>
        <g style={pop(2, 60, 59)}>
          <rect x="11" y="48" width="10" height="22" rx="5" fill="#8fd5b5" stroke={INK} strokeWidth="2.5" />
          <rect x="99" y="48" width="10" height="22" rx="5" fill="#8fd5b5" stroke={INK} strokeWidth="2.5" />
        </g>
        <g style={pop(4, 60, 100)}>
          <path d="M26 98 q-10 6 -8 16" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" transform={`rotate(${leftRaised} 26 98)`} />
          <path d="M94 98 q10 6 8 16" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" transform={`rotate(${raised} 94 98)`} />
          <rect x="28" y="88" width="64" height="34" rx="14" fill="#ffe6ad" stroke={INK} strokeWidth="2.5" />
          <rect x="51" y="97" width="18" height="10" rx="5" fill="#ef6a4c" stroke={INK} strokeWidth="2" />
        </g>
        <g style={pop(1, 60, 57)}>
          <rect x="18" y="22" width="84" height="70" rx="26" fill="#fff0cc" stroke={INK} strokeWidth="2.5" />
        </g>
        <rect x="30" y="34" width="60" height="44" rx="16" fill="#243530" stroke={INK} strokeWidth="2" />
        <rect x="34" y="37" width="22" height="4" rx="2" fill="#fff" opacity={0.12 * faceOn} />
        <g transform={`translate(${look * 4} 0)`} opacity={faceOn}>
          <g transform={`translate(0 57) scale(1 ${blinks ? blinkY : 1}) translate(0 -57)`}>{eyes}</g>
          {mood === 'think' ? (
            <g fill={EYE}>
              {[52, 60, 68].map((x, i) => (
                <circle key={x} cx={x} cy={70 - Math.max(0, Math.sin((frame - i * 4) / 4)) * 2.5} r="1.8" />
              ))}
            </g>
          ) : mood === 'wow' ? (
            <ellipse cx="60" cy="71" rx="4" ry="3.5" fill={EYE} />
          ) : talking ? (
            <ellipse cx="60" cy="70" rx="5" ry={3.2 * mouthOpen} fill={EYE} />
          ) : cheer ? (
            <path d="M52 66 q8 10 16 0 Z" fill={EYE} stroke={EYE} strokeWidth="2" strokeLinejoin="round" />
          ) : (
            <path d="M53 68 q7 6 14 0" fill="none" stroke={EYE} strokeWidth="3.5" strokeLinecap="round" />
          )}
        </g>
        <g style={pop(2, 60, 72)}>
          <ellipse cx="27" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6" />
          <ellipse cx="93" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6" />
        </g>
      </g>
    </svg>
  );
}

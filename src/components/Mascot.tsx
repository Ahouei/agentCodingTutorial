import { useAnimate, useReducedMotion, useSpring, motion } from 'motion/react';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import './mascot.css';

export type Mood = 'happy' | 'think' | 'wow' | 'wink' | 'calm' | 'sleep' | 'love' | 'cheer';

type Props = {
  size?: number;
  mood?: Mood;
  /** Eyes follow the pointer (decorative, fine pointers only). */
  follow?: boolean;
  /** Gentle idle float (CSS). Hero-sized Bits. */
  float?: boolean;
  /**
   * Alive (default): breathing, blinking, antenna wiggle, a glance around now and then, and a hop
   * with squash and stretch whenever the mood changes. `ambient={false}` gives a still Bit.
   * Off-screen Bits pause. Everything stops under prefers-reduced-motion.
   */
  ambient?: boolean;
  /** Mouth moves in a syllable rhythm (used while a line is typed out). */
  talking?: boolean;
  /** Raises the right arm from the shoulder and waves. */
  wave?: boolean;
  /** Change this number to make Bit react to a tap: a giggle hop and a wink. */
  poke?: number;
  className?: string;
  label?: string;
};

const EYE = '#9ff0cf';

/**
 * Bit, the course mascot: a small round robot with a screen face.
 * Motion budget (web-animation-design): transforms only, CSS loops for the idle life (they run
 * off the main thread and pause off-screen), one imperative spring-like hop for reactions.
 */
export function Mascot({ size = 120, mood = 'happy', follow = true, float = false, ambient = true, talking = false, wave = false, poke, className, label }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, '');
  const lookX = useSpring(0, { stiffness: 140, damping: 16, mass: 0.6 });
  const lookY = useSpring(0, { stiffness: 140, damping: 16, mass: 0.6 });
  const [scope, animate] = useAnimate<SVGGElement>();
  const [visible, setVisible] = useState(true);
  const [giggle, setGiggle] = useState(false);
  // Each Bit blinks on its own rhythm, so a page full of Bits never blinks in unison.
  const [rhythm] = useState(() => ({ delay: -Math.random() * 6, dur: 4.2 + Math.random() * 2.6, look: -Math.random() * 9 }));
  const shown: Mood = giggle ? 'wink' : mood;

  // Hop: anticipation squash → jump (stretch) → land (squash) → settle. Interruptible: a new hop
  // starts from wherever the last one is.
  const hop = (big = false) => {
    if (reduce || !scope.current) return;
    const h = big ? 14 : 9;
    animate(
      scope.current,
      { y: [0, 1.5, -h, 0, -2, 0], scaleY: [1, 0.9, 1.07, 0.93, 1.02, 1], scaleX: [1, 1.06, 0.96, 1.05, 0.99, 1] },
      { duration: big ? 0.72 : 0.58, times: [0, 0.14, 0.45, 0.7, 0.86, 1], ease: [0.33, 1, 0.68, 1] },
    );
  };

  const lastMood = useRef(mood);
  useEffect(() => {
    if (mood !== lastMood.current) hop(mood === 'cheer' || mood === 'love');
    lastMood.current = mood;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  const lastPoke = useRef(poke);
  useEffect(() => {
    if (poke === undefined || poke === lastPoke.current) return;
    lastPoke.current = poke;
    hop(true);
    setGiggle(true);
    const t = window.setTimeout(() => setGiggle(false), 900);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poke]);

  // Pause idle loops while off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !ambient) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, ambient]);

  useEffect(() => {
    if (!follow || reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(window.innerWidth / 2, 1);
      const dy = (e.clientY - (r.top + r.height * 0.45)) / Math.max(window.innerHeight / 2, 1);
      lookX.set(Math.max(-1, Math.min(1, dx)) * 5);
      lookY.set(Math.max(-1, Math.min(1, dy)) * 3.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [follow, reduce, lookX, lookY]);

  const alive = ambient && !reduce;
  const blinks = shown === 'calm' || shown === 'think' || shown === 'wow' || shown === 'wink';
  const cls = [
    'bit',
    alive ? 'bit--alive' : '',
    alive && !visible ? 'bit--paused' : '',
    talking && !reduce ? 'bit--talking' : '',
    (wave || shown === 'cheer') && !reduce ? 'bit--wave' : '',
    shown === 'cheer' ? 'bit--cheer' : '',
    float && !reduce ? 'bit--float' : '',
    alive && !follow ? 'bit--glance' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const vars = { '--blink-delay': `${rhythm.delay}s`, '--blink-dur': `${rhythm.dur}s`, '--look-delay': `${rhythm.look}s` } as CSSProperties;

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 132"
      width={size}
      height={size * 1.1}
      className={cls}
      style={{ overflow: 'visible', ...vars }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4dc" />
          <stop offset="1" stopColor="#ffd98a" />
        </linearGradient>
      </defs>

      {/* shadow: shrinks a little as Bit breathes up */}
      <ellipse className="bit-shadow" cx="60" cy="127" rx="30" ry="4" fill="#2a211b" opacity="0.12" />

      <g ref={scope} className="bit-hop">
        <g className="bit-breathe">
          {/* antenna (+ a glow in dark mode) */}
          <g className="bit-antenna">
            <circle className="bit-glow" cx="60" cy="8" r="12" fill="#ff8a6b" />
            <line x1="60" y1="22" x2="60" y2="9" stroke="#2a211b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="8" r="6" fill="#ef6a4c" stroke="#2a211b" strokeWidth="2.5" />
            <circle cx="58" cy="6" r="1.8" fill="#fff" opacity="0.8" />
          </g>

          {/* ears */}
          <rect x="11" y="48" width="10" height="22" rx="5" fill="#8fd5b5" stroke="#2a211b" strokeWidth="2.5" />
          <rect x="99" y="48" width="10" height="22" rx="5" fill="#8fd5b5" stroke="#2a211b" strokeWidth="2.5" />

          {/* arms rotate from the shoulder: raised for waving and cheering */}
          <g className="bit-arm-l">
            <path d="M26 98 q-10 6 -8 16" fill="none" stroke="#2a211b" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="bit-arm-r">
            <g className="bit-arm-r-wave">
              <path d="M94 98 q10 6 8 16" fill="none" stroke="#2a211b" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>

          {/* body */}
          <rect x="28" y="88" width="64" height="34" rx="14" fill={`url(#body-${uid})`} stroke="#2a211b" strokeWidth="2.5" />
          <rect className="bit-heart" x="51" y="97" width="18" height="10" rx="5" fill="#ef6a4c" stroke="#2a211b" strokeWidth="2" />

          {/* head */}
          <rect x="18" y="22" width="84" height="70" rx="26" fill={`url(#body-${uid})`} stroke="#2a211b" strokeWidth="2.5" />
          <rect x="30" y="34" width="60" height="44" rx="16" fill="#243530" stroke="#2a211b" strokeWidth="2" />
          <rect x="34" y="37" width="22" height="4" rx="2" fill="#fff" opacity="0.12" />

          {/* face: follows the pointer (motion values), and glances around on its own (CSS) */}
          <motion.g style={{ x: lookX, y: lookY }}>
            <g className="bit-face">
              <g className={blinks ? 'bit-eyes bit-eyes--blink' : 'bit-eyes'}>
                <Eyes mood={shown} />
              </g>
              <Mouth mood={shown} talking={talking && !reduce} />
            </g>
          </motion.g>

          {/* cheeks: a little rosier when Bit is delighted */}
          <ellipse className="bit-cheek" cx="27" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6" opacity={shown === 'love' || giggle ? 1 : 0.9} />
          <ellipse className="bit-cheek" cx="93" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6" opacity={shown === 'love' || giggle ? 1 : 0.9} />
        </g>
      </g>

      {/* sleeping: three Z's drift up */}
      {shown === 'sleep' && (
        <g className="bit-zzz" fill="none" stroke="#2a211b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M92 20 h8 l-8 9 h8" />
          <path d="M104 6 h6 l-6 7 h6" />
          <path d="M113 -6 h5 l-5 5.5 h5" />
        </g>
      )}
    </svg>
  );
}

function Eyes({ mood }: { mood: Mood }) {
  switch (mood) {
    case 'happy':
    case 'cheer':
      return (
        <g fill="none" stroke={EYE} strokeWidth="4.5" strokeLinecap="round">
          <path d="M44 60 q6 -8 12 0" />
          <path d="M64 60 q6 -8 12 0" />
        </g>
      );
    case 'sleep':
      return (
        <g fill="none" stroke={EYE} strokeWidth="4" strokeLinecap="round">
          <path d="M44 57 q6 5 12 0" />
          <path d="M64 57 q6 5 12 0" />
        </g>
      );
    case 'love':
      return (
        <g fill="#ff8fa8">
          <path d="M50 64 l-6.5 -6.5 a3.9 3.9 0 0 1 6.5 -4.6 a3.9 3.9 0 0 1 6.5 4.6 Z" />
          <path d="M70 64 l-6.5 -6.5 a3.9 3.9 0 0 1 6.5 -4.6 a3.9 3.9 0 0 1 6.5 4.6 Z" />
        </g>
      );
    case 'wow':
      return (
        <g fill={EYE}>
          <circle cx="50" cy="57" r="7.5" />
          <circle cx="70" cy="57" r="7.5" />
          <circle cx="52.5" cy="54.5" r="2.2" fill="#1d2a26" />
          <circle cx="72.5" cy="54.5" r="2.2" fill="#1d2a26" />
        </g>
      );
    case 'wink':
      return (
        <g>
          <rect x="45" y="51" width="9" height="13" rx="4.5" fill={EYE} />
          <path d="M64 58 q6 -6 12 0" fill="none" stroke={EYE} strokeWidth="4.5" strokeLinecap="round" />
        </g>
      );
    case 'think':
      return (
        <g fill={EYE}>
          <rect x="46" y="49" width="8" height="10" rx="4" />
          <rect x="66" y="49" width="8" height="10" rx="4" />
        </g>
      );
    default: // calm
      return (
        <g fill={EYE}>
          <rect x="45" y="51" width="9" height="13" rx="4.5" />
          <rect x="66" y="51" width="9" height="13" rx="4.5" />
        </g>
      );
  }
}

function Mouth({ mood, talking }: { mood: Mood; talking: boolean }) {
  if (mood === 'think')
    return (
      <g fill={EYE} className="bit-dots">
        <circle cx="52" cy="70" r="1.8" />
        <circle cx="60" cy="70" r="1.8" />
        <circle cx="68" cy="70" r="1.8" />
      </g>
    );
  if (mood === 'wow') return <ellipse cx="60" cy="71" rx="4" ry="3.5" fill={EYE} />;
  if (mood === 'sleep') return <ellipse cx="60" cy="71" rx="2.6" ry="2" fill={EYE} />;
  if (talking) return <ellipse className="bit-mouth" cx="60" cy="70" rx="5" ry="3.2" fill={EYE} />;
  if (mood === 'cheer' || mood === 'love') return <path d="M52 66 q8 10 16 0 Z" fill={EYE} stroke={EYE} strokeWidth="2" strokeLinejoin="round" />;
  return <path d="M53 68 q7 6 14 0" fill="none" stroke={EYE} strokeWidth="3.5" strokeLinecap="round" />;
}

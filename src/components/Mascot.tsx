import { motion, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useId, useRef, useState } from 'react';

export type Mood = 'happy' | 'think' | 'wow' | 'wink' | 'calm';

type Props = {
  size?: number;
  mood?: Mood;
  /** Eyes follow the pointer (decorative). */
  follow?: boolean;
  /** Gentle idle float. Use for hero-sized Bit only. */
  float?: boolean;
  /**
   * Antenna wiggle + blinking. Off by default: small Bits seen many times per
   * session stay still and only change mood (RD-08). Turn on for the hero/finale Bit.
   */
  ambient?: boolean;
  className?: string;
  label?: string;
};

/**
 * Bit, the course mascot: a small round robot with a screen face.
 * Decorative motion only; everything is still with prefers-reduced-motion.
 */
export function Mascot({ size = 120, mood = 'happy', follow = true, float = false, ambient = false, className, label }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, '');
  const lookX = useSpring(0, { stiffness: 140, damping: 16, mass: 0.6 });
  const lookY = useSpring(0, { stiffness: 140, damping: 16, mass: 0.6 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!follow || reduce) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.45;
      const dx = (e.clientX - cx) / Math.max(window.innerWidth / 2, 1);
      const dy = (e.clientY - cy) / Math.max(window.innerHeight / 2, 1);
      lookX.set(Math.max(-1, Math.min(1, dx)) * 5);
      lookY.set(Math.max(-1, Math.min(1, dy)) * 3.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [follow, reduce, lookX, lookY]);

  useEffect(() => {
    if (reduce || !ambient) return;
    let t: number;
    const loop = () => {
      t = window.setTimeout(
        () => {
          setBlink(true);
          window.setTimeout(() => setBlink(false), 130);
          loop();
        },
        2600 + Math.random() * 2600,
      );
    };
    loop();
    return () => window.clearTimeout(t);
  }, [reduce, ambient]);

  const eyeColor = '#9ff0cf';

  const eyes = (() => {
    if (mood === 'happy' || mood === 'calm') {
      if (blink && mood === 'calm') return <BlinkEyes />;
      return mood === 'happy' ? (
        <g fill="none" stroke={eyeColor} strokeWidth="4.5" strokeLinecap="round">
          <path d="M44 60 q6 -8 12 0" />
          <path d="M64 60 q6 -8 12 0" />
        </g>
      ) : (
        <g fill={eyeColor}>
          <rect x="45" y="51" width="9" height="13" rx="4.5" />
          <rect x="66" y="51" width="9" height="13" rx="4.5" />
        </g>
      );
    }
    if (blink) return <BlinkEyes />;
    if (mood === 'wow')
      return (
        <g fill={eyeColor}>
          <circle cx="50" cy="57" r="7.5" />
          <circle cx="70" cy="57" r="7.5" />
          <circle cx="52.5" cy="54.5" r="2.2" fill="#1d2a26" />
          <circle cx="72.5" cy="54.5" r="2.2" fill="#1d2a26" />
        </g>
      );
    if (mood === 'wink')
      return (
        <g>
          <rect x="45" y="51" width="9" height="13" rx="4.5" fill={eyeColor} />
          <path d="M64 58 q6 -6 12 0" fill="none" stroke={eyeColor} strokeWidth="4.5" strokeLinecap="round" />
        </g>
      );
    // think
    return (
      <g fill={eyeColor}>
        <rect x="46" y="49" width="8" height="10" rx="4" />
        <rect x="66" y="49" width="8" height="10" rx="4" />
      </g>
    );
  })();

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 120 132"
      width={size}
      height={size * 1.1}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ overflow: 'visible' }}
      animate={float && !reduce ? { y: [0, -6, 0] } : undefined}
      transition={float && !reduce ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4dc" />
          <stop offset="1" stopColor="#ffd98a" />
        </linearGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="60" cy="127" rx="30" ry="4" fill="#2a211b" opacity="0.12" />

      {/* antenna */}
      <motion.g
        style={{ originX: '60px', originY: '22px' }}
        animate={reduce || !ambient ? undefined : { rotate: [0, 8, -6, 0] }}
        transition={reduce || !ambient ? undefined : { duration: 3.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
      >
        <line x1="60" y1="22" x2="60" y2="9" stroke="#2a211b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="8" r="6" fill="#ef6a4c" stroke="#2a211b" strokeWidth="2.5" />
        <circle cx="58" cy="6" r="1.8" fill="#fff" opacity="0.8" />
      </motion.g>

      {/* ears */}
      <rect x="11" y="48" width="10" height="22" rx="5" fill="#8fd5b5" stroke="#2a211b" strokeWidth="2.5" />
      <rect x="99" y="48" width="10" height="22" rx="5" fill="#8fd5b5" stroke="#2a211b" strokeWidth="2.5" />

      {/* arms */}
      <path d="M26 98 q-10 6 -8 16" fill="none" stroke="#2a211b" strokeWidth="3" strokeLinecap="round" />
      <path d="M94 98 q10 6 8 16" fill="none" stroke="#2a211b" strokeWidth="3" strokeLinecap="round" />

      {/* body */}
      <rect x="28" y="88" width="64" height="34" rx="14" fill={`url(#body-${uid})`} stroke="#2a211b" strokeWidth="2.5" />
      <rect x="51" y="97" width="18" height="10" rx="5" fill="#ef6a4c" stroke="#2a211b" strokeWidth="2" />

      {/* head */}
      <rect x="18" y="22" width="84" height="70" rx="26" fill={`url(#body-${uid})`} stroke="#2a211b" strokeWidth="2.5" />
      {/* screen */}
      <rect x="30" y="34" width="60" height="44" rx="16" fill="#243530" stroke="#2a211b" strokeWidth="2" />
      <rect x="34" y="37" width="22" height="4" rx="2" fill="#fff" opacity="0.12" />

      {/* face moves with the pointer */}
      <motion.g style={{ x: lookX, y: lookY }}>
        {eyes}
        {mood === 'think' ? (
          <g fill={eyeColor}>
            <circle cx="52" cy="70" r="1.8" />
            <circle cx="60" cy="70" r="1.8" />
            <circle cx="68" cy="70" r="1.8" />
          </g>
        ) : mood === 'wow' ? (
          <ellipse cx="60" cy="71" rx="4" ry="3.5" fill={eyeColor} />
        ) : (
          <path d="M53 68 q7 6 14 0" fill="none" stroke={eyeColor} strokeWidth="3.5" strokeLinecap="round" />
        )}
      </motion.g>

      {/* cheeks */}
      <ellipse cx="27" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6" opacity="0.9" />
      <ellipse cx="93" cy="72" rx="5.5" ry="3.5" fill="#f6a3b6" opacity="0.9" />
    </motion.svg>
  );
}

function BlinkEyes() {
  return (
    <g stroke="#9ff0cf" strokeWidth="4" strokeLinecap="round">
      <line x1="45" y1="58" x2="54" y2="58" />
      <line x1="66" y1="58" x2="75" y2="58" />
    </g>
  );
}

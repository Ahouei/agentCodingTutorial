import type { JSX } from 'react';
import type { IconId } from '../content/types';

/** Chunky two-tone "sticker" icons drawn for this course (24×24 grid). */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const paths: Record<IconId, JSX.Element> = {
  spark: (
    <>
      <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" {...S} fill="var(--i2)" />
      <path d="M19 16.5c.25 1.4 1 2.15 2.5 2.4-1.5.25-2.25 1-2.5 2.5-.25-1.5-1-2.25-2.5-2.5 1.5-.25 2.25-1 2.5-2.4Z" {...S} />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" {...S} fill="var(--i2)" />
      <path d="M3.8 9.5h16.4M3.8 14.5h16.4M12 3.5c-3 3.2-3 13.8 0 17M12 3.5c3 3.2 3 13.8 0 17" {...S} />
    </>
  ),
  signpost: (
    <>
      <path d="M12 3v18" {...S} />
      <path d="M5 6h11l3 2.5L16 11H5Z" {...S} fill="var(--i2)" />
      <path d="M19 13H8l-3 2.5L8 18h11Z" {...S} />
    </>
  ),
  branch: (
    <>
      <circle cx="6.5" cy="5.5" r="2.3" {...S} fill="var(--i2)" />
      <circle cx="6.5" cy="18.5" r="2.3" {...S} fill="var(--i2)" />
      <circle cx="17.5" cy="8" r="2.3" {...S} fill="var(--i2)" />
      <path d="M6.5 7.8v8.4M17.5 10.3c0 4-5.5 3.2-9.6 6.6" {...S} />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5h10.5a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6-1.2A4.6 4.6 0 0 0 7 18.5Z" {...S} fill="var(--i2)" />
      <path d="M9.5 14.5h5" {...S} />
    </>
  ),
  brain: (
    <>
      <path
        d="M9 4.5a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.3A3 3 0 0 0 7 17.5a2.6 2.6 0 0 0 5 1V6a2.4 2.4 0 0 0-3-1.5Z"
        
        {...S}
        fill="var(--i2)"
      />
      <path d="M15 4.5a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.3 3 3 0 0 1-2.5 4.7 2.6 2.6 0 0 1-5 1V6a2.4 2.4 0 0 1 3-1.5Z" {...S} />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="7" width="16" height="12" rx="4.5" {...S} fill="var(--i2)" />
      <path d="M12 7V4" {...S} />
      <circle cx="12" cy="3.2" r="1.2" fill="currentColor" />
      <circle cx="9" cy="12.5" r="1.3" fill="currentColor" />
      <circle cx="15" cy="12.5" r="1.3" fill="currentColor" />
      <path d="M10 16h4" {...S} />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="4.5" {...S} fill="var(--i2)" />
      <path d="M12.5 12H21M18 12v3M21 12v2" {...S} />
      <circle cx="8" cy="12" r="1.3" fill="currentColor" />
    </>
  ),
  plug: (
    <>
      <path d="M8 3v5M16 3v5" {...S} />
      <path d="M6 8h12v3a6 6 0 0 1-12 0Z" {...S} fill="var(--i2)" />
      <path d="M12 17v4" {...S} />
    </>
  ),
  map: (
    <>
      <path d="M3.5 6.5 9 4l6 2.5L20.5 4v13.5L15 20l-6-2.5L3.5 20Z" {...S} fill="var(--i2)" />
      <path d="M9 4v13.5M15 6.5V20" {...S} />
    </>
  ),
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5Z" {...S} fill="var(--i2)" />
      <path d="M8.5 9h7M8.5 12h4.5" {...S} />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.3 0 1.8-1 1.3-2-.6-1.2.2-2.5 1.6-2.5H17a3.5 3.5 0 0 0 3.5-3.5c0-5-3.8-9-8.5-9Z" {...S} fill="var(--i2)" />
      <circle cx="8" cy="11" r="1.3" fill="currentColor" />
      <circle cx="11" cy="7.5" r="1.3" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r="1.3" fill="currentColor" />
    </>
  ),
  loop: (
    <>
      <path d="M19 9a7.5 7.5 0 0 0-13.6-1.5" {...S} />
      <path d="M5 15a7.5 7.5 0 0 0 13.6 1.5" {...S} />
      <path d="M5.4 3.5v4h4M18.6 20.5v-4h-4" {...S} />
      <circle cx="12" cy="12" r="2.6" {...S} fill="var(--i2)" />
    </>
  ),
  bug: (
    <>
      <rect x="7" y="7.5" width="10" height="12" rx="5" {...S} fill="var(--i2)" />
      <path d="M9 7.5a3 3 0 0 1 6 0M12 10v9.5M3.5 12H7M17 12h3.5M4.5 7.5 7.3 9M19.5 7.5 16.7 9M4.5 17.5 7.3 16M19.5 17.5 16.7 16" {...S} />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 4.5c3-1 5-1 5-1s0 2-1 5L13 14l-3-3Z" {...S} fill="var(--i2)" />
      <path d="M10 11 6.5 10 4 12.5l4 1M13 14l1 3.5-2.5 2.5-1-4M7 17c-1 1-1.5 3-1.5 3s2-.5 3-1.5" {...S} />
      <circle cx="15.5" cy="8.5" r="1.3" fill="currentColor" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6Z" {...S} fill="var(--i2)" />
      <path d="m9 12 2.2 2.2L15.5 10" {...S} />
    </>
  ),
  trophy: (
    <>
      <path d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0Z" {...S} fill="var(--i2)" />
      <path d="M7.5 6H4.5a3 3 0 0 0 3.2 4M16.5 6h3a3 3 0 0 1-3.2 4M12 13.5V17M8.5 20.5h7M9.5 17h5v3.5h-5Z" {...S} />
    </>
  ),
  toolbox: (
    <>
      <rect x="3.5" y="8.5" width="17" height="11" rx="2.5" {...S} fill="var(--i2)" />
      <path d="M9 8.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.5M3.5 13h17M10.5 13v2h3v-2" {...S} />
    </>
  ),
};

export function Icon({ id, size = 24, tint = 'var(--butter)' }: { id: IconId; size?: number; tint?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden style={{ ['--i2' as string]: tint }}>
      {paths[id]}
    </svg>
  );
}

export const ACT_TINT: Record<number, string> = {
  1: 'var(--sky)',
  2: 'var(--mint)',
  3: 'var(--butter)',
  4: 'var(--blush)',
};

import { useState } from 'react';
import { useTx } from '../lib/app';
import { Mascot, type Mood } from './Mascot';

/**
 * A Bit you can tap: he giggles (hop + wink) and the caller can make him say something.
 * A real button, so it works with keyboard and screen readers.
 */
export function TapBit({
  size,
  mood,
  talking,
  wave,
  float,
  follow = false,
  onTap,
  className,
}: {
  size: number;
  mood: Mood;
  talking?: boolean;
  wave?: boolean;
  float?: boolean;
  follow?: boolean;
  onTap?: () => void;
  className?: string;
}) {
  const tx = useTx();
  const [poke, setPoke] = useState(0);
  return (
    <button
      type="button"
      className={`tapbit ${className ?? ''}`}
      aria-label={tx('Bit را قلقلک بده تا چیزی بگوید', 'Poke Bit to hear what he says')}
      onClick={() => {
        setPoke((p) => p + 1);
        onTap?.();
      }}
    >
      <Mascot size={size} mood={mood} talking={talking} wave={wave} float={float} follow={follow} poke={poke} />
    </button>
  );
}

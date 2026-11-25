import { useEffect, useState } from 'react';

/**
 * True after `ms` without any pointer, key, scroll or touch activity (or while the tab is hidden
 * and then shown again before activity). Bit naps when you're away and wakes when you're back.
 */
export function useIdle(ms = 45000) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let t = window.setTimeout(() => setIdle(true), ms);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(t);
      t = window.setTimeout(() => setIdle(true), ms);
    };
    const evts = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    evts.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => {
      window.clearTimeout(t);
      evts.forEach((e) => window.removeEventListener(e, wake));
    };
  }, [ms]);
  return idle;
}

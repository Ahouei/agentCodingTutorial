import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useTx } from '../../lib/app';

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without async clipboard permission.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/** Copy button whose label crossfades (with a touch of blur) to a check. */
export function CopyButton({ text, className = 'btn btn--small' }: { text: string; className?: string }) {
  const tx = useTx();
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle');

  const onClick = async () => {
    const ok = await copyText(text);
    setState(ok ? 'ok' : 'fail');
    window.setTimeout(() => setState('idle'), 1600);
  };

  const label = state === 'ok' ? tx('کپی شد', 'Copied') : state === 'fail' ? tx('کپی نشد', 'Copy failed') : tx('کپی', 'Copy');

  return (
    <button type="button" className={className} onClick={onClick} aria-live="polite">
      <span style={{ display: 'inline-grid', minWidth: 52, justifyItems: 'center' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={state}
            initial={{ opacity: 0, filter: 'blur(3px)', transform: 'translateY(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' }}
            exit={{ opacity: 0, filter: 'blur(3px)', transform: 'translateY(-6px)' }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            style={{ gridArea: '1 / 1', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            {state === 'ok' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <rect x="8" y="8" width="12" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            {label}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

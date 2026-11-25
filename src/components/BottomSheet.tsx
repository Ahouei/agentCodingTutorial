import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './sheet.css';

/**
 * Bottom sheet (RD-05).
 * - Slides up with the drawer curve; a downward flick (velocity > 0.11 px/ms) or a drag past 80px closes it.
 * - Dragging upward past the top meets friction instead of a hard stop.
 * - Escape and Back close it (the caller wires Back through useOverlay).
 * - Focus moves into the sheet on open and returns to the opener on close.
 * - `modal` adds a scrim and traps Tab; non-modal sheets (term definitions) leave the page usable.
 */
export function BottomSheet({
  open,
  onClose,
  modal = false,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  modal?: boolean;
  title: ReactNode;
  children: ReactNode;
}) {
  const sheet = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLHeadingElement>(null);
  const opener = useRef<Element | null>(null);
  const titleId = useId();
  const drag = useRef<{ y: number; t: number; dy: number; id: number } | null>(null);

  useEffect(() => {
    if (open) {
      opener.current = document.activeElement;
      requestAnimationFrame(() => head.current?.focus({ preventScroll: true }));
    } else if (opener.current instanceof HTMLElement) {
      opener.current.focus({ preventScroll: true });
      opener.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (modal && e.key === 'Tab' && sheet.current) {
        const f = sheet.current.querySelectorAll<HTMLElement>('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, modal, onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest('button, a, input, textarea')) return;
    if (drag.current) return; // ignore a second finger
    drag.current = { y: e.clientY, t: performance.now(), dy: 0, id: e.pointerId };
    sheet.current?.setPointerCapture(e.pointerId);
    sheet.current?.classList.add('is-dragging');
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id || !sheet.current) return;
    d.dy = e.clientY - d.y;
    const y = d.dy < 0 ? d.dy * 0.2 : d.dy; // friction when pulling up
    sheet.current.style.transform = `translateY(${y}px)`;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id || !sheet.current) return;
    drag.current = null;
    sheet.current.classList.remove('is-dragging');
    const v = Math.abs(d.dy) / Math.max(1, performance.now() - d.t);
    sheet.current.style.transform = '';
    if (d.dy > 80 || (d.dy > 0 && v > 0.11)) onClose();
  };

  return createPortal(
    <>
      {modal && <div className={`sheet-scrim ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden />}
      <div
        ref={sheet}
        className={`sheet ${open ? 'is-open' : ''} ${modal ? 'is-modal' : ''}`}
        role="dialog"
        aria-modal={modal ? 'true' : undefined}
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="sheet-grab" aria-hidden />
        <div className="sheet-head">
          <h2 id={titleId} ref={head} tabIndex={-1} className="sheet-title">
            {title}
          </h2>
          <button type="button" className="sheet-close" onClick={onClose} aria-label="×">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </>,
    document.body,
  );
}

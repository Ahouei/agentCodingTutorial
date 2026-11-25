/**
 * Motion tokens. Every animation in the app takes its easing and springs from here
 * (Emil Kowalski's curves; Apple-style springs with no bounce unless a gesture carried momentum).
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const; // enter / exit / responses
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const; // on-screen movement, morphs
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const; // sheets and drawers

export const SPRING = { type: 'spring', bounce: 0, duration: 0.4 } as const;
/** Only after a drag or flick, where the gesture itself carried momentum. */
export const SPRING_MOMENTUM = { type: 'spring', bounce: 0.2, duration: 0.45 } as const;

export const DUR = { press: 0.12, ui: 0.2, reveal: 0.3, sheet: 0.35 } as const;

/** CSS strings for inline styles and WAAPI. */
export const CSS_EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const CSS_EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';

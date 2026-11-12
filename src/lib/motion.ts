import type { Transition } from "motion/react";

/** Critically damped — default UI spring, no overshoot (Apple damping 1.0). */
export const spring: Transition = { type: "spring", bounce: 0, duration: 0.55 };
/** Snappier critically damped spring for small controls. */
export const springSnappy: Transition = { type: "spring", bounce: 0, duration: 0.3 };
/** Long, soft spring for large surfaces. */
export const springSoft: Transition = { type: "spring", bounce: 0, duration: 0.9 };
/** Momentum spring — only for gesture-driven interactions (Apple damping ~0.8). */
export const springBounce: Transition = { type: "spring", bounce: 0.22, duration: 0.45 };
/** Expressive ease-out curve for entrances. */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

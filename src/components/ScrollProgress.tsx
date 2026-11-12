import { motion, useScroll, useSpring } from "motion/react";

/** Spring-smoothed scroll progress bar pinned to the top edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
    />
  );
}

import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "../lib/cn";
import { springSnappy } from "../lib/motion";

type Variant = "primary" | "ghost";

/** Button that is gently attracted to the pointer (mouse only) and springs back on leave. */
export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  strength = 0.32,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const external = href?.startsWith("http");
  const base =
    "inline-flex select-none items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight";
  const styles: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 text-[#04211a] shadow-[0_10px_36px_-10px_rgba(52,211,153,0.65)]",
    ghost:
      "border border-white/15 bg-white/[0.04] text-white backdrop-blur-md hover:border-white/30 hover:bg-white/[0.08]",
  };

  const shared = {
    whileHover: reduce ? undefined : { scale: 1.04 },
    whileTap: reduce ? undefined : { scale: 0.96 },
    transition: springSnappy,
    className: cn(base, styles[variant], className),
  };

  const inner = href ? (
    <motion.a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      {...shared}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button type="button" onClick={onClick} {...shared}>
      {children}
    </motion.button>
  );

  if (reduce) return inner;
  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {inner}
    </motion.div>
  );
}

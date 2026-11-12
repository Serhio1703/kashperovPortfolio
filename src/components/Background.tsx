import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "../lib/cn";

type Dot = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  bvx: number;
  bvy: number;
  depth: number;
  hue: string;
};

type Wave = { x: number; y: number; r: number; alpha: number };

const LINK_DIST = 120;
const PALETTE = ["148,163,184", "52,211,153", "139,92,246", "34,211,238"];
const SECTIONS = ["top", "about", "services", "projects", "process", "stack", "contact"];
const ACCENT_BY_SECTION = [0, 0, 0, 1, 1, 1, 2];

/** Fixed animated backdrop: aurora blobs, grid, drifting constellation particles, grain. */
export function Background() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [accent, setAccent] = useState(0);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useSpring(mx, { stiffness: 40, damping: 18 });
  const parallaxY = useSpring(my, { stiffness: 40, damping: 18 });
  const { scrollY } = useScroll();
  const scrollParallax = useSpring(scrollY, { stiffness: 60, damping: 25 });
  const offsetX = useTransform(parallaxX, (v) => v * 34);
  const offsetY = useTransform(
    [parallaxY, scrollParallax],
    (latest: number[]) => latest[0] * 34 + latest[1] * 0.12
  );

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dots: Dot[] = [];
    const waves: Wave[] = [];
    const count = Math.min(110, Math.floor((w * h) / 15000));

    const seed = () => {
      dots.length = 0;
      for (let i = 0; i < count; i++) {
        const depth = 0.35 + Math.random() * 0.65;
        const vx = (Math.random() - 0.5) * 0.16 * depth;
        const vy = (-0.1 - Math.random() * 0.22) * depth;
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.5,
          vx,
          vy,
          bvx: vx,
          bvy: vy,
          depth,
          hue: PALETTE[Math.random() < 0.82 ? 0 : 1 + Math.floor(Math.random() * (PALETTE.length - 1))],
        });
      }
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true };
      mx.set(e.clientX / w - 0.5);
      my.set(e.clientY / h - 0.5);
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    const onDown = (e: PointerEvent) => {
      waves.push({ x: e.clientX, y: e.clientY, r: 6, alpha: 0.5 });
      if (waves.length > 8) waves.shift();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const ox = parallaxX.get() * 34;
      const oy = parallaxY.get() * 34;
      const m = mouse.current;

      for (const d of dots) {
        if (m.active) {
          const dx = m.x - d.x;
          const dy = m.y - d.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 40000 && d2 > 100) {
            const dist = Math.sqrt(d2);
            const pull = (0.05 * d.depth) / dist;
            d.vx += dx * pull;
            d.vy += dy * pull;
          }
        }
        d.vx += (d.bvx - d.vx) * 0.02;
        d.vy += (d.bvy - d.vy) * 0.02;
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -12) {
          d.y = h + 12;
          d.x = Math.random() * w;
        }
        if (d.x < -12) d.x = w + 12;
        if (d.x > w + 12) d.x = -12;

        const px = d.x + ox * d.depth;
        const py = d.y + oy * d.depth;
        ctx.beginPath();
        ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + d.hue + "," + (0.14 + 0.3 * d.depth).toFixed(3) + ")";
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const ax = a.x + ox * a.depth;
        const ay = a.y + oy * a.depth;
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = ax - (b.x + ox * b.depth);
          const dy = ay - (b.y + oy * b.depth);
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.13;
            ctx.strokeStyle = "rgba(148,163,184," + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(b.x + ox * b.depth, b.y + oy * b.depth);
            ctx.stroke();
          }
        }
      }

      for (let i = waves.length - 1; i >= 0; i--) {
        const wv = waves[i];
        wv.r += 4.5;
        wv.alpha *= 0.94;
        if (wv.alpha < 0.02) {
          waves.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(52,211,153," + wv.alpha.toFixed(3) + ")";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce, mx, my, parallaxX, parallaxY]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= y) idx = i;
      }
      setAccent(ACCENT_BY_SECTION[idx]);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#05060a]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_70%_-10%,rgba(16,185,129,0.09),transparent_60%),radial-gradient(1000px_700px_at_8%_110%,rgba(139,92,246,0.08),transparent_60%),radial-gradient(900px_600px_at_95%_60%,rgba(34,211,238,0.06),transparent_60%)]" />

      <motion.div style={{ x: offsetX, y: offsetY }} className="absolute inset-0">
        {!reduce && (
          <>
            <div
              className={cn(
                "absolute -left-48 -top-48 size-[46rem] rounded-full bg-emerald-500/[0.13] blur-[130px] animate-aurora-1 transition-opacity duration-[1500ms]",
                accent === 0 ? "opacity-100" : "opacity-35"
              )}
            />
            <div
              className={cn(
                "absolute -right-56 top-1/4 size-[42rem] rounded-full bg-violet-500/[0.12] blur-[130px] animate-aurora-2 transition-opacity duration-[1500ms]",
                accent === 1 ? "opacity-100" : "opacity-35"
              )}
            />
            <div
              className={cn(
                "absolute -bottom-56 left-1/4 size-[44rem] rounded-full bg-cyan-500/[0.10] blur-[130px] animate-aurora-3 transition-opacity duration-[1500ms]",
                accent === 2 ? "opacity-100" : "opacity-35"
              )}
            />
          </>
        )}
      </motion.div>

      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(1000px_620px_at_50%_18%,rgba(16,185,129,0.07),transparent_60%)] transition-opacity duration-[1500ms]",
            accent !== 0 && "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(1000px_620px_at_50%_18%,rgba(139,92,246,0.07),transparent_60%)] transition-opacity duration-[1500ms]",
            accent !== 1 && "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(1000px_620px_at_50%_18%,rgba(34,211,238,0.07),transparent_60%)] transition-opacity duration-[1500ms]",
            accent !== 2 && "opacity-0"
          )}
        />
      </div>

      <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 grain opacity-[0.05] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
}

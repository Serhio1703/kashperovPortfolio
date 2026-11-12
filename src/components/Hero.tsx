import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "../lib/cn";
import { easeOutExpo } from "../lib/motion";
import { Counter } from "./Counter";
import { MagneticButton } from "./MagneticButton";

const chips = [
  { label: "React", dot: "bg-cyan-400", pos: "left-[5%] top-[24%]", anim: "animate-float-slow", delay: 1.3 },
  { label: "TypeScript", dot: "bg-blue-400", pos: "left-[10%] top-[62%]", anim: "animate-float", delay: 1.7 },
  { label: "Python", dot: "bg-amber-300", pos: "right-[5%] top-[20%]", anim: "animate-float", delay: 1.5 },
  { label: "Motion", dot: "bg-violet-400", pos: "right-[11%] top-[56%]", anim: "animate-float-slow", delay: 2.0 },
];

const rotating = ["лендинги", "веб-приложения", "Telegram-ботов"];

const stats = [
  { value: 5, suffix: "+", label: "лет в разработке" },
  { value: 4, suffix: "", label: "направления услуг" },
  { value: 1, suffix: "", label: "исполнитель — без посредников" },
];

function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const current = words[wordIndex % words.length];
    const done = deleting ? text.length === 0 : text === current;
    if (done) {
      const t = window.setTimeout(
        () => {
          if (deleting) {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          } else {
            setDeleting(true);
          }
        },
        deleting ? 300 : 1800
      );
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(
      () =>
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
        ),
      deleting ? 45 : 80
    );
    return () => window.clearTimeout(t);
  }, [text, deleting, wordIndex, reduce, words]);

  if (reduce) return <span className="text-gradient">{words[0]}</span>;

  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), "");
  return (
    <span
      className="inline-block text-left align-baseline"
      style={{ minWidth: longest.length + 0.8 + "ch" }}
    >
      <span className="text-gradient">{text}</span>
      <span
        aria-hidden
        className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.18em] animate-pulse rounded-full bg-emerald-400"
      />
    </span>
  );
}

function Words({
  text,
  gradient = false,
  baseDelay = 0,
}: {
  text: string;
  gradient?: boolean;
  baseDelay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={cn(gradient && "text-gradient")}>{text}</span>;
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span
            className={cn("inline-block", gradient && "text-gradient")}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.1,
              ease: easeOutExpo,
              delay: baseDelay + i * 0.1,
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const chipParallax = useTransform(scrollY, (v) => v * 0.14);
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { type: "spring" as const, bounce: 0, duration: 0.8, delay },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden px-5 pb-28 pt-32"
    >
      {!reduce &&
        chips.map((c) => (
          <div
            key={c.label}
            className={cn("absolute hidden 2xl:block", c.pos, c.anim)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0, duration: 0.6, delay: c.delay }}
              style={{ y: chipParallax }}
            >
              <span className="glass flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-medium text-neutral-200 shadow-xl">
                <span className={cn("size-2 rounded-full", c.dot)} />
                {c.label}
              </span>
            </motion.div>
          </div>
        ))}

      {/* гигантская фоновая надпись */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1.5, ease: easeOutExpo }}
          className="select-none whitespace-nowrap bg-gradient-to-b from-white/[0.11] to-transparent bg-clip-text font-display text-[11.5vw] font-bold leading-none tracking-[-0.03em] text-transparent xl:text-[9.25rem]"
        >
          КАШПЕРОВ
        </motion.p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.div {...rise(0.1)} className="flex justify-center">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-neutral-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Веб-разработчик · 5 лет опыта
          </span>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-8 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[5rem]"
        >
          <span className="block">
            <Words text="Сергей" baseDelay={0.3} />
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.75)}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          Делаю <Typewriter words={rotating} />, которые решают бизнес-задачи —
          от идеи и прототипа до запуска и поддержки.
        </motion.p>

        <motion.div
          {...rise(0.9)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#contact">
            Обсудить проект
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#projects" variant="ghost">
            Смотреть работы
          </MagneticButton>
        </motion.div>

        <motion.dl
          {...rise(1.05)}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl px-3 py-5 sm:px-4 sm:py-6"
            >
              <dt className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                <Counter to={s.value} suffix={s.suffix} duration={1.6} />
              </dt>
              <dd className="mt-2 text-xs leading-snug text-neutral-500 sm:text-sm">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#about"
        aria-label="Листайте вниз"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-scroll-dot" />
        </span>
      </motion.a>
    </section>
  );
}

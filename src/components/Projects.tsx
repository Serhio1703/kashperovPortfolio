import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { spring } from "../lib/motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

type Project = {
  title: string;
  text: string;
  tags: string[];
  result: string;
  mock: "landing" | "bot" | "analytics";
  /** Ссылка на живой проект или кейс — если есть, стрелка на карточке станет ссылкой. */
  link?: string;
};

const projects: Project[] = [
  {
    title: "Лендинг для SaaS",
    text: "Промо-страница с интерактивными блоками и калькулятором тарифов.",
    tags: ["React", "Tailwind", "Motion"],
    result: "Адаптив · анимации · быстрая загрузка",
    mock: "landing",
  },
  {
    title: "Telegram-бот приёма заказов",
    text: "Бот с корзиной, оплатой и уведомлениями администратору.",
    tags: ["Python", "aiogram", "PostgreSQL"],
    result: "Меньше ручной работы",
    mock: "bot",
  },
  {
    title: "Панель аналитики",
    text: "Дашборд с графиками, фильтрами и экспортом данных.",
    tags: ["React", "TypeScript", "Node.js"],
    result: "Данные в одном месте",
    mock: "analytics",
  },
];

function LandingMock() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-white/10 bg-[#0a0d14] p-4">
      <div className="flex items-center justify-between">
        <span className="size-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400" />
        <div className="flex gap-1.5">
          <span className="h-1 w-6 rounded bg-white/15" />
          <span className="h-1 w-6 rounded bg-white/15" />
          <span className="h-1 w-6 rounded bg-white/15" />
        </div>
      </div>
      <div className="mt-2 h-2.5 w-4/5 rounded bg-white/20" />
      <div className="h-2.5 w-3/5 rounded bg-white/10" />
      <div className="mt-2 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
        <div className="h-5 w-14 rounded-full border border-white/15" />
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2">
        <div className="h-11 rounded-lg bg-white/5" />
        <div className="grid h-11 place-items-center rounded-lg bg-emerald-400/15 ring-1 ring-emerald-400/20">
          <span className="size-3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="h-11 rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

function BotMock() {
  const bubble = (delay: number) => ({
    initial: { opacity: 0, y: 10, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { type: "spring" as const, bounce: 0.25, duration: 0.7, delay },
  });
  return (
    <div className="flex h-full flex-col justify-end gap-2.5 rounded-xl border border-white/10 bg-[#0a0d14] p-4">
      <motion.div
        {...bubble(0.2)}
        className="max-w-[75%] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-[10px] text-neutral-300"
      >
        Привет! Что закажете?
      </motion.div>
      <motion.div
        {...bubble(0.5)}
        className="ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-gradient-to-r from-emerald-400/90 to-cyan-400/90 px-3 py-2 text-[10px] font-medium text-[#04211a]"
      >
        2 капучино, пожалуйста
      </motion.div>
      <motion.div
        {...bubble(0.8)}
        className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white/10 px-3 py-2.5"
      >
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="size-1 animate-bounce rounded-full bg-neutral-300"
            style={{ animationDelay: d * 0.15 + "s" }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function AnalyticsMock() {
  const bars = [0.45, 0.75, 0.55, 0.9, 0.65, 1, 0.8];
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#0a0d14] p-4">
      <div className="flex items-center justify-between">
        <span className="h-2 w-16 rounded bg-white/20" />
        <span className="h-4 w-10 rounded-md bg-white/10" />
      </div>
      <div className="mt-auto flex h-20 items-end gap-2 pt-4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0.15 }}
            whileInView={{ scaleY: h }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.9,
              delay: 0.15 + i * 0.07,
            }}
            style={{ originY: 1 }}
            className={cn(
              "flex-1 rounded-t-md",
              i === 5
                ? "bg-gradient-to-t from-emerald-500/80 to-cyan-400/80"
                : "bg-white/15"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  return (
    <section id="projects" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Проекты"
          title="Избранные работы"
          description="Задачи, которые решаю: от промо-страниц до внутренних инструментов."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="h-full">
              <TiltCard max={6} className="rounded-3xl">
                <article className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-white/20">
                  <div className="relative m-3 mb-0">
                    <a
                      href={"#/demo/" + p.mock}
                      aria-label={"Открыть демо: " + p.title}
                      className="group/mock relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#08090f]"
                    >
                      <motion.div
                        whileHover={reduce ? undefined : { scale: 1.045 }}
                        transition={spring}
                        className="absolute inset-0 p-3"
                      >
                        {p.mock === "landing" && <LandingMock />}
                        {p.mock === "bot" && <BotMock />}
                        {p.mock === "analytics" && <AnalyticsMock />}
                      </motion.div>
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#05060a]/0 transition-colors duration-300 group-hover/mock:bg-[#05060a]/40">
                        <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-900 opacity-0 shadow-xl transition-all duration-300 group-hover/mock:translate-y-0 group-hover/mock:opacity-100">
                          Открыть демо
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-3.5"
                            aria-hidden
                          >
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                        </span>
                      </span>
                    </a>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={"Живой сайт: " + p.title}
                        className="absolute left-3 top-3 grid size-8 place-items-center rounded-full border border-white/10 bg-[#05060a]/70 text-neutral-300 backdrop-blur-md transition-colors duration-200 hover:border-emerald-400/40 hover:text-emerald-300"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-3.5"
                          aria-hidden
                        >
                          <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-4">
                    <h3 className="font-display text-base font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-neutral-400">
                      {p.text}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-neutral-400"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-5">
                      <p className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-3.5"
                          aria-hidden
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {p.result}
                      </p>
                      <a
                        href={"#/demo/" + p.mock}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-200"
                      >
                        Смотреть демо
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-3.5"
                          aria-hidden
                        >
                          <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
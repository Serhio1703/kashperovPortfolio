import { motion, useReducedMotion } from "motion/react";
import { spring } from "../../lib/motion";
import { Counter } from "../Counter";
import { Reveal } from "../Reveal";
import { DemoShell } from "./DemoShell";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const features = [
  {
    title: "Канбан-доски",
    text: "Двигайте задачи между колонками и видьте прогресс команды в реальном времени.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <rect x="3" y="3" width="7" height="18" rx="1.5" />
        <rect x="14" y="3" width="7" height="12" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Автоматизация",
    text: "Правила «если → то» убирают рутину: статусы, уведомления и напоминания сами.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Аналитика",
    text: "Скорость команды, загрузка и прогнозы по спринтам — на одном дашборде.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-6 4 3 5-8" />
      </svg>
    ),
  },
];

const plans = [
  { name: "Старт", price: "0 ₽", tag: "для личных проектов", items: ["До 3 проектов", "Канбан-доски", "5 ГБ файлов"], featured: false },
  { name: "Про", price: "990 ₽/мес", tag: "для команд", items: ["Безлимит проектов", "Автоматизация", "Аналитика", "Приоритетная поддержка"], featured: true },
  { name: "Бизнес", price: "2 490 ₽/мес", tag: "для компаний", items: ["Всё из «Про»", "SSO и роли", "API и вебхуки", "Персональный менеджер"], featured: false },
];

function KanbanMock() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(16,185,129,0.25)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-3 h-1.5 w-28 rounded bg-white/15" />
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {[0, 1, 2].map((col) => (
          <div key={col} className="space-y-2.5">
            <div className="h-1.5 w-14 rounded bg-white/20" />
            {[0, 1, 2].map((k) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.35 + col * 0.15 + k * 0.12 }}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5"
              >
                <div className="h-1.5 w-3/4 rounded bg-white/15" />
                <div className="mt-1.5 h-1 w-1/2 rounded bg-white/10" />
                <div className="mt-2 flex gap-1.5">
                  <span className="h-3 w-9 rounded-full bg-emerald-400/20" />
                  <span className="h-3 w-9 rounded-full bg-white/10" />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemoLanding() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { ...spring, delay },
  });

  return (
    <DemoShell title="Лендинг Pulse" url="pulse-demo.kashperov.ru">
      {/* hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.13] blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p {...rise(0)} className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-neutral-300">
            <span className="size-2 rounded-full bg-emerald-400" />
            Новый релиз 2.0 — автоматизация на новом уровне
          </motion.p>
          <motion.h1
            {...rise(0.08)}
            className="mx-auto mt-7 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Проекты без хаоса. <span className="text-gradient">Работа без рутины.</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-neutral-400 sm:text-lg">
            Pulse объединяет задачи, автоматизацию и аналитику в одном окне — команда видит цель, а не вкладки.
          </motion.p>
          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToId("pricing")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-[#04211a] shadow-[0_10px_36px_-10px_rgba(52,211,153,0.65)] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
            >
              Попробовать бесплатно
            </button>
            <button
              onClick={() => scrollToId("features")}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors duration-150 hover:bg-white/5"
            >
              Смотреть возможности
            </button>
          </motion.div>
          <motion.dl {...rise(0.32)} className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-3">
            {[
              { v: 12, s: "K+", l: "команд" },
              { v: 99.9, s: "%", l: "аптайм", d: 1 },
              { v: 4.9, s: "", l: "рейтинг", d: 1 },
            ].map((x) => (
              <div key={x.l} className="glass rounded-2xl px-3 py-4">
                <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                  <Counter to={x.v} suffix={x.s} decimals={x.d ?? 0} duration={1.4} />
                </dt>
                <dd className="mt-1 text-xs text-neutral-500">{x.l}</dd>
              </div>
            ))}
          </motion.dl>
          <motion.div {...rise(0.4)} className="mx-auto mt-14 max-w-3xl">
            <KanbanMock />
          </motion.div>
        </div>
      </section>

      {/* features */}
      <section id="features" className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <p className="eyebrow">Возможности</p>
            <h2 className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Всё, чтобы команда двигалась быстрее
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="glass h-full rounded-3xl p-6 transition-colors duration-300 hover:border-emerald-400/30">
                  <div className="grid size-11 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/25">
                    {f.icon}
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* pricing */}
      <section id="pricing" className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <p className="eyebrow">Тарифы</p>
            <h2 className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Начните бесплатно, растите без ограничений
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <div
                  className={
                    "relative h-full rounded-3xl p-7 " +
                    (p.featured
                      ? "border border-emerald-400/40 bg-emerald-400/[0.06] shadow-[0_20px_60px_-20px_rgba(52,211,153,0.35)]"
                      : "glass")
                  }
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#04211a]">
                      Популярный
                    </span>
                  )}
                  <h3 className="font-display text-base font-semibold text-white">{p.name}</h3>
                  <p className="mt-1 text-xs text-neutral-500">{p.tag}</p>
                  <p className="mt-4 font-display text-3xl font-bold text-white">{p.price}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-neutral-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-3.5 text-emerald-300" aria-hidden>
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={
                      "mt-6 block w-full rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-colors duration-200 " +
                      (p.featured
                        ? "bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 text-[#04211a]"
                        : "border border-white/15 text-white hover:bg-white/5")
                    }
                  >
                    Выбрать тариф
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* footer cta */}
      <section className="px-5 pb-24 pt-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-14 text-center">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-40 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.14] blur-[90px]" />
              </div>
              <h2 className="relative text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                Готовы навести порядок в проектах?
              </h2>
              <p className="relative mx-auto mt-4 max-w-md text-sm text-neutral-400">
                Бесплатный тариф навсегда. Подключение команды занимает 5 минут.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="relative mt-7 inline-flex rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-[#04211a] shadow-[0_10px_36px_-10px_rgba(52,211,153,0.65)] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
              >
                Создать проект
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </DemoShell>
  );
}

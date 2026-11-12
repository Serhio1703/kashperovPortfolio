import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { spring } from "../lib/motion";

const steps = [
  { n: "01", title: "Брифинг", text: "Разбираем задачу, цели и аудиторию. Фиксируем требования и сроки." },
  { n: "02", title: "Прототип", text: "Структура и дизайн-концепция: вы видите, как всё будет выглядеть, до разработки." },
  { n: "03", title: "Разработка", text: "Пишу код и показываю промежуточные версии — правки встроены в процесс." },
  { n: "04", title: "Запуск", text: "Тестирование, деплой, аналитика и передача всех доступов." },
  { n: "05", title: "Поддержка", text: "Остаюсь на связи: обновления, доработки и мониторинг после запуска." },
];

const faqs = [
  {
    q: "Сколько времени занимает проект?",
    a: "Лендинг — обычно 1–2 недели, веб-приложение — от 3 недель, Telegram-бот — от 3–5 дней. Точный срок фиксируем после брифинга.",
  },
  {
    q: "Сколько правок входит в стоимость?",
    a: "Правки встроены в процесс: я показываю промежуточные версии, и корректировки по ходу не считаются отдельно.",
  },
  {
    q: "Как строится оплата?",
    a: "Предоплата 50% и остаток после сдачи проекта. Для крупных проектов — поэтапная оплата по спринтам.",
  },
  {
    q: "Что нужно от меня для старта?",
    a: "Достаточно описания задачи и пары примеров, которые нравятся. Структуру, тексты-заготовки и дизайн помогу собрать.",
  },
  {
    q: "Берёте доработки существующих проектов?",
    a: "Да. Сначала делаю аудит: смотрю код, называю сроки и стоимость, потом вместе решаем, что правим.",
  },
];

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass overflow-hidden rounded-2xl transition-colors duration-300 hover:border-white/20">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-white sm:text-base">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={spring}
          className="grid size-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-neutral-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-3.5"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.45 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Process() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section id="process" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Процесс"
          title={
            <>
              Как строится <span className="text-gradient">работа</span>
            </>
          }
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* timeline */}
          <div className="relative">
            <motion.div
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={reduce ? undefined : { scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", bounce: 0, duration: 1.1 }}
              style={{ originY: 0 }}
              className="absolute bottom-6 left-[19px] top-2 w-px bg-gradient-to-b from-emerald-400/70 via-white/15 to-transparent"
            />
            <ol className="space-y-7">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.05}>
                  <li className="relative flex gap-5">
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-emerald-400/30 bg-[#0a0f13] font-display text-xs font-semibold text-emerald-300">
                      {s.n}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="font-display text-sm font-semibold text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                        {s.text}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* faq */}
          <div className="space-y-3 lg:pt-1">
            <Reveal delay={0.1}>
              <p className="font-display text-sm font-medium tracking-wide text-white">
                Частые вопросы
              </p>
            </Reveal>
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={0.08 + i * 0.04}>
                <FaqItem
                  q={f.q}
                  a={f.a}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const principles = [
  "Погружение в задачу и прозрачные сроки",
  "Чистый код, который легко развивать",
  "Адаптив и скорость на любых устройствах",
  "Поддержка после запуска",
];

export function About() {
  return (
    <section id="about" className="relative px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Обо мне"
          title={
            <>
              Пять лет превращаю идеи в{" "}
              <span className="text-gradient">работающие продукты</span>
            </>
          }
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
          <Reveal
            delay={0.05}
            className="space-y-5 text-pretty text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            <p>
              Меня зовут <span className="font-medium text-white">Сергей Кашперов</span>.
              Я веб-разработчик: делаю лендинги, веб-приложения и Telegram-ботов.
            </p>
            <p>
              Начинаю{" "}
              <span className="text-emerald-300">с задачи бизнеса, а не с кода</span>:
              разбираюсь, что нужно получить, и предлагаю решение, которое реально
              работает.
            </p>
            <p>
              Люблю чистую архитектуру, быстрые интерфейсы и внимание к деталям —
              от анимации до обработки ошибок.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm text-neutral-300">Открыт к новым проектам</span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <TiltCard max={5} className="rounded-3xl">
              <div className="glass relative h-full overflow-hidden rounded-3xl p-7 md:p-8">
                <div
                  aria-hidden
                  className="absolute -right-20 -top-20 size-56 rounded-full bg-emerald-400/10 blur-3xl"
                />
                <p className="font-display text-sm font-medium tracking-wide text-white">
                  Что важно в работе
                </p>
                <ul className="mt-6 space-y-4">
                  {principles.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm text-neutral-300"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/25">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-3"
                          aria-hidden
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
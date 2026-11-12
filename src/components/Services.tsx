import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

type Service = {
  title: string;
  text: string;
  tags: string[];
  icon: ReactNode;
  tile: string;
  halo: string;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "size-6",
};

const services: Service[] = [
  {
    title: "Лендинги",
    text: "Сайты под запуск продукта: структура, логика, анимации. Конверсия, а не просто красота.",
    tags: ["React", "Tailwind"],
    tile: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
    halo: "bg-emerald-400/15",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Веб-приложения",
    text: "SaaS, панели, личные кабинеты на React + TypeScript. Понятная архитектура.",
    tags: ["React", "TypeScript"],
    tile: "bg-cyan-400/10 text-cyan-300 ring-cyan-400/25",
    halo: "bg-cyan-400/15",
    icon: (
      <svg {...iconProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Telegram-боты",
    text: "Боты для заказов, поддержки и автоматизации процессов.",
    tags: ["Python", "aiogram"],
    tile: "bg-violet-400/10 text-violet-300 ring-violet-400/25",
    halo: "bg-violet-400/15",
    icon: (
      <svg {...iconProps}>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
  {
    title: "Автоматизация",
    text: "Интеграции, парсеры, скрипты и API — убираю ручную рутину.",
    tags: ["Python", "API"],
    tile: "bg-amber-400/10 text-amber-300 ring-amber-400/25",
    halo: "bg-amber-400/15",
    icon: (
      <svg {...iconProps}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Услуги" title="Что я делаю" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="h-full">
              <TiltCard max={5} className="rounded-3xl">
                <article className="glass group relative h-full overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-white/20">
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -right-16 -top-16 size-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      s.halo
                    )}
                  />
                  <div
                    className={cn(
                      "relative grid size-12 place-items-center rounded-2xl ring-1",
                      s.tile
                    )}
                  >
                    {s.icon}
                  </div>
                  <h3 className="relative mt-5 font-display text-base font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="relative mt-3 text-pretty text-sm leading-relaxed text-neutral-400">
                    {s.text}
                  </p>
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-neutral-400"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
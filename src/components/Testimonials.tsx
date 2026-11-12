import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { spring } from "../lib/motion";
import { SectionHeading } from "./SectionHeading";

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

/*
 * Чтобы включить секцию, заполните items реальными отзывами.
 * Пример записи:
 *
 * {
 *   name: "Иван Петров",
 *   role: "Основатель SaaS-стартапа",
 *   text: "Сергей сделал лендинг за полторы недели — конверсия выросла в два раза. Рекомендую.",
 * },
 */
const items: Testimonial[] = [];

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      6000
    );
    return () => window.clearInterval(t);
  }, [reduce]);

  if (items.length === 0) return null;

  const go = (dir: number) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section id="testimonials" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Отзывы"
          title="Что говорят клиенты"
        />
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="glass overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={spring}
                className="px-8 py-10 text-center sm:px-14"
              >
                <svg
                  className="mx-auto size-8 text-emerald-400/60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M10.5 8c-3.1 0-5.5 2.6-5.5 6.1V17h6.4v-6H8.6c.1-1.5 1.2-2.4 2.6-2.4L10.5 8zm9 0c-3.1 0-5.5 2.6-5.5 6.1V17h6.4v-6h-2.8c.1-1.5 1.2-2.4 2.6-2.4L19.5 8z" />
                </svg>
                <blockquote className="mt-5 text-pretty text-lg leading-relaxed text-neutral-200">
                  {items[index].text}
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-sm font-semibold text-white">
                    {items[index].name}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {items[index].role}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {items.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Предыдущий отзыв"
                className="glass absolute -left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-neutral-300 transition-colors duration-200 hover:text-white sm:-left-14"
              >
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
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Следующий отзыв"
                className="glass absolute -right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-neutral-300 transition-colors duration-200 hover:text-white sm:-right-14"
              >
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
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
              <div className="mt-5 flex justify-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={"Отзыв " + (i + 1)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-emerald-400" : "w-1.5 bg-white/20"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

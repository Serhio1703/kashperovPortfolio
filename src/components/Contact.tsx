import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

const EMAIL = "kashperovsergei@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = "mailto:" + EMAIL;
    }
  };

  return (
    <section id="contact" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-6 py-16 text-center sm:px-12 md:py-24">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.14] blur-[100px]" />
              <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-violet-500/[0.12] blur-[100px]" />
              <div className="absolute -right-24 top-1/3 size-72 rounded-full bg-cyan-400/[0.12] blur-[100px]" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
            />
            <div className="relative">
              <p className="eyebrow">Контакты</p>
              <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                Обсудим <span className="text-gradient">ваш проект</span>?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-neutral-400">
                Расскажите задачу — предложу решение и сроки. Обычно отвечаю в
                течение дня.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="https://t.me/Acter1703">
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
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                  Написать в Telegram
                </MagneticButton>
                <MagneticButton
                  onClick={copyEmail}
                  variant="ghost"
                  className="min-w-[15rem]"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "copied" : "email"}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                      className="inline-flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          Скопировано
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-4 text-emerald-300"
                            aria-hidden
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          {EMAIL}
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-4 opacity-70"
                            aria-hidden
                          >
                            <rect x="9" y="9" width="11" height="11" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </MagneticButton>
              </div>
              <p className="mt-9 text-xs text-neutral-500">
                Свободен для новых проектов · отвечаю в течение дня
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

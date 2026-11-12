import { MagneticButton } from "./MagneticButton";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 px-5 pb-8 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-sm font-semibold text-white">
              Сергей Кашперов
            </p>
            <p className="mt-1.5 text-sm text-neutral-500">
              Веб-разработчик · лендинги, приложения, боты
            </p>
          </div>
          <MagneticButton
            href="#top"
            variant="ghost"
            className="px-5 py-2.5 text-xs"
            strength={0.3}
          >
            Наверх
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
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </MagneticButton>
        </div>
        <p
          aria-hidden
          className="pointer-events-none mt-12 select-none whitespace-nowrap bg-gradient-to-b from-white/[0.07] to-white/[0.015] bg-clip-text text-center font-display text-[11.5vw] font-bold leading-none tracking-[-0.03em] text-transparent xl:text-[9.25rem]"
        >
          КАШПЕРОВ
        </p>
        <div className="mt-6 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Кашперов Сергей Анатольевич</p>
          <p>Сделано на React + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
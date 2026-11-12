import { useEffect, type ReactNode } from "react";
import { goHome } from "../../lib/router";

/** Общая обёртка демо-страниц: верхняя панель с кнопкой возврата. */
export function DemoShell({
  title,
  url,
  children,
}: {
  title: string;
  url: string;
  children: ReactNode;
}) {
  useEffect(() => {
    // мгновенный переход наверх после монтирования демо (обход smooth-scroll)
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05060a]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-5">
          <button
            onClick={goHome}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:border-emerald-400/40 hover:text-emerald-200"
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
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Назад в портфолио
          </button>
          <span className="glass flex items-center gap-2.5 rounded-full px-4 py-1.5">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse-soft" />
            <span className="text-xs text-neutral-300">Демо · {title}</span>
          </span>
          <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-neutral-500 sm:block">
            {url}
          </span>
        </div>
      </header>
      {children}
    </div>
  );
}

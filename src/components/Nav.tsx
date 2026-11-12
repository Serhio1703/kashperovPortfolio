import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "../lib/cn";
import { springSnappy } from "../lib/motion";
import { MagneticButton } from "./MagneticButton";

const links = [
  { href: "#about", label: "Обо мне" },
  { href: "#services", label: "Услуги" },
  { href: "#projects", label: "Проекты" },
  { href: "#process", label: "Процесс" },
  { href: "#stack", label: "Стек" },
  { href: "#contact", label: "Контакты" },
];

export function Nav() {
  const [active, setActive] = useState("#top");
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > 120 && v > prev);
  });

  useEffect(() => {
    const ids = ["top", ...links.map((l) => l.href.slice(1))];
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = "#top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = "#" + id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-150%" : "0%" }}
        transition={springSnappy}
        className="fixed inset-x-0 top-3 z-50 px-4"
      >
        <div className="glass mx-auto flex h-14 max-w-3xl items-center justify-between rounded-2xl px-3 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.9)]">
          <a href="#top" className="flex items-center gap-2.5 pl-2">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 font-display text-xs font-bold text-[#04211a]">
              СК
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-white">Кашперов</span>
          </a>

          <ul className="relative hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href} className="relative">
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    transition={springSnappy}
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15"
                  />
                )}
                <a
                  href={l.href}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                    active === l.href
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden md:block">
              <MagneticButton
                href="https://t.me/Acter1703"
                className="px-4 py-2 text-xs"
                strength={0.25}
              >
                Написать
              </MagneticButton>
            </span>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Меню"
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            >
              <span className="relative flex size-4 flex-col justify-center gap-[5px]">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-px w-full bg-white"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-px w-full bg-white"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-px w-full bg-white"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-[#05060a]/85 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-2 px-8 pt-14">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5, delay: 0.05 * i }}
                  className="border-b border-white/5 py-4 font-display text-2xl font-medium text-white"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="https://t.me/Acter1703"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5, delay: 0.3 }}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-[#04211a]"
              >
                Написать в Telegram →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
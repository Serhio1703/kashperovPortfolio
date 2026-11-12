import { cn } from "../lib/cn";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const rowA = ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "Motion"];
const rowB = ["Python", "PostgreSQL", "Docker", "REST API", "Telegram Bot API", "Git"];

function TechIcon({ name }: { name: string }) {
  switch (name) {
    case "React":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <circle cx="12" cy="12" r="1.7" fill="#61DAFB" />
          <g fill="none" stroke="#61DAFB" strokeWidth="1.1">
            <ellipse cx="12" cy="12" rx="9.6" ry="3.9" />
            <ellipse cx="12" cy="12" rx="9.6" ry="3.9" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9.6" ry="3.9" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <rect width="24" height="24" rx="5" fill="#3178C6" />
          <text x="12" y="16.2" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Arial">
            TS
          </text>
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <circle cx="12" cy="12" r="12" fill="#fff" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#000" fontFamily="Arial">
            N
          </text>
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <polygon points="12,1.8 21,6.9 21,17.1 12,22.2 3,17.1 3,6.9" fill="#539E43" />
          <polygon
            points="12,4.8 19,8.8 19,16.2 12,20.2 5,16.2 5,8.8"
            fill="none"
            stroke="#fff"
            strokeWidth="1.1"
          />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path
            d="M7 8.2c2.2-1.8 4.3-.4 5 1.1.9 1.8 2.6 2.9 5 1M7 15.2c2.2-1.8 4.3-.4 5 1.1.9 1.8 2.6 2.9 5 1"
            stroke="#38BDF8"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Motion":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <defs>
            <linearGradient id="motion-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <text x="12" y="17.5" textAnchor="middle" fontSize="14" fontWeight="800" fill="url(#motion-grad)" fontFamily="Arial">
            M
          </text>
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path
            d="M11.4 3.5c-3.7 0-6.1 2.3-6.1 5.3 0 2.3 1.4 3.9 3.3 3.9h3.3V9.6H8.8c-1.2 0-2.2-1.1-2.2-2.5S7.6 4.6 9.1 4.6h4.7c1.7 0 2.9 1.2 2.9 2.9v3.4c0 1.7-1.2 2.9-2.9 2.9h-1.1v2.4h1.1c3.3 0 5.7-2.3 5.7-5.1V7.7c0-2.6-2.4-4.2-5.6-4.2h-2.5z"
            fill="#3776AB"
          />
          <path
            d="M12.6 20.5c1.6 0 2.8-1.2 2.8-2.6 0-1.2-.9-2.2-2.3-2.2h-2v1.9h1.7c.6 0 1 .5 1 1.2s-.4 1.1-1 1.1H9.1c-1 0-1.8-.7-1.8-1.7v-2.6H5.1v3.2c0 2.2 1.7 3.7 3.8 3.7h3.7z"
            fill="#FFD43B"
          />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <ellipse cx="12" cy="5.2" rx="7.2" ry="2.8" fill="#336791" />
          <path
            d="M4.8 5.2v8.4c0 1.5 3.2 2.8 7.2 2.8s7.2-1.3 7.2-2.8V5.2"
            fill="none"
            stroke="#336791"
            strokeWidth="2.6"
          />
          <path
            d="M4.8 9.4c0 1.5 3.2 2.8 7.2 2.8s7.2-1.3 7.2-2.8"
            fill="none"
            stroke="#336791"
            strokeWidth="1.4"
            opacity=".7"
          />
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <rect x="6.6" y="4.6" width="2.4" height="2.6" fill="#2496ED" />
          <rect x="9.4" y="4.6" width="2.4" height="2.6" fill="#2496ED" />
          <rect x="12.2" y="4.6" width="2.4" height="2.6" fill="#2496ED" />
          <rect x="8" y="2.2" width="2.4" height="2.2" fill="#2496ED" />
          <rect x="10.8" y="2.2" width="2.4" height="2.2" fill="#2496ED" />
          <rect x="2.4" y="9.4" width="19.2" height="9.4" rx="2.2" fill="#2496ED" />
          <circle cx="5.6" cy="15" r="1" fill="#fff" />
          <circle cx="8.6" cy="15" r="1" fill="#fff" />
          <circle cx="11.6" cy="15" r="1" fill="#fff" />
        </svg>
      );
    case "REST API":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path
            d="M8.2 4.5c-2.3 0-3.7 1.8-3.7 4v2.6c0 1.6-.9 2.4-2.5 2.4v.6c1.6 0 2.5.8 2.5 2.4v2.6c0 2.2 1.4 4 3.7 4M15.8 4.5c2.3 0 3.7 1.8 3.7 4v2.6c0 1.6.9 2.4 2.5 2.4v.6c-1.6 0-2.5.8-2.5 2.4v2.6c0 2.2-1.4 4-3.7 4"
            stroke="#F7DF1E"
            strokeWidth="1.9"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Telegram Bot API":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path d="M21 3 3 10.5l6.8 2.3L12.5 20l2.4-5.6L21 3z" fill="#2AABEE" />
          <path d="m9.8 12.8 11.2-9.8" stroke="#fff" strokeWidth="1.3" />
        </svg>
      );
    case "Git":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path d="M12 2.5l8.2 5.8-8.2 5.8-8.2-5.8z" fill="#F05032" />
          <path
            d="M7.6 6.2v5.8M6.3 12.2c0 1.2 1.3 1.9 2.6 1.9M7.6 8.3c2 0 3.9-1 3.9-2.4"
            stroke="#fff"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function MarqueeRow({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("marquee-paused marquee-mask overflow-hidden py-1", className)}>
      <div
        className={cn(
          "marquee-track",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex gap-3 pr-3">
            {items.map((t) => (
              <span
                key={t}
                className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-emerald-400/40 hover:text-white"
              >
                <TechIcon name={t} />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Стек"
          title="Технологии, которыми работаю"
          description="Инструменты, на которых пишу продукты: от фронтенда до ботов и серверов."
        />
        <Reveal delay={0.1} className="mt-12 space-y-4">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} reverse />
        </Reveal>
      </div>
    </section>
  );
}

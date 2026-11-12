import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Reveal } from "./Reveal";

/** Reusable section header: eyebrow chip + display title + optional description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-balance font-display text-2xl font-semibold leading-[1.15] tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-pretty leading-relaxed text-neutral-400",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
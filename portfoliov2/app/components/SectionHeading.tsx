import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  /** CSS colour for this section's accent (the index, rule and italic word). */
  accent?: string;
  title: ReactNode;
  /** Optional one-line framing under the title. */
  description?: string;
  image?: string;
  /** Wired to the section's aria-labelledby. */
  titleId?: string;
};

export default function SectionHeading({
  index,
  label,
  accent,
  title,
  description,
  image,
  titleId,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 flex items-end justify-between gap-6 md:mb-14">
      <div className="min-w-0">
        <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] md:mb-5">
          <span className="tabular-nums font-medium" style={{ color: accent }}>
            {index}
          </span>
          <span
            aria-hidden
            className="h-px w-8"
            style={{ backgroundColor: accent, opacity: 0.45 }}
          />
          <span style={{ color: accent }}>{label}</span>
        </p>
        <h2
          id={titleId}
          className="font-light leading-[0.95] tracking-[-0.035em] text-primary [&_em]:text-[color:var(--section-accent)]"
          style={{ fontSize: "clamp(36px, 5.4vw, 66px)", ["--section-accent" as string]: accent }}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-secondary md:mt-5">
            {description}
          </p>
        )}
      </div>

      {image && (
        <Image
          src={image}
          alt=""
          width={120}
          height={120}
          sizes="(min-width: 768px) 112px, 72px"
          className="h-18 w-18 shrink-0 object-contain md:h-28 md:w-28"
        />
      )}
    </Reveal>
  );
}

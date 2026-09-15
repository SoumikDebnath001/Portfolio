import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  image?: string;
};

export default function SectionHeading({ index, label, title, image }: SectionHeadingProps) {
  return (
    <Reveal className="flex items-end justify-between gap-6 mb-10 md:mb-16">
      <div className="min-w-0">
        <p className="flex items-center gap-3 mb-4 md:mb-5 text-[11px] tracking-[0.2em] uppercase text-secondary">
          <span className="text-primary tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-8 bg-[#CFCFCF]" />
          {label}
        </p>
        <h2
          className="text-primary font-light leading-[0.95] tracking-[-0.035em]"
          style={{ fontSize: "clamp(38px, 6vw, 72px)" }}
        >
          {title}
        </h2>
      </div>

      {image && (
        <Image
          src={image}
          alt=""
          width={120}
          height={120}
          sizes="(min-width: 768px) 112px, 72px"
          className="shrink-0 object-contain w-18 h-18 md:w-28 md:h-28"
        />
      )}
    </Reveal>
  );
}

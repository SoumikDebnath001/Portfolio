import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

export default function FeaturedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="bg-base py-section md:py-section-lg"
    >
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          accent="var(--color-accent-work)"
          index="02"
          label="Work"
          titleId="work-title"
          title={<>Selected <em className="font-playfair font-normal italic">work</em></>}
          description="Shipped, in production, and still maintained."
        />

        <ul className="list-none border-b border-border">
          {projects.map((project, index) => (
            <li key={project.title} className="border-t border-border">
              <Reveal delay={index * 0.06}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid grid-cols-[1fr_auto] gap-x-4 gap-y-4 py-7 no-underline md:grid-cols-[56px_minmax(0,1.3fr)_minmax(0,1fr)_44px] md:items-center md:gap-x-8 md:py-9"
                >
                  {/* Row wash on hover — reads as one target without boxing it in */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-4 -inset-y-0 -z-10 rounded-2xl bg-primary/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:-inset-x-6"
                  />

                  <span className="hidden text-[12px] tabular-nums text-muted transition-colors duration-300 group-hover:text-primary md:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3
                      className="font-light leading-tight tracking-[-0.02em] text-primary transition-transform duration-300 md:group-hover:translate-x-1"
                      style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-secondary">
                      {project.summary}
                    </p>
                  </div>

                  <ul className="col-span-2 row-start-2 flex list-none flex-wrap gap-1.5 md:col-span-1 md:row-start-auto md:justify-end">
                    {project.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-[12px] text-secondary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span
                    aria-hidden
                    className="col-start-2 row-start-1 flex h-10 w-10 items-center justify-center self-start rounded-full border border-border text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary md:col-start-auto md:row-start-auto md:h-11 md:w-11 md:self-center"
                  >
                    <FiArrowUpRight size={16} />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <Link
            href="/work"
            className="group mt-10 inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-[14px] text-primary no-underline transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-on-primary"
          >
            View project details
            <FiArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

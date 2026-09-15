import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

export default function FeaturedWork() {
  return (
    <section id="work" className="bg-base py-14 md:py-24">
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          index="02"
          label="Work"
          title={<>Selected <em className="font-playfair italic font-normal">work</em></>}
        />

        <ul className="border-b border-border">
          {projects.map((project, index) => (
            <li key={project.title} className="border-t border-border">
              <Reveal delay={index * 0.06}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-4 py-7 md:grid-cols-[56px_minmax(0,1.3fr)_minmax(0,1fr)_44px] md:items-center md:gap-x-8 md:py-9 no-underline"
                >
                  <span className="hidden md:block text-[12px] tabular-nums text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3
                      className="text-primary font-light leading-tight tracking-[-0.02em] transition-transform duration-300 md:group-hover:translate-x-1"
                      style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-secondary">{project.summary}</p>
                  </div>

                  <ul className="col-span-2 row-start-2 flex flex-wrap gap-1.5 md:col-span-1 md:row-start-auto md:justify-end">
                    {project.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="px-3 py-1 rounded-full border border-[#DEDEDE] bg-white text-[12px] text-[#555]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span
                    aria-hidden
                    className="col-start-2 row-start-1 flex h-10 w-10 items-center justify-center self-start rounded-full border border-[#D0D0D0] text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white md:col-start-auto md:row-start-auto md:h-11 md:w-11 md:self-center"
                  >
                    <FiArrowUpRight size={16} />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Link
          href="/work"
          className="group mt-10 inline-flex h-11 items-center gap-2 rounded-full border border-[#D0D0D0] px-5 text-[14px] text-primary no-underline transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white"
        >
          View project details
          <FiArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

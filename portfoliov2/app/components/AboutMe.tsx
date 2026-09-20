import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

const facts = [
  { label: "Focus",         value: "Full stack & GenAI" },
  { label: "Live projects", value: String(projects.length).padStart(2, "0") },
  { label: "Based in",      value: "India" },
  { label: "Currently",     value: "Open to work" },
];

export default function AboutMe() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-base py-section md:py-section-lg"
    >
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          accent="var(--color-accent-about)"
          index="01"
          label="About"
          titleId="about-title"
          title={<>Who am <em className="font-playfair font-normal italic">I?</em></>}
          image="/WhoAmI.png"
        />

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-7 lg:col-span-7">
            <p
              className="font-light leading-[1.35] tracking-[-0.015em] text-primary"
              style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
            >
              I build web products end to end — clean, responsive interfaces
              backed by fast, reliable APIs.
            </p>
            <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.75] text-secondary md:text-[16px]">
              I care about the details people notice and the architecture they
              don&apos;t. These days I&apos;m focused on bringing generative AI
              into real products, while sharpening my fundamentals through DSA
              and system design.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5 lg:col-start-9 lg:col-span-4">
            <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-4 md:grid-cols-1 md:gap-x-0">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-t border-hairline py-4 md:flex-row md:items-baseline md:justify-between md:gap-4 md:py-4.5"
                >
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-secondary">
                    {fact.label}
                  </dt>
                  <dd className="text-[15px] text-primary md:text-right md:text-[16px]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

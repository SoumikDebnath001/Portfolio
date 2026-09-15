import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

const facts = [
  { label: "Focus", value: "Full stack & GenAI" },
  { label: "Live projects", value: String(projects.length).padStart(2, "0") },
  { label: "Based in", value: "India" },
];

export default function AboutMe() {
  return (
    <section id="about" className="bg-base py-14 md:py-24">
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          index="01"
          label="About"
          title={<>Who am <em className="font-playfair italic font-normal">I?</em></>}
          image="/WhoAmI.png"
        />

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-8 lg:col-span-7">
            <p
              className="text-primary font-light leading-[1.35] tracking-[-0.015em]"
              style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
            >
              I build web products end to end — clean, responsive interfaces
              backed by fast, reliable APIs.
            </p>
            <p className="mt-6 max-w-[56ch] text-secondary text-[15px] md:text-[16px] leading-[1.75]">
              I care about the details people notice and the architecture they
              don&apos;t. These days I&apos;m focused on bringing generative AI
              into real products, while sharpening my fundamentals through DSA
              and system design.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 lg:col-start-9">
            <dl className="grid grid-cols-3 border-y border-border md:grid-cols-1 md:border-b-0">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between md:py-5 md:border-b md:border-border"
                >
                  <dt className="text-[11px] tracking-[0.14em] uppercase text-secondary">{fact.label}</dt>
                  <dd className="text-[15px] md:text-[16px] text-primary">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

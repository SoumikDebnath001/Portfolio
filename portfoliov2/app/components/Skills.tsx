import { Fragment } from "react";
import type { IconType } from "react-icons";
import {
  SiCplusplus, SiJavascript, SiPython, SiTypescript,
  SiHtml5, SiCss, SiTailwindcss, SiReact, SiMongodb,
  SiNodedotjs, SiNextdotjs, SiExpress, SiPostgresql,
  SiDocker, SiGit, SiGithubactions,
  SiSocketdotio, SiPrisma, SiOpenai,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type Skill = { name: string; icon: IconType; color: string };

const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#E3C500" },
      { name: "Python",     icon: SiPython,     color: "#3776AB" },
      { name: "C++",        icon: SiCplusplus,  color: "#00599C" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React",        icon: SiReact,       color: "#149ECA" },
      { name: "Next.js",      icon: SiNextdotjs,   color: "#222222" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML",         icon: SiHtml5,       color: "#E34F26" },
      { name: "CSS",          icon: SiCss,         color: "#1572B6" },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      { name: "Node.js",    icon: SiNodedotjs,   color: "#339933" },
      { name: "Express",    icon: SiExpress,     color: "#444444" },
      { name: "MongoDB",    icon: SiMongodb,     color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql,  color: "#4169E1" },
      { name: "ORM",        icon: SiPrisma,      color: "#5A67D8" },
      { name: "WebSocket",  icon: SiSocketdotio, color: "#222222" },
    ],
  },
  {
    title: "DevOps & AI",
    skills: [
      { name: "Docker",       icon: SiDocker,        color: "#2496ED" },
      { name: "Git & GitHub", icon: SiGit,           color: "#F05032" },
      { name: "CI/CD",        icon: SiGithubactions, color: "#2088FF" },
      { name: "GenAI",        icon: SiOpenai,        color: "#412991" },
    ],
  },
];

const fundamentals = ["Data Structures & Algorithms", "System Design", "OOP", "DBMS", "Operating Systems"];

export default function Skills() {
  return (
    <section id="skills" className="bg-base py-14 md:py-24">
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          index="03"
          label="Skills"
          title={<>Skills &amp; <em className="font-playfair italic font-normal">stack</em></>}
          image="/Cat_AboutME.png"
        />

        <div className="border-b border-border">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 0.05}
              className="grid gap-4 border-t border-border py-6 md:grid-cols-[220px_1fr] md:gap-8 md:py-8"
            >
              <h3 className="text-[11px] tracking-[0.18em] uppercase text-secondary md:pt-2.5">{group.title}</h3>
              <ul className="flex flex-wrap gap-2 md:gap-2.5">
                {group.skills.map(({ name, icon: Icon, color }) => (
                  <li
                    key={name}
                    className="inline-flex h-10 items-center gap-2.5 rounded-full border border-[#E6E6E6] bg-white pl-1.5 pr-4 text-[14px] text-primary transition-colors duration-200 hover:border-[#C8C8C8]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F4F4]">
                      <Icon size={14} style={{ color }} aria-hidden />
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="grid gap-4 border-t border-border py-6 md:grid-cols-[220px_1fr] md:gap-8 md:py-8">
            <h3 className="text-[11px] tracking-[0.18em] uppercase text-secondary md:pt-0.5">Fundamentals</h3>
            <p className="text-[15px] leading-relaxed text-primary">
              {fundamentals.map((item, i) => (
                <Fragment key={item}>
                  <span className="whitespace-nowrap">
                    {item}
                    {i < fundamentals.length - 1 && <span aria-hidden className="ml-2.5 mr-1.5 text-[#C4C4C4]">/</span>}
                  </span>{" "}
                </Fragment>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

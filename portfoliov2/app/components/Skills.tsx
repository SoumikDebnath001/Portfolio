"use client";

import { Fragment, useState } from "react";
import {
  SiCplusplus, SiJavascript, SiPython, SiTypescript,
  SiHtml5, SiCss, SiTailwindcss, SiReact, SiMongodb,
  SiNodedotjs, SiNextdotjs, SiExpress, SiPostgresql,
  SiDocker, SiGit, SiGithubactions,
  SiSocketdotio, SiPrisma, SiOpenai,
} from "react-icons/si";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import InfoDialog, { type InfoItem } from "./InfoDialog";

type Skill = Omit<InfoItem, "category">;

const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      {
        name: "TypeScript", icon: SiTypescript, color: "#3178C6", by: "Microsoft",
        description: "Typed superset of JavaScript. Catches bugs at compile time and keeps large codebases refactorable.",
      },
      {
        name: "JavaScript", icon: SiJavascript, color: "#E3C500", by: "Ecma International",
        description: "The language of the web — async patterns, the DOM, and everything that runs in a browser or Node.",
      },
      {
        name: "Python", icon: SiPython, color: "#3776AB", by: "Python Software Foundation",
        description: "My go-to for scripting, automation, and working with data or AI libraries.",
      },
      {
        name: "C++", icon: SiCplusplus, color: "#00599C", by: "ISO Standard",
        description: "Where I learned memory, pointers, and performance — the base for DSA and problem solving.",
      },
    ],
  },
  {
    title: "Frontend",
    skills: [
      {
        name: "React", icon: SiReact, color: "#149ECA", by: "Meta",
        description: "Component-driven UI with hooks and state. The foundation of most interfaces I build.",
      },
      {
        name: "Next.js", icon: SiNextdotjs, color: "#222222", darkColor: "#F1F1F2", by: "Vercel",
        description: "React framework with the App Router, server components, and built-in routing and API handlers.",
      },
      {
        name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", by: "Tailwind Labs",
        description: "Utility-first styling that keeps design consistent and responsive without leaving the markup.",
      },
      {
        name: "HTML", icon: SiHtml5, color: "#E34F26", by: "WHATWG",
        description: "Semantic structure and accessibility — the part that decides whether a page actually works for everyone.",
      },
      {
        name: "CSS", icon: SiCss, color: "#1572B6", by: "W3C",
        description: "Flexbox, grid, transitions, and responsive layout down to the details.",
      },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      {
        name: "Node.js", icon: SiNodedotjs, color: "#339933", by: "OpenJS Foundation",
        description: "JavaScript on the server — REST APIs, auth flows, file handling, and background jobs.",
      },
      {
        name: "Express", icon: SiExpress, color: "#444444", darkColor: "#C9C9D1", by: "OpenJS Foundation",
        description: "Minimal Node framework for routing, middleware, and quickly standing up an API.",
      },
      {
        name: "MongoDB", icon: SiMongodb, color: "#47A248", by: "MongoDB Inc.",
        description: "Document database for flexible schemas, with Mongoose models and aggregation pipelines.",
      },
      {
        name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", by: "PostgreSQL Global Dev Group",
        description: "Relational database for structured data, joins, and constraints that hold the data honest.",
      },
      {
        name: "ORM", icon: SiPrisma, color: "#5A67D8", by: "Prisma / Mongoose",
        description: "Type-safe database access with migrations and models, instead of hand-writing every query.",
      },
      {
        name: "WebSocket", icon: SiSocketdotio, color: "#222222", darkColor: "#F1F1F2", by: "Socket.IO",
        description: "Real-time two-way communication for live updates, chat, and presence features.",
      },
    ],
  },
  {
    title: "DevOps & AI",
    skills: [
      {
        name: "Docker", icon: SiDocker, color: "#2496ED", by: "Docker Inc.",
        description: "Containers that make an app run the same on my machine, a teammate's, and in production.",
      },
      {
        name: "Git & GitHub", icon: SiGit, color: "#F05032", by: "Git / GitHub",
        description: "Branching, rebasing, and pull requests — version control as the safety net for every change.",
      },
      {
        name: "CI/CD", icon: SiGithubactions, color: "#2088FF", by: "GitHub Actions",
        description: "Automated pipelines that lint, test, build, and deploy on every push.",
      },
      {
        name: "GenAI", icon: SiOpenai, color: "#412991", by: "LLM APIs",
        description: "Building with LLM APIs — prompting, streaming responses, embeddings, and tool calling.",
      },
    ],
  },
];

const fundamentals = ["Data Structures & Algorithms", "System Design", "OOP", "DBMS", "Operating Systems"];

export default function Skills() {
  const [active, setActive] = useState<InfoItem | null>(null);

  return (
    <section id="skills" aria-labelledby="skills-title" className="bg-base py-section md:py-section-lg">
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          accent="var(--color-accent-skills)"
          index="03"
          label="Skills"
          titleId="skills-title"
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
                {group.skills.map((skill) => {
                  const { name, icon: Icon, color, darkColor } = skill;
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        onClick={() => setActive({ ...skill, category: group.title })}
                        aria-label={`About ${name}`}
                        className="inline-flex h-10 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-surface pl-1.5 pr-4 text-[14px] text-primary transition-colors duration-200 hover:border-secondary"
                      >
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-elevated"
                          style={{
                            ["--brand" as string]: color,
                            ["--brand-dark" as string]: darkColor ?? color,
                          }}
                        >
                          <Icon
                            size={14}
                            aria-hidden
                            className="text-[color:var(--brand)] dark:text-[color:var(--brand-dark)]"
                          />
                        </span>
                        {name}
                      </button>
                    </li>
                  );
                })}
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

      <AnimatePresence>
        {active && <InfoDialog item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiCplusplus, SiJavascript, SiPython, SiTypescript,
  SiHtml5, SiCss, SiTailwindcss, SiReact, SiMongodb,
  SiNodedotjs, SiNextdotjs, SiExpress, SiPostgresql,
  SiMysql, SiDocker, SiGit, SiGithub, SiGithubactions,
  SiSocketdotio, SiPrisma, SiOpenai,
} from "react-icons/si";

const iconMap: Record<string, { icon: IconType; color: string }> = {
  "C++":            { icon: SiCplusplus,     color: "#00599C" },
  "JavaScript":     { icon: SiJavascript,    color: "#F7DF1E" },
  "Python":         { icon: SiPython,        color: "#3776AB" },
  "TypeScript":     { icon: SiTypescript,    color: "#3178C6" },
  "HTML":           { icon: SiHtml5,         color: "#E34F26" },
  "CSS":            { icon: SiCss,           color: "#1572B6" },
  "Tailwind CSS":   { icon: SiTailwindcss,   color: "#06B6D4" },
  "React.js":       { icon: SiReact,         color: "#61DAFB" },
  "MongoDB":        { icon: SiMongodb,       color: "#47A248" },
  "NodeJS":         { icon: SiNodedotjs,     color: "#339933" },
  "Next.js":        { icon: SiNextdotjs,     color: "#222222" },
  "Express.js":     { icon: SiExpress,       color: "#444444" },
  "PostgreSQL":     { icon: SiPostgresql,    color: "#4169E1" },
  "PgSQL":          { icon: SiPostgresql,    color: "#4169E1" },
  "SQL":            { icon: SiMysql,         color: "#4479A1" },
  "Docker":         { icon: SiDocker,        color: "#2496ED" },
  "Git":            { icon: SiGit,           color: "#F05032" },
  "GitHub":         { icon: SiGithub,        color: "#333333" },
  "CI/CD":          { icon: SiGithubactions, color: "#2088FF" },
  "WebSocket":      { icon: SiSocketdotio,   color: "#010101" },
  "ORM":            { icon: SiPrisma,        color: "#5A67D8" },
  "GenAI":          { icon: SiOpenai,        color: "#412991" },
};

type Category = {
  title: string;
  showIcons: boolean;
  skills: string[];
  colSpan: 1 | 2 | 4;
  rowSpan?: 2;
};

const skillCategories: Category[] = [
  {
    title: "Languages",
    showIcons: true,
    skills: ["C++", "JavaScript", "Python", "TypeScript"],
    colSpan: 2,
  },
  {
    title: "Concepts",
    showIcons: false,
    skills: ["OOPS", "DSA", "DBMS", "OS", "System Design"],
    colSpan: 2,
  },
  {
    title: "Development",
    showIcons: true,
    skills: ["HTML", "CSS", "Tailwind CSS", "React.js", "NodeJS", "Next.js", "Express.js"],
    colSpan: 4,
  },
  {
    title: "Database",
    showIcons: true,
    skills: ["MongoDB", "PostgreSQL", "SQL", "PgSQL"],
    colSpan: 2,
  },
  {
    title: "Soft Skills",
    showIcons: false,
    skills: ["Critical Thinking", "Teamwork", "Time Management", "Adaptability"],
    colSpan: 1,
  },
  {
    title: "Additional",
    showIcons: true,
    skills: ["GenAI", "Docker", "Git", "GitHub", "CI/CD", "WebSocket", "ORM"],
    colSpan: 1,
  },
];

function IconSkill({ skill, size = "md" }: { skill: string; size?: "sm" | "md" | "lg" }) {
  const entry = iconMap[skill];
  if (!entry) return null;
  const Icon = entry.icon;

  const iconSize = size === "lg" ? 22 : size === "sm" ? 16 : 18;
  const boxSize  = size === "lg" ? "w-11 h-11 md:w-16 md:h-16" : size === "sm" ? "w-8 h-8 md:w-10 md:h-10" : "w-9 h-9 md:w-12 md:h-12";
  const textSize = "text-2.25 md:text-2.5";

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.06 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex flex-col items-center gap-0 md:gap-2 cursor-default"
    >
      <div
        className={`${boxSize} rounded-2xl bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center`}
      >
        <Icon size={iconSize} style={{ color: entry.color }} />
      </div>
      <span className={`hidden md:block ${textSize} text-secondary tracking-[0.03em] font-normal text-center leading-tight`}>
        {skill}
      </span>
    </motion.div>
  );
}

const colSpanClass: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  4: "col-span-2 md:col-span-4",
};

function SkillCard({ category, index }: { category: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isFullWidth = category.colSpan === 4;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className={[
        colSpanClass[category.colSpan],
        category.rowSpan === 2 ? "row-span-2" : "",
        "bg-white rounded-2xl border border-[#EBEBEB] p-3 md:p-6 flex flex-col gap-3 md:gap-4",
        "hover:border-[#D4D4D4] transition-colors duration-300",
      ].join(" ")}
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <p className="text-2.5 text-secondary tracking-[0.22em] uppercase font-medium">
        {category.title}
      </p>
      <div className="h-px bg-[#F0F0F0]" />

      {category.showIcons ? (
        <div className={`flex flex-wrap ${isFullWidth ? "gap-3 md:gap-8" : "gap-2.5 md:gap-5"} flex-1`}>
          {category.skills.map((skill) => (
            <IconSkill
              key={skill}
              skill={skill}
              size={isFullWidth ? "lg" : "md"}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 flex-1">
          {category.skills.map((skill) => (
            <div key={skill} className="flex items-center gap-2.5">
              <div className="w-1 h-1 rounded-full bg-[#D0D0D0] shrink-0" />
              <span className="text-3.25 text-primary font-normal tracking-[0.01em]">
                {skill}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="relative bg-base py-24">

      {/* Left vertical label (desktop only) */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-7.5 items-center justify-center">
        <span className="block -rotate-90 whitespace-nowrap text-secondary text-2.75 tracking-[0.18em] uppercase font-normal">
          Skills
        </span>
      </div>

      <div className="max-w-350 mx-auto px-5 md:px-20">

        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-secondary text-2.75 tracking-[0.2em] uppercase font-normal mb-4">
            03 — What I work with
          </p>
          <h2
            className="text-primary font-extralight leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
          >
            Skills &amp;
            <br />
            Technologies
          </h2>
        </motion.div>

        <div className="h-px bg-border mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-auto">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

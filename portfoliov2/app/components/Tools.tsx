"use client";

import { useState } from "react";
import { FiZap } from "react-icons/fi";
import { SiAnthropic, SiGooglegemini, SiOpenai, SiPostman, SiMongodb, SiVscodium } from "react-icons/si";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import InfoDialog, { type InfoItem } from "./InfoDialog";

type Tool = InfoItem;

const TOOLS: Tool[] = [
  {
    name: "Claude",
    by: "Anthropic",
    category: "AI",
    color: "#D97757",
    icon: SiAnthropic,
    description: "Primary AI pair-programmer for debugging, code reviews, and long-context reasoning.",
  },
  {
    name: "Gemini",
    by: "Google",
    category: "AI",
    color: "#4285F4",
    icon: SiGooglegemini,
    description: "Multimodal reasoning and research across docs, images, and long files.",
  },
  {
    name: "ChatGPT",
    by: "OpenAI",
    category: "AI",
    color: "#10A37F",
    icon: SiOpenai,
    description: "Fast drafts, concept explanations, and boilerplate when speed matters over depth.",
  },
  {
    name: "Antigravity",
    by: "Google",
    category: "IDE",
    color: "#7C3AED",
    icon: FiZap,
    description: "Agent-first IDE for planning and running multi-file changes across a codebase.",
  },
  {
    name: "VS Code",
    by: "Microsoft",
    category: "Editor",
    color: "#0078D4",
    icon: SiVscodium,
    description: "Primary editor with TypeScript, Tailwind IntelliSense, ESLint, and Git integration.",
  },
  {
    name: "Postman",
    by: "Postman Inc.",
    category: "API",
    color: "#FF6C37",
    icon: SiPostman,
    description: "Designs, tests, and documents REST APIs before frontend integration.",
  },
  {
    name: "MongoDB Compass",
    by: "MongoDB",
    category: "Database",
    color: "#00684A",
    icon: SiMongodb,
    description: "Visual interface for browsing collections, testing queries, and inspecting schemas.",
  },
];

export default function Tools() {
  const [active, setActive] = useState<Tool | null>(null);

  return (
    <section id="tools" aria-labelledby="tools-title" className="bg-base py-section md:py-section-lg">
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          accent="var(--color-accent-tools)"
          index="04"
          label="Tools"
          titleId="tools-title"
          title={<>My daily <em className="font-playfair italic font-normal">toolkit</em></>}
          image="/Cat_ToolsWorker.png"
        />

        <ul className="grid grid-cols-4 gap-2.5 sm:grid-cols-5 md:grid-cols-4 md:gap-3 lg:grid-cols-7">
          {TOOLS.map((tool, index) => {
            const { name, category, color, icon: Icon } = tool;
            return (
              <li key={name}>
                <Reveal delay={index * 0.03} className="h-full">
                  <button
                    type="button"
                    onClick={() => setActive(tool)}
                    aria-label={`About ${name}`}
                    className="flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border border-border bg-surface p-2.5 text-left transition-colors duration-200 hover:border-secondary md:justify-start md:gap-3 md:p-4"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: color }}
                    >
                      <Icon size={16} aria-hidden />
                    </span>
                    <span className="hidden min-w-0 md:block">
                      <span className="block text-[14px] font-medium leading-tight text-primary">{name}</span>
                      <span className="mt-0.5 block text-[12px] text-secondary">{category}</span>
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>
        {active && <InfoDialog item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiTerminal, FiImage, FiDatabase, FiZap } from "react-icons/fi";
import {
  SiAnthropic, SiPerplexity, SiOpenai, SiPostman, SiMongodb, SiVscodium,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Tool = {
  name: string;
  by: string;
  category: string;
  description: string;
  color: string;
  icon: IconType;
};

const aiTools: Tool[] = [
  {
    name: "Claude",
    by: "Anthropic",
    category: "Coding & Dev",
    description: "Primary AI pair-programmer for debugging, code reviews, and long-context reasoning.",
    color: "#CC785C",
    icon: SiAnthropic,
  },
  {
    name: "Perplexity",
    by: "Perplexity AI",
    category: "Research",
    description: "AI search with real-time cited sources for exploring docs and comparing libraries.",
    color: "#1FB8CD",
    icon: SiPerplexity,
  },
  {
    name: "ChatGPT",
    by: "OpenAI",
    category: "Quick Tasks",
    description: "Fast drafts, concept explanations, and boilerplate when speed matters over depth.",
    color: "#10A37F",
    icon: SiOpenai,
  },
  {
    name: "Cursor",
    by: "Anysphere",
    category: "AI Code Editor",
    description: "VS Code-based IDE with codebase-aware AI for multi-file edits and inline chat.",
    color: "#6C63FF",
    icon: FiTerminal,
  },
  {
    name: "NanoBanana",
    by: "NanoBanana",
    category: "Image Generation",
    description: "Generates visual assets, mockups, and graphics for UI prototyping and projects.",
    color: "#F59E0B",
    icon: FiImage,
  },
];

const devTools: Tool[] = [
  {
    name: "VS Code",
    by: "Microsoft",
    category: "Code Editor",
    description: "Primary editor with TypeScript, Tailwind IntelliSense, ESLint, and Git integration.",
    color: "#007ACC",
    icon: SiVscodium,
  },
  {
    name: "Postman",
    by: "Postman Inc.",
    category: "API Testing",
    description: "Designs, tests, and documents REST APIs before frontend integration.",
    color: "#FF6C37",
    icon: SiPostman,
  },
  {
    name: "Admin$",
    by: "AdminJS",
    category: "Admin Panel",
    description: "Auto-generates admin dashboards for managing app data and users without custom UI.",
    color: "#3B82F6",
    icon: FiDatabase,
  },
  {
    name: "MongoDB Compass",
    by: "MongoDB",
    category: "Database GUI",
    description: "Visual interface for browsing collections, testing queries, and inspecting schemas.",
    color: "#47A248",
    icon: SiMongodb,
  },
  {
    name: "Antigravity",
    by: "Antigravity",
    category: "Productivity",
    description: "Streamlines developer workflows and automates repetitive tasks during long sessions.",
    color: "#8B5CF6",
    icon: FiZap,
  },
];

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.06 }}
      className="bg-white rounded-2xl border border-[#EBEBEB] p-5 flex flex-col gap-3.5 hover:border-[#D4D4D4] transition-colors duration-300"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${tool.color}15` }}
          >
            <Icon size={17} style={{ color: tool.color }} />
          </div>
          <div>
            <p className="text-primary text-3.5 font-thin tracking-[-0.01em] leading-tight">{tool.name}</p>
            <p className="text-secondary text-2.5 tracking-[0.01em] mt-0.5">{tool.by}</p>
          </div>
        </div>
        <span
          className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-[0.04em] whitespace-nowrap"
          style={{ backgroundColor: `${tool.color}12`, color: tool.color }}
        >
          {tool.category}
        </span>
      </div>

      <div className="h-px bg-[#F4F4F4]" />

      <p className="text-secondary text-3 font-normal leading-[1.6] tracking-[0.01em]">
        {tool.description}
      </p>
    </motion.div>
  );
}

export default function ToolsPage() {
  return (
    <div className="bg-base min-h-screen">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-base/85 backdrop-blur-lg">
        <div className="max-w-350 mx-auto flex items-center justify-between px-5 md:px-20 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary text-3.25 font-normal tracking-[0.01em] no-underline hover:opacity-60 transition-opacity duration-200"
          >
            <FiArrowLeft size={16} /> Back
          </Link>
          <p className="text-secondary text-2.75 tracking-[0.18em] uppercase font-normal">
            Tools
          </p>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-350 mx-auto px-5 md:px-20 pt-12 md:pt-18 pb-24">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-secondary text-2.75 tracking-[0.2em] uppercase font-normal mb-4"
          >
            04 — What I use daily
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-primary font-extralight leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
          >
            My
            <br />
            Toolkit
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-border mb-12 md:mb-18 origin-left"
        />

        {/* AI Tools */}
        <section className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <p className="text-secondary text-2.75 tracking-[0.22em] uppercase font-medium shrink-0">
              AI Tools
            </p>
            <div className="flex-1 h-px bg-[#EBEBEB]" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {aiTools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} />
            ))}
          </div>
        </section>

        {/* Dev Tools */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <p className="text-secondary text-2.75 tracking-[0.22em] uppercase font-medium shrink-0">
              Dev Tools
            </p>
            <div className="flex-1 h-px bg-[#EBEBEB]" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {devTools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index + aiTools.length} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

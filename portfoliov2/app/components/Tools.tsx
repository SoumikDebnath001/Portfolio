"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiTerminal,
  FiImage,
  FiDatabase,
  FiZap,
} from "react-icons/fi";
import {
  SiAnthropic,
  SiPerplexity,
  SiOpenai,
  SiPostman,
  SiMongodb,
  SiVscodium,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Category = "AI" | "Editor" | "API" | "Database" | "Platform";

type Tool = {
  name: string;
  category: Category;
  featured?: boolean;
  accent: string;
  hex: string;
  icon: IconType;
};

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "AI",       value: "AI"       },
  { label: "Editor",   value: "Editor"   },
  { label: "API",      value: "API"      },
  { label: "Database", value: "Database" },
  { label: "Platform", value: "Platform" },
];

const TOOLS: Tool[] = [
  { name: "Claude",          category: "AI",       featured: true, accent: "bg-[#D97757]", hex: "#D97757", icon: SiAnthropic  },
  { name: "VS Code",         category: "Editor",                   accent: "bg-[#0078D4]", hex: "#0078D4", icon: SiVscodium   },
  { name: "ChatGPT",         category: "AI",                       accent: "bg-[#10A37F]", hex: "#10A37F", icon: SiOpenai     },
  { name: "Postman",         category: "API",                      accent: "bg-[#FF6C37]", hex: "#FF6C37", icon: SiPostman    },
  { name: "MongoDB Compass", category: "Database",                 accent: "bg-[#00684A]", hex: "#00684A", icon: SiMongodb    },
  { name: "Cursor",          category: "Editor",                   accent: "bg-[#3B3B4F]", hex: "#3B3B4F", icon: FiTerminal   },
  { name: "Perplexity",      category: "AI",                       accent: "bg-[#20B2AA]", hex: "#20B2AA", icon: SiPerplexity },
  { name: "AdminJS",         category: "Platform",                 accent: "bg-[#4F46E5]", hex: "#4F46E5", icon: FiDatabase   },
  { name: "NanoBanana",      category: "Platform",                 accent: "bg-[#F59E0B]", hex: "#F59E0B", icon: FiImage      },
  { name: "Antigravity",     category: "Platform",                 accent: "bg-[#7C3AED]", hex: "#7C3AED", icon: FiZap        },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.045 },
  }),
  exit: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" as const } },
};

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "relative bg-white border rounded-xl md:rounded-2xl cursor-default",
        /* mobile: square with centered icon — desktop: column layout */
        "flex items-center justify-center",
        "aspect-square md:aspect-auto md:flex-col md:items-start md:justify-start",
        "p-2 md:p-5 md:gap-3",
        tool.featured ? "border-[#D0D0D0]" : "border-[#EBEBEB]",
      ].join(" ")}
      style={{
        boxShadow: hovered
          ? `0 0 0 1.5px ${tool.hex}55, 0 8px 36px ${tool.hex}30`
          : tool.featured
          ? "0 1px 4px rgba(0,0,0,0.07)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Featured badge — desktop only */}
      {tool.featured && (
        <span className="hidden md:block absolute top-3.5 right-3.5 text-[9px] font-semibold tracking-[0.12em] uppercase text-[#999] border border-[#E5E5E5] rounded-full px-2 py-0.5">
          Daily
        </span>
      )}

      {/* Icon — always colored, scales on hover */}
      <div
        className={`${tool.accent} w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-white transition-transform duration-300`}
        style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
      >
        <Icon size={15} aria-hidden />
      </div>

      {/* Name + arrow — desktop only */}
      <div className="hidden md:flex items-center justify-between w-full">
        <h3 className="text-3.25 font-medium text-primary tracking-[-0.01em] leading-snug">
          {tool.name}
        </h3>
        <motion.div
          animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-secondary shrink-0"
        >
          <FiArrowUpRight size={13} />
        </motion.div>
      </div>

      {/* Category chip — desktop only */}
      <span className="hidden md:block text-[10px] font-medium tracking-[0.07em] uppercase text-[#999] bg-[#F5F5F5] rounded-full px-2.5 py-1">
        {tool.category}
      </span>
    </motion.div>
  );
}

function FilterPill({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.04em] transition-all duration-200 border cursor-pointer",
        active
          ? "bg-primary text-base border-primary"
          : "bg-white text-secondary border-border hover:border-[#AAAAAA] hover:text-primary",
      ].join(" ")}
    >
      {label}
      <span className={`text-[9px] font-semibold tabular-nums ${active ? "text-white/60" : "text-[#BBBBBB]"}`}>
        {count}
      </span>
    </button>
  );
}

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered = activeCategory
    ? TOOLS.filter((t) => t.category === activeCategory)
    : TOOLS;

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative bg-base py-24 overflow-hidden"
    >
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Left vertical label (desktop only) */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-7.5 items-center justify-center z-10">
        <span className="block -rotate-90 whitespace-nowrap text-secondary text-2.75 tracking-[0.18em] uppercase font-normal">
          Tools
        </span>
      </div>

      <div className="relative z-10 max-w-350 mx-auto px-5 md:px-20">

        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex items-end justify-between"
        >
          <div>
            <p className="text-secondary text-2.75 tracking-[0.2em] uppercase font-normal mb-4">
              04 — What I use daily
            </p>
            <h2
              className="text-primary font-extralight leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
            >
              My
              <br />
              Toolkit
            </h2>
          </div>
          <Link
            href="/tools"
            className="flex items-center gap-2 text-secondary text-3.25 font-normal tracking-[0.01em] no-underline hover:text-primary transition-colors duration-200 mb-1 group"
          >
            View all
            <FiArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <div className="h-px bg-border mb-8" />

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-2 mb-8 flex-wrap"
        >
          {CATEGORIES.map((cat) => (
            <FilterPill
              key={cat.value}
              label={cat.label}
              active={activeCategory === cat.value}
              count={TOOLS.filter((t) => t.category === cat.value).length}
              onClick={() =>
                setActiveCategory((prev) => (prev === cat.value ? null : cat.value))
              }
            />
          ))}
          <span className="ml-auto text-[11px] text-secondary tabular-nums font-mono">
            {filtered.length} / {TOOLS.length}
          </span>
        </motion.div>

        {/* Tool grid */}
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <div className="h-px bg-border mb-5" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-secondary text-[10px] tracking-[0.14em] uppercase font-mono">
              {TOOLS.length} tools · updated 2025
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {CATEGORIES.map((cat) => {
                const t = TOOLS.find((t) => t.category === cat.value)!;
                return (
                  <button
                    key={cat.value}
                    onClick={() =>
                      setActiveCategory((prev) => (prev === cat.value ? null : cat.value))
                    }
                    className={[
                      "flex items-center gap-1.5 transition-opacity duration-200 cursor-pointer bg-transparent border-none",
                      activeCategory !== null && activeCategory !== cat.value
                        ? "opacity-30"
                        : "opacity-100",
                    ].join(" ")}
                  >
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${t.accent}`} />
                    <span className="text-[10px] text-secondary tracking-[0.08em] uppercase">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

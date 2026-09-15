import Link from "next/link";
import type { IconType } from "react-icons";
import { FiArrowRight, FiTerminal, FiImage, FiDatabase, FiZap } from "react-icons/fi";
import { SiAnthropic, SiPerplexity, SiOpenai, SiPostman, SiMongodb, SiVscodium } from "react-icons/si";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type Tool = { name: string; category: string; color: string; icon: IconType };

const TOOLS: Tool[] = [
  { name: "Claude",          category: "AI",       color: "#D97757", icon: SiAnthropic  },
  { name: "VS Code",         category: "Editor",   color: "#0078D4", icon: SiVscodium   },
  { name: "Cursor",          category: "Editor",   color: "#3B3B4F", icon: FiTerminal   },
  { name: "ChatGPT",         category: "AI",       color: "#10A37F", icon: SiOpenai     },
  { name: "Perplexity",      category: "AI",       color: "#20B2AA", icon: SiPerplexity },
  { name: "Postman",         category: "API",      color: "#FF6C37", icon: SiPostman    },
  { name: "MongoDB Compass", category: "Database", color: "#00684A", icon: SiMongodb    },
  { name: "AdminJS",         category: "Platform", color: "#4F46E5", icon: FiDatabase   },
  { name: "NanoBanana",      category: "Platform", color: "#F59E0B", icon: FiImage      },
  { name: "Antigravity",     category: "Platform", color: "#7C3AED", icon: FiZap        },
];

export default function Tools() {
  return (
    <section id="tools" className="bg-base py-14 md:py-24">
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          index="04"
          label="Tools"
          title={<>My daily <em className="font-playfair italic font-normal">toolkit</em></>}
          image="/Cat_ToolsWorker.png"
        />

        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3 lg:grid-cols-5">
          {TOOLS.map(({ name, category, color, icon: Icon }, index) => (
            <li key={name}>
              <Reveal
                delay={index * 0.03}
                className="flex h-full items-center gap-3 rounded-2xl border border-[#E8E8E8] bg-white p-3 transition-colors duration-200 hover:border-[#C8C8C8] md:p-4"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white md:h-10 md:w-10"
                  style={{ backgroundColor: color }}
                >
                  <Icon size={16} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium leading-tight text-primary">{name}</span>
                  <span className="mt-0.5 block text-[12px] text-secondary">{category}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Link
          href="/tools"
          className="group mt-10 inline-flex h-11 items-center gap-2 rounded-full border border-[#D0D0D0] px-5 text-[14px] text-primary no-underline transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white"
        >
          How I use them
          <FiArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

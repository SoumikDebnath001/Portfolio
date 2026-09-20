"use client";

import { useEffect, useState } from "react";
import { FiArrowUp, FiMail } from "react-icons/fi";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { scrollTo } from "../lib/smoothScroll";

const R = 24;
const CIRCUMFERENCE = 2 * Math.PI * R;

const SECTIONS = [
  { id: "about",  label: "About",   accent: "var(--color-accent-about)"   },
  { id: "work",   label: "Work",    accent: "var(--color-accent-work)"    },
  { id: "skills", label: "Skills",  accent: "var(--color-accent-skills)"  },
  { id: "tools",  label: "Tools",   accent: "var(--color-accent-tools)"   },
  { id: "mail",   label: "Contact", accent: "var(--color-accent-contact)" },
] as const;

export default function ScrollDial() {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // Scroll progress + visibility
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setPercent(Math.round(Math.min(Math.max(ratio, 0), 1) * 100));
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };

    // rAF coalesces scroll bursts, but it is throttled while the tab is
    // hidden — measure directly in that case so state is never stale.
    const onScroll = () => {
      if (document.hidden) {
        measure();
      } else if (!frame) {
        frame = requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("visibilitychange", measure);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", measure);
    };
  }, []);

  // Which section is currently in view
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visibleEntries[0];
        if (!first) return;
        const i = SECTIONS.findIndex((s) => s.id === first.target.id);
        if (i >= 0) setActiveIndex(i);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toTop = () => scrollTo(0, !!reduceMotion);

  const section = SECTIONS[activeIndex];
  const isContact = section.id === "mail";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label={`${section.label} section, ${percent}% of the page read. Back to top.`}
          title="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ ["--dial" as string]: section.accent }}
          className="group fixed bottom-5 right-5 z-50 flex h-15 w-15 items-center justify-center rounded-full border border-border bg-surface/85 text-primary shadow-[0_6px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors duration-300 hover:border-[color:var(--dial)] md:bottom-8 md:right-8 md:h-16 md:w-16"
        >
          {/* Progress ring, tinted to the section in view */}
          <svg
            aria-hidden
            viewBox="0 0 52 52"
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          >
            <circle cx="26" cy="26" r={R} fill="none" strokeWidth="2" className="stroke-primary/10" />
            <circle
              cx="26"
              cy="26"
              r={R}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              stroke="var(--dial)"
              className="transition-[stroke-dashoffset,stroke] duration-300 ease-out"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
            />
          </svg>

          {/* Current section — swaps to an up-arrow on hover so the action stays legible */}
          <span className="relative flex h-full w-full items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={section.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0"
                style={{ color: section.accent }}
              >
                {isContact ? (
                  <FiMail size={17} aria-hidden />
                ) : (
                  <span className="text-[9px] font-semibold uppercase tracking-[0.06em]">
                    {section.label}
                  </span>
                )}
              </motion.span>
            </AnimatePresence>

            <FiArrowUp
              size={17}
              aria-hidden
              className="absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </span>

        </motion.button>
      )}
    </AnimatePresence>
  );
}

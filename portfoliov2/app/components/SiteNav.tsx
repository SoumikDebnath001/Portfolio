"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiDownload, FiArrowUpRight } from "react-icons/fi";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { lockScroll } from "../lib/smoothScroll";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About",  href: "#about",  id: "about"  },
  { label: "Work",   href: "#work",   id: "work"   },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Tools",  href: "#tools",  id: "tools"  },
];

const ACCENT: Record<string, string> = {
  about:  "var(--color-accent-about)",
  work:   "var(--color-accent-work)",
  skills: "var(--color-accent-skills)",
  tools:  "var(--color-accent-tools)",
};

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Solid bar only once the hero is behind us
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in the upper half of the viewport
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // While the sheet is open: lock the page, close on Escape, close if we hit desktop
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => mq.matches && setMenuOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onDesktop);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    lockScroll(true);

    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onDesktop);
      document.body.style.overflow = overflow;
      lockScroll(false);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-[background-color,border-color] duration-300 ${
            scrolled
              ? "border-b border-border/60 bg-base/80 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="max-w-350 mx-auto flex items-center justify-between px-5 py-4 md:px-12 md:py-5 lg:px-20">
            <Link
              href="/"
              className="text-[14px] font-bold uppercase tracking-[0.08em] text-primary no-underline transition-opacity duration-200 hover:opacity-60"
            >
              SD.
            </Link>

            <nav aria-label="Sections" className="hidden md:block">
              <ul className="flex list-none items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = activeId === link.id;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        aria-current={isActive ? "true" : undefined}
                        style={isActive ? { color: ACCENT[link.id] } : undefined}
                        className={`relative rounded-full px-3.5 py-2 text-[13px] tracking-[0.01em] no-underline transition-colors duration-200 ${
                          isActive ? "" : "text-secondary hover:text-primary"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="absolute inset-0 -z-10 rounded-full"
                            style={{ backgroundColor: ACCENT[link.id], opacity: 0.1 }}
                          />
                        )}
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="/resumeSoumik.pdf"
                download="Soumik-Debnath-Resume.pdf"
                className="hidden h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-[13px] text-secondary no-underline transition-colors duration-200 hover:border-primary hover:text-primary md:inline-flex"
              >
                <FiDownload size={13} aria-hidden />
                Résumé
              </a>
              <a
                href="#mail"
                className="hidden h-9 items-center rounded-full bg-primary px-4 text-[13px] font-medium text-on-primary no-underline transition-opacity duration-200 hover:opacity-85 md:inline-flex"
              >
                Let&apos;s talk
              </a>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary transition-colors duration-200 hover:border-primary md:hidden"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-label="Open menu"
              >
                <FiMenu size={18} />
              </button>
            </div>
          </div>

          {/* Reading progress */}
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className={`h-px origin-left bg-primary/40 transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </header>

      {/* ── Mobile sheet ── */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-60 md:hidden">
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 h-full w-full cursor-default bg-primary/25 backdrop-blur-sm"
            />

            <motion.nav
              aria-label="Sections"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-[82%] max-w-80 flex-col border-l border-border bg-base shadow-[-12px_0_40px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Menu</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary"
                >
                  <FiX size={18} />
                </button>
              </div>

              <ul className="list-none overflow-y-auto px-5 py-2">
                {navLinks.map((link, i) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-3 border-b border-hairline py-4 text-[17px] text-primary no-underline"
                    >
                      <span
                        className="text-[11px] tabular-nums"
                        style={{ color: ACCENT[link.id] }}
                      >
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/work"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-hairline py-4 text-[17px] text-primary no-underline"
                  >
                    All projects
                    <FiArrowUpRight size={16} aria-hidden className="text-muted" />
                  </Link>
                </li>
              </ul>

              <div className="mt-auto flex flex-col gap-3 border-t border-hairline px-5 py-5">
                <a
                  href="/resumeSoumik.pdf"
                  download="Soumik-Debnath-Resume.pdf"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border text-[15px] text-primary no-underline"
                >
                  <FiDownload size={15} aria-hidden />
                  Download résumé
                </a>
                <a
                  href="#mail"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-[15px] font-medium text-on-primary no-underline"
                >
                  Let&apos;s talk
                </a>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

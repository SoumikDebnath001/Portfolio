"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Work",     href: "/work" },
  { label: "Skills",   href: "#skills" },
  { label: "Tools",    href: "#tools" },
  { label: "Contact",  href: "#contact" },
];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    "Full Stack Engineer",
    "Designer",
    "MERN Stack Developer",
    "GenAi Developer"
  ];
  
  const fullText = texts[textIndex];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;
    let isDeletePhase = false;
    let isPausedLocal = false;

    const interval = setInterval(() => {
      if (!isDeletePhase && !isPausedLocal) {
        // Typing phase
        if (charIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, charIndex));
          charIndex++;
        } else {
          // Finished typing, pause before deleting
          isPausedLocal = true;
          timeoutId = setTimeout(() => {
            isPausedLocal = false;
            isDeletePhase = true;
            charIndex = fullText.length;
          }, 3000);
        }
      } else if (isDeletePhase && !isPausedLocal) {
        // Deleting phase
        if (charIndex > 0) {
          charIndex--;
          setDisplayedText(fullText.slice(0, charIndex));
        } else {
          // Finished deleting, move to next text
          isDeletePhase = false;
          charIndex = 0;
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, 50);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fullText, texts.length]);

  return (
    <div className="relative h-screen bg-base overflow-hidden">

      {/* ── Navbar ── */}
      <nav className="absolute top-0 left-0 right-0 z-30 w-full">
        <div className="flex items-center justify-between px-5 md:px-20 py-5">
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/"
              className="text-primary text-[14px] font-bold tracking-[0.08em] uppercase hover:opacity-70 transition-opacity duration-200"
            >
              SD.
            </a>
            <div className="hidden md:block h-4 w-px bg-border/60" />
            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-7 list-none">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-3.25 font-normal text-primary no-underline tracking-[0.01em] opacity-90 hover:opacity-60 transition-opacity duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-primary p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-base/95 backdrop-blur-md border-t border-border px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-primary text-sm font-normal py-3 border-b border-border/40 last:border-0 no-underline tracking-[0.01em]"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Left vertical label (desktop only) ── */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-7.5 z-20 items-center justify-center">
        <span className="block -rotate-90 whitespace-nowrap text-secondary text-2.75 tracking-[0.18em] uppercase font-normal">
          Full stack engineer
        </span>
      </div>

      {/* ── Portrait ── */}
      {/* Desktop: right 56% */}
      <div className="hidden md:block absolute top-0 right-0 h-full w-[56%]">
        <Image src="/portrait.png" alt="Portrait" fill priority sizes="56vw" className="object-cover object-top" />
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none bg-linear-to-r from-base to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-linear-to-b from-transparent to-base" />
      </div>
      {/* Mobile: full-screen with white hue gradient */}
      <div className="md:hidden absolute inset-0">
        <Image src="/portrait.png" alt="Portrait" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-white/90 via-white/50 to-transparent" />
      </div>

      {/* ── Logos (desktop only) ── */}
      <div className="hidden md:flex absolute z-20 items-center left-10 top-[13%] gap-5">
        <Image src="/Developer.png" alt="Developer" width={400} height={132} className="object-contain h-auto" />
        <Image src="/GenAi.png" alt="Generative AI" width={300} height={132} className="object-contain h-auto" />
      </div>

      {/* Mobile Logos */}
      <div className="md:hidden flex absolute z-20 items-center left-2 bottom-16 gap-2">
        <Image src="/Developer.png" alt="Developer" width={150} height={66} className="object-contain h-auto" />
        <Image src="/GenAi.png" alt="Generative AI" width={100} height={66} className="object-contain h-auto" />
      </div>

      {/* ── Hello heading ── */}
      {/* Desktop */}
      <div className="hidden md:block absolute z-20 left-13 top-1/2 -translate-y-1/2">
        <h1
          className="text-primary font-extralight leading-[0.88] tracking-[-0.03em]"
          style={{ fontSize: "clamp(180px, 22vw, 300px)" }}
        >
          Hello
        </h1>
        <p className="text-primary text-3xl font-normal mt-3.5 tracking-[0.01em] pl-1.75 min-h-12">
          It&apos;s Soumik Debnath, {displayedText}
          <span className="animate-pulse">|</span>
        </p>
      </div>
      {/* Mobile */}
      <div className="md:hidden absolute z-20 left-5 bottom-40">
        <h1
          className="text-primary font-bold leading-[0.88] tracking-[-0.03em] mb-3"
          style={{ fontSize: "clamp(50px, 16vw, 120px)" }}
        >
          Hello
        </h1>
        <p className="text-primary text-sm font-normal tracking-[0.01em] leading-relaxed max-w-xs min-h-12">
          It&apos;s Soumik Debnath,
          <br />
          {displayedText}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      {/* ── Scroll down ── */}
      <div className="absolute z-20 left-5 md:left-20 bottom-8">
        <a
          href="#about"
          className="flex items-center gap-1 text-primary text-3.25 font-normal tracking-[0.01em] no-underline"
        >
          Scroll down <span className="text-sm">↓</span>
        </a>
      </div>

      {/* ── 2026 (desktop only) ── */}
      <div className="hidden md:flex absolute z-20 left-2.5 bottom-25 items-center justify-center h-12 w-3">
        <span className="block -rotate-90 whitespace-nowrap text-secondary text-2.75 font-normal tracking-wider">
          2026
        </span>
      </div>

    </div>
  );
}

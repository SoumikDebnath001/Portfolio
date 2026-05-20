"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Work", href: "/work" },
  { label: "Skills", href: "#skills" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#mail" },
];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
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
            <Link
              href="/"
              className="flex items-center gap-2 text-primary text-[14px] font-bold tracking-[0.08em] uppercase hover:opacity-70 transition-opacity duration-200"
            >
              SD.
            </Link>
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
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-base/95 backdrop-blur-md border-t border-border px-5 py-4 flex flex-col gap-1 overflow-hidden"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Left vertical label (desktop only) ── */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-7.5 z-20 items-center justify-center">
        <span className="block -rotate-90 whitespace-nowrap text-secondary text-2.75 tracking-[0.18em] uppercase font-normal">
          Full stack engineer
        </span>
      </div>

      {/* ── Portrait ── */}
      {/* Desktop: right 56% */}
      <div className="hidden md:flex absolute top-0 right-0 h-full w-[56%] items-center justify-center">
        {/* Decorative background glow */}
        <div className="absolute w-[50%] aspect-square max-w-[500px] bg-neutral-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Circular Portrait Image */}
        <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-[360px] lg:h-[360px] xl:w-[420px] xl:h-[420px] 2xl:w-[450px] 2xl:h-[450px] rounded-full overflow-hidden border-4 border-white shadow-[0_15px_45px_rgba(0,0,0,0.08)] bg-neutral-100">
          <Image
            src="/portrait.png"
            alt="Portrait"
            fill
            priority
            sizes="(min-width: 1536px) 450px, (min-width: 1280px) 420px, (min-width: 1024px) 360px, (min-width: 768px) 256px"
            className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
          />
        </div>
      </div>
      {/* Mobile View Container */}
      <div className="md:hidden flex flex-col items-center justify-between h-full pt-24 pb-8 px-6 relative z-10">
        {/* Decorative background glow behind the circular image */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-neutral-200/40 rounded-full blur-2xl -z-10 pointer-events-none" />

        {/* Top/Middle Section: Circle Image & Text */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
          {/* Circular Portrait Image */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-neutral-100 flex-shrink-0">
            <Image
              src="/portrait.png"
              alt="Portrait"
              fill
              priority
              sizes="(max-width: 640px) 224px, 256px"
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
            />
          </div>

          {/* Centered Greeting Text */}
          <div className="text-center flex flex-col items-center max-w-sm">
            <h1
              className="text-primary font-sans font-bold leading-none tracking-[-0.03em] mb-2"
              style={{ fontSize: "clamp(36px, 10vw, 48px)" }}
            >
              Hi
            </h1>
            <h2
              className="text-primary font-sans font-normal tracking-[-0.02em] leading-tight mb-3"
              style={{ fontSize: "clamp(20px, 5.5vw, 24px)" }}
            >
              It&apos;s <span className="font-playfair font-semibold">Soumik Debnath</span>
            </h2>

            {/* Typing indicator & text */}
            <div className="inline-flex items-center justify-center bg-white/60 backdrop-blur-xs border border-border/50 px-4 py-1.5 rounded-full shadow-xs min-h-[36px]">
              <p className="text-black text-sm font-semibold tracking-[0.01em] whitespace-nowrap">
                {displayedText}
                <span className="animate-pulse text-black ml-0.5">|</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Logos and Scroll down */}
        <div className="flex flex-col items-center gap-4 w-full mt-auto">
          {/* Logos */}
          <div className="flex items-center justify-center gap-2.5">
            <Image src="/Developer.png" alt="Developer" width={150} height={50} className="object-contain w-auto h-auto" />
            <Image src="/GenAi.png" alt="Generative AI" width={85} height={36} className="object-contain w-auto h-auto" />
          </div>

          {/* Scroll down */}
          <a
            href="#about"
            className="flex items-center gap-1.5 text-secondary hover:text-primary text-[13px] font-medium tracking-[0.05em] uppercase transition-colors duration-200 no-underline"
          >
            Scroll down <span className="animate-bounce text-[11px]">↓</span>
          </a>
        </div>
      </div>

      {/* ── Hello heading (Desktop only) ── */}
      <div className="hidden md:block absolute z-20 left-13 top-1/2 -translate-y-1/2 max-w-[42vw]">
        <h1
          className="text-primary font-playfair font-normal leading-[0.88] tracking-[-0.03em]"
          style={{ fontSize: "clamp(110px, 17vw, 300px)" }}
        >
          Hello
        </h1>
        <p
          className="text-primary font-normal mt-3.5 tracking-[0.01em] pl-1.75"
          style={{ fontSize: "clamp(13px, 1.5vw, 30px)" }}
        >
          <span className="font-playfair text-black">
            <span className="font-normal">It&apos;s </span>
            <span className="font-semibold" style={{ fontSize: "clamp(26px, 3.8vw, 60px)" }}>Soumik Debnath</span>
          </span>
        </p>
        <p
          className="text-black font-semibold pl-1.75 mt-1 min-h-8"
          style={{ fontSize: "clamp(13px, 1.5vw, 24px)" }}
        >
          {displayedText}
          <span className="animate-pulse ml-0.5">|</span>
        </p>
      </div>

      {/* ── Scroll down (Desktop only) ── */}
      <div className="hidden md:flex absolute z-20 left-6 bottom-6 md:bottom-8 flex-col">
        {/* Desktop Logos just above Scroll Down */}
        <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
          <Image src="/Developer.png" alt="Developer" width={400} height={132} className="object-contain h-auto w-[120px] md:w-[160px] lg:w-[220px] xl:w-[300px] 2xl:w-[400px]" />
          <Image src="/GenAi.png" alt="Generative AI" width={300} height={132} className="object-contain h-auto w-[85px] md:w-[110px] lg:w-[160px] xl:w-[210px] 2xl:w-[300px]" />
        </div>
        <a
          href="#about"
          className="flex items-center gap-1 text-primary text-3.25 font-normal tracking-[0.01em] no-underline mt-1 md:mt-2"
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

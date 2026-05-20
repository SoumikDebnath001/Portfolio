"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Work", href: "/work" },
  { label: "Skills", href: "#skills" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#mail" },
];

export default function Hero({
  mobileWhiteHueLeft = "1",   // Intensity/opacity of the white hue on the left (e.g. 0.9)
  mobileWhiteHueMiddle = "0.6", // Intensity/opacity of the white hue in the middle (e.g. 0.5)
}: {
  mobileWhiteHueLeft?: string | number;
  mobileWhiteHueMiddle?: string | number;
}) {
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
        <Image src="/portrait.png" alt="Portrait" fill priority sizes="100vw" className="object-cover object-top w-auto" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, rgba(255, 255, 255, ${mobileWhiteHueLeft}) 0%, rgba(255, 255, 255, ${mobileWhiteHueMiddle}) 50%, rgba(255, 255, 255, 0) 100%)`
          }}
        />
      </div>

      {/* ── Hello heading ── */}
      {/* Desktop */}
      <div className="hidden md:block absolute z-20 left-13 top-1/2 -translate-y-1/2">
        {/* Logos container positioned relatively above Hello */}

        <h1
          className="text-primary font-playfair font-normal leading-[0.88] tracking-[-0.03em]"
          style={{ fontSize: "clamp(180px, 22vw, 300px)" }}
        >
          Hello
        </h1>
        <p className="text-primary text-3xl font-normal mt-3.5 tracking-[0.01em] pl-1.75 min-h-12">
          <span className="font-playfair text-black">
            <span className="font-normal">It&apos;s </span>
            <span className="font-semibold text-6xl">Soumik Debnath</span>
          </span>,{" "}
          <span className="text-black font-semibold">{displayedText}</span>
          <span className="animate-pulse text-black">|</span>
        </p>
      </div>
      {/* Mobile */}
      <div className="md:hidden absolute z-20 left-5 bottom-35">
        <h1
          className="text-primary font-sans font-bold leading-[0.88] tracking-[-0.03em] mb-2"
          style={{ fontSize: "clamp(50px, 16vw, 120px)" }}
        >
          Hi
        </h1>
        <h2
          className="text-primary font-sans font-normal tracking-[-0.02em] leading-tight mb-2"
          style={{ fontSize: "clamp(25px, 8vw, 60px)" }}
        >
          It&apos;s <span className="font-playfair font-semibold">Soumik Debnath,</span>
        </h2>
        <p className="text-black text-sm font-semibold tracking-[0.01em] leading-relaxed max-w-xs min-h-6">
          {displayedText}
          <span className="animate-pulse text-black">|</span>
        </p>
      </div>

      {/* ── Scroll down ── */}
      <div className="absolute z-20 left-1 md:left-6 bottom-1 md:bottom-8 flex flex-col">
        {/* Desktop Logos just above Scroll Down */}
        <div className="hidden md:flex items-center gap-2.5 mb-4">
          <Image src="/Developer.png" alt="Developer" width={400} height={132} className="object-contain w-auto h-auto" />
          <Image src="/GenAi.png" alt="Generative AI" width={300} height={132} className="object-contain w-auto h-auto" />
        </div>
        {/* Mobile Logos just above Scroll Down */}
        <div className="md:hidden flex items-center gap-2.5">
          <Image src="/Developer.png" alt="Developer" width={150} height={50} className="object-contain w-auto h-auto" />
          <Image src="/GenAi.png" alt="Generative AI" width={85} height={36} className="object-contain w-auto h-auto" />
        </div>
        <a
          href="#about"
          className="flex items-center gap-1 text-primary text-3.25 font-normal tracking-[0.01em] no-underline mt-2"
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

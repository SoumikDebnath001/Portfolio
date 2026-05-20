"use client";

import { useState } from "react";
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
      {/* Mobile: full-screen background */}
      <div className="md:hidden absolute inset-0">
        <Image src="/portrait.png" alt="Portrait" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 h-[65%] pointer-events-none bg-linear-to-t from-base via-base/80 to-transparent" />
      </div>

      {/* ── Logos (desktop only) ── */}
      <div className="hidden md:flex absolute z-20 items-center left-10 top-[13%] gap-5">
        <Image src="/Developer.png" alt="Developer" width={400} height={132} className="object-contain h-auto" />
        <Image src="/GenAi.png" alt="Generative AI" width={300} height={132} className="object-contain h-auto" />
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
        <p className="text-primary text-3xl font-normal mt-3.5 tracking-[0.01em] pl-1.75">
          It&apos;s Soumik Debnath, a Full Stack Engineer
        </p>
      </div>
      {/* Mobile */}
      <div className="md:hidden absolute z-20 left-5 right-5 bottom-24">
        <h1
          className="text-primary font-extralight leading-[0.88] tracking-[-0.03em] mb-3"
          style={{ fontSize: "clamp(80px, 22vw, 140px)" }}
        >
          Hello
        </h1>
        <p className="text-primary text-lg font-normal tracking-[0.01em]">
          It&apos;s Soumik Debnath,
          <br />a Full Stack Engineer
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

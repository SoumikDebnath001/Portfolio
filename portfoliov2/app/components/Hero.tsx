"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";

const ROLES = [
  { text: "Full Stack Engineer",   accent: "var(--color-accent-work)"    },
  { text: "MERN Stack Developer",  accent: "var(--color-accent-tools)"   },
  { text: "GenAI Developer",       accent: "var(--color-accent-skills)"  },
  { text: "Designer",              accent: "var(--color-accent-contact)" },
];

/** Types a role out, holds, deletes, moves to the next one. */
function useTypedRole(roles: typeof ROLES) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const full = roles[index].text;
    let char = 0;
    let deleting = false;
    let holdUntil = 0;

    const id = setInterval(() => {
      if (Date.now() < holdUntil) return;

      if (!deleting) {
        if (char <= full.length) {
          setText(full.slice(0, char));
          char += 1;
        } else {
          deleting = true;
          char = full.length;
          holdUntil = Date.now() + 2200;
        }
      } else if (char > 0) {
        char -= 1;
        setText(full.slice(0, char));
      } else {
        setIndex((i) => (i + 1) % roles.length);
      }
    }, 55);

    return () => clearInterval(id);
  }, [index, roles, reduceMotion]);

  // With reduced motion the role is shown outright rather than typed.
  return {
    text: reduceMotion ? roles[0].text : text,
    accent: reduceMotion ? roles[0].accent : roles[index].accent,
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 + i * 0.09 },
  }),
};

export default function Hero() {
  const { text: role, accent: roleAccent } = useTypedRole(ROLES);
  const reduceMotion = useReducedMotion();
  const anim = (i: number) =>
    reduceMotion
      ? {}
      : { variants: fadeUp, initial: "hidden" as const, animate: "show" as const, custom: i };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col overflow-hidden bg-base pt-16 md:pt-24"
    >
      {/* Vertical edge labels — editorial framing, desktop only */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[11px] uppercase tracking-[0.18em] text-muted lg:block"
      >
        Full stack engineer
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-24 left-0 hidden -rotate-90 text-[11px] tracking-[0.18em] text-muted lg:block"
      >
        2026
      </span>

      <div className="max-w-350 mx-auto flex w-full flex-1 items-center px-5 md:px-12 lg:px-20">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* ── Copy ───────────────────────────────────────── */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">

            <motion.p
              {...anim(0)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-[12px] text-secondary backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </motion.p>

            <motion.h1
              {...anim(1)}
              id="hero-title"
              className="mt-5 text-primary md:mt-7"
            >
              <span
                className="block bg-linear-to-br from-primary via-primary to-accent-work bg-clip-text font-playfair font-normal leading-[0.86] tracking-[-0.035em] text-transparent"
                style={{ fontSize: "clamp(64px, 12vw, 190px)" }}
              >
                Hello
              </span>
              <span
                className="mt-2 block font-light tracking-[-0.02em] md:mt-3"
                style={{ fontSize: "clamp(20px, 2.4vw, 34px)" }}
              >
                It&apos;s{" "}
                <span className="font-playfair font-semibold">Soumik Debnath</span>
              </span>
            </motion.h1>

            {/* Role — fixed height so the typing never shifts the layout */}
            <motion.p
              {...anim(2)}
              className="mt-3 flex h-7 items-center text-[15px] font-medium tracking-[0.01em] md:mt-4 md:h-8 md:text-[17px]"
              style={{ color: roleAccent }}
            >
              <span
                aria-hidden
                className="mr-2 h-px w-6 lg:w-8"
                style={{ backgroundColor: "currentColor", opacity: 0.5 }}
              />
              <span className="sr-only">Full stack engineer, MERN and GenAI developer.</span>
              <span aria-hidden>
                {role}
                <span className="ml-0.5 animate-pulse font-light">|</span>
              </span>
            </motion.p>

            <motion.p
              {...anim(3)}
              className="mt-4 max-w-[48ch] text-[14px] leading-[1.7] text-secondary md:mt-6 md:text-[16px] md:leading-[1.75]"
            >
              I build web products end to end — clean, responsive interfaces backed
              by fast, reliable APIs, with generative AI woven in where it earns its place.
            </motion.p>

            {/* ── Calls to action ── */}
            <motion.div
              {...anim(4)}
              className="mt-7 flex w-full items-center gap-2.5 sm:w-auto sm:gap-3 md:mt-10"
            >
              <Link
                href="/work"
                className="group inline-flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 text-[14px] font-medium text-on-primary no-underline transition-colors duration-200 hover:opacity-85 sm:h-12 sm:flex-none sm:px-6 sm:text-[15px]"
              >
                View my work
                <FiArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <a
                href="#mail"
                className="inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-border px-4 text-[14px] text-primary no-underline transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-on-primary sm:h-12 sm:flex-none sm:px-6 sm:text-[15px]"
              >
                Get in touch
              </a>
            </motion.div>

            {/* ── Brand marks ── */}
            <motion.div
              {...anim(5)}
              className="mt-8 hidden items-center gap-4 sm:flex md:mt-12"
            >
              <Image
                src="/Developer.png"
                alt="Developer — FullStack Engineer"
                width={400}
                height={132}
                className="h-auto w-31 object-contain md:w-37.5"
              />
              <span aria-hidden className="h-6 w-px bg-border" />
              <Image
                src="/GenAi.png"
                alt="Generative AI"
                width={300}
                height={132}
                className="h-auto w-19.5 object-contain md:w-23.5"
              />
            </motion.div>
          </div>

          {/* ── Portrait ───────────────────────────────────── */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 scale-125 rounded-full bg-neutral-300/25 blur-3xl"
              />
              <div className="relative aspect-square w-44 overflow-hidden rounded-full border-4 border-surface bg-elevated shadow-[0_18px_50px_rgba(0,0,0,0.10)] sm:w-56 md:w-72 lg:w-85 xl:w-100">
                <Image
                  src="/portrait.png"
                  alt="Soumik Debnath"
                  fill
                  priority
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 340px, (min-width: 768px) 288px, (min-width: 640px) 224px, 176px"
                  className="object-cover object-top grayscale transition-[filter] duration-500 ease-out hover:grayscale-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

  {/* don't add scroll cue */}
    </section>
  );
}

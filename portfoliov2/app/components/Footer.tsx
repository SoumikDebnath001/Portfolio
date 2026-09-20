"use client";

import Link from "next/link";
import { SiGmail, SiGithub, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import type { IconType } from "react-icons";

type Social = { label: string; href: string; icon: IconType; color: string; darkColor?: string };

const socials: Social[] = [
  { label: "Email",       href: "mailto:debnathsoumik17@gmail.com",                icon: SiGmail,      color: "#EA4335" },
  { label: "GitHub",      href: "https://github.com/SoumikDebnath001",             icon: SiGithub,     color: "#181717", darkColor: "#F1F1F2" },
  { label: "LinkedIn",    href: "https://linkedin.com/in/soumik-debnath-1785a325a", icon: FaLinkedinIn, color: "#0A66C2" },
  { label: "Twitter / X", href: "https://twitter.com/SoumikD25377602",             icon: SiX,          color: "#000000", darkColor: "#F1F1F2" },
];

export default function Footer() {
  return (
    <footer className="bg-base pb-10 pt-16 md:pb-12 md:pt-24">
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <div className="border-t border-border pt-10 md:pt-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">

            <div className="min-w-0">
              <p
                className="font-playfair font-normal leading-none tracking-[-0.02em] text-primary"
                style={{ fontSize: "clamp(30px, 4vw, 48px)" }}
              >
                Soumik Debnath
              </p>
              <p className="mt-3 max-w-[38ch] text-[14px] leading-[1.7] text-secondary">
                Full stack engineer building web products end to end — currently
                open to new projects.
              </p>
            </div>

            <nav aria-label="Elsewhere" className="shrink-0">
              <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted">
                Elsewhere
              </p>
              <ul className="flex list-none flex-wrap gap-2.5">
                {socials.map(({ label, href, icon: Icon, color, darkColor }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      title={label}
                      className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/60 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--brand)] hover:bg-[color:var(--brand)]/10 dark:hover:border-[color:var(--brand-dark)] dark:hover:bg-[color:var(--brand-dark)]/10"
                      style={{ ["--brand" as string]: color, ["--brand-dark" as string]: darkColor ?? color }}
                    >
                      <Icon
                        size={19}
                        aria-hidden
                        className="text-[color:var(--brand)] transition-transform duration-200 group-hover:scale-110 dark:text-[color:var(--brand-dark)]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-hairline pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Soumik Debnath. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="/work" className="text-secondary no-underline transition-colors duration-200 hover:text-primary">
                Work
              </Link>
              <a
                href="/resumeSoumik.pdf"
                download="Soumik-Debnath-Resume.pdf"
                className="group inline-flex items-center gap-1.5 text-secondary no-underline transition-colors duration-200 hover:text-primary"
              >
                <FiDownload size={13} aria-hidden className="transition-transform duration-200 group-hover:translate-y-0.5" />
                Résumé
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

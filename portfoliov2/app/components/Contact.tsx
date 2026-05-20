"use client";

import { SiGmail, SiGithub, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useState } from "react";

const contacts: {
  label: string;
  href: string;
  icon: IconType;
  color: string;
}[] = [
  { label: "Email",      href: "mailto:debnathsoumik17@gmail.com",               icon: SiGmail,      color: "#EA4335" },
  { label: "GitHub",     href: "https://github.com/SoumikDebnath001",             icon: SiGithub,     color: "#181717" },
  { label: "LinkedIn",   href: "https://linkedin.com/in/soumik-debnath-1785a325a",icon: FaLinkedinIn, color: "#0A66C2" },
  { label: "Twitter / X",href: "https://twitter.com/SoumikD25377602",             icon: SiX,          color: "#000000" },
];

function ContactIcon({ item }: { item: typeof contacts[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center w-14 h-14 rounded-full border border-border bg-transparent transition-transform duration-200 no-underline"
      style={{
        transform: hovered ? "scale(1.15)" : "scale(1)",
        borderColor: hovered ? item.color : undefined,
        color: item.color,
      }}
    >
      <item.icon size={22} />
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-base flex flex-wrap justify-center items-center gap-6 md:gap-8 py-16 md:py-20 px-5 md:px-20"
    >
      {contacts.map((item) => (
        <ContactIcon key={item.label} item={item} />
      ))}
    </section>
  );
}

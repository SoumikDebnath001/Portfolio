"use client";

import { useEffect } from "react";
import type { IconType } from "react-icons";
import { FiX } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { lockScroll } from "../lib/smoothScroll";

export type InfoItem = {
  name: string;
  by: string;
  category: string;
  color: string;
  /** Lighter stand-in for brands that are near-black, used in dark mode. */
  darkColor?: string;
  icon: IconType;
  description: string;
};

export default function InfoDialog({ item, onClose }: { item: InfoItem; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const Icon = item.icon;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    lockScroll(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      lockScroll(false);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
      className="fixed inset-0 z-100 flex items-center justify-center bg-primary/25 px-5 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-dialog-title"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-110 rounded-3xl border border-border/60 bg-surface/75 p-6 backdrop-blur-2xl md:p-7"
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.14)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors duration-200 hover:bg-surface/70 hover:text-primary"
        >
          <FiX size={16} />
        </button>

        <div className="flex items-center gap-3.5">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
            style={{ backgroundColor: item.color }}
          >
            <Icon size={20} aria-hidden />
          </span>
          <div className="min-w-0">
            <p id="info-dialog-title" className="text-[17px] font-medium leading-tight text-primary">
              {item.name}
            </p>
            <p className="mt-0.5 text-[12px] text-secondary">{item.by}</p>
          </div>
        </div>

        <span
          className="mt-5 inline-flex rounded-full bg-[color:var(--brand)]/10 px-2.5 py-1 text-[10px] font-medium tracking-[0.04em] text-[color:var(--brand)] dark:bg-[color:var(--brand-dark)]/15 dark:text-[color:var(--brand-dark)]"
          style={{
            ["--brand" as string]: item.color,
            ["--brand-dark" as string]: item.darkColor ?? item.color,
          }}
        >
          {item.category}
        </span>

        <p className="mt-3 text-[13.5px] leading-[1.65] text-secondary">{item.description}</p>
      </motion.div>
    </motion.div>
  );
}

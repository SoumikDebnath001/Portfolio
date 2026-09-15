"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

export default function Reveal({ delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      {...props}
    />
  );
}

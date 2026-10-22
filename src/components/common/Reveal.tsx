"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, transform: "translate3d(0, 18px, 0)" }
      }
      whileInView={{
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        width: "100%",
      }}
    >
      {children}
    </motion.div>
  );
}

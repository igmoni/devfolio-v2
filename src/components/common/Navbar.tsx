"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

import Link from "next/link";

import type { MotionValue } from "motion/react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { navItems, navSocialLinks } from "@/config/common";

import { ThemeToggleButton } from "./ThemeToggle";

const springConfig = {
  mass: 0.2,
  stiffness: 300,
  damping: 22,
};

type DockItemProps = {
  mouseX: MotionValue<number>;
  children: ReactNode;
  href?: string;
  label: string;
};

const DockItem = ({ mouseX, children, href, label }: DockItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds || !Number.isFinite(x)) return 999;

    return Math.abs(x - (bounds.left + bounds.width / 2));
  });

  const scale = useTransform(distance, [0, 40, 80, 120], [1.5, 1.3, 1.1, 1]);

  const width = useTransform(distance, [0, 40, 80, 120], [52, 46, 42, 40]);

  const springScale = useSpring(scale, springConfig);
  const springWidth = useSpring(width, springConfig);

  const itemClassName =
    "group flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-neutral-500 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1)] ring ring-neutral-200 transition-colors duration-200 hover:text-orange-500 hover:ring-orange-400 dark:bg-neutral-700 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:text-indigo-400 dark:hover:ring-indigo-400";

  return (
    <motion.div
      ref={ref}
      style={{ width: springWidth }}
      className="relative flex h-10 shrink-0 items-center justify-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          scale: springScale,
          transformOrigin: "bottom center",
        }}
        className="flex size-10 shrink-0 items-center justify-center"
      >
        {href ? (
          <Link
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={itemClassName}
          >
            {children}
          </Link>
        ) : (
          <div className={itemClassName}>{children}</div>
        )}
      </motion.div>

      {isHovered && (
        <motion.span
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute bottom-full left-1/2 z-100 mb-7 -translate-x-1/2 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-neutral-900 dark:bg-white dark:text-neutral-900 dark:after:border-t-white"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
};

const Navbar = () => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <motion.nav
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      layout
      transition={{ layout: springConfig }}
      aria-label="Main navigation"
      className="fixed bottom-4 left-1/2 z-999 flex h-14 w-max -translate-x-1/2 scale-75 items-center gap-3 rounded-3xl bg-white p-2 text-neutral-900 shadow-sm ring ring-neutral-200 md:bottom-8 md:scale-100 dark:bg-neutral-800 dark:text-neutral-100 dark:ring-neutral-700"
    >
      <div className="flex items-center gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <DockItem
              key={item.id}
              mouseX={mouseX}
              href={item.value}
              label={item.name}
            >
              <Icon className="size-6 transition-colors" />
            </DockItem>
          );
        })}
      </div>

    

      <div className="h-full w-[1.5px] shrink-0 bg-linear-to-b from-transparent via-neutral-300 to-transparent dark:via-neutral-600" />

      <DockItem mouseX={mouseX} label="Toggle theme">
        <ThemeToggleButton variant="circle" start="bottom-center" />
      </DockItem>
    </motion.nav>
  );
};

export { Navbar };

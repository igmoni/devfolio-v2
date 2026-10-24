"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const ToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = () => {
    document.documentElement.classList.add("theme-transition");

    setTheme(resolvedTheme === "dark" ? "light" : "dark");

    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 350);
  };

  if (!resolvedTheme) return null;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={resolvedTheme === "dark"}
      className="group flex size-full cursor-pointer items-center justify-center"
      onClick={handleToggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Sun
              className="text-neutral-300 transition-colors group-hover:text-indigo-400"
              strokeWidth={1.5}
            />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Moon
              className="text-neutral-500 transition-colors group-hover:text-orange-400"
              strokeWidth={1.5}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export { ToggleTheme };

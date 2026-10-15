"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="group flex size-full cursor-pointer items-center justify-center"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun
          className="text-neutral-300 transition-colors group-hover:text-indigo-400"
          strokeWidth={1.5}
        />
      ) : (
        <Moon
          className="text-neutral-500 transition-colors group-hover:text-orange-400"
          strokeWidth={1.5}
        />
      )}
    </button>
  );
};

export { ToggleTheme };

"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <Sun className="text-orange-500" />
      ) : (
        <Moon className="text-cyan-500" />
      )}
    </button>
  );
};

export { ToggleTheme };

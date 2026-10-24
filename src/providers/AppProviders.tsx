"use client";
"use client";

import { SoundProvider } from "@/context/SoundContext";
import { ThemeProvider } from "@/providers/ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SoundProvider>{children}</SoundProvider>
    </ThemeProvider>
  );
}

"use client";

import { createContext, useContext, useState } from "react";

const SoundContext = createContext({
  soundEnabled: true,
  setSoundEnabled: (_value: boolean) => {},
});

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);

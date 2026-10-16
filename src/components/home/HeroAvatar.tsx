"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { Volume2, VolumeX, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { caveat } from "@/config/font";
import { useSound } from "@/context/SoundContext";
import { CircleZap } from "@/svgs/essentials/CircleZap";

import { AvailableBadge } from "../common/AvailableBadge";

const LOGO = "/assets/logo.png";
const AVATAR = "/assets/mohan.jpeg";

export const HeroAvatar = () => {
  const [image, setImage] = useState(LOGO);
  const [glitch, setGlitch] = useState(false);

  const { soundEnabled, setSoundEnabled } = useSound();

  const audioRef = useRef<HTMLAudioElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const handleClick = () => {
    if (glitch) return;

    setGlitch(true);

    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => {});
    }

    timersRef.current = [
      setTimeout(() => {
        setImage((prev) => (prev === LOGO ? AVATAR : LOGO));
      }, 120),
      setTimeout(() => {
        setGlitch(false);
      }, 350),
    ];
  };

  const handleSoundControl = () => {
    const next = !soundEnabled;

    setSoundEnabled(next);

    if (!next) {
      document.querySelectorAll("audio").forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  };
  return (
    <div className="relative">
      {/* Hero image */}
      <div className="relative z-0 mx-auto my-5 h-80 w-full max-w-3xl overflow-hidden rounded-2xl shadow-xl">
        <Image
          fill
          src="/assets/sukuna.gif"
          alt="Sukuna GIF"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <div className="absolute -bottom-5 -left-30 z-30 hidden -rotate-12 flex-col items-center lg:flex">
        <a
          href="mailto:mohansp119@gmail.com"
          className={`${caveat.className} hire-me-shake text-muted-foreground hover:text-accent-foreground text-2xl`}
        >
          HIRE ME
        </a>

        <svg
          viewBox="0 0 512 512"
          fill="none"
          aria-hidden="true"
          className="ml-8 size-20 rotate-12 text-neutral-400 dark:text-neutral-700"
        >
          <path
            d="M437 441 Q363 418 264 351 Q198 295 160 225 Q138 178 122 119"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M161 149 L125 73 L83 148"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Avatar */}
      <div className="absolute -bottom-15 left-10 z-10 size-35">
        <div className="relative size-full overflow-hidden rounded-full bg-[#8EC0E8] shadow-xl ring-5 ring-white dark:bg-[#EEDA66] dark:ring-black">
          <Image
            src={image}
            alt="Avatar"
            fill
            sizes="140px"
            className={`rounded-full object-cover ${
              image === AVATAR ? "scale-150" : ""
            }`}
          />

          {/* Glitch effect */}
          <AnimatePresence>
            {glitch && (
              <>
                <motion.div
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-full mix-blend-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8, x: [-6, 6, -3, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-full mix-blend-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8, x: [6, -6, 3, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-white"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{ duration: 0.3 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Hire Me */}
        </div>

        {/* Glitch button */}
        <button
          type="button"
          onClick={handleClick}
          disabled={glitch}
          aria-label="Switch avatar"
          className="absolute -right-13 bottom-0 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md ring ring-neutral-700 transition hover:scale-110 disabled:opacity-60 dark:bg-black dark:text-white"
        >
          {image === LOGO ? (
            <Zap className="hover:text-accent-foreground size-4 text-neutral-500" />
          ) : (
            <CircleZap className="hover:text-accent-foreground text-neutral-500" />
          )}
        </button>
        <button
          type="button"
          aria-label="Sound Control"
          onClick={handleSoundControl}
          className="absolute -right-25 bottom-0 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md ring ring-neutral-700 transition hover:scale-110 disabled:opacity-60 dark:bg-black dark:text-white"
        >
          {soundEnabled ? (
            <Volume2 className="hover:text-accent-foreground size-4 text-neutral-500" />
          ) : (
            <VolumeX className="hover:text-accent-foreground size-4 text-neutral-500" />
          )}
        </button>
      </div>

      <audio ref={audioRef} src="/assets/glitch.wav" preload="auto" />

      <div className="absolute right-0">
        <AvailableBadge />
      </div>
    </div>
  );
};

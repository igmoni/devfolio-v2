"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { Volume2, VolumeX, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { caveat } from "@/config/font";
import { useSound } from "@/context/SoundContext";
import { CircleZap } from "@/svgs/essentials/CircleZap";

import { AvailableBadge } from "../common/AvailableBadge";
import { PageViews } from "../common/PageViews";
import { Reveal } from "../common/Reveal";

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

  // Shared avatar image and glitch effect
  const AvatarImage = (
    <div className="relative size-full overflow-hidden rounded-full bg-[#8EC0E8] shadow-xl ring-4 ring-white sm:ring-5 dark:bg-[#EEDA66] dark:ring-black">
      <Image
        src={image}
        alt="Avatar"
        fill
        sizes="140px"
        className={`rounded-full object-cover ${
          image === AVATAR ? "scale-150" : ""
        }`}
      />

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
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );

  // Avatar switch button
  const AvatarButton = (
    <button
      type="button"
      onClick={handleClick}
      disabled={glitch}
      aria-label="Switch avatar"
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-md ring ring-neutral-700 transition hover:scale-110 disabled:opacity-60 sm:size-8 dark:bg-black dark:text-white"
    >
      {image === LOGO ? (
        <Zap className="hover:text-accent-foreground size-4 text-neutral-500 transition-colors" />
      ) : (
        <CircleZap className="hover:text-accent-foreground size-4 text-neutral-500 transition-colors" />
      )}
    </button>
  );

  // Sound toggle button
  const SoundButton = (
    <button
      type="button"
      aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
      aria-pressed={soundEnabled}
      onClick={handleSoundControl}
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-md ring ring-neutral-700 transition hover:scale-110 sm:size-8 dark:bg-black dark:text-white"
    >
      {soundEnabled ? (
        <Volume2 className="hover:text-accent-foreground size-4 text-neutral-500 transition-colors" />
      ) : (
        <VolumeX className="hover:text-accent-foreground size-4 text-neutral-500 transition-colors" />
      )}
    </button>
  );

  return (
    <div className="relative">
      {/* Hero GIF */}
      <Reveal>
        <div className="relative z-0 mx-auto my-5 h-42 w-full max-w-3xl overflow-hidden rounded-2xl shadow-xl sm:h-72 md:h-80">
          <Image
            fill
            src="/assets/sukuna.gif"
            alt="Sukuna GIF"
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* Mobile: avatar overlaps GIF, buttons on either side */}
      <div className="relative z-20 -mt-18 flex flex-col items-center md:hidden">
        <div className="flex items-center justify-center gap-3">
          {AvatarButton}

          <div className="size-32 shrink-0 sm:size-35">
            <Reveal delay={0.2} className="size-full">
              {AvatarImage}
            </Reveal>
          </div>

          {SoundButton}
        </div>

        {/* Availability below avatar */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-5 w-fit">
            <AvailableBadge />
          </div>
        </Reveal>
      </div>

      {/* Desktop: Hire Me annotation */}
      <Reveal delay={0.5}>
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
      </Reveal>

      {/* Tablet and desktop: avatar positioning remains fixed */}
      <div className="absolute -bottom-15 left-10 z-10 hidden size-35 md:block">
        <Reveal delay={0.2} className="size-full">
          {AvatarImage}
        </Reveal>

        <Reveal delay={0.23}>
          <div className="absolute -right-13 bottom-0 z-20 -translate-y-1/2">
            {AvatarButton}
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="absolute -right-25 bottom-0 z-20 -translate-y-1/2">
            {SoundButton}
          </div>
        </Reveal>
      </div>

      {/* Desktop availability badge */}
      <Reveal delay={0.1}>
        <div className="itms-center absolute right-0 hidden gap-5 md:flex">
          <PageViews />
          <AvailableBadge />
        </div>
      </Reveal>

      {/* Glitch sound */}
      <audio ref={audioRef} src="/assets/glitch.wav" preload="auto" />
    </div>
  );
};

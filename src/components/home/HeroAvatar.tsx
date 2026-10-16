"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { motion } from "motion/react";

import { instrumentSerif } from "@/config/font";

import { AvailableBadge } from "../common/AvailableBadge";

export const HeroAvatar = () => {
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => {});
    }

    setFlipped((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="relative z-0 mx-auto my-5 h-80 w-full max-w-3xl overflow-hidden rounded-2xl shadow-xl">
        <Image
          fill
          alt="Sukuna GIF"
          src="/assets/sukuna.gif"
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <motion.div
        className="absolute -bottom-15 left-10 z-10 size-35 overflow-hidden rounded-full shadow-xl ring-5 ring-white dark:ring-black"
        style={{ perspective: 800 }}
      >
        <motion.div
          className="relative size-full cursor-pointer rounded-full"
          role="button"
          tabIndex={0}
          aria-label="Flip avatar"
          onClick={handleClick}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src="/assets/logo.png"
            alt="Logo"
            fill
            sizes="140px"
            className="rounded-full bg-[#8EC0E8] object-cover dark:bg-[#EEDA66]"
            style={{ backfaceVisibility: "hidden" }}
          />

          <Image
            src="/assets/mohan.jpeg"
            alt="My avatar"
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="scale-150 rounded-full object-cover"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>
      </motion.div>
      <audio src="/assets/coinFlip.mp3" ref={audioRef} preload="auto" />

      <div className="absolute right-0">
        <AvailableBadge />
      </div>

      <motion.div
        className="absolute -bottom-2 -left-34 z-20 flex items-center gap-2 text-neutral-300 dark:text-neutral-700"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
          <path
            d="M4 5 L10 12 M17 2 L20 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <span className="font-serif text-xl italic">
          Click on <br /> Avatar
        </span>

        <svg
          width="24"
          height="30"
          viewBox="0 0 24 30"
          fill="none"
          className="scale-x-[-1]"
        >
          <path
            d="M4 5 L10 12 M17 2 L20 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};

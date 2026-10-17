"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";

import { useSound } from "@/context/SoundContext";

const springData = {
  stiffness: 350,
  damping: 32,
  mass: 0.35,
};

const CustomCursor = () => {
  const { soundEnabled } = useSound();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, springData);
  const y = useSpring(mouseY, springData);

  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interactiveSelector = [
      "a",
      "button",
      "[role='button']",
      "input",
      "textarea",
      "select",
      "label",
      "[data-cursor='interactive']",
    ].join(",");

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      setIsVisible(true);

      const target = event.target;

      if (!(target instanceof Element)) return;

      setIsInteractive(Boolean(target.closest(interactiveSelector)));
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      setIsVisible(false);
      setIsInteractive(false);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      setIsVisible(true);
    };

    const handleClick = () => {
      if (!soundEnabled) return;

      // Stop any previous click sound before playing another.
      clickAudioRef.current?.pause();

      const audio = new Audio("/assets/click.wav");
      audio.volume = 0.3;
      clickAudioRef.current = audio;

      void audio.play().catch(() => {});
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    document.documentElement.addEventListener(
      "pointerenter",
      handlePointerEnter
    );

    window.addEventListener("click", handleClick);

    // Stop the current click sound immediately when sound is disabled.
    if (!soundEnabled && clickAudioRef.current) {
      clickAudioRef.current.pause();
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current = null;
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      document.documentElement.removeEventListener(
        "pointerenter",
        handlePointerEnter
      );

      window.removeEventListener("click", handleClick);
    };
  }, [mouseX, mouseY, soundEnabled]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-9999 hidden rounded-full bg-white mix-blend-difference md:block"
      animate={{
        width: isInteractive ? 56 : 12,
        height: isInteractive ? 56 : 12,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        width: {
          type: "spring",
          stiffness: 300,
          damping: 24,
        },
        height: {
          type: "spring",
          stiffness: 300,
          damping: 24,
        },
        opacity: {
          duration: 0.15,
        },
      }}
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
};

export { CustomCursor };

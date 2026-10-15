"use client";

import { useEffect, useState } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";

const springData = {
  stiffness: 350,
  damping: 32,
  mass: 0.35,
};

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, springData);
  const y = useSpring(mouseY, springData);

  const [isInteractive, setIsInteractive] = useState(false);

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

      const target = event.target;

      if (!(target instanceof Element)) return;

      setIsInteractive(Boolean(target.closest(interactiveSelector)));
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden rounded-full bg-white mix-blend-difference md:block"
      animate={{
        width: isInteractive ? 56 : 12,
        height: isInteractive ? 56 : 12,
        opacity: 1,
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

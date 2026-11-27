"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import type { MotionValue } from "motion/react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { tools } from "@/config/skills";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { SubHeading } from "../common/SubHeading";

const springConfig = {
  mass: 0.2,
  stiffness: 300,
  damping: 22,
};

type ToolItemProps = {
  mouseX: MotionValue<number>;
  imgSrc: string;
  name: string;
};

const ToolItem = ({ mouseX, imgSrc, name }: ToolItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds || !Number.isFinite(x)) return 999;

    return Math.abs(x - (bounds.left + bounds.width / 2));
  });

  const scale = useTransform(distance, [0, 40, 80, 120], [1.5, 1.3, 1.1, 1]);
  const y = useTransform(distance, [0, 40, 80, 120], [-8, -5, -2, 0]);

  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: springScale,
        y: springY,
        transformOrigin: "bottom center",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex size-10 shrink-0 items-center justify-center"
    >
      <Image
        src={imgSrc}
        alt={name}
        width={40}
        height={40}
        className="size-10 rounded-xl object-contain"
      />

      {isHovered && (
        <motion.span
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-neutral-900 px-2 py-1 text-[10px] leading-none font-medium whitespace-nowrap text-white shadow-md dark:bg-white dark:text-neutral-900"
        >
          {name}
        </motion.span>
      )}
    </motion.div>
  );
};

const Tools = () => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <Container className="my-10 mb-20">
      <div className="flex items-end justify-between">
        <Heading as="h2">Tools</Heading>
        <SubHeading>What I make things in</SubHeading>
      </div>

      <motion.div
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className="mt-10 flex flex-wrap items-center justify-center gap-5"
      >
        {tools.map((tool) => (
          <ToolItem
            key={tool.name}
            mouseX={mouseX}
            imgSrc={tool.imgSrc}
            name={tool.name}
          />
        ))}
      </motion.div>
    </Container>
  );
};

export { Tools };

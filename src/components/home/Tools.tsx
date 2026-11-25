"use client";

import { Cog } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { tools } from "@/config/skills";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { SubHeading } from "../common/SubHeading";

const Tools = () => {
  return (
    <Container className="my-10 mb-20">
      <div className="flex items-end justify-between">
        <Heading as="h2" Icon={<Cog />}>
          Tools
        </Heading>
        <SubHeading>What I make things in</SubHeading>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        {tools.map((tool) => (
          <motion.div
            key={tool.name}
            initial="initial"
            whileHover="hover"
            className="group relative flex items-center justify-center"
          >
            <motion.img
              src={tool.imgSrc}
              alt={tool.name}
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.2, y: -3 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="size-10 rounded-xl object-contain"
            />

            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                whileInView={{ opacity: 0 }}
                variants={{
                  hover: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 -translate-x-1/2 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg dark:bg-white dark:text-neutral-900"
              >
                {tool.name}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export { Tools };

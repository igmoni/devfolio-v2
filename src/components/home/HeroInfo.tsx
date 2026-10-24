"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";

import { instrumentSerif } from "@/config/font";
import { heroConfig } from "@/config/hero";

import { Reveal } from "../common/Reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const HeroInfo = () => {
  const { name, description, socialLinks, professions } = heroConfig;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!professions.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % professions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [professions.length]);

  return (
    <div className="mt-5 md:mt-20">
      <Reveal delay={0.3}>
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <h1
            className={`${instrumentSerif.className} text-3xl font-bold italic`}
          >
            {name}
          </h1>

          <svg
            viewBox="0 0 24 24"
            className="ml-1 size-5 fill-current text-[#1D9BF0]"
            role="img"
            aria-label="Verified account"
          >
            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.457.748 2.795 1.867 3.48-.05.19-.083.39-.083.595 0 2.21 1.71 3.998 3.818 3.998.47 0 .92-.084 1.336-.25.62 1.333 1.926 2.25 3.437 2.25s2.817-.917 3.437-2.25c.415-.165.866-.25 1.336-.25 2.11 0 3.818-1.79 3.818-4 0-.205-.034-.405-.084-.595 1.12-.685 1.868-2.023 1.868-3.48zm-11.454 4.34-3.32-3.32 1.415-1.415 1.905 1.905 4.775-4.775 1.415 1.415-6.19 6.19z" />
          </svg>
        </div>
      </Reveal>
      <Reveal delay={0.4}>
        <p className="text-center text-sm text-neutral-500 md:text-left md:text-xl">
          {professions.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="inline-block"
              >
                {professions[index]}
              </motion.span>
            </AnimatePresence>
          )}
        </p>
      </Reveal>
      <Reveal delay={0.4}>
        <p className="my-2 text-center md:text-left">{description}</p>
      </Reveal>
      <Reveal delay={0.5}>
        <TooltipProvider>
          <div className="my-3 flex w-fit items-center justify-center gap-2 md:justify-start">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger>
                    <Link
                      key={item.id}
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="flex size-8 items-center justify-center"
                    >
                      <Icon className="size-7 text-[#909092]" />
                    </Link>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </Reveal>
    </div>
  );
};

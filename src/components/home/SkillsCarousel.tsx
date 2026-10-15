"use client";

import { mySkills } from "@/config/skills";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";

const SkillsCarousel = () => {
  const skills = [...mySkills, ...mySkills];

  return (
    <Container>
      <Heading as="h2">Tech Stack</Heading>

      <div className="group relative w-full overflow-hidden py-4">
        <div className="animate-marquee flex w-max items-center gap-3 group-hover:[animation-play-state:paused]">
          {skills.map(({ name, icon: Icon }, index) => (
            <div
              key={`${name}-${index}`}
              className="flex h-10 w-fit shrink-0 items-center gap-2 rounded-full border border-neutral-800/40 bg-neutral-100 px-4 text-sm font-medium whitespace-nowrap text-neutral-500 transition-transform duration-200 hover:scale-105 dark:border-neutral-200/10 dark:bg-neutral-900"
            >
              <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-full">
                <Icon />
              </span>
              <span>{name}</span>
            </div>
          ))}
        </div>

        {/* Left fade */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-linear-to-r to-transparent sm:w-24" />

        {/* Right fade */}
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-linear-to-l to-transparent sm:w-24" />
      </div>
    </Container>
  );
};

export { SkillsCarousel };

"use client";

import Link from "next/link";

import { motion } from "motion/react";

import { ArrowUpRight } from "@/svgs/essentials/ArrowUpRight";
import { Github } from "@/svgs/socials/Github";
import { NextJs } from "@/svgs/technologies/NextJs";
import { ReactIcon } from "@/svgs/technologies/ReactIcon";
import { TypeScript } from "@/svgs/technologies/TypeScript";
import type {
  LinksProps,
  Project,
  ProjectProps,
  StacksProps,
} from "@/types/projects";

export const techs: StacksProps[] = [
  { name: "TypeScript", Icon: <TypeScript /> },
  { name: "React", Icon: <ReactIcon /> },
  { name: "Next.Js", Icon: <NextJs /> },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const { name, description, live, githubLink, stacks } = project;

  return (
    <Link
      href={`/projects/${name.toLowerCase()}`}
      className="group flex flex-col gap-3 rounded-2xl bg-neutral-100 p-3 px-5 ring ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700"
    >
      <div className="flex items-center justify-between">
        <CardHeading>{name}</CardHeading>

        <Links live={live} githubLink={githubLink} />
      </div>

      <CardDescription>{description}</CardDescription>

      <CardStacks stacks={stacks} />
    </Link>
  );
};

export { ProjectCard };

const CardHeading = ({ children }: ProjectProps) => (
  <h3 className="text-xl font-semibold group-hover:text-blue-800 dark:group-hover:text-blue-500">
    {children}
  </h3>
);

const CardDescription = ({ children }: ProjectProps) => (
  <p className="text-sm text-neutral-500">{children}</p>
);

const CardStacks = ({ stacks }: { stacks: StacksProps[] }) => {
  return (
    <div className="mt-3">
      <div className="flex items-center pl-3">
        {stacks.map(({ name, Icon }, index) => (
          <motion.div
            key={`${name}-${index}`}
            layout
            variants={{
              initial: { marginLeft: -12 }, // -ml-5
              animate: { marginLeft: -25 }, // -ml-3
            }}
            initial="initial"
            whileHover="animate"
            whileTap="animate"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="relative"
          >
            {/* SINGLE PILL */}
            <motion.div
              variants={{
                initial: {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
                animate: {
                  paddingLeft: 5,
                  paddingRight: 10,
                },
              }}
              initial="initial"
              whileHover="animate"
              whileTap="animate"
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="bg-muted dark:bg-accent flex h-10 items-center overflow-hidden rounded-full border"
            >
              {/* ICON */}
              <motion.span
                variants={{ animate: { paddingRight: 8 } }}
                transition={{ type: "spring" }}
                className="flex h-10 w-10 shrink-0 items-center justify-center"
              >
                <span className="flex h-7 w-7 items-center justify-center">
                  {Icon && Icon}
                </span>
              </motion.span>

              {/* TEXT */}
              <motion.span
                variants={{
                  initial: { width: 0 },
                  animate: { width: "auto" },
                  exit: { width: 0 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 0.5,
                }}
                className="text-primary overflow-hidden text-xs whitespace-nowrap opacity-100 dark:text-white"
              >
                {name}
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Links = ({ live, githubLink }: LinksProps) => {
  return (
    <div className="flex items-center gap-3">
      {live && (
        <a
          href={`https://${live}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View live project"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowUpRight
            className={
              "size-6 text-neutral-500 group-hover:text-black dark:group-hover:text-white"
            }
          />
        </a>
      )}
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub repository"
        >
          <Github className="text-neutral-500" />
        </a>
      )}
    </div>
  );
};

"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "motion/react";

import { ArrowUpRight } from "@/svgs/essentials/ArrowUpRight";
import { Github } from "@/svgs/socials/Github";
import type { Project, StacksProps } from "@/types/projects";

import { Heading } from "../common/Heading";

// Main component
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group w-full max-w-[420px]"
    >
      <ProjectPreview
        shortTitle={project.shortTitle}
        imgUrl={project.imgUrl}
        live={project.live}
        githubLink={project.githubLink}
        tool={project.tool}
      />

      <div className="">
        <ProjectInfo
          shortTitle={project.shortTitle}
          description={project.description}
          stacks={project.stacks ?? []}
          status={project.status}
          slug={project.slug}
          about={project.about}
        />
      </div>
    </motion.article>
  );
};

export { ProjectCard };

// Technology stack
const ProjectTechStack = ({ stacks = [] }: { stacks?: StacksProps[] }) => {
  return (
    <div className="mt-5 flex items-center pl-2 transition-all duration-300 hover:pl-5">
      {stacks.map(({ name, Icon }, index) => (
        <motion.div
          key={name}
          layout
          variants={{
            initial: { marginLeft: -12 },
            animate: { marginLeft: -25 },
          }}
          initial="initial"
          whileHover="animate"
          whileTap="animate"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative"
          style={{ zIndex: index }}
        >
          <motion.div
            variants={{
              initial: { paddingLeft: 0, paddingRight: 0 },
              animate: { paddingLeft: 5, paddingRight: 10 },
            }}
            initial="initial"
            whileHover="animate"
            whileTap="animate"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-muted dark:bg-accent flex h-10 items-center overflow-hidden rounded-full border"
          >
            <motion.span
              variants={{ animate: { paddingRight: 8 } }}
              transition={{ type: "spring" }}
              className="flex h-10 w-10 shrink-0 items-center justify-center"
            >
              <span className="flex size-7 items-center justify-center">
                {Icon}
              </span>
            </motion.span>

            <motion.span
              variants={{
                initial: { width: 0 },
                animate: { width: "auto" },
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.5,
              }}
              className="text-primary overflow-hidden text-xs whitespace-nowrap dark:text-white"
            >
              {name}
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Image preview and external links
const ProjectPreview = ({
  shortTitle,
  imgUrl,
  live,
  githubLink,
  tool,
}: Pick<Project, "shortTitle" | "imgUrl" | "live" | "githubLink" | "tool">) => {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
      <Image
        src={imgUrl}
        alt={`${shortTitle} project preview`}
        fill
        sizes="(max-width: 640px) 100vw, 420px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

      <motion.div
        variants={{
          rest: { opacity: 0, y: 6 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.2 }}
        className="absolute right-3 bottom-3 flex gap-2"
      >
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${shortTitle} live`}
            className="flex size-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
          >
            <ArrowUpRight className="size-5" />
          </a>
        )}

        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${shortTitle} GitHub repository`}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black"
          >
            <Github className="size-5" />
          </a>
        )}
      </motion.div>
    </div>
  );
};

// Project details
const ProjectInfo = ({
  shortTitle,
  description,
  stacks,
  status,
  slug,
  about,
}: Pick<
  Project,
  "shortTitle" | "description" | "stacks" | "status" | "slug" | "about"
>) => {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Heading as="h3" className="text-2xl font-medium tracking-tight">
            {shortTitle}
          </Heading>

          <p className="mt-1 text-xs font-medium tracking-wide text-neutral-500">
            {about}
          </p>
        </div>

        <Link
          href={`/projects/${slug.toLowerCase().replace(/\s+/g, "-")}`}
          aria-label={`Read more about ${shortTitle}`}
        >
          <ArrowUpRight className="mt-7 size-7 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-neutral-900 dark:group-hover:text-white" />
        </Link>
      </div>

      <p className="mt-3 line-clamp-2 max-w-sm text-sm leading-6 text-neutral-500">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <ProjectTechStack stacks={stacks} />

        <div
          className={`mt-5 flex items-center gap-2 rounded-md border px-2 py-0.5 ${status === "Working" ? "border-green-500 bg-green-300/20" : "border-red-500 bg-red-300/20"} `}
        >
          <span
            className={`${status === "Working" ? "bg-green-500" : "bg-red-500"} size-2 rounded-full`}
          />
          <p className="text-sm">{status}</p>
        </div>
      </div>
    </div>
  );
};

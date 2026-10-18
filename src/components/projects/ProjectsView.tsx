"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ExternalLink, LayoutGrid, List, TextAlignStart } from "lucide-react";

import { ArrowUpRight } from "@/svgs/essentials/ArrowUpRight";
import { Project as ProjectIcon } from "@/svgs/essentials/Project";
import { Github } from "@/svgs/socials/Github";
import type { Project } from "@/types/projects";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";
import { ProjectCard } from "../projects/ProjectCard";
import { Button } from "../ui/button";

type ProjectsViewProps = {
  projects: (Project & { slug: string })[];
};

const ProjectsView = ({ projects }: ProjectsViewProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <Reveal delay={0.3}>
      <Container className="mt-10">
        <div className="flex items-center justify-between border border-red-500">
          <Heading as="h2" Icon={<ProjectIcon className="size-6" />}>
            Projects
          </Heading>

          <div className="mt-7 flex items-center gap-5 rounded-lg">
            <button onClick={() => setView("list")}>
              <TextAlignStart className="hover:text-accent-foreground size-6 text-neutral-500" />
            </button>

            <button onClick={() => setView("grid")}>
              <LayoutGrid className="hover:text-accent-foreground size-6 text-neutral-500" />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.slice(0, 4).map((project, index) => (
              <Reveal delay={index * 0.2} key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-3">
            {projects.slice(0, 4).map((project, index) => (
              <Reveal delay={index * 0.1} key={project.slug}>
                <div className="group hover:bg-muted/30 flex flex-col gap-4 rounded-xl p-3 transition-colors sm:flex-row sm:items-center sm:p-4">
                  {/* Project image */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="bg-muted relative block aspect-video w-full shrink-0 overflow-hidden rounded-lg sm:w-40"
                  >
                    <Image
                      src={project.imgUrl}
                      alt={project.shortTitle}
                      fill
                      sizes="(max-width: 640px) 100vw, 160px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Project details */}
                  <div className="min-w-0 flex-1">
                    <Link href={`/projects/${project.slug}`}>
                      <Heading
                        as="h3"
                        className="group-hover:text-muted-foreground font-medium transition-colors"
                      >
                        {project.shortTitle}
                      </Heading>
                    </Link>

                    <p className="text-muted-foreground mt-1 line-clamp-2 max-w-sm text-sm leading-6">
                      {project.description}
                    </p>

                    <p className="text-muted-foreground mt-2 text-xs">
                      {project.tool}
                    </p>
                  </div>

                  {/* Project links */}
                  <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
                    {project.githubLink && (
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.shortTitle} source code`}
                      >
                        <Github className="size-4" />
                      </Link>
                    )}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-2 opacity-0 transition duration-200 group-hover:opacity-100"
                    >
                      <ArrowUpRight className={"size-5"} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {projects.length > 4 && (
          <div className="mt-7 flex justify-center">
            <Button variant="outline" className="my-5 w-fit">
              <Link href="/projects">Show all projects</Link>
            </Button>
          </div>
        )}
      </Container>
    </Reveal>
  );
};

export { ProjectsView };

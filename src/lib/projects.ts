import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";
import "server-only";

import { getStacks } from "@/config/technologies";
import type { Project as ProjectCardData, StacksProps } from "@/types/projects";

const PROJECTS_DIR = path.join(process.cwd(), "src/data/projects");

export type ProjectDetails = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  stack: string[];
  github?: string;
  live?: string;
  timeline: string;
  role: string;
  team: string;
  status: "Working" | "Building";
  isPublished: boolean;
  date: string;
  about: string;
};

export type ProjectPageData = {
  project: ProjectDetails;
  content: string;
};

async function readProjectFile(filename: string): Promise<ProjectPageData> {
  const source = await fs.readFile(path.join(PROJECTS_DIR, filename), "utf8");

  const { data, content } = matter(source);

  return {
    project: {
      ...data,
      slug: filename.replace(/\.mdx$/, ""),
    } as ProjectDetails,
    content,
  };
}

export async function getProjects(): Promise<ProjectCardData[]> {
  const files = await fs.readdir(PROJECTS_DIR);

  const results = await Promise.all(
    files.filter((file) => file.endsWith(".mdx")).map(readProjectFile)
  );

  return results
    .filter(({ project }) => project.isPublished)
    .sort(
      (a, b) =>
        new Date(b.project.date).getTime() - new Date(a.project.date).getTime()
    )
    .map(({ project }) => ({
      shortTitle: project.shortTitle,
      tool: project.stack.join(", "),
      description: project.description,
      live: project.live,
      githubLink: project.github,
      imgUrl: project.image,
      stacks: getStacks(project.stack),
      status: project.status,
      slug: project.slug,
      about: project.about,
    }));
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectPageData | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return null;
  }

  try {
    const result = await readProjectFile(`${slug}.mdx`);

    if (!result.project.isPublished) return null;

    return result;
  } catch {
    return null;
  }
}

export async function getRelatedProjects(
  currentSlug: string,
  currentStack: string[] | undefined,
  limit = 2
) {
  const files = await fs.readdir(PROJECTS_DIR);

  const results = await Promise.all(
    files.filter((file) => file.endsWith(".mdx")).map(readProjectFile)
  );

  return results
    .filter(
      ({ project }) => project.isPublished && project.slug !== currentSlug
    )
    .map(({ project }) => ({
      project,
      score: project.stack.filter((technology) =>
        currentStack?.some(
          (item) => item.toLowerCase() === technology.toLowerCase()
        )
      ).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ project }) => project);
}

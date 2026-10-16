import { NextJs } from "@/svgs/technologies/NextJs";
import { ReactIcon } from "@/svgs/technologies/ReactIcon";
import { TypeScript } from "@/svgs/technologies/TypeScript";
import type { Project, StacksProps } from "@/types/projects";

const techs: StacksProps[] = [
  { name: "TypeScript", Icon: <TypeScript /> },
  { name: "React", Icon: <ReactIcon /> },
  { name: "Next.js", Icon: <NextJs /> },
];

export const projects: Project[] = [
  {
    name: "Craft",
    tool: "CLI Tool",
    description:
      "Scaffold projects faster with a CLI that brings frameworks and development tooling into one workflow.",
    githubLink: "https://github.com/igmoni",
    live: "/",
    imgUrl: "/blog/github.png",
    stacks: techs,
  },
];

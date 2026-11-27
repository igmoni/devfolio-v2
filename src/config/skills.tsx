import { ExpressJs } from "@/svgs/technologies/ExpressJs";
import { Java } from "@/svgs/technologies/Java";
import { JavaScript } from "@/svgs/technologies/JavaScript";
import { NextJs } from "@/svgs/technologies/NextJs";
import { NodeJs } from "@/svgs/technologies/NodeJs";
import { Prisma } from "@/svgs/technologies/Prisma";
import { PostgreSQL } from "@/svgs/technologies/PSQL";
import { Python } from "@/svgs/technologies/Python";
import { ReactIcon } from "@/svgs/technologies/ReactIcon";
import { TailwindCss } from "@/svgs/technologies/TailwindCss";
import { TypeScript } from "@/svgs/technologies/TypeScript";
import type { Skill } from "@/types/common";

export const mySkills: Skill[] = [
  { name: "React", icon: ReactIcon },
  { name: "Next.js", icon: NextJs },
  { name: "Tailwind CSS", icon: TailwindCss },
  { name: "TypeScript", icon: TypeScript },
  { name: "JavaScript", icon: JavaScript },
  { name: "Node.js", icon: NodeJs },
  { name: "Express.js", icon: ExpressJs },
  { name: "PostgreSQL", icon: PostgreSQL },
  { name: "Prisma", icon: Prisma },
  { name: "Python", icon: Python },
  { name: "Java", icon: Java },
];

type ToolType = {
  name: string;
  imgSrc: string;
};

export const tools: ToolType[] = [
  { name: "Cursor", imgSrc: "/assets/cursor.avif" },
  { name: "Figma", imgSrc: "/assets/figma.avif" },
  { name: "Motion", imgSrc: "/assets/motion.avif" },
  { name: "Notion", imgSrc: "/assets/notion.avif" },
  { name: "X", imgSrc: "/assets/x.avif" },
  { name: "Tick Tick", imgSrc: "/assets/tick-tick.avif" },
  { name: "Reddit", imgSrc: "/assets/reddit.avif" },
];

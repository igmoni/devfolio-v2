import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Separator } from "@/components/ui/separator";
import { getProjects } from "@/lib/projects";
import { generateContentMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Projects - My Work & Case Studies",
    description:
      "Explore the web applications, products, and experiments I've built.",
    image: "/meta/project.png",
    path: "/projects",
    type: "website",
  });
}

export default async function Page() {
  const projects = await getProjects();

  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Projects</Heading>

        <SubHeading>
          A few products and experiments I&apos;ve shipped.
        </SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
        {projects.map((project, id) => (
          <Reveal key={project.slug} delay={id * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

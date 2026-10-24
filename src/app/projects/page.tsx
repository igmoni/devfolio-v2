import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Separator } from "@/components/ui/separator";
import { getProjects } from "@/lib/projects";

const page = async () => {
  const projects = await getProjects();

  return (
    <Container className="mt-5">
      <Reveal>
        <Heading as="h1">Projects</Heading>
        <SubHeading>A few products and experiments I&apos;ve shipped.</SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
        {projects.map((project, id) => (
          <Reveal key={id} delay={id * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
};

export default page;

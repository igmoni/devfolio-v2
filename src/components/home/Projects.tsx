import { projects } from "@/config/project";
import { Project } from "@/svgs/essentials/Project";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";
import { ProjectCard } from "../projects/ProjectCard";
import { Button } from "../ui/button";

const Projects = () => {
  return (
    <Reveal delay={0.3}>
      <Container>
        <Heading as="h2" Icon={<Project className={"size-6"} />}>
          {" "}
          Projects
        </Heading>

        <div className="mt-5 grid grid-cols-1  md:grid-cols-2 gap-5">
          {projects.slice(0, 4).map((project, id) => (
            <Reveal delay={id * 0.2} key={id}>
              <ProjectCard key={project.name} project={project} />
            </Reveal>
          ))}
        </div>

        {projects.length > 4 && (
          <div className="mt-7 flex justify-center">
            <Button variant={"outline"} className={"my-5 w-fit"}>
              Show all projects
            </Button>
          </div>
        )}
      </Container>
    </Reveal>
  );
};

export { Projects };

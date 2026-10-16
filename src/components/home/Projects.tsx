import { projects } from "@/config/project";
import { Project } from "@/svgs/essentials/Project";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { ProjectCard } from "../projects/ProjectCard";
import { Button } from "../ui/button";

const Projects = () => {
  return (
    <Container>
      <Heading as="h2" Icon={<Project className={"size-6"} />}>
        {" "}
        Projects
      </Heading>

      <div className="mt-5 grid grid-cols-2 gap-5">
        {projects.slice(0, 4).map((project) => (
          <ProjectCard key={project.name} project={project} />
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
  );
};

export { Projects };

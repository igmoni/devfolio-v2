import React from "react";

import { Project } from "@/svgs/essentials/Project";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { ProjectCard, techs } from "../projects/ProjectCard";
import { Button } from "../ui/button";

const Projects = () => {
  const projects = [1, 2, 3, 4, 5];
  return (
    <Container>
      <Heading as="h2" Icon={<Project className={"size-6"} />}>
        {" "}
        Projects
      </Heading>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <ProjectCard
          project={{
            name: "Craft",
            description: "A TypeScript CLI tool for scaffolding projects.",
            live: "craftship-v1.vercel.app",
            githubLink: "https://github.com/igmoni/craft",
            stacks: techs,
          }}
        />
      </div>

      {projects.length > 4 && (
        <div className="flex justify-center">
          <Button variant={"outline"} className={"my-5 w-fit"}>
            Show all projects
          </Button>
        </div>
      )}
    </Container>
  );
};

export { Projects };

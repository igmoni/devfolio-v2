import React from "react";

import { Project } from "@/svgs/essentials/Project";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";

const Projects = () => {
  return (
    <Container>
      <Heading as="h2" Icon={<Project className={"size-6"} />}>
        {" "}
        Projects
      </Heading>
    </Container>
  );
};

export { Projects };

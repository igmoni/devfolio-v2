import { getProjects } from "@/lib/projects";

import { ProjectsView } from "../projects/ProjectsView";

const Projects = async () => {
  const projects = await getProjects();

  return <ProjectsView projects={projects} />;
};

export { Projects };

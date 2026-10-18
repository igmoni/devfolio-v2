export type ProjectProps = {
  children: React.ReactNode;
};

export type StacksProps = {
  name: string;
  Icon: React.ReactNode;
};

export type LinksProps = {
  live?: string;
  githubLink?: string;
};

export type Project = {
  slug: string;
  shortTitle: string;
  tool: string;
  description: string;
  live?: string;
  githubLink?: string;
  imgUrl: string;
  stacks: StacksProps[];
  status: "Working" | "Building";
  about: string;
};

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
  name: string;
  tool: string
  description: string;
  live?: string;
  githubLink?: string;
  imgUrl: string;
  stacks: StacksProps[];
};
import { Blog } from "@/svgs/Blog";
import { Github } from "@/svgs/Github";
import { Home } from "@/svgs/Home";
import { Project } from "@/svgs/Project";
import { X } from "@/svgs/X";

export const navItems = [
  {
    id: 1,
    icon: Home,
    value: "/",
  },
  {
    id: 2,
    icon: Project,
    value: "/projects",
  },
  {
    id: 3,
    icon: Blog,
    value: "/blogs",
  },
];

export const navSocialLinks = [
  {
    id: 1,
    icon: Github,
    value: "https://github.com/igmoni",
  },
  {
    id: 2,
    icon: X,
    value: "https://x.com/_igmoni",
  },
];

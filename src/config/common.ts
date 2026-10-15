import { Blog } from "@/svgs/Blog";
import { Github } from "@/svgs/Github";
import { Home } from "@/svgs/Home";
import { Project } from "@/svgs/Project";
import { X } from "@/svgs/X";

export const navItems = [
  { id: 1, name: "Home", icon: Home, value: "/" },
  { id: 2, name: "Projects", icon: Project, value: "/projects" },
  { id: 3, name: "Blog", icon: Blog, value: "/blog" },
];

export const navSocialLinks = [
  { id: 1, name: "Github", icon: Github, value: "https://github.com/igmoni" },
  { id: 2, name: "X", icon: X, value: "https://x.com/_igmoni" },
];

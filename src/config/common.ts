import { ScrollText } from "lucide-react";

import { Blog } from "@/svgs/essentials/Blog";
import { Home } from "@/svgs/essentials/Home";
import { Project } from "@/svgs/essentials/Project";
import { Github } from "@/svgs/socials/Github";
import { X } from "@/svgs/socials/X";

export const navItems = [
  { id: 1, name: "Home", icon: Home, value: "/" },
  { id: 2, name: "Projects", icon: Project, value: "/projects" },
  { id: 3, name: "Blog", icon: Blog, value: "/blog" },
  { id: 4, name: "Resume", icon: ScrollText, value: "/resume" },
];

export const navSocialLinks = [
  { id: 1, name: "Github", icon: Github, value: "https://github.com/igmoni" },
  { id: 2, name: "X", icon: X, value: "https://x.com/_igmoni" },
];

export const setupConfig = [
  {
    title: "Gears",
    href: "/gears",
    description: "Tools, devices, and software I use to get work done.",
  },
  {
    title: "Setup",
    href: "/gears",
    description: "VS Code / Cursor configuration and extensions guide.",
  },
];

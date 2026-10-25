import { CircleUserRound, ScrollText } from "lucide-react";

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
  { id: 5, name: "Contact", icon: CircleUserRound, value: "/contact" },
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
    href: "/setup",
    description: "VS Code / Cursor configuration and extensions guide.",
  },
];

export const personalConfig = [
  {
    title: "Books",
    href: "/books",
    description: "Books that shaped my mindset and challenged my perspective.",
  },
  {
    title: "Movies",
    href: "/movies",
    description: "Movies and shows that have inspired and entertained me.",
  },
];

export const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Work", href: "/work" },
  { name: "Designs", href: "/designs" },
  { name: "Resume", href: "/resume" },
  { name: "Gears", href: "/gears" },
  { name: "Setup", href: "/setup" },
  { name: "Contact", href: "/contact" },
  { name: "Side Quests", href: "/side-quests" },
  { name: "Books", href: "/books" },
  { name: "Movies", href: "/movies" },
  { name: "RSS Feed", href: "/blog/feed.xml" },
];

export const contactConfig = {
  title: "Contact",
  desc: "Get in touch with me. I will get back to you as soon as possible.",
  from: {
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      message: "Message",
    },
    placeholders: {
      name: "Your name",
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      message: "Tell me about your project...",
    },
    submitButton: "Send Message",
    succesMessage: "Thanks for your message! I'll get back to you soon.",
    errorMessage: "Something went wrong. Please try again",
  },
};

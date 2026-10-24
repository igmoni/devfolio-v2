import { heroConfig as item } from "./hero";

const siteUrl = (process.env.SITE_URL || "https://monxdev.vercel.app").replace(
  /\/+$/,
  ""
);

export const siteConfig = {
  name: item.name,
  title: "Devfolio",
  desc: "A developer portfolio template by @igmoni.",
  url: siteUrl,
  ogImage: "/meta/og-img.png",

  author: {
    name: item.name,
    twitter: "@_igmoni",
    github: "igmoni",
    linkedin: "igmoni",
    email: "mohansp119@gmail.com",
  },

  keywords: [
    "portfolio",
    "developer",
    "full-stack",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "web development",
    item.name.toLowerCase(),
  ],
};

type PageMeta = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  canonical?: string;
};

export const pageMetaData: Record<string, PageMeta> = {
  "/": {
    title: `${item.name} - Full Stack Developer`,
    description:
      "I build modern websites and digital products focused on design and performance.",
    ogImage: "/meta/og-img.png",
  },

  "/blog": {
    title: "Blog - Development & Tutorials",
    description:
      "Articles and tutorials on programming, engineering, and web development.",
    ogImage: "/meta/blog.png",
  },

  "/books": {
    title: "Books - Reading & Recommendations",
    description: "Books I've read and recommendations worth exploring.",
    ogImage: "/meta/books.png",
  },

  "/designs": {
    title: "Designs - Creative Work",
    description: "Explore my visual experiments, UI concepts, and design work.",
    ogImage: "/meta/designs.png",
  },

  "/gears": {
    title: "Gears - My Setup & Tools",
    description:
      "Explore the tools, devices, and software I use to build products.",
    ogImage: "/meta/gears.png",
  },

  "/movies": {
    title: "Movies - Watchlist & Reviews",
    description: "Movies I've watched, saved, and recommend.",
    ogImage: "/meta/movies.png",
  },

  "/projects": {
    title: "Projects - My Work & Case Studies",
    description: "Explore my projects, applications, and software products.",
    ogImage: "/meta/project.png",
  },

  "/resume": {
    title: "Resume - Experience & Skills",
    description:
      "Explore my development experience, technical skills, and projects.",
    ogImage: "/meta/resume.png",
  },

  "/setup": {
    title: "Setup - My Workspace",
    description: "A look at my workspace, development environment, and setup.",
    ogImage: "/meta/setup.png",
  },

  "/work": {
    title: "Work - Experience & Collaborations",
    description:
      "Explore my professional experience, collaborations, and work.",
    ogImage: "/meta/work.png",
  },

  "/contact": {
    title: "Contact - Get in Touch",
    description:
      "Get in touch for freelance projects, collaborations, and opportunities.",
    ogImage: "/meta/contact.png",
  },
};

export function getPageMetaData(pathName: string): PageMeta {
  return pageMetaData[pathName] ?? pageMetaData["/"];
}

export function generateMetaData(pathName: string) {
  const pageMeta = getPageMetaData(pathName);

  const canonicalPath = pathName.startsWith("/") ? pathName : `/${pathName}`;

  const canonicalUrl = pageMeta.canonical ?? `${siteUrl}${canonicalPath}`;

  const ogImage = pageMeta.ogImage || siteConfig.ogImage;

  return {
    metadataBase: new URL(siteUrl),

    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords ?? siteConfig.keywords,

    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,

    openGraph: {
      type: "website" as const,
      url: canonicalUrl,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },

    twitter: {
      card: pageMeta.twitterCard ?? "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },
  };
}

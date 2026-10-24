import { cacheLife } from "next/cache";

import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";
import "server-only";

import type { Blog } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "src/data/blog");

export async function getBlogs(): Promise<Blog[]> {
  "use cache";

  cacheLife("hours");

  const files = await fs.readdir(BLOG_DIR);

  const blogs = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const source = await fs.readFile(path.join(BLOG_DIR, file), "utf8");

        const { data } = matter(source);

        return {
          slug: file.replace(/\.mdx$/, ""),
          title: data.title,
          desc: data.desc,
          image: data.image,
          tags: Array.isArray(data.tags) ? data.tags : [],
          date: data.date,
          isPublished: data.isPublished === true,
        } satisfies Blog;
      })
  );

  return blogs
    .filter((blog) => blog.isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogBySlug(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return null;
  }

  try {
    const source = await fs.readFile(
      path.join(BLOG_DIR, `${slug}.mdx`),
      "utf8"
    );

    const { data, content } = matter(source);

    if (data.isPublished !== true) return null;

    const blog: Blog = {
      slug,
      title: data.title,
      desc: data.desc,
      image: data.image,
      tags: Array.isArray(data.tags) ? data.tags : [],
      date: data.date,
      isPublished: true,
    };

    return { blog, content };
  } catch {
    return null;
  }
}

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import type { Blog } from "@/types/blog";

type Props = {
  currentSlug: string;
  currentTags: string[];
  blogs: Blog[];
};

export function RelatedBlogs({ currentSlug, currentTags, blogs }: Props) {
  const related = blogs
    .filter((blog) => blog.slug !== currentSlug)
    .map((blog) => ({
      blog,
      score: blog.tags.filter((tag) =>
        currentTags.some(
          (currentTag) => currentTag.toLowerCase() === tag.toLowerCase()
        )
      ).length,
    }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.blog.date).getTime() - new Date(a.blog.date).getTime()
    )
    .slice(0, 2)
    .map((item) => item.blog);

  if (!related.length) return null;

  return (
    <section className="mt-16 border-t pt-10">
      <div className="mb-6">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Keep reading
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Related articles
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {related.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group hover:bg-muted/30 rounded-xl border p-4 transition-colors"
          >
            <div className="bg-muted relative mb-4 aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex items-start justify-between gap-3">
              <h3 className="leading-6 font-medium">{blog.title}</h3>
              <ArrowUpRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
              {blog.desc}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-muted-foreground rounded-md border px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

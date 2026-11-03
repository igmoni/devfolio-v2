"use client";

import { useMemo, useRef, useState } from "react";

import Image from "next/image";

import type { Blog } from "@/types/blog";

import { Reveal } from "../common/Reveal";
import { BlogCard } from "./BlogCard";

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const tags = blogs.flatMap((blog) => blog.tags);

    return [...new Set(tags)].sort((a, b) => a.localeCompare(b));
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "all") return blogs;

    return blogs.filter((blog) =>
      blog.tags.some(
        (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
      )
    );
  }, [blogs, selectedCategory]);

  // Move the tooltip with the cursor without re-rendering
  const moveTooltip = (x: number, y: number) => {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.transform = `translate3d(${x + 24}px, ${y + 24}px, 0)`;
  };

  return (
    <div>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          aria-pressed={selectedCategory === "all"}
          className={`rounded-full border px-2 py-1 text-sm transition-colors ${
            selectedCategory === "all"
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full border px-2 py-1 text-sm capitalize transition-colors ${
              selectedCategory === category
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtered blog posts */}
      {filteredBlogs.length > 0 ? (
        <div
          className="flex flex-col gap-10 md:gap-8"
          onMouseMove={(e) => moveTooltip(e.clientX, e.clientY)}
        >
          {filteredBlogs.map((blog, index) => (
            <div key={blog.title}>
              <Reveal delay={index * 0.08}>
                <BlogCard
                  blog={blog}
                  dimmed={hoveredSlug !== null && hoveredSlug !== blog.slug}
                  onHoverStart={(e) => {
                    if (e) moveTooltip(e.clientX, e.clientY);
                    setHoveredSlug(blog.slug);
                  }}
                  onHoverEnd={() => setHoveredSlug(null)}
                />
              </Reveal>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-12 text-center text-sm">
          No blogs found in this category.
        </p>
      )}

      {/* Cursor-following image tooltip (desktop only) */}
      <div
        ref={tooltipRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
      >
        <div
          className={`relative h-44 w-72 overflow-hidden rounded-xl border bg-neutral-100 shadow-2xl transition-all duration-200 ${
            hoveredSlug ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {filteredBlogs.map((blog) => (
            <Image
              key={blog.slug}
              src={blog.image}
              alt=""
              fill
              sizes="288px"
              className={`object-cover transition-opacity duration-200 ${
                hoveredSlug === blog.slug ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { BlogList };

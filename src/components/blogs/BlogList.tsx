"use client";

import { useMemo, useRef, useState } from "react";

import Image from "next/image";

import type { Blog } from "@/types/blog";

import { Reveal } from "../common/Reveal";
import { BlogCard } from "./BlogCard";

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const tooltipRef = useRef<HTMLDivElement>(null);

  // Get categories and sort by blog count
  const rankedCategories = useMemo(() => {
    const categoryCounts = new Map<string, number>();

    blogs.forEach((blog) => {
      blog.tags.forEach((tag) => {
        categoryCounts.set(tag, (categoryCounts.get(tag) ?? 0) + 1);
      });
    });

    return [...categoryCounts.entries()]
      .sort(([a, countA], [b, countB]) => {
        return countB - countA || a.localeCompare(b);
      })
      .map(([category]) => category);
  }, [blogs]);

  const visibleCategories = showAllCategories
    ? rankedCategories
    : rankedCategories.slice(0, 5);

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
      {/* Category filters */}
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          aria-pressed={selectedCategory === "all"}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            selectedCategory === "all"
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:text-foreground bg-neutral-100 dark:bg-neutral-900"
          }`}
        >
          All
          <span className="ml-1.5 opacity-60">{blogs.length}</span>
        </button>

        {visibleCategories.map((category) => {
          const count = blogs.filter((blog) =>
            blog.tags.some(
              (tag) => tag.toLowerCase() === category.toLowerCase()
            )
          ).length;

          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={isSelected}
              className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground bg-neutral-100 dark:bg-neutral-900"
              }`}
            >
              {category}
              <span className="ml-1.5 opacity-60">{count}</span>
            </button>
          );
        })}

        {rankedCategories.length > 5 && (
          <button
            type="button"
            onClick={() => setShowAllCategories((prev) => !prev)}
            aria-expanded={showAllCategories}
            className="border-border text-muted-foreground hover:text-foreground rounded-full border bg-neutral-100 px-3 py-1.5 text-sm transition-colors dark:bg-neutral-900"
          >
            {showAllCategories ? "Hide" : "Show all"}
          </button>
        )}
      </div>

      {/* Filtered blog posts */}
      {filteredBlogs.length > 0 ? (
        <div
          className="flex flex-col gap-10 md:gap-8"
          onMouseMove={(e) => moveTooltip(e.clientX, e.clientY)}
        >
          {filteredBlogs.map((blog, index) => (
            <div key={blog.slug}>
              <Reveal delay={index * 0.08}>
                <BlogCard
                  blog={blog}
                  isBlog
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

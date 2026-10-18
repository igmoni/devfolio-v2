"use client";

import { useMemo, useState } from "react";

import type { Blog } from "@/types/blog";

import { Reveal } from "../common/Reveal";
import { BlogCard } from "./BlogCard";

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

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
        <div className="flex flex-col gap-10 md:gap-8">
          {filteredBlogs.map((blog, index) => (
            <Reveal key={blog.slug} delay={index * 0.08}>
              <BlogCard blog={blog} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-12 text-center text-sm">
          No blogs found in this category.
        </p>
      )}
    </div>
  );
};

export { BlogList };

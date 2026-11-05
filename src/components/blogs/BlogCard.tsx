"use client";

import Link from "next/link";

import { ArrowRight, CalendarDays } from "lucide-react";

import type { Blog } from "@/types/blog";

import { Heading } from "../common/Heading";
import { SubHeading } from "../common/SubHeading";

type BlogCardProps = {
  blog: Blog;
  dimmed?: boolean;
  isBlog: boolean;
  onHoverStart?: (e?: React.MouseEvent) => void;
  onHoverEnd?: () => void;
};

const BlogCard = ({
  blog,
  dimmed,
  isBlog = false,
  onHoverStart,
  onHoverEnd,
}: BlogCardProps) => {
  const { slug, title, desc, date, tags } = blog;

  const formattedDate = new Date(`${date}T00:00:00Z`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <Link
      href={`/blog/${slug}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart?.()}
      onBlur={onHoverEnd}
      className={`group flex flex-col gap-4 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between sm:gap-8 ${
        dimmed ? "opacity-40 blur-[2px]" : "blur-0 opacity-100"
      }`}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <Heading
          as="h3"
          className="text-lg transition-colors group-hover:text-neutral-500"
        >
          {title}
        </Heading>

        <SubHeading className="line-clamp-1 max-w-xl text-xs sm:text-sm">
          {desc}
        </SubHeading>

        <p className="flex items-center gap-1.5 text-xs text-neutral-500 sm:text-sm">
          <CalendarDays className="size-3.5 shrink-0 sm:size-4" />
          <time dateTime={date}>{formattedDate}</time>
        </p>
        {isBlog && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-muted-foreground rounded-md border px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="group-hover:text-foreground flex shrink-0 items-center gap-1 text-xs text-neutral-500 transition-colors sm:text-sm">
        <span className="whitespace-nowrap">Read More</span>
        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 sm:size-4" />
      </div>
    </Link>
  );
};

export { BlogCard };

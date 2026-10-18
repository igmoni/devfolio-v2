import Image from "next/image";
import Link from "next/link";

import { ArrowRight, CalendarDays } from "lucide-react";

import type { Blog } from "@/types/blog";

import { Heading } from "../common/Heading";
import { SubHeading } from "../common/SubHeading";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { slug, title, desc, date, image, tags } = blog;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:gap-5"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl md:w-40">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, 160px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <Heading
            as="h3"
            className="text-xl transition-colors group-hover:text-neutral-500"
          >
            {title}
          </Heading>

          <SubHeading className="max-w-xl text-xs sm:text-sm">
            {desc}
          </SubHeading>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500 sm:text-sm">
            <CalendarDays className="size-3.5 shrink-0 sm:size-4" />
            <span>
              {new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </span>
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-muted-foreground rounded-md border px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="group-hover:text-foreground flex shrink-0 items-center gap-1 text-xs text-neutral-500 transition-colors sm:text-sm">
          <span className="whitespace-nowrap">Read More</span>
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 sm:size-4" />
        </div>
      </div>
    </Link>
  );
};

export { BlogCard };

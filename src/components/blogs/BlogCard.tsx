import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Calendar,
  Calendar1,
  Calendar1Icon,
  CalendarDays,
} from "lucide-react";

import { Blog } from "@/types/blog";

import { Heading } from "../common/Heading";
import { SubHeading } from "../common/SubHeading";

//
const BlogCard = ({ blog }: { blog: Blog }) => {
  const { name, description, href, date } = blog;

  return (
    <Link href={href} className="group flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative aspect-video h-[100px]">
          <Image
            src={"/blog/github.png"}
            alt={"Github"}
            fill
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-1 pb-8">
          <Heading as="h3" className="group-hover:text-neutral-500">
            {name}
          </Heading>
          <SubHeading className={"max-w-xl text-sm"}>{description}</SubHeading>
          <p className="flex items-center gap-2 text-sm text-neutral-500">
            <CalendarDays className="size-4" /> <span> {date}</span>
          </p>
        </div>
      </div>
      <p className="flex gap-1 text-neutral-500 transition-all duration-200">
        Read More <ArrowRight />
      </p>
    </Link>
  );
};

export { BlogCard };

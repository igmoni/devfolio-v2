import Link from "next/link";

import { getBlogs } from "@/lib/blog";
import { Blog as BlogSvg } from "@/svgs/essentials/Blog";

import { BlogCard } from "../blogs/BlogCard";
import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";
import { Button } from "../ui/button";

const Blog = async () => {
  const blogs = await getBlogs();

  return (
    <Reveal delay={0.2}>
      <Container>
        <Heading Icon={<BlogSvg className={"size-6"} />} as="h2">
          Blog
        </Heading>
        <div className="flex flex-col gap-10 md:gap-0">
          {blogs.slice(0, 3).map((item, id) => (
            <Reveal delay={0.08} key={id}>
              <BlogCard blog={item} />
            </Reveal>
          ))}
        </div>
        {blogs.length > 3 && (
          <div className="flex justify-center">
            <Link href={"/blog"}>
              <Button variant={"outline"} className={"my-5 w-fit"}>
                Show all blogs
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </Reveal>
  );
};

export { Blog };

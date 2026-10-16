import { Blog as Blogs } from "@/svgs/essentials/Blog";

import { BlogCard } from "../blogs/BlogCard";
import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Button } from "../ui/button";

const Blog = () => {
  const blogs = [1, 2, 3, 4];
  return (
    <Container>
      <Heading Icon={<Blogs className={"size-6"} />} as="h2">
        Blog
      </Heading>
      <BlogCard
        blog={{
          name: "Git",
          description: "Git COmmands",
          date: "June 26, 2026",
          href: "/blog/",
        }}
      />

      {blogs.length > 3 && (
        <div className="flex justify-center">
          <Button variant={"outline"} className={"my-5 w-fit"}>
            Show all blogs
          </Button>
        </div>
      )}
    </Container>
  );
};

export { Blog };

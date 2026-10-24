import { BlogList } from "@/components/blogs/BlogList";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { getBlogs } from "@/lib/blog";
import { Blog as BlogSvg } from "@/svgs/essentials/Blog";

export const metadata = {
  title: "Blog - Thoughts & Tutorials",
  description:
    "Thoughts, tutorials, and insights on engineering and programming.",
};

const Page = async () => {
  const blogs = await getBlogs();

  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Blog</Heading>

        <SubHeading>
          Thoughts, tutorials, and insights on engineering and programming.
        </SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      <BlogList blogs={blogs} />
    </Container>
  );
};

export default Page;

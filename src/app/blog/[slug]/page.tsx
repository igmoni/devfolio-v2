import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, CalendarDays } from "lucide-react";
import rehypeSlug from "rehype-slug";

import { BlogTableOfContents } from "@/components/blogs/BlogTableOfContents";
import { RelatedBlogs } from "@/components/blogs/RelatedBlogs";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { getBlogBySlug, getBlogs } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result) return { title: "Blog not found" };

  return {
    title: result.blog.title,
    description: result.blog.desc,
    openGraph: {
      title: result.blog.title,
      description: result.blog.desc,
      images: [result.blog.image],
      type: "article",
      publishedTime: result.blog.date,
      tags: result.blog.tags,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result) notFound();

  const { blog, content } = result;
  const allBlogs = await getBlogs();

  const formattedDate = new Date(`${blog.date}T00:00:00Z`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <>
      <Container className="mt-5">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
            All blogs
          </Link>

          <header className="mt-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-muted-foreground rounded-full border px-3 py-1 text-xs capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Heading
              as="h1"
              className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {blog.title}
            </Heading>

            <SubHeading className="mt-5 max-w-2xl text-base leading-7">
              {blog.desc}
            </SubHeading>

            <div className="text-muted-foreground mt-6 flex items-center gap-2 text-sm">
              <CalendarDays className="size-4" />
              <time dateTime={blog.date}>{formattedDate}</time>
            </div>
          </header>

          <div className="bg-muted relative mt-9 aspect-[16/9] overflow-hidden rounded-2xl border">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          <Separator className="my-10" />

          <article id="blog-content" className="project-content">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </article>

          <RelatedBlogs
            currentSlug={blog.slug}
            currentTags={blog.tags}
            blogs={allBlogs}
          />
        </div>
      </Container>

      <BlogTableOfContents />
    </>
  );
}

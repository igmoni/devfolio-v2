import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, CalendarDays } from "lucide-react";

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

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
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

  return (
    <Container className="mt-5">
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        All blogs
      </Link>

      <header className="mt-8">
        <Heading as="h1">{blog.title}</Heading>

        <SubHeading className="mt-3 max-w-2xl">{blog.desc}</SubHeading>

        <p className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
          <CalendarDays className="size-4" />
          {new Date(`${blog.date}T00:00:00`).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-muted-foreground rounded-md border px-2 py-1 text-xs capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      <Separator className="my-10" />

      <article className="project-content">
        <MDXRemote source={content} />
      </article>
    </Container>
  );
}

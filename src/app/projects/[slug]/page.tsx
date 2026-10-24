import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Separator } from "@/components/ui/separator";
import {
  getProjectBySlug,
  getProjects,
  getRelatedProjects,
} from "@/lib/projects";
import { generateContentMetadata } from "@/lib/seo";
import { ArrowUpRight } from "@/svgs/essentials/ArrowUpRight";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result) {
    return {
      title: "Project Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { project } = result;

  return generateContentMetadata({
    title: project.title,
    description: project.description,
    image: project.image,
    path: `/projects/${slug}`,
    type: "website",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result) {
    notFound();
  }

  const { project, content } = result;

  const relatedProjects = await getRelatedProjects(slug, project.stack, 2);

  return (
    <Container className="mt-5">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        ← All projects
      </Link>

      <header className="mt-8">
        <p className="text-muted-foreground text-sm">
          {project.timeline} · {project.role} · {project.team}
        </p>

        <Heading
          as="h1"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          {project.title}
        </Heading>

        <p className="text-muted-foreground mt-4 max-w-2xl">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="rounded-md border px-2.5 py-1 text-xs"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Live website ↗
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Source code ↗
            </a>
          )}
        </div>
      </header>

      <div className="bg-muted relative mt-8 aspect-video overflow-hidden rounded-xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      <Separator className="my-10" />

      <article className="project-content">
        <MDXRemote source={content} />
      </article>

      {relatedProjects.length > 0 && (
        <section className="mt-16 border-t pt-8">
          <Heading as="h2" className="mb-5">
            Related Projects
          </Heading>

          <div className="grid gap-3 sm:grid-cols-2">
            {relatedProjects.map((related) => (
              <Link
                key={related.slug}
                href={`/projects/${related.slug}`}
                className="group hover:bg-muted/50 rounded-xl border p-4 transition-colors"
              >
                <h3 className="group-hover:text-muted-foreground flex items-center gap-2 font-medium transition-colors">
                  {related.shortTitle}
                  <span>
                    <ArrowUpRight />
                  </span>
                </h3>

                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
                  {related.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { books } from "@/lib/personal";
import { generateContentMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Books - My Reading List",
    description:
      "Explore books that have influenced my thinking, learning, and growth.",
    image: "/meta/books.png",
    path: "/books",
    type: "website",
  });
}

export default function Page() {
  const categories = [...new Set(books.map((book) => book.category))];

  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Books</Heading>

        <SubHeading>
          A collection of books that have influenced my thinking and growth.
        </SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-10">
          {categories.map((category, id) => {
            const categoryBooks = books.filter(
              (book) => book.category === category
            );

            return (
              <Reveal delay={id * 0.08} key={category}>
                <section>
                  <Heading as="h2">{category}</Heading>

                  <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {categoryBooks.map((book) => (
                      <article key={book.name} className="group">
                        <div className="bg-muted relative aspect-[2/3] overflow-hidden rounded-lg">
                          <Image
                            src={book.imageUrl}
                            alt={book.name}
                            fill
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <h3 className="mt-3 text-sm leading-snug font-medium">
                          {book.name}
                        </h3>
                      </article>
                    ))}
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </Container>
  );
}

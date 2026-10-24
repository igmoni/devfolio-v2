import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { movies } from "@/lib/personal";
import { generateContentMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Movies - My Favorites",
    description: "Movies and shows that have inspired and entertained me.",
    image: "/meta/movies.png",
    path: "/movies",
    type: "website",
  });
}

export default function Page() {
  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Movies</Heading>

        <SubHeading>
          Movies and shows that have inspired and entertained me.
        </SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      <div className="my-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {movies.map((item, id) => (
          <Reveal delay={id * 0.08} key={item.title}>
            <div className="rounded-xl bg-neutral-100 p-3 px-5 ring ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700">
              <h3 className="font-semibold">{item.title}</h3>
              <SubHeading className="mt-1">{item.year}</SubHeading>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

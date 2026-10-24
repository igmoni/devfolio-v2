import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { instrumentSerif } from "@/config/font";
import { generateContentMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Designs - UI/UX & Creative Experiments",
    description:
      "Explore UI/UX designs, interface concepts, and creative design experiments. Coming soon.",
    image: "/meta/designs.png",
    path: "/designs",
    type: "website",
  });
}

export default function Page() {
  return (
    <Container className="mt-5">
      <Reveal>
        <Heading as="h1">Designs</Heading>

        <SubHeading>
          UI/UX designs, interface explorations, and creative experiments.
        </SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      <Reveal delay={0.15}>
        <div className="relative flex min-h-[30vh] items-center justify-center overflow-hidden rounded-2xl">
          <p
            className={`${instrumentSerif.className} animate-coming-soon-color relative z-10 text-center text-6xl italic sm:text-8xl`}
          >
            Coming soon...
          </p>
        </div>
      </Reveal>
    </Container>
  );
}

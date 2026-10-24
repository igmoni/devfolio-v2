import type { Metadata } from "next";

import { ContactForm } from "@/components/common/ContactForm";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { generateContentMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Contact - Let's Work Together",
    description:
      "Have a project in mind, an idea to share, or an opportunity to discuss? Get in touch with me.",
    image: "/meta/contact.png",
    path: "/contact",
    type: "website",
  });
}

export default function Page() {
  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Contact</Heading>
        <SubHeading>Have something in mind? Let&apos;s talk.</SubHeading>
        <Separator className="my-5 mt-10" />
      </Reveal>

      <Reveal delay={0.1}>
        <ContactForm />
      </Reveal>
    </Container>
  );
}

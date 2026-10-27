import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { generateContentMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Resume - Professional Experience",
    description:
      "View my professional resume, technical skills, projects, and experience.",
    image: "/meta/resume.png",
    path: "/resume",
    type: "website",
  });
}

export default function ResumePage() {
  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Resume</Heading>
        <SubHeading>View and download my professional resume.</SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="border-border bg-muted/30 my-6 overflow-hidden rounded-lg border"
          style={{ animationDelay: "0.1s" }}
        >
          <iframe
            src="https://drive.google.com/file/d/1JqOOx2syhfXUrfrmYrfOu1rQacNxZRtP/preview"
            title="Resume"
            className="h-100 w-full md:min-h-200"
            allow="autoplay"
          />
        </div>
      </Reveal>
    </Container>
  );
}

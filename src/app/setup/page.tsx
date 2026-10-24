import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { EditorHero } from "@/components/setup/EditorHero";
import { SetupGuide } from "@/components/setup/SetupGuide";
import { Separator } from "@/components/ui/separator";
import { generateContentMetadata } from "@/lib/seo";
import { setupSections } from "@/lib/setup";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Setup Guide - VS Code Configuration",
    description:
      "Explore my development environment, editor configuration, tools, and setup guide.",
    image: "/meta/setup.png",
    path: "/setup",
    type: "website",
  });
}

export default function Page() {
  return (
    <Container className="mt-5">
      <Reveal>
        <EditorHero />
        <Separator className="my-5 mt-10" />
      </Reveal>

      <Reveal delay={0.1}>
        <SetupGuide sections={setupSections} />
      </Reveal>
    </Container>
  );
}

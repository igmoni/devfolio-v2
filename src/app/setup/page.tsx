import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { EditorHero } from "@/components/setup/EditorHero";
import { SetupGuide } from "@/components/setup/SetupGuide";
import { Separator } from "@/components/ui/separator";
import { setupSections } from "@/lib/setup";

export default function page() {
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

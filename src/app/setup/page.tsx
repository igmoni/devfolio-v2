import { Container } from "@/components/common/Container";
import { EditorHero } from "@/components/setup/EditorHero";
import { SetupGuide } from "@/components/setup/SetupGuide";
import { Separator } from "@/components/ui/separator";
import { setupSections } from "@/lib/setup";

export default function page() {
  return (
    <Container className="mt-5">
      <EditorHero />
      <Separator className="my-5 mt-10" />
      <SetupGuide sections={setupSections} />
    </Container>
  );
}

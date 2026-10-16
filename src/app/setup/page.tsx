import { Container } from "@/components/common/Container";
import { EditorHero } from "@/components/setup/EditorHero";
import { SettingsJson } from "@/components/setup/SettingsJson";
import { SetupGuide } from "@/components/setup/SetupGuide";
import { editorSettings, setupSections } from "@/lib/setup";

export default function SetupPage() {
  return (
    <Container className="min-h-screen py-16 text-neutral-900 sm:py-24 dark:text-neutral-100">
      <EditorHero />
      <SetupGuide sections={setupSections} />
    </Container>
  );
}

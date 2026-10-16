import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { SubHeading } from "@/components/common/SubHeading";

export default function ResumePage() {
  return (
    <Container>
      <Heading as="h1">Resume</Heading>
      <SubHeading>View and download my professional resume.</SubHeading>

      <div className="mt-10 h-px w-full bg-neutral-200 dark:bg-neutral-800" />
      <div
        className="animate-in-up border-border bg-muted/30 my-6 overflow-hidden rounded-lg border"
        style={{ animationDelay: "0.1s" }}
      >
        <iframe
          src="https://drive.google.com/file/d/1JqOOx2syhfXUrfrmYrfOu1rQacNxZRtP/preview"
          title="Resume"
          className="h-[80vh] min-h-125 w-full"
          allow="autoplay"
        />
      </div>
    </Container>
  );
}

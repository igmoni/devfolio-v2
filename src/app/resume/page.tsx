import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";

export default function ResumePage() {
  return (
    <Container className="mt-5">
      <Heading as="h1">Resume</Heading>
      <SubHeading>View and download my professional resume.</SubHeading>

      <Separator className="my-5 mt-10" />
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

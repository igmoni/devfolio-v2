"use client";

import dynamic from "next/dynamic";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { SubHeading } from "@/components/common/SubHeading";

// Disable SSR because react-pdf relies on browser APIs.
const ResumeViewer = dynamic(() => import("@/components/common/ResumeViewer"), {
  ssr: false,
  loading: () => (
    <div className="mt-6 flex h-[700px] items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900">
      <p className="text-sm text-neutral-400">Loading resume...</p>
    </div>
  ),
});

export default function ResumePage() {
  return (
    <Container>
      {/* Page heading and description */}
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

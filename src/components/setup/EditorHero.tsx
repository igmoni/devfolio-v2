import { Code2 } from "lucide-react";
import { Heading } from "@/components/common/Heading";

export function EditorHero() {
  return (
    <header className="mb-12">
      <div className="mb-5 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
        <Code2 size={15} />
        <span>My workspace / Setup</span>
      </div>

      <Heading
        as="h1"
        className="text-4xl font-medium tracking-tight sm:text-6xl"
      >
        An editor configured
        <br />
        <span className="text-neutral-400">the way I like it.</span>
      </Heading>

      <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
        Complete guide to setting up VS Code / Cursor with my settings.
      </p>

      <div className="mt-10 h-px w-full bg-neutral-200 dark:bg-neutral-800" />
    </header>
  );
}

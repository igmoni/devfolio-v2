"use client";

import {
  CheckCircle2,
  CircleCheck,
  Download,
  FileText,
  Settings2,
} from "lucide-react";

import { editorSettings } from "@/lib/setup";
import type { SetupSection as SetupSectionType } from "@/types/setup";

import { SettingsJson } from "./SettingsJson";

const sectionIcons = {
  download: Download,
  extensions: FileText,
  settings: Settings2,
  check: CircleCheck,
};

export function SetupGuide({ sections }: { sections: SetupSectionType[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section) => {
        const Icon = sectionIcons[section.icon];

        return (
          <section key={section.id}>
            <div className="mb-5 flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
                <Icon size={19} />
              </span>

              <h2 className="flex-1 text-xl font-semibold tracking-tight sm:text-2xl">
                {section.title}
              </h2>
            </div>

            <div className="ml-0 space-y-5 sm:ml-[60px]">
              {section.steps.map((step) => (
                <div key={step.id} className="flex items-start gap-4 sm:gap-7">
                  <span className="mt-0.5 inline-flex min-w-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-1.5 font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
                    {step.id}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-6 text-neutral-500 sm:text-base">
                      {step.description}
                    </p>

                    {step.link && (
                      <a
                        href={step.link.href}
                        download={step.link.download}
                        className="mt-3 inline-flex min-h-16 min-w-56 items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
                      >
                        <Download
                          size={17}
                          className="shrink-0 text-neutral-500"
                        />

                        <span className="min-w-0">
                          <span className="block text-sm font-semibold break-all text-neutral-800 dark:text-neutral-100">
                            {step.link.label}
                          </span>

                          <span className="mt-1 block text-xs text-neutral-500">
                            {step.title}
                          </span>
                        </span>
                      </a>
                    )}

                    {step.code && (
                      <div className="mt-3 inline-flex max-w-full items-center rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
                        <code className="overflow-x-auto font-mono text-sm whitespace-nowrap text-neutral-600 dark:text-neutral-300">
                          {step.code}
                        </code>
                      </div>
                    )}

                    {step.settings && (
                      <div className="relative right-15 mt-6 w-full">
                        <SettingsJson settings={editorSettings} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/60">
        <CheckCircle2 size={20} className="shrink-0" />
        <p>Done! Your editor is now configured.</p>
      </div>
    </div>
  );
}

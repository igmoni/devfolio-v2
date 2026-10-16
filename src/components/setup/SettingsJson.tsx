"use client";

import { useState } from "react";

import { Check, ChevronDown, Clipboard, SlidersHorizontal } from "lucide-react";

import { geistMono } from "@/config/font";
import type { EditorSettings } from "@/types/setup";

import { Container } from "../common/Container";

export function SettingsJson({ settings }: { settings: EditorSettings }) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(settings, null, 2);

  async function copySettings() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mt-16 w-full">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
          <SlidersHorizontal size={18} />
        </span>

        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          settings.json
        </h2>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm transition hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        >
          {isOpen ? "Hide" : "Show"}
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
            <span className="text-sm font-semibold">settings.json</span>

            <button
              type="button"
              onClick={copySettings}
              className="inline-flex items-center gap-2 text-xs text-neutral-500 transition hover:text-neutral-900 dark:hover:text-white"
            >
              {copied ? <Check size={14} /> : <Clipboard size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <pre
            className={`${geistMono.className} bg-neutral-50 p-4 text-xs leading-6 text-neutral-600 sm:p-5 sm:text-[13px] dark:bg-[#111111] dark:text-neutral-300`}
          >
            <code>{json}</code>
          </pre>
        </div>
      )}
    </section>
  );
}

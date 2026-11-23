"use client";

import { useState } from "react";

import { ArrowRight } from "lucide-react";

import { sponsorConfig } from "@/config/sponsor";

import { SponsorModal } from "./SponsorModal";

export function TakeSeatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-foreground text-background inline-flex h-9 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium transition hover:opacity-90"
      >
        Take a seat, {sponsorConfig.price}
        <ArrowRight className="size-4" />
      </button>

      <SponsorModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

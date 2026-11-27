"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "cn";
import { Coffee, MessageCircle, Plus } from "lucide-react";

import { sponsorConfig } from "@/config/sponsor";
import { Sponsor } from "@/lib/sponsors/sponsors";
import { Github as GithubSvg } from "@/svgs/technologies/Github";

import { SponsorModal } from "./SponsorModal";

const MIN_SLOTS = 4;
const TILTS = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];

const hostOf = (link: string) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "Sponsor";
  }
};

function HoverTip({
  children,
  label,
  sub,
  accent = false,
}: {
  children: React.ReactNode;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <span className="group/tip relative inline-flex">
      {children}

      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute top-full left-1/2 z-20 mt-3 -translate-x-1/2 translate-y-1 rounded-xl px-3 py-1.5 text-xs whitespace-nowrap opacity-0 shadow-lg transition duration-200",
          "group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100 group-hover/tip:translate-y-0 group-hover/tip:opacity-100",
          accent
            ? "bg-[#4b9bff] text-blue-950"
            : "bg-foreground text-background"
        )}
      >
        <span className="block font-medium">{label}</span>
        {sub && <span className="block opacity-60">{sub}</span>}
      </span>
    </span>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function AddButton({ index, onClick }: { index: number; onClick: () => void }) {
  return (
    <HoverTip
      accent
      label="Become a sponsor"
      sub={`${sponsorConfig.price} · monthly`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label="Become a sponsor"
        className={cn(
          "border-border bg-muted text-foreground flex size-14 cursor-pointer items-center justify-center rounded-2xl border shadow-sm transition duration-200 hover:scale-110 hover:-rotate-6",
          TILTS[index % TILTS.length]
        )}
      >
        <Plus className="size-5" />
      </button>
    </HoverTip>
  );
}

export function SponsorsGrid({ sponsors }: { sponsors: Sponsor[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const addSlots = Math.max(MIN_SLOTS - sponsors.length, 1);

  return (
    <div id="sponsors" className="space-y-6 py-8">
      <p className="text-muted-foreground text-sm">
        The people backing what I build. Already sponsored?{" "}
        <Link
          href={"/sponsor/claim"}
          className="text-foreground underline-offset-2 hover:underline"
        >
          Claim here
        </Link>
      </p>

      <div className="flex flex-wrap items-center gap-4">
        {/* Existing sponsors */}
        {sponsors.map((sponsor, i) => {
          const avatar = (
            <Image
              src={sponsor.imageUrl}
              alt={sponsor.name}
              width={56}
              height={56}
              className={cn(
                "size-14 rounded-2xl object-cover shadow-sm transition duration-200 hover:scale-105 hover:rotate-0",
                TILTS[i % TILTS.length]
              )}
            />
          );

          return (
            <HoverTip
              key={i}
              label={sponsor.name}
              sub={sponsor.link ? hostOf(sponsor.link) : "Sponsor"}
            >
              {sponsor.link ? (
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex"
                >
                  {avatar}
                </a>
              ) : (
                avatar
              )}
            </HoverTip>
          );
        })}

        {/* Empty slots (start at 4, shrink as sponsors join) */}
        {Array.from({ length: addSlots }, (_, i) => (
          <AddButton
            key={`add-${i}`}
            index={sponsors.length + i}
            onClick={() => setModalOpen(true)}
          />
        ))}

        {/* GitHub Sponsors */}
        <HoverTip label="Sponsor on GitHub">
          <a
            href={sponsorConfig.githubSponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sponsor on GitHub"
            className="border-border relative flex size-14 rotate-3 items-center justify-center rounded-2xl border bg-neutral-100 text-zinc-900 shadow-sm transition duration-200 hover:scale-110 hover:-rotate-3 dark:bg-zinc-800 dark:text-white"
          >
            <GithubSvg className="text-foreground size-6" />
            <span className="bg-foreground text-background absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full">
              <Plus className="size-3" strokeWidth={3} />
            </span>
          </a>
        </HoverTip>

        {/* Coffee */}
        <HoverTip label="Buy me a coffee">
          <a
            href={sponsorConfig.coffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy me a coffee"
            className="relative flex size-14 -rotate-2 items-center justify-center rounded-2xl border border-amber-400 bg-amber-200 text-amber-900 shadow-sm transition duration-200 hover:scale-110 hover:rotate-3"
          >
            <Coffee className="size-6" strokeWidth={1.75} />
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-orange-500 text-white">
              <Plus className="size-3" strokeWidth={3} />
            </span>
          </a>
        </HoverTip>

        {/* X chat */}
        <HoverTip label="Chat on X">
          <a
            href={sponsorConfig.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on X"
            className="border-border relative flex size-14 rotate-2 items-center justify-center rounded-2xl border bg-zinc-900 text-white shadow-sm transition duration-200 hover:scale-110 hover:-rotate-3 dark:bg-zinc-800"
          >
            <XLogo className="size-5" />
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900">
              <MessageCircle className="size-3" strokeWidth={2.5} />
            </span>
          </a>
        </HoverTip>
      </div>

      <p className="text-muted-foreground text-xs">
        Cancel anytime. Your name and logo will be featured on this site for as
        long as your sponsorship is active.
      </p>

      <SponsorModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

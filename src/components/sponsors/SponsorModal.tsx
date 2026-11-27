"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { ImagePlus, Loader2, X } from "lucide-react";

import { sponsorConfig } from "@/config/sponsor";

const TYPES = ["image/png", "image/jpeg", "image/webp"];

const inputClass =
  "border-border bg-background/60 focus-visible:ring-foreground/10 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2";

export function SponsorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<"pay" | "skip" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!TYPES.includes(selected.type)) {
      setError("Use a PNG, JPG or WebP image");
      event.target.value = "";
      return;
    }
    if (selected.size > sponsorConfig.maxLogoBytes) {
      setError(`Image must be under ${sponsorConfig.maxLogoBytes / 1024} KB`);
      event.target.value = "";
      return;
    }

    setError(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function checkout(mode: "pay" | "skip") {
    try {
      setLoading(mode);
      setError(null);

      const body = new FormData();
      if (mode === "pay") {
        body.append("name", name.trim());
        body.append("link", link.trim());
        if (file) body.append("logo", file);
      }

      const response = await fetch("/api/sponsor/checkout", {
        method: "POST",
        body,
      });
      const json: { url?: string; error?: string } = await response.json();

      if (!response.ok || !json.url) {
        throw new Error(json.error ?? "Unable to start checkout");
      }

      window.location.assign(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose(); // backdrop click
      }}
      className="border-border bg-background text-foreground m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl border p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          checkout("pay");
        }}
        className="space-y-5 p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Take a seat
            </h3>
            <p className="text-muted-foreground text-xs">
              {sponsorConfig.price} · monthly{" "}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground cursor-pointer transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-4">
          <label className="border-border bg-muted/40 hover:bg-muted relative flex size-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed transition">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={80}
                height={80}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              <ImagePlus className="text-muted-foreground size-6" />
            )}
            <input
              type="file"
              accept={TYPES.join(",")}
              onChange={handleFile}
              className="sr-only"
            />
          </label>

          <p className="text-muted-foreground text-xs leading-relaxed">
            Add your logo or photo. Square works best. PNG, JPG or WebP, max{" "}
            {sponsorConfig.maxLogoBytes / 1024} KB.
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="sponsor-name" className="text-xs font-medium">
            Name
          </label>
          <input
            id="sponsor-name"
            type="text"
            minLength={2}
            maxLength={40}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name or company"
            className={inputClass}
          />
        </div>

        {/* Link */}
        <div className="space-y-1.5">
          <label htmlFor="sponsor-link" className="text-xs font-medium">
            Link <span className="text-muted-foreground">(optional)</span>
          </label>
          <div className="border-border bg-background/60 focus-within:ring-foreground/10 flex h-11 items-center rounded-xl border px-4 text-sm focus-within:ring-2">
            <span className="text-muted-foreground mr-1 font-mono text-xs">
              https://
            </span>
            <input
              id="sponsor-link"
              type="text"
              inputMode="url"
              maxLength={200}
              value={link}
              onChange={(event) =>
                setLink(event.target.value.replace(/^https?:\/\//i, ""))
              }
              placeholder="your-site.dev"
              className="placeholder:text-muted-foreground h-full min-w-0 flex-1 bg-transparent outline-none"
            />
          </div>
        </div>

        {error && <p className="text-xs text-rose-500">{error}</p>}

        <div className="space-y-2">
          <button
            type="submit"
            disabled={loading !== null}
            className="bg-foreground text-background flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
          >
            {loading === "pay" && <Loader2 className="size-4 animate-spin" />}
            {loading === "pay" ? "Redirecting..." : "Continue to payment"}
          </button>

          <button
            type="button"
            onClick={() => checkout("skip")}
            disabled={loading !== null}
            className="text-muted-foreground hover:text-foreground flex h-9 w-full cursor-pointer items-center justify-center gap-2 text-xs transition disabled:opacity-60"
          >
            {loading === "skip" && <Loader2 className="size-3 animate-spin" />}
            Skip, I&apos;ll add my details after paying
          </button>
        </div>

        <p className="text-muted-foreground text-center text-[11px]">
          Your name, link and image are shown publicly on this site.
        </p>
      </form>
    </dialog>
  );
}

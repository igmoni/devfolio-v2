"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Loader2,
  Lock,
  Upload,
} from "lucide-react";

import { sponsorConfig } from "@/config/sponsor";

const TYPES = ["image/png", "image/jpeg", "image/webp"];

const inputClass =
  "bg-muted/60 mt-1 placeholder:text-muted-foreground focus-visible:ring-foreground/10 h-12 w-full rounded-full px-5 text-sm outline-none focus-visible:ring-2";

export function ClaimForm({
  initialPaymentId = "",
}: {
  initialPaymentId?: string;
}) {
  const [email, setEmail] = useState("");
  const [paymentId, setPaymentId] = useState(initialPaymentId);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Free the preview URL when it changes or the form unmounts.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!TYPES.includes(selected.type)) {
      setError("Use a PNG, JPEG or WebP image");
      event.target.value = "";
      return;
    }
    if (selected.size > sponsorConfig.maxLogoBytes) {
      setError("Logo must be under 512 KB");
      event.target.value = "";
      return;
    }

    setError(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email.trim() && !paymentId.trim()) {
      setError("Enter your checkout email or your payment ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const body = new FormData();
      body.append("email", email.trim());
      body.append("paymentId", paymentId.trim());
      body.append("name", name.trim());
      body.append("link", link.trim());
      if (file) body.append("logo", file);

      const response = await fetch("/api/sponsor/claim", {
        method: "POST",
        body,
      });
      const json: { ok?: boolean; error?: string } = await response.json();

      if (!response.ok || !json.ok) {
        throw new Error(json.error ?? "Unable to claim this seat");
      }

      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="space-y-4 py-6">
        <div className="bg-foreground text-background flex size-10 items-center justify-center rounded-full">
          <Check className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Seat claimed.</p>
          <p className="text-muted-foreground text-sm">
            Your details are live on the supporters grid. Thank you for backing
            the work.
          </p>
        </div>
        <Link
          href="/sponsor#sponsors"
          className="bg-muted hover:bg-muted/70 inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition"
        >
          See the supporters
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 py-6">
      {/* 01 */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">
            <span className="text-muted-foreground mr-2 font-mono text-[10px]">
              01
            </span>
            Find your payment
          </h3>
          <p className="text-muted-foreground text-xs">
            Use your checkout email or the payment ID on your receipt.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="claim-email" className="text-sm font-semibold">
            Checkout email
          </label>
          <input
            id="claim-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com..."
            className={inputClass}
          />
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Lock className="size-3" />
            Just for the payment lookup. Never shown publicly.
          </p>
        </div>

        <details
          className="text-muted-foreground group text-xs"
          open={!!initialPaymentId}
        >
          <summary className="cursor-pointer select-none">
            Have a payment ID instead?
          </summary>
          <input
            type="text"
            value={paymentId}
            onChange={(event) => setPaymentId(event.target.value)}
            placeholder="pay_..."
            maxLength={100}
            aria-label="Payment ID"
            className={`${inputClass} text-foreground mt-3 font-mono`}
          />
        </details>
      </section>

      {/* 02 */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">
            <span className="text-muted-foreground mr-2 font-mono text-[10px]">
              02
            </span>
            Personalize your seat
          </h3>
          <p className="text-muted-foreground text-xs">
            All optional. Leave a field blank to keep its current details.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="claim-name" className="text-sm font-semibold">
            Display name
          </label>
          <input
            id="claim-name"
            type="text"
            minLength={2}
            maxLength={40}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name or project..."
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="claim-link" className="text-sm font-semibold">
            Your link
          </label>
          <div className="bg-muted/60 focus-within:ring-foreground/10 mt-1 flex h-12 items-center rounded-full px-5 text-sm focus-within:ring-2">
            <span className="text-muted-foreground mr-1 font-mono text-xs">
              https://
            </span>
            <input
              id="claim-link"
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
          <p className="text-muted-foreground text-xs">
            A website, repo or profile. The https:// is added for you.
          </p>
        </div>

        <div className="space-y-2">
          <span className="block text-sm font-semibold">Your logo</span>
          <label className="bg-muted/60 hover:bg-muted flex h-14 w-full cursor-pointer items-center gap-3 rounded-full px-2.5 transition">
            <span className="bg-background relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
              {preview ? (
                <Image
                  src={preview}
                  alt="Logo preview"
                  width={40}
                  height={40}
                  unoptimized
                  className="size-full object-cover"
                />
              ) : (
                <Upload className="size-4" />
              )}
            </span>
            <span className="min-w-0 text-left">
              <span className="block truncate text-sm font-medium">
                {file ? file.name : "Choose a logo"}
              </span>
              <span className="text-muted-foreground block text-[11px]">
                PNG, JPEG or WebP · Up to {sponsorConfig.maxLogoBytes / 1024} KB
              </span>
            </span>
            <input
              type="file"
              accept={TYPES.join(",")}
              onChange={handleFile}
              className="sr-only"
            />
          </label>
          <p className="text-muted-foreground text-xs">
            Shown in a circle. Skip it to keep your generated avatar.
          </p>
        </div>
      </section>

      {error && <p className="text-sm text-rose-500">{error}</p>}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-foreground text-background inline-flex h-9 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Claiming..." : "Claim my seat"}
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
        <p className="text-muted-foreground text-xs">
          Check your details before claiming. This form can only be submitted
          once per seat.
        </p>
      </div>

      <div className="text-muted-foreground space-y-2 text-xs">
        <p>Just paid? Your seat may take a minute or two to register.</p>
        <a
          href={sponsorConfig.xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground inline-flex items-center gap-1 font-medium underline underline-offset-4"
        >
          Need a hand? DM me
          <ArrowUpRight className="size-3" />
        </a>
      </div>
    </form>
  );
}

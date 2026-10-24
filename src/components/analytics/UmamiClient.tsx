
"use client";

import { useEffect, useRef } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    umami?: {
      track: (url?: string) => void;
    };
  }
}

export default function UmamiClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrl = useRef<string | null>(null);

  const websiteId = process.env.NEXT_PUBLIC_UMAMI_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SRC;

  const queryString = searchParams.toString();
  const currentUrl = pathname + (queryString ? `?${queryString}` : "");

  useEffect(() => {
    if (!websiteId || !scriptUrl || !window.umami) return;

    // Avoid duplicate tracking for the same URL.
    if (lastTrackedUrl.current === currentUrl) return;

    lastTrackedUrl.current = currentUrl;
    window.umami.track(currentUrl);
  }, [currentUrl, websiteId, scriptUrl]);

  if (!websiteId || !scriptUrl) return null;

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      data-auto-track="false"
      strategy="afterInteractive"
      onLoad={() => {
        if (!window.umami || lastTrackedUrl.current === currentUrl) return;

        lastTrackedUrl.current = currentUrl;
        window.umami.track(currentUrl);
      }}
    />
  );
}

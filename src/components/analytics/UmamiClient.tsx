"use client";

import { useEffect, useRef, useState } from "react";

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

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const lastTrackedUrl = useRef<string | null>(null);

  const websiteId = process.env.NEXT_PUBLIC_UMAMI_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SRC;

  const queryString = searchParams.toString();
  const currentUrl = pathname + (queryString ? `?${queryString}` : "");

  useEffect(() => {
    if (!scriptLoaded || !window.umami) return;

    if (lastTrackedUrl.current === currentUrl) return;

    lastTrackedUrl.current = currentUrl;
    window.umami.track(currentUrl);
  }, [currentUrl, scriptLoaded]);

  if (!websiteId || !scriptUrl) return null;

  return (
    <Script
      id="umami-analytics"
      src={scriptUrl}
      data-website-id={websiteId}
      data-auto-track="false"
      strategy="afterInteractive"
      onLoad={() => setScriptLoaded(true)}
    />
  );
}

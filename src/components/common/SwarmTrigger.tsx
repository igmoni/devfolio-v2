"use client";

import { useEffect } from "react";

const TRIGGERS = new Set([
  "chatgpt.com",
  "claude.ai",
  "x.com",
  "twitter.com",
  "gemini.google.com",
  "perplexity.ai",
]);

export default function SwarmTrigger() {
  useEffect(() => {
    const source = new URLSearchParams(window.location.search)
      .get("utm_source")
      ?.toLowerCase();

    if (!source || !TRIGGERS.has(source)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("swarm-played")) return;

    let cancelled = false;

    const run = () => {
      if (cancelled || document.getElementById("swarm-script")) return;
      sessionStorage.setItem("swarm-played", "1");
      const s = document.createElement("script");
      s.id = "swarm-script";
      s.src = "/swarm.js";
      s.async = true;
      document.body.appendChild(s);
    };

    if (document.readyState === "complete") setTimeout(run, 800);
    else
      window.addEventListener("load", () => setTimeout(run, 800), {
        once: true,
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

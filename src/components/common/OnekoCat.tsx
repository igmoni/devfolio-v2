"use client";

import { useEffect } from "react";

import { catConfig } from "@/config/Cat";

declare global {
  interface Window {
    __ONEKO_LOADED__?: boolean;
  }
}

export function OnekoCat() {
  useEffect(() => {
    if (!catConfig.enabled || window.__ONEKO_LOADED__) return;

    window.__ONEKO_LOADED__ = true;

    const script = document.createElement("script");
    script.src = "/oneko/Oneko.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

import { motion } from "motion/react";

type ProgressState = "idle" | "loading" | "complete";

export function NavigationProgress() {
  const pathname = usePathname();

  const [status, setStatus] = useState<ProgressState>("idle");
  const [progress, setProgress] = useState(0);

  const previousPath = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startProgress = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setProgress(0);
    setStatus("loading");

    requestAnimationFrame(() => {
      setProgress(75);
    });
  }, []);

  // Start when navigating through internal links.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest("a");

      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const url = new URL(link.href, window.location.href);

      if (url.origin !== window.location.origin) return;

      const currentUrl = new URL(window.location.href);

      if (
        url.pathname === currentUrl.pathname &&
        url.search === currentUrl.search &&
        url.hash === currentUrl.hash
      ) {
        return;
      }

      startProgress();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [startProgress]);

  // Complete the progress bar when the route changes.
  useEffect(() => {
    if (previousPath.current === pathname) return;

    previousPath.current = pathname;

    setProgress(100);
    setStatus("complete");

    timeoutRef.current = setTimeout(() => {
      setStatus("idle");
      setProgress(0);
      timeoutRef.current = null;
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-9999 h-0.5"
      initial={false}
      animate={{
        opacity: status === "idle" ? 0 : 1,
      }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="h-full bg-black shadow-[0_0_8px_rgba(255,255,255,0.65)] dark:bg-white"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: status === "complete" ? 0.15 : 0.4,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}

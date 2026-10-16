"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { formatDuration, parseWakaTime } from "@/lib/wakatimeStats";
import { type WakaTimeApiResponse, type WakaTimeData } from "@/types/wakatime";

const POLL_INTERVAL = 30_000; // Refresh WakaTime every 30 seconds.
const TIMER_INTERVAL = 1_000; // Update the displayed counter every second.

const WakaTimeData = () => {
  const [data, setData] = useState<WakaTimeData | null>(null);
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Store the latest known total and when it was received.
  // Refs avoid re-rendering just because these internal values changed.
  const baseSecondsRef = useRef(0);
  const baseTimeRef = useRef(0);
  const requestInFlightRef = useRef(false);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      // Don't stack requests if WakaTime is slow to respond.
      if (requestInFlightRef.current) return;

      requestInFlightRef.current = true;

      try {
        const response = await fetch("/api/wakatime", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const json: WakaTimeApiResponse = await response.json();
        const parsed = parseWakaTime(json);

        if (!active) return;

        // Reset the estimate to the latest WakaTime summary.
        baseSecondsRef.current = parsed.totalSeconds ?? 0;
        baseTimeRef.current = Date.now();

        setDisplaySeconds(baseSecondsRef.current);
        setData(parsed);
        setHasError(false);
      } catch (error) {
        if (!active) return;

        // Keep the last successful result, but expose the failure.
        // Never silently treat a network failure as confirmed offline.
        console.error("Unable to refresh WakaTime:", error);
        setHasError(true);
      } finally {
        requestInFlightRef.current = false;
      }
    }

    // Fetch immediately, then poll at a reasonable interval.
    void fetchData();

    const pollId = window.setInterval(() => {
      // Avoid unnecessary requests when the visitor switches tabs.
      if (document.visibilityState === "visible") {
        void fetchData();
      }
    }, POLL_INTERVAL);

    // Refresh immediately when the visitor returns to the tab.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void fetchData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(pollId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!data || data.status !== "online") return;

    // One timer updates the display between API responses.
    const timerId = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - baseTimeRef.current) / 1000);

      setDisplaySeconds(baseSecondsRef.current + elapsed);
    }, TIMER_INTERVAL);

    return () => window.clearInterval(timerId);
  }, [data?.status]);

  if (!data) {
    // Don't display stale cached online status before checking the API.
    return (
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        {hasError ? "WakaTime unavailable" : "Loading coding activity..."}
      </span>
    );
  }

  if (data.status === "online") {
    return (
      <div className="text-primary space-y-1 text-sm dark:text-white">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Currently coding in</span>

          <span className="bg-muted-foreground/10 rounded-full">
            <Image
              src="/assets/cursor.png"
              alt="Cursor"
              width={20}
              height={20}
              className="inline-block rounded-full"
            />
          </span>

          <span className="font-medium">{data.editor}</span>
          <span>for</span>
          <span className="font-medium">{formatDuration(displaySeconds)}</span>
        </div>

        {data.project && data.file ? (
          <div className="text-muted-foreground text-sm">
            Working on{" "}
            <span className="text-primary font-medium dark:text-white">
              {data.project}
              <span className="font-normal"> & editing file: </span>
              {data.file}
            </span>
          </div>
        ) : (
          <div className="text-primary text-sm dark:text-white">
            Thinking & coding.{" "}
            <span className="text-accent font-medium">Coding</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-sm text-neutral-500 dark:text-neutral-400">
      <span className="text-primary flex items-center gap-1 font-semibold dark:text-white">
        Offline in
        <Image
          src="/assets/cursor.png"
          alt="Cursor"
          width={18}
          height={18}
          className="rounded-full"
        />
        Cursor
      </span>

      <p>
        Yesterday worked{" "}
        <span className="text-primary font-semibold dark:text-white">
          {data.yesterdayTime}
        </span>
      </p>

      {hasError && (
        <p className="mt-1 text-xs">Unable to refresh the latest status.</p>
      )}
    </div>
  );
};

export { WakaTimeData };

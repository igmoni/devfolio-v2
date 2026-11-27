"use client";

import { useEffect, useState } from "react";

import { instrumentSerif } from "@/config/font";

import { Container } from "../common/Container";

type AnalyticsStats = {
  visitors: number;
  pageviews: number;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

function SmileyStack() {
  return (
    <svg
      viewBox="0 0 505 246"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-12.5 shrink-0"
      aria-label="Three smiling faces"
      role="img"
    >
      <path
        d="M384 4.2C446.96 4.2 498 55.24 498 118.2C498 181.16 446.96 232.2 384 232.2C360.626 232.2 338.896 225.163 320.81 213.095C301.687 227.594 277.849 236.2 252 236.2C227.622 236.2 205.033 228.546 186.5 215.513C167.967 228.546 145.378 236.2 121 236.2C58.04 236.2 7 185.16 7 122.2C7 59.24 58.04 8.2 121 8.2C145.378 8.2 167.967 15.853 186.5 28.886C205.033 15.853 227.622 8.2 252 8.2C275.374 8.2 297.103 15.237 315.189 27.304C334.313 12.805 358.151 4.2 384 4.2Z"
        fill="white"
      />

      <circle cx="121" cy="122.2" r="90" fill="#FF4144" />
      <path
        d="M87 72.2L87.7 99.8C88.3 107.7 89.4 113.4 90.3 117.6L93 127.2M142.9 64.9L143.6 91.4C144.2 98.7 145.3 103.6 146.6 108L150.9 120.8"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M189.5 129.7C164.8 169.2 111 184.2 64 152.7"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <circle cx="252" cy="122.2" r="90" fill="#FFDA22" />
      <path
        d="M202.5 104.4C202.5 103.5 203 98.2 204.9 95.6C209 90.8 216.5 87.1 219.1 86.8C226.3 86.7 228.3 87.4 232.6 89.6C236.3 91.6 240 96.7 242.5 101"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M190 152.2C227.3 158.6 259.6 157.1 283.1 152.6C305.2 147.5 318 140 315.5 129.2"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M265.3 102.9C267.3 96.5 272.4 90.5 277.1 87.2C284.5 82.9 289.2 83.4 294.3 85.7C299.3 87.9 305.8 94.5 309.7 99.3"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <circle cx="384" cy="118.2" r="90" fill="#7876FF" />
      <path
        d="M332.5 152.7C376 169.5 423.7 159.1 443.5 133.7M325.9 93.6C326 100 330.8 104.1 338.3 108.5C347.9 111.5 362 110.3 365 107.8C370.4 102.6 373.1 99 374.3 96.7M397.5 95.2C401.5 100.7 407.5 107.3 411.7 109.4C419 112 432 110 441 106.5C447 103.7 451 100.5 451.5 97.2"
        stroke="black"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AnalyticsPill() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchStats() {
      try {
        const response = await fetch("/api/analytics/total");

        if (!response.ok) return;

        const data = await response.json();

        if (active) setStats(data);
      } catch (error) {
        console.error("Analytics error:", error);
      }
    }

    fetchStats();

    return () => {
      active = false;
    };
  }, []);

  if (!stats) return null;

  return (
    <Container className="mx-auto">
      <div
        className={`mx-auto mt-10 flex w-fit items-center justify-center gap-2 rounded-full border border-neutral-300/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md dark:border-neutral-700/70 dark:bg-neutral-900/70 ${instrumentSerif.className} scale-120 text-xs whitespace-nowrap italic sm:text-sm`}
      >
        <SmileyStack />

        <span className="text-foreground font-semibold">
          +{formatNumber(stats.visitors)}
        </span>

        <span className="text-muted-foreground">peeps</span>
      </div>
    </Container>
  );
}

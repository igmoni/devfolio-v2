"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";

import { ChartSpline } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";

type ChartItem = {
  date: string;
  day: string;
  visitors: number;
  pageviews: number;
};

type Totals = {
  visitors: number;
  pageviews: number;
};

type AnalyticsData = {
  period: { since: string; until: string };
  totals: Totals;
  changes: Record<keyof Totals, number | null> | null;
  chart: ChartItem[];
};

type RGBA = [number, number, number, number];

type Palette = {
  visitors: { bright: RGBA; dim: RGBA };
  views: { bright: RGBA; dim: RGBA };
  dotStroke: string;
  cursor: string;
};

// bright = hovered section, dim = the rest of the line
const PALETTES: Record<"light" | "dark", Palette> = {
  dark: {
    visitors: { bright: [22, 131, 232, 1], dim: [239, 246, 255, 0.5] },
    views: { bright: [255, 255, 255, 1], dim: [255, 255, 255, 0.25] },
    dotStroke: "#0a0a0a",
    cursor: "#52525b",
  },
  light: {
    visitors: { bright: [22, 131, 232, 1], dim: [22, 131, 232, 0.25] },
    views: { bright: [24, 24, 27, 1], dim: [24, 24, 27, 0.2] },
    dotStroke: "#ffffff",
    cursor: "#d4d4d8",
  },
};

const STOP_COUNT = 6;
const EASE_POSITION = 0.18; // higher = snappier slide between days
const EASE_STRENGTH = 0.14; // higher = faster fade in/out of the dimming

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const toCss = (c: RGBA) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;

const lerpColor = (a: RGBA, b: RGBA, t: number) =>
  `rgba(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(
    a[1] + (b[1] - a[1]) * t
  )}, ${Math.round(a[2] + (b[2] - a[2]) * t)}, ${(
    a[3] +
    (b[3] - a[3]) * t
  ).toFixed(3)})`;

function ChangeBadge({ value }: { value?: number | null }) {
  if (value == null) return null;
  const up = value >= 0;

  return (
    <span
      className={`font-mono text-[11px] ${
        up
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400"
      }`}
    >
      {up ? "▲" : "▼"} {Math.abs(value).toLocaleString("en-US")}%
    </span>
  );
}

type TooltipEntry = { dataKey?: string | number; value?: number };

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const visitors =
    payload.find((item) => item.dataKey === "visitors")?.value ?? 0;
  const views =
    payload.find((item) => item.dataKey === "pageviews")?.value ?? 0;

  return (
    <div className="rounded-full bg-zinc-900 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-white shadow-lg dark:bg-white dark:text-zinc-800">
      {visitors.toLocaleString()} visitors · {views.toLocaleString()} views,{" "}
      {label}
    </div>
  );
}

export default function InsightsCard() {
  const { resolvedTheme } = useTheme();
  const palette = PALETTES[resolvedTheme === "light" ? "light" : "dark"];

  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Smooth highlight state (kept in refs so hover never re-renders) ---
  const visitorsStops = useRef<(SVGStopElement | null)[]>([]);
  const viewsStops = useRef<(SVGStopElement | null)[]>([]);
  const centerRef = useRef(0);
  const strengthRef = useRef(0);
  const targetCenterRef = useRef(0);
  const targetStrengthRef = useRef(0);
  const countRef = useRef(0);
  const paletteRef = useRef<Palette>(palette);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAnalytics() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/analytics", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Unable to load analytics");

        setData(await response.json());
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchAnalytics();
    return () => controller.abort();
  }, []);

  const chartData = data?.chart ?? [];

  useEffect(() => {
    countRef.current = data?.chart.length ?? 0;
  }, [data]);

  // Write the current center/strength into the gradient stops.
  const applyGradient = useCallback(() => {
    const n = countRef.current;
    if (n < 2) return;

    const step = 1 / (n - 1);
    const half = step * 0.5;
    const feather = step * 0.2;
    const c = centerRef.current;
    const s = strengthRef.current;

    const offsets = [
      0,
      clamp01(c - half - feather),
      clamp01(c - half),
      clamp01(c + half),
      clamp01(c + half + feather),
      1,
    ];

    (["visitors", "views"] as const).forEach((key) => {
      const stops =
        key === "visitors" ? visitorsStops.current : viewsStops.current;
      const { bright, dim } = paletteRef.current[key];
      const outside = lerpColor(bright, dim, s); // s = 0 -> no dimming
      const inside = toCss(bright);
      const colors = [outside, outside, inside, inside, outside, outside];

      stops.forEach((stop, i) => {
        if (!stop) return;
        stop.setAttribute("offset", String(offsets[i]));
        stop.setAttribute("stop-color", colors[i]);
      });
    });
  }, []);

  const animate = useCallback(
    function tick() {
      const dc = targetCenterRef.current - centerRef.current;
      const ds = targetStrengthRef.current - strengthRef.current;

      centerRef.current += dc * EASE_POSITION;
      strengthRef.current += ds * EASE_STRENGTH;

      const settled = Math.abs(dc) < 0.0005 && Math.abs(ds) < 0.005;

      if (settled) {
        centerRef.current = targetCenterRef.current;
        strengthRef.current = targetStrengthRef.current;
        applyGradient();
        rafRef.current = null;
        return;
      }

      applyGradient();
      rafRef.current = requestAnimationFrame(tick);
    },
    [applyGradient]
  );

  const startAnimation = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // Theme changed: swap palette and repaint the gradient immediately.
  useEffect(() => {
    paletteRef.current = palette;
    applyGradient();
  }, [palette, applyGradient]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (state: {
    activeTooltipIndex?: number | string | null;
  }) => {
    const i = Number(state?.activeTooltipIndex);
    const n = countRef.current;
    if (!Number.isFinite(i) || n < 2) return;

    const target = i / (n - 1);

    // Entering the chart: start at the hovered day instead of sweeping in.
    if (targetStrengthRef.current === 0) {
      centerRef.current = target;
    }

    targetCenterRef.current = target;
    targetStrengthRef.current = 1;
    startAnimation();
  };

  const handleMouseLeave = () => {
    targetStrengthRef.current = 0;
    startAnimation();
  };

  const totals = data?.totals;
  const changes = data?.changes;

  const metrics = [
    {
      label: "Visitors",
      value: (totals?.visitors ?? 0).toLocaleString("en-US"),
      change: changes?.visitors,
    },
    {
      label: "Views",
      value: (totals?.pageviews ?? 0).toLocaleString("en-US"),
      change: changes?.pageviews,
    },
  ];

  // A gradient can't render on a perfectly flat line (zero-height bounding box).
  const visitorsVary = new Set(chartData.map((d) => d.visitors)).size > 1;
  const viewsVary = new Set(chartData.map((d) => d.pageviews)).size > 1;

  const renderStops = (key: "visitors" | "views", color: RGBA) =>
    Array.from({ length: STOP_COUNT }, (_, i) => (
      <stop
        key={i}
        ref={(el) => {
          const list = key === "visitors" ? visitorsStops : viewsStops;
          list.current[i] = el;
        }}
        offset={i === STOP_COUNT - 1 ? 1 : 0}
        stopColor={toCss(color)}
      />
    ));

  return (
    <Container className="mb-10 w-full max-w-none overflow-hidden bg-white font-sans text-zinc-900 dark:bg-[#0a0a0a] dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 py-3 dark:border-zinc-800">
        <Heading as="h2" Icon={<ChartSpline />}>
          Insights
        </Heading>
        <span className="text-xs text-zinc-500">Last 7 days</span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 divide-x divide-zinc-200 border-b border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {metrics.map((item) => (
          <div key={item.label} className="px-6 py-4">
            <p className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
              {item.label}
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
                {loading ? "—" : item.value}
              </span>
              {!loading && <ChangeBadge value={item.change} />}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="relative px-6 pt-3 pb-4">
        <div className="mb-2 flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-3 rounded-full bg-blue-500" />
            Visitors
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-3 rounded-full bg-zinc-900 dark:bg-white" />
            Views
          </div>
        </div>

        {error ? (
          <div className="flex h-36 items-center justify-center text-sm text-rose-600 dark:text-rose-400">
            {error}
          </div>
        ) : loading ? (
          <div className="flex h-36 items-center justify-center text-sm text-zinc-500">
            Loading analytics...
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-36 items-center justify-center text-sm text-zinc-500">
            No analytics data available.
          </div>
        ) : (
          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  <linearGradient
                    id="visitorsHighlight"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    {renderStops("visitors", palette.visitors.bright)}
                  </linearGradient>
                  <linearGradient
                    id="viewsHighlight"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    {renderStops("views", palette.views.bright)}
                  </linearGradient>
                </defs>

                <XAxis dataKey="day" hide />
                <YAxis hide domain={[0, "auto"]} />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: palette.cursor, strokeWidth: 1 }}
                  wrapperStyle={{ outline: "none", zIndex: 10 }}
                  isAnimationActive
                  animationDuration={200}
                  animationEasing="ease-out"
                />

                {/* Views */}
                <Line
                  type="monotone"
                  dataKey="pageviews"
                  stroke={
                    viewsVary
                      ? "url(#viewsHighlight)"
                      : toCss(palette.views.bright)
                  }
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: toCss(palette.views.bright),
                    stroke: palette.dotStroke,
                    strokeWidth: 2,
                  }}
                  animationDuration={700}
                />

                {/* Visitors */}
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke={
                    visitorsVary
                      ? "url(#visitorsHighlight)"
                      : toCss(palette.visitors.bright)
                  }
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: toCss(palette.visitors.bright),
                    stroke: palette.dotStroke,
                    strokeWidth: 2,
                  }}
                  animationDuration={700}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Container>
  );
}

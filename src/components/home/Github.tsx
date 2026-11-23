"use client";

import { type ReactElement, useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";

import { githubConfig } from "@/config/github";
import {
  ActivityCalendar,
  type Contribution,
  filterLastYear,
} from "@/lib/github";
import { ArrowUpRight } from "@/svgs/essentials/ArrowUpRight";
import { Github as GithubSvg } from "@/svgs/socials/Github";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Button } from "../ui/button";
import { WakaTimeData } from "./WakatimeData";

const NEW_REPO_EMOJIS = ["💥", "🌟", "🌸", "🌼", "🍥", "🦀", "🌀", "🪸", "🌿"];

const GAP = 3; // space between circles
const MIN_SIZE = 11; // below this the calendar scrolls sideways instead of shrinking
const MAX_SIZE = 22;

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const pickEmoji = (key: string) => {
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return NEW_REPO_EMOJIS[hash % NEW_REPO_EMOJIS.length];
};

type GithubApiContribution = {
  date: string;
  count: number | string;
  intensity?: number | string;
  level?: number | string;
};

type GithubApiResponse = {
  contributions?: GithubApiContribution[];
};

const Github = () => {
  const { resolvedTheme } = useTheme();

  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [repoDays, setRepoDays] = useState<Record<string, string>>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [blockSize, setBlockSize] = useState(16);
  const [tooltip, setTooltip] = useState<{
    text: string;
    left: number;
    top: number;
  } | null>(null);

  const {
    githubLink: gitSrc,
    username,
    subtitle,
    loadingState,
    errorState,
  } = githubConfig;

  // Contributions
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch("/api/github");

        if (!response.ok) {
          throw new Error(`GitHub API returned: ${response.status}`);
        }

        const data: GithubApiResponse = await response.json();

        if (!Array.isArray(data.contributions)) {
          throw new Error("Invalid GitHub contributions response");
        }

        const valid = data.contributions
          .filter(
            (item) =>
              typeof item.date === "string" &&
              /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
              Number.isFinite(Number(item.count))
          )
          .map((item): Contribution => ({
            date: item.date,
            count: Number(item.count),
            level: Math.min(
              4,
              Math.max(0, Number(item.level ?? item.intensity ?? 0))
            ),
          }));

        if (!valid.length) {
          throw new Error("No valid GitHub contributions found");
        }

        const lastYear = filterLastYear(valid);

        if (!lastYear.length) {
          throw new Error("No GitHub contributions found for the last year");
        }

        if (!cancelled) {
          setContributions(lastYear);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);

        if (!cancelled) {
          setHasError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  // "New repo" days
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/github/repos");
        if (!res.ok) return;
        const data: { repos?: { name: string; date: string }[] } =
          await res.json();
        const map: Record<string, string> = {};
        for (const repo of data.repos ?? []) {
          map[repo.date] = pickEmoji(repo.name);
        }
        if (!cancelled) setRepoDays(map);
      } catch {
        /* emojis are optional */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Fit the circles to the available width
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || contributions.length === 0) return;

    const firstDay = new Date(`${contributions[0].date}T00:00:00`).getDay();
    const weeks = Math.ceil((firstDay + contributions.length) / 7);

    const fit = () => {
      const width = el.clientWidth - 10; // padding + safety margin
      const size = Math.floor((width - (weeks - 1) * GAP) / weeks);
      setBlockSize(Math.max(MIN_SIZE, Math.min(MAX_SIZE, size)));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);

    return () => observer.disconnect();
  }, [contributions, isLoading, hasError]);

  const renderBlock = (block: ReactElement, activity: Contribution) => {
    const { x, y, width, height, rx } = block.props as {
      x: number | string;
      y: number | string;
      width: number | string;
      height: number | string;
      rx?: number | string;
    };

    const cx = Number(x) + Number(width) / 2;
    const cy = Number(y) + Number(height) / 2;

    const emoji = repoDays[activity.date];
    const label = emoji ?? (activity.count > 0 ? String(activity.count) : "");

    const fontSize = emoji
      ? Math.max(9, Math.round(blockSize * 0.62))
      : Math.max(6, Math.round(blockSize * (label.length > 2 ? 0.4 : 0.52)));

    const showTooltip = (e: React.MouseEvent<SVGGElement>) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const target = e.currentTarget.getBoundingClientRect();
      const box = wrapper.getBoundingClientRect();

      const rawLeft = target.left - box.left + target.width / 2;
      const left = Math.max(80, Math.min(box.width - 80, rawLeft));

      setTooltip({
        text: `${formatDate(activity.date)}: ${activity.count} contribution${
          activity.count === 1 ? "" : "s"
        }${emoji ? " · New repo" : ""}`,
        left,
        top: target.top - box.top,
      });
    };

    return (
      <g
        className="group cursor-pointer"
        onMouseEnter={showTooltip}
        onMouseLeave={() => setTooltip(null)}
        onClick={showTooltip} // tap support on mobile
      >
        {emoji ? (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={rx}
            fill="transparent"
          />
        ) : (
          block
        )}

        {/* hover border */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={rx}
          fill="none"
          strokeWidth={1}
          className="stroke-transparent transition-colors duration-150 group-hover:stroke-neutral-900 dark:group-hover:stroke-white"
          style={{ pointerEvents: "none" }}
        />

        {/* number or new-repo emoji */}
        {label && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={fontSize}
            fontWeight={700}
            fill={activity.level >= 3 ? "#0a1a33" : "#ffffff"}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  const themeColors =
    githubConfig.theme[resolvedTheme === "dark" ? "dark" : "light"];

  return (
    <Container className="space-y-6">
      <div className="mt-5 mb-1 flex items-end justify-between md:items-center">
        <Heading as="h2" className="flex items-center gap-2">
          <GithubSvg className="size-7" />
          Github Activity
        </Heading>

        <Link
          href={gitSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-1 text-[12px] font-medium md:text-lg"
        >
          <span className="relative">
            View Profile
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 bg-current transition-all duration-200 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </span>

          <ArrowUpRight className="size-3 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-150 md:size-4" />
        </Link>
      </div>

      <div className="flex flex-col justify-between md:flex-row">
        <p className="mb-1">
          <b>{username}</b>&apos;s {subtitle}
        </p>
        <div className="text-right">
          <WakaTimeData />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="border-primary mx-auto mb-4 size-8 animate-spin rounded-full border-2 border-t-transparent" />
            <p className="text-muted-foreground text-sm">
              {loadingState.description}
            </p>
          </div>
        </div>
      )}

      {!isLoading && hasError && (
        <div className="text-muted-foreground border-border rounded-xl border-2 border-dashed p-8 text-center">
          <div className="bg-muted mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
            <GithubSvg className="size-8" />
          </div>

          <p className="mb-2 font-medium">{errorState.title}</p>
          <p className="mb-4 text-sm">{errorState.description}</p>

          <Button variant="outline">
            <Link
              href={gitSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <GithubSvg className="size-4" />
              {errorState.buttonText}
            </Link>
          </Button>
        </div>
      )}

      {!isLoading && !hasError && contributions.length > 0 && (
        <div className="mt-5 w-full">
          {/* Tooltip is positioned against this wrapper, outside the scroller */}
          <div ref={wrapperRef} className="relative w-full">
            {/* Only scrolls on very narrow screens */}
            <div className="overflow-none w-full py-1">
              <ActivityCalendar
                data={contributions}
                colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                maxLevel={githubConfig.maxLevel}
                theme={githubConfig.theme}
                blockSize={blockSize}
                blockMargin={GAP}
                blockRadius={10}
                fontSize={12}
                showColorLegend={false}
                showTotalCount={false}
                renderBlock={renderBlock}
                labels={{
                  months: githubConfig.months,
                  weekdays: githubConfig.weekDays,
                }}
                style={{ color: "rgb(139, 148, 158)", margin: "0 auto" }}
              />
            </div>

            {/* Tooltip */}
            {tooltip && (
              <div
                role="tooltip"
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg bg-white px-3 py-1.5 text-xs font-medium whitespace-nowrap text-neutral-900 shadow-lg"
                style={{ left: tooltip.left, top: tooltip.top - 8 }}
              >
                {tooltip.text}
              </div>
            )}

            {/* Legend */}
            <div className="text-muted-foreground mt-4 flex items-center justify-center gap-3 text-xs">
              <span>Less</span>
              <div className="flex gap-1">
                {themeColors.map((color: string) => (
                  <span
                    key={color}
                    className="size-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>More</span>
              <span className="ml-2 inline-flex items-center gap-1">
                <span>💥</span> New repo
              </span>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export { Github };

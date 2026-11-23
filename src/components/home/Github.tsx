"use client";

import { useEffect, useState } from "react";
import { type ReactElement } from "react";

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

  const {
    githubLink: gitSrc,
    username,
    subtitle,
    loadingState,
    errorState,
  } = githubConfig;

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

  const renderBlock = (block: ReactElement, activity: Contribution) => {
    const { x, y, width, height } = block.props as {
      x: number | string;
      y: number | string;
      width: number | string;
      height: number | string;
    };

    const cx = Number(x) + Number(width) / 2;
    const cy = Number(y) + Number(height) / 2;

    const emoji = repoDays[activity.date];
    const label = emoji ?? (activity.count > 0 ? String(activity.count) : "");

    return (
      <g>
        <title>{`${activity.count} contributions on ${activity.date}`}</title>
        {block}
        {label && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={emoji ? 11 : label.length > 2 ? 7 : 9}
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
        <div className="relative">
          <div className="bg-background/50 mt-5 rounded-lg border-2 border-dashed border-neutral-200 p-6 backdrop-blur-sm dark:border-neutral-800">
            <div className="w-full ">
              <ActivityCalendar
                data={contributions}
                colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                maxLevel={githubConfig.maxLevel}
                theme={githubConfig.theme}
                blockSize={18}
                blockMargin={4}
                blockRadius={5}
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

              {/* Legend */}
              <div className="text-muted-foreground mt-4 flex items-center justify-center gap-3 text-xs">
                <span>Less</span>
                <div className="flex gap-1">
                  {githubConfig.theme[
                    resolvedTheme === "dark" ? "dark" : "light"
                  ].map((color: string) => (
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
        </div>
      )}
    </Container>
  );
};

export { Github };

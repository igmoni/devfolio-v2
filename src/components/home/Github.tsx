"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";

import { githubConfig } from "@/config/github";
import { ActivityCalendar, filterLastYear } from "@/lib/github";
import { ArrowUpRight } from "@/svgs/essentials/ArrowUpRight";
import { Github as GithubSvg } from "@/svgs/Github";

import { Container } from "../common/Container";
import { Button } from "../ui/button";

const Github = () => {
  const { theme } = useTheme();
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const {
    githubLink: gitSrc,
    username,
    subtitle,
    loadingState,
    errorState,
  } = githubConfig;

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getBlockSize = () => {
    if (screenWidth < 768) return 10;
    return 13;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const res = await fetch("/api/github");

        if (!res.ok) throw new Error(`Github API returned: ${res.status}`);

        const data = await res.json();

        if (!Array.isArray(data?.contributions))
          throw new Error("Invalid GitHub Contributions response");

        const valid = data.contributions
          .filter(
            (item: unknown): item is Contribution =>
              typeof item === "object" &&
              item !== null &&
              "date" in item &&
              "count" in item &&
              "intensity" in item
          )
          .map((item: any) => ({
            date: String(item.date),
            count: Number(item.count || 0),
            level: Number(item.intensity || 0),
          }));

        if (!valid.length)
          throw new Error("No valid GitHub contributions found");

        const lastYear = filterLastYear(valid);

        if (!lastYear.length)
          throw new Error("No GitHub contributions found for the last year");

        const sortedContributions = [...lastYear].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setContributions(sortedContributions);

        const years = Array.isArray(data?.years) ? data.years : [];

        const allTimeTotal = years.reduce(
          (sum: number, year: { total?: number | string }) =>
            sum + Number(year.total ?? 0),
          0
        );

        setTotalContributions(allTimeTotal);
      } catch (error) {
        console.error("Failed to fetch Github contributions:", error);

        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="space-y-6">
      <div className="mt-5 mb-1 flex items-center justify-between">
        <h2 className="flex items-center gap-2">
          <GithubSvg className="size-7" />
          <p className="text-2xl font-semibold">GitHub Activity</p>
        </h2>

        <Link
          href={gitSrc}
          target="_blank"
          className="group relative inline-flex items-center gap-1 text-[12px] font-medium md:text-lg"
        >
          <span className="relative">
            View Profile{" "}
            <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 bg-current transition-all duration-200 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </span>

          <ArrowUpRight className="size-3 transform transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-150 md:size-4" />
        </Link>
      </div>

      <p className="mb-1">
        <b>{username}</b>'s {subtitle}
      </p>

      {!isLoading && !hasError && (
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <p className="text-primary text-sm font-medium dark:text-white">
            Total: {totalContributions.toLocaleString()} contributions
          </p>

          {/* <WakaTimeText /> */}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />

            <p className="text-muted-foreground text-sm">
              {loadingState.description}
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && hasError && (
        <div className="text-muted-foreground border-border rounded-xl border-2 border-dashed p-8 text-center">
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <GithubSvg className="h-8 w-8" />
          </div>

          <p className="mb-2 font-medium">{errorState.title}</p>

          <p className="mb-4 text-sm">{errorState.description}</p>

          <Button variant="outline">
            <Link
              href={`https://github.com/${githubConfig.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <GithubSvg className="h-4 w-4" />

              {errorState.buttonText}
            </Link>
          </Button>
        </div>
      )}

      <div className="min-h-[180px]">
        {!isLoading && !hasError && contributions.length > 0 && (
          <div className="relative z-0 overflow-hidden">
            <div className="bg-background/50 rounded-lg border-2 border-dashed border-neutral-200 p-6 backdrop-blur-sm dark:border-neutral-800">
              <div className="w-full overflow-x-auto">
                <ActivityCalendar
                  data={contributions}
                  // blockSize={getBlockSize()}
                  // blockMargin={3}
                  // fontSize={githubConfig.fontSize}
                  colorScheme={theme === "dark" ? "dark" : "light"}
                  maxLevel={githubConfig.maxLevel}
                  theme={githubConfig.theme}
                  labels={{
                    months: githubConfig.months,
                    weekdays: githubConfig.weekDays,
                    totalCount: githubConfig.totalCountLabel,
                  }}
                  style={{
                    color: "rgb(139,148,158)",
                    margin: "0 auto",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export { Github };

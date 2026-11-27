import { unstable_cache } from "next/cache";
import { connection, NextResponse } from "next/server";

const BASE_URL = "https://api.vercel.com/v1/query/web-analytics/visits";

const iso = (d: Date) => d.toISOString().slice(0, 10);

function addDays(d: Date, days: number) {
  const copy = new Date(d);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

// Percent change vs previous period. null when there is nothing to compare.
function pctChange(current: number, previous: number) {
  if (!previous) return null;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

type VercelTotals = { visitors?: number; pageviews?: number };

function normalizeTotals(t?: VercelTotals) {
  return {
    visitors: t?.visitors ?? 0,
    pageviews: t?.pageviews ?? 0,
  };
}

const getAnalytics = unstable_cache(
  async () => {
    const token = process.env.VERCEL_TOKEN ?? process.env.VERCEL_TOKEN_ID;

    const projectId = process.env.VERCEL_PROJECT_ID;

    if (!token || !projectId) {
      throw new Error("Missing Vercel credentials");
    }

    const today = new Date();
    const start = addDays(today, -6);
    const prevEnd = addDays(start, -1);
    const prevStart = addDays(prevEnd, -6);

    const since = iso(start);
    const until = iso(today);

    const request = (path: string, params: Record<string, string>) => {
      const query = new URLSearchParams({
        ...params,
      });

      return fetch(`${BASE_URL}/${path}?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      });
    };

    const [dailyRes, currentRes, previousRes] = await Promise.all([
      request("aggregate", { projectId, since, until, by: "day" }),
      request("count", { projectId, since, until }),
      request("count", {
        projectId,
        since: iso(prevStart),
        until: iso(prevEnd),
      }),
    ]);

    if (!dailyRes.ok || !currentRes.ok) {
      const errors = {
        daily: !dailyRes.ok ? await dailyRes.text() : null,
        current: !currentRes.ok ? await currentRes.text() : null,
        previous: !previousRes.ok ? await previousRes.text() : null,
      };

      console.error("Vercel Analytics API errors:", errors);

      throw new Error("Failed to fetch Vercel analytics");
    }

    const [dailyJson, currentJson] = await Promise.all([
      dailyRes.json(),
      currentRes.json(),
    ]);

    const previousJson = previousRes.ok ? await previousRes.json() : null;

    const dailyData = dailyJson.data ?? [];
    const current = normalizeTotals(currentJson.data);
    const previous = previousJson ? normalizeTotals(previousJson.data) : null;

    const chart = Array.from({ length: 7 }, (_, index) => {
      const date = addDays(start, index);
      const dateKey = iso(date);

      const existing = dailyData.find(
        (item: { timestamp: string }) => item.timestamp.slice(0, 10) === dateKey
      );

      return {
        date: dateKey,
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "UTC",
        }),
        visitors: existing?.visitors ?? 0,
        pageviews: existing?.pageviews ?? 0,
      };
    });

    return {
      period: { since, until },
      totals: current,
      changes: previous
        ? {
            visitors: pctChange(current.visitors, previous.visitors),
            pageviews: pctChange(current.pageviews, previous.pageviews),
          }
        : null,
      chart,
    };
  },
  ["vercel-analytics-chart-v1"],
  {
    revalidate: 3600,
  }
);

export async function GET() {
  await connection();
  const token = process.env.VERCEL_TOKEN ?? process.env.VERCEL_TOKEN_ID;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return NextResponse.json(
      { error: "Missing Vercel credentials" },
      { status: 500 }
    );
  }

  const today = new Date();
  const start = addDays(today, -6);
  const prevEnd = addDays(start, -1);
  const prevStart = addDays(prevEnd, -6);

  const since = iso(start);
  const until = iso(today);

  const request = (path: string, params: Record<string, string>) =>
    fetch(`${BASE_URL}/${path}?${new URLSearchParams(params)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

  try {
    const [dailyRes, currentRes, previousRes] = await Promise.all([
      request("aggregate", { projectId, since, until, by: "day" }),
      request("count", { projectId, since, until }),
      request("count", {
        projectId,
        since: iso(prevStart),
        until: iso(prevEnd),
      }),
    ]);

    if (!dailyRes.ok || !currentRes.ok) {
      const dailyError = !dailyRes.ok ? await dailyRes.text() : null;

      const currentError = !currentRes.ok ? await currentRes.text() : null;

      console.error("Vercel Analytics API errors:", {
        daily: dailyError,
        current: currentError,
        previous: previousRes.ok ? null : await previousRes.text(),
      });

      return NextResponse.json(
        {
          error: "Failed to fetch Vercel analytics",
          details: {
            daily: dailyError,
            current: currentError,
          },
        },
        { status: 502 }
      );
    }

    const [dailyJson, currentJson] = await Promise.all([
      dailyRes.json(),
      currentRes.json(),
    ]);

    // Previous period is optional: if it fails, the badges just hide.
    const previousJson = previousRes.ok ? await previousRes.json() : null;

    const dailyData = dailyJson.data ?? [];
    const current = normalizeTotals(currentJson.data);
    const previous = previousJson ? normalizeTotals(previousJson.data) : null;

    const chart = Array.from({ length: 7 }, (_, index) => {
      const date = addDays(start, index);
      const dateKey = iso(date);

      const existing = dailyData.find(
        (item: { timestamp: string }) => item.timestamp.slice(0, 10) === dateKey
      );

      return {
        date: dateKey,
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "UTC",
        }),
        visitors: existing?.visitors ?? 0,
        pageviews: existing?.pageviews ?? 0,
      };
    });

    return NextResponse.json({
      period: { since, until },
      totals: current,
      changes: previous && {
        visitors: pctChange(current.visitors, previous.visitors),
        pageviews: pctChange(current.pageviews, previous.pageviews),
      },
      chart,
    });
  } catch (error) {
    console.error("Analytics request failed:", error);
    return NextResponse.json(
      { error: "Analytics service unavailable" },
      { status: 502 }
    );
  }
}

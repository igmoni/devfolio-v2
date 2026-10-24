import { connection, NextResponse } from "next/server";

import type { WakaTimeApiResponse } from "@/types/wakatime";

const WAKATIME_API = "https://wakatime.com/api/v1";
const CACHE_DURATION = 300;
const RATE_LIMIT_COOLDOWN = 60_000;

let cachedData: WakaTimeApiResponse | null = null;
let cacheExpiresAt = 0;
let rateLimitedUntil = 0;
let pendingRequest: Promise<WakaTimeApiResponse> | null = null;

function getDateInTimezone(date: Date, timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function shiftDate(date: string, days: number): string {
  const shifted = new Date(`${date}T12:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);

  return shifted.toISOString().slice(0, 10);
}

async function fetchWakaTime<T>(
  endpoint: string,
  authorization: string
): Promise<T> {
  const response = await fetch(`${WAKATIME_API}${endpoint}`, {
    headers: {
      Authorization: authorization,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (response.status === 429) {
    const retryAfter = Number(response.headers.get("Retry-After"));

    if (Number.isFinite(retryAfter) && retryAfter > 0) {
      rateLimitedUntil = Date.now() + Math.min(retryAfter * 1000, 15 * 60_000);
    } else {
      rateLimitedUntil = Date.now() + RATE_LIMIT_COOLDOWN;
    }

    throw new Error("WakaTime rate limit exceeded.");
  }

  if (!response.ok) {
    throw new Error(`WakaTime returned HTTP ${response.status}`);
  }

  return (await response.json()) as T;
}

async function loadWakaTimeData(
  apiKey: string,
  timezone: string
): Promise<WakaTimeApiResponse> {
  const today = getDateInTimezone(new Date(), timezone);
  const yesterday = shiftDate(today, -1);

  const authorization = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
  const dateParams = `timezone=${encodeURIComponent(timezone)}`;

  const [todaySummary, heartbeats, yesterdaySummary] = await Promise.all([
    fetchWakaTime<WakaTimeApiResponse["todaySummary"]>(
      `/users/current/summaries?start=${today}&end=${today}&${dateParams}`,
      authorization
    ),
    fetchWakaTime<WakaTimeApiResponse["heartbeats"]>(
      `/users/current/heartbeats?date=${today}&${dateParams}`,
      authorization
    ),
    fetchWakaTime<WakaTimeApiResponse["yesterdaySummary"]>(
      `/users/current/summaries?start=${yesterday}&end=${yesterday}&${dateParams}`,
      authorization
    ),
  ]);

  return {
    todaySummary,
    heartbeats,
    yesterdaySummary,
  };
}

export async function GET() {
  await connection();

  const apiKey = process.env.WAKATIME_API_KEY;
  const timezone = process.env.WAKATIME_TIMEZONE || "Asia/Kolkata";

  if (!apiKey) {
    return NextResponse.json(
      { error: "WakaTime API key is not configured." },
      { status: 500 }
    );
  }

  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone });

    // Reuse the last successful result for five minutes.
    if (cachedData && Date.now() < cacheExpiresAt) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": "private, max-age=60",
        },
      });
    }

    // Don't repeatedly hit WakaTime while rate-limited.
    if (Date.now() < rateLimitedUntil) {
      if (cachedData) {
        return NextResponse.json(cachedData, {
          headers: {
            "Cache-Control": "private, max-age=60",
            "X-WakaTime-Stale": "true",
          },
        });
      }

      return NextResponse.json(
        { error: "WakaTime rate limit reached. Try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.max(1, Math.ceil((rateLimitedUntil - Date.now()) / 1000))
            ),
          },
        }
      );
    }

    // Share one upstream request among concurrent visitors.
    if (!pendingRequest) {
      pendingRequest = loadWakaTimeData(apiKey, timezone);
    }

    const request = pendingRequest;

    try {
      const result = await request;

      cachedData = result;
      cacheExpiresAt = Date.now() + CACHE_DURATION * 1000;

      return NextResponse.json(result, {
        headers: {
          "Cache-Control": "private, max-age=60",
        },
      });
    } finally {
      if (pendingRequest === request) {
        pendingRequest = null;
      }
    }
  } catch (error) {
    console.error("Failed to fetch WakaTime data:", error);

    // Serve stale data if WakaTime is temporarily unavailable.
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": "private, max-age=60",
          "X-WakaTime-Stale": "true",
        },
      });
    }

    const isRateLimited =
      error instanceof Error &&
      error.message === "WakaTime rate limit exceeded.";

    return NextResponse.json(
      {
        error: isRateLimited
          ? "WakaTime rate limit reached. Try again later."
          : "Unable to retrieve WakaTime data.",
      },
      {
        status: isRateLimited ? 429 : 502,
        headers: isRateLimited
          ? {
              "Retry-After": String(
                Math.max(1, Math.ceil((rateLimitedUntil - Date.now()) / 1000))
              ),
            }
          : undefined,
      }
    );
  }
}

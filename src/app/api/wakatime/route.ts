import { NextResponse } from "next/server";

import type { WakaTimeApiResponse } from "@/types/wakatime";

// Read fresh WakaTime data on every request.

const WAKATIME_API = "https://wakatime.com/api/v1";

function getDateInTimezone(date: Date, timezone: string): string {
  // Format the date using the timezone configured for your WakaTime account.
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
  // UTC noon avoids edge cases around midnight and daylight-saving changes.
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

  if (!response.ok) {
    // Avoid exposing the API key or upstream response to visitors.
    throw new Error(`WakaTime returned HTTP ${response.status}`);
  }

  const data: T = await response.json();
  return data;
}

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;
  const timezone = process.env.WAKATIME_TIMEZONE || "Asia/Kolkata";

  if (!apiKey) {
    return NextResponse.json(
      { error: "WakaTime API key is not configured." },
      { status: 500 }
    );
  }

  try {
    // Validate the timezone before making external requests.
    new Intl.DateTimeFormat("en-US", { timeZone: timezone });

    const today = getDateInTimezone(new Date(), timezone);
    const yesterday = shiftDate(today, -1);

    // WakaTime uses HTTP Basic authentication with the API key as username.
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

    const result: WakaTimeApiResponse = {
      todaySummary,
      heartbeats,
      yesterdaySummary,
    };

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    // Log details on the server only; never return secrets to the browser.
    console.error("Failed to fetch WakaTime data:", error);

    return NextResponse.json(
      { error: "Unable to retrieve WakaTime data." },
      { status: 502 }
    );
  }
}

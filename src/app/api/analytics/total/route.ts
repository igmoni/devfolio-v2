import { NextResponse } from "next/server";

const BASE_URL = "https://api.vercel.com/v1/query/web-analytics/visits/count";

export async function GET() {
  const token = process.env.VERCEL_TOKEN ?? process.env.VERCEL_TOKEN_ID;

  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return NextResponse.json(
      { error: "Missing Vercel credentials" },
      { status: 500 }
    );
  }

  const url = new URL(BASE_URL);

  url.searchParams.set("projectId", projectId);

  if (teamId) {
    url.searchParams.set("teamId", teamId);
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Analytics unavailable" },
        { status: 502 }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      visitors: result.data?.visitors ?? 0,
      pageviews: result.data?.pageviews ?? 0,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    return NextResponse.json(
      { error: "Analytics service unavailable" },
      { status: 502 }
    );
  }
}

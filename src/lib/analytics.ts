import "server-only";

export type AnalyticsData = {
  pageviews: number;
  visitors: number;
};

export async function getAnalytics(
  path?: string
): Promise<AnalyticsData | null> {
  const token = process.env.VERCEL_TOKEN_ID;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) return null;

  const url = new URL(
    "https://api.vercel.com/v1/query/web-analytics/visits/count"
  );

  url.searchParams.set("projectId", projectId);

  if (teamId) {
    url.searchParams.set("teamId", teamId);
  }

  if (path) {
    url.searchParams.set(
      "filter",
      `requestPath eq '${path.replace(/'/g, "''")}'`
    );
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
      console.error("Vercel Analytics API error:", response.status);
      return null;
    }

    const result = await response.json();

    return result.data as AnalyticsData;
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return null;
  }
}

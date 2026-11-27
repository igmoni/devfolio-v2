import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://github-contributions-api.jogruber.de/v4/igmoni?y=last",
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contributions" },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json(), {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub contributions proxy error:", error);

    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}

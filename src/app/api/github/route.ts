import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://github-contributions.vercel.app/api/v1/igmoni",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contributions" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("GitHub contributions proxy error:", error);

    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}

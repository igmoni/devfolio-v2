import { NextResponse } from "next/server";

type Repo = { name: string; created_at: string; fork: boolean };

export async function GET() {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      "https://api.github.com/users/igmoni/repos?per_page=100&type=owner",
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ repos: [] }, { status: 200 });
    }

    const data: Repo[] = await res.json();

    return NextResponse.json({
      repos: data
        .filter((r) => !r.fork)
        .map((r) => ({ name: r.name, date: r.created_at.slice(0, 10) })),
    });
  } catch (error) {
    console.error("GitHub repos proxy error:", error);
    return NextResponse.json({ repos: [] }, { status: 200 });
  }
}

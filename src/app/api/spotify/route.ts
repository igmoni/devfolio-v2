import { connection, NextResponse } from "next/server";

import { getSpotifyTrack } from "@/lib/spotify";

export async function GET() {
  await connection();

  try {
    const track = await getSpotifyTrack();

    return NextResponse.json(track, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Spotify API error:", error);

    return NextResponse.json(
      {
        isPlaying: false,
        title: null,
        artist: null,
        album: null,
        albumImageUrl: null,
        spotifyUrl: null,
      },
      { status: 200 }
    );
  }
}

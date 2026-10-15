async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error("Spotify environment variables missing");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Spotify access token refresh failed");
  }

  return data.access_token as string;
}

function formatTrack(track: any, isPlaying: boolean) {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((artist: any) => artist.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images?.[0]?.url ?? null,
    spotifyUrl: track.external_urls?.spotify ?? null,
  };
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // 1. Check the current track.
    const currentResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers,
        cache: "no-store",
      }
    );

    if (currentResponse.ok) {
      const current = await currentResponse.json();

      if (current.is_playing && current.item) {
        return Response.json(formatTrack(current.item, true));
      }
    } else if (currentResponse.status !== 204) {
      throw new Error(
        `Currently playing request failed: ${currentResponse.status}`
      );
    }

    // 2. Nothing is playing: fetch the latest track.
    const recentResponse = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers,
        cache: "no-store",
      }
    );

    if (!recentResponse.ok) {
      throw new Error(
        `Recently played request failed: ${recentResponse.status}`
      );
    }

    const recent = await recentResponse.json();
    const track = recent.items?.[0]?.track;

    if (!track) {
      return Response.json({
        isPlaying: false,
        title: null,
        artist: null,
        album: null,
        albumImageUrl: null,
        spotifyUrl: null,
      });
    }

    return Response.json(formatTrack(track, false));
  } catch (error) {
    console.error("Spotify API error:", error);

    return Response.json(
      { error: "Unable to fetch Spotify data" },
      { status: 500 }
    );
  }
}

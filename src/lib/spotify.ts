import "server-only";

export type SpotifyTrack = {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumImageUrl: string | null;
  spotifyUrl: string | null;
};

type SpotifyApiTrack = {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images?: { url: string }[];
  };
  external_urls?: {
    spotify?: string;
  };
};

type SpotifyApiResponse = {
  is_playing?: boolean;
  item?: SpotifyApiTrack | null;
};

type SpotifyTokenResponse = {
  access_token: string;
};

const EMPTY_TRACK: SpotifyTrack = {
  isPlaying: false,
  title: null,
  artist: null,
  album: null,
  albumImageUrl: null,
  spotifyUrl: null,
};

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify environment variables");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();

    throw new Error(
      `Spotify token refresh failed (${response.status}): ${details}`
    );
  }

  const data: SpotifyTokenResponse = await response.json();

  if (!data.access_token) {
    throw new Error("Spotify returned no access token");
  }

  return data.access_token;
}

function formatTrack(track: SpotifyApiTrack, isPlaying: boolean): SpotifyTrack {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images?.[0]?.url ?? null,
    spotifyUrl: track.external_urls?.spotify ?? null,
  };
}

export async function getSpotifyTrack(): Promise<SpotifyTrack> {
  const accessToken = await getAccessToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const currentResponse = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers,
      cache: "no-store",
    }
  );

  if (currentResponse.status === 401) {
    throw new Error("Spotify access token is unauthorized");
  }

  if (currentResponse.status === 200) {
    const data: SpotifyApiResponse = await currentResponse.json();

    if (data.is_playing && data.item) {
      return formatTrack(data.item, true);
    }
  } else if (currentResponse.status !== 204) {
    throw new Error(
      `Spotify currently-playing request failed: ${currentResponse.status}`
    );
  }

  const recentResponse = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers,
      cache: "no-store",
    }
  );

  if (!recentResponse.ok) {
    throw new Error(
      `Spotify recently-played request failed: ${recentResponse.status}`
    );
  }

  const recentData: {
    items?: { track: SpotifyApiTrack }[];
  } = await recentResponse.json();

  const lastTrack = recentData.items?.[0]?.track;

  return lastTrack ? formatTrack(lastTrack, false) : EMPTY_TRACK;
}

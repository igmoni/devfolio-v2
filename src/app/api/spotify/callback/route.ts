

export async function GET(req: Request) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } =
    process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URI) {
    return Response.json(
      { error: "Spotify environment variables missing" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const spotifyError = searchParams.get("error");

  if (spotifyError) {
    return Response.json({ error: spotifyError }, { status: 400 });
  }

  if (!code) {
    return Response.json(
      { error: "No authorization code provided" },
      { status: 400 }
    );
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
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
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
    cache: "no-store",
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error("Spotify token exchange failed:", data.error);
    return Response.json(
      { error: "Failed to exchange Spotify authorization code" },
      { status: 502 }
    );
  }

  // Only return the refresh token needed for server configuration.
  // Never return the client secret or access token.
  return Response.json({
    message: "Authorization successful. Save this refresh token in .env.local.",
    refresh_token: data.refresh_token,
  });
}

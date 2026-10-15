export async function GET() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_REDIRECT_URI) {
    return Response.json(
      { error: "Spotify environment variables missing" },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: [
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-read-recently-played",
    ].join(" "),
  });

  return Response.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}

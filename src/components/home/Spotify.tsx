"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

type SpotifyTrack = {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumImageUrl: string | null;
  spotifyUrl: string | null;
};

const Spotify = () => {
  const [song, setSong] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Spotify data");
        }

        const data: SpotifyTrack = await response.json();

        if (isMounted) setSong(data);
      } catch (error) {
        console.error("Spotify fetch error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchNowPlaying();

    const interval = setInterval(() => {
      void fetchNowPlaying();
    }, 5000);
    // 300000 : 5 mins
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-neutral-500"> — Loading Spotify</p>;
  }

  if (!song?.title) {
    return (
      <div className="flex items-center gap-2">
        <Image
          src="/assets/spotify1.svg"
          width={24}
          height={24}
          alt="Spotify"
        />
        <p className="text-sm text-neutral-500"> — No recent track available</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Image src="/assets/spotify1.svg" width={24} height={24} alt="Spotify" />

      {song.albumImageUrl && (
        <Image
          src={song.albumImageUrl}
          width={44}
          height={44}
          alt={song.album ?? "Album artwork"}
          className="rounded-md"
        />
      )}

      <div className="min-w-0">
        <p className="text-xs text-neutral-500">
          {song.isPlaying ? "Listening to" : "Last played"}
        </p>

        {song.spotifyUrl ? (
          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm font-medium hover:underline"
          >
            {song.title}
          </a>
        ) : (
          <p className="truncate text-sm font-medium">{song.title}</p>
        )}

        <p className="truncate text-xs text-neutral-500">{song.artist}</p>
      </div>
    </div>
  );
};

export { Spotify };

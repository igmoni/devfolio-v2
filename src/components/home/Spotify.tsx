"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import type { SpotifyTrack } from "@/lib/spotify";

type SpotifyProps = {
  track: SpotifyTrack | null;
};

const Spotify = ({ track }: SpotifyProps) => {
  const [song, setSong] = useState<SpotifyTrack | null>(track);

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

        const data: SpotifyTrack | null = await response.json();

        if (isMounted) {
          setSong(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Spotify fetch error:", error);
        }
      }
    };

    // Fetch immediately on mount.
    void fetchNowPlaying();

    // Refresh Spotify data every 30 seconds.
    const interval = setInterval(() => {
      void fetchNowPlaying();
    }, 30_000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex min-h-11 min-w-0 items-center gap-3">
      {song?.isPlaying && song.albumImageUrl ? (
        <Image
          src={song.albumImageUrl}
          width={44}
          height={44}
          alt={song.album ?? "Album artwork"}
          className="size-11 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <Image
          src="/assets/spotify.svg"
          width={44}
          height={44}
          alt="Spotify"
          className="size-11 shrink-0"
        />
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-neutral-500">
          {!song
            ? "Offline"
            : song.isPlaying
              ? "Listening on Spotify"
              : "Last played"}
        </p>

        {song?.title ? (
          song.spotifyUrl ? (
            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-fit max-w-full truncate text-sm font-medium hover:underline"
            >
              {song.title}
            </a>
          ) : (
            <p className="truncate text-sm font-medium">{song.title}</p>
          )
        ) : (
          <p className="truncate text-sm font-medium">
            Not currently listening
          </p>
        )}

        <p className="truncate text-xs text-neutral-500">
          {song?.artist ?? "Music Activity unavailable"}
        </p>
      </div>
    </div>
  );
};

export { Spotify };

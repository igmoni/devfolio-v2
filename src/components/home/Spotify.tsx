"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import type { SpotifyTrack } from "@/lib/spotify";

type SpotifyProps = {
  track: SpotifyTrack | null;
};

const Spotify = ({ track }: SpotifyProps) => {
  const [song, setSong] = useState(track);

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

        if (isMounted) {
          setSong(data);
        }
      } catch (error) {
        console.error("Spotify fetch error:", error);
      }
    };

    const interval = setInterval(() => {
      void fetchNowPlaying();
    }, 30_000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!song?.title) {
    return (
      <div className="flex min-w-0 items-center gap-2">
        <Image
          src="/assets/spotify1.svg"
          width={24}
          height={24}
          alt="Spotify"
          className="shrink-0"
        />
        <p className="truncate text-sm text-neutral-500">
          No recent track available
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      {song.isPlaying && song.albumImageUrl ? (
        <Image
          src={song.albumImageUrl}
          width={44}
          height={44}
          alt={song.album ?? "Album artwork"}
          className="size-11 shrink-0 rounded-full object-cover"
        />
      ) : (
        <Image
          src="/assets/spotify1.svg"
          width={24}
          height={24}
          alt="Spotify"
          className="shrink-0"
        />
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-neutral-500">
          {song.isPlaying ? "Listening on Spotify" : "Last played"}
        </p>

        {song.spotifyUrl ? (
          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={song.title}
            className="block w-fit truncate text-sm font-medium hover:underline"
          >
            {song.title}
          </a>
        ) : (
          <p title={song.title} className="truncate text-sm font-medium">
            {song.title}
          </p>
        )}

        <p
          title={song.artist ?? ""}
          className="truncate text-xs text-neutral-500"
        >
          {song.artist}
        </p>
      </div>
    </div>
  );
};

export { Spotify };

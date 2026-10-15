import type { ComponentType, SVGProps } from "react";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export type SvgType = {
  className?: string;
};

export type SpotifyTrack = {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumImageUrl: string | null;
  spotifyUrl: string | null;
};

type SkillIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type Skill = {
  name: string;
  icon: SkillIcon;
};

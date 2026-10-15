type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

type SvgType = {
  className?: string;
};

type SpotifyTrack = {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumImageUrl: string | null;
  spotifyUrl: string | null;
};

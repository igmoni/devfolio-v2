import { Suspense } from "react";

import { Container } from "@/components/common/Container";
import { Github } from "@/components/home/Github";
import { Hero } from "@/components/home/Hero";
import { SkillsCarousel } from "@/components/home/SkillsCarousel";
import { Spotify } from "@/components/home/Spotify";
import { getSpotifyTrack } from "@/lib/spotify";

const SpotifyData = async () => {
  const track = await getSpotifyTrack().catch((error: unknown) => {
    console.error("Spotify fetch error:", error);
    return null;
  });

  return <Spotify track={track} />;
};

const Page = () => {
  return (
    <Container>
      <Hero />

      <Suspense fallback={<div>Loading Spotify...</div>}>
        <SpotifyData />
      </Suspense>

      <SkillsCarousel />
      <Github />
    </Container>
  );
};

export default Page;

import { Container } from "@/components/common/Container";
import { Github } from "@/components/home/Github";
import { Hero } from "@/components/home/Hero";
import { Spotify } from "@/components/home/Spotify";
import { getSpotifyTrack } from "@/lib/spotify";

const page = async () => {
  const initialData = await getSpotifyTrack().catch((error) => {
    console.error("Spotify fetch error:", error);
    return null;
  });

  return (
    <Container>
      <Hero />
      <Spotify initialData={initialData} />
      <Github />
    </Container>
  );
};

export default page;

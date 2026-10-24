import { Suspense } from "react";

import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Blog } from "@/components/home/Blog";
import { Experience } from "@/components/home/Experience";
import { Github } from "@/components/home/Github";
import { Hero } from "@/components/home/Hero";
import { Personal } from "@/components/home/Personal";
import { Projects } from "@/components/home/Projects";
import { Setup } from "@/components/home/Setup";
import { SkillsCarousel } from "@/components/home/SkillsCarousel";
import { Spotify } from "@/components/home/Spotify";
import { Testimonial } from "@/components/home/Testimonial";
import { getAnalytics } from "@/lib/analytics";

const Page = async () => {
  const stats = await getAnalytics("/");

  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Hero />

      <Reveal delay={0.5}>
        <Spotify track={null} />
      </Reveal>

      <Reveal delay={0.6}>
        <SkillsCarousel />
      </Reveal>

      <Reveal delay={0.2}>
        <Github />
      </Reveal>

      <Reveal delay={0.2}>
        <Experience />
      </Reveal>

      <Suspense fallback={<div>Loading projects...</div>}>
        <Projects />
      </Suspense>

      <Suspense fallback={<div>Loading blog...</div>}>
        <Blog />
      </Suspense>

      <Testimonial />

      <Setup />
      <Personal />
    </Container>
  );
};

export default Page;

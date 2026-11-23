import { Suspense } from "react";

import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Blog } from "@/components/home/Blog";
import { Experience } from "@/components/home/Experience";
import { Github } from "@/components/home/Github";
import { Hero } from "@/components/home/Hero";
import InsightsCard from "@/components/home/InsightCard";
import { Personal } from "@/components/home/Personal";
import { Projects } from "@/components/home/Projects";
import { Setup } from "@/components/home/Setup";
import { SkillsCarousel } from "@/components/home/SkillsCarousel";
import { Spotify } from "@/components/home/Spotify";
import { Testimonial } from "@/components/testimonials/Testimonial";
import { SponsorsCard } from "@/components/sponsors/SponsorsCard";

const Page = async () => {
  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Hero />

      <Reveal delay={0.5}>
        <Spotify track={null} />
      </Reveal>

      <Reveal delay={0.6}>
        <SkillsCarousel />
      </Reveal>

      <Suspense fallback={<div>Loading projects...</div>}>
        <Projects />
      </Suspense>

      <Reveal delay={0.1}>
        <Experience />
      </Reveal>

      <Reveal delay={0.1}>
        <Github />
      </Reveal>

      <Suspense fallback={null}>
        <SponsorsCard />
      </Suspense>

      <InsightsCard />

      <Testimonial />

      <Suspense fallback={<div>Loading blog...</div>}>
        <Blog />
      </Suspense>

      <Setup />
      <Personal />
    </Container>
  );
};

export default Page;

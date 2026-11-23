"use client";

import Link from "next/link";

import { Mailbox } from "lucide-react";

import { testimonials } from "@/lib/testimonials";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";
import { Button } from "../ui/button";
import { TestimonialCard } from "./TestimonialCard";

const MIN_WIDTH = 280; // short texts never go narrower than this
const MAX_WIDTH = 620; // long texts never go wider than this
const CARD_CHROME = 72; // padding around the text
const PX_PER_CHAR = 2.6; // aims for about 3 lines of text

// Longer text gets a wider card, so it wraps into fewer lines.
const widthFor = (text: string) =>
  Math.min(
    MAX_WIDTH,
    Math.max(MIN_WIDTH, Math.round(CARD_CHROME + text.length * PX_PER_CHAR))
  );

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  if (!items.length) return null;

  return (
    <div
      className={[
        "testimonial-marquee group overflow-hidden",
        "border-y border-dashed border-neutral-200 dark:border-neutral-800",
        // fade the left and right edges so cards glide in and out
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
      ].join(" ")}
    >
      <div
        className={`testimonial-marquee-track flex items-stretch group-hover:[animation-play-state:paused] ${
          reverse
            ? "testimonial-marquee-reverse"
            : "testimonial-marquee-forward"
        }`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-stretch"
          >
            {items.map((item) => (
              <div
                key={`${copy}-${item.id}`}
                // no fixed height: the row stretches every card to the tallest one
                className="flex shrink-0 border-r border-dashed border-neutral-200 dark:border-neutral-800"
                style={{ width: `min(${widthFor(item.text)}px, 85vw)` }}
              >
                <TestimonialCard item={item} duplicate={copy === 1} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Testimonial = () => {
  const firstRow = testimonials.filter((_, i) => i % 2 === 0);
  const secondRow = testimonials.filter((_, i) => i % 2 !== 0);

  return (
    <Reveal delay={0.1}>
      <Container className="mb-5">
        <section className="space-y-6 overflow-hidden">
          <Heading as="h2" Icon={<Mailbox />}>
            Testimonials
          </Heading>

          <div className="flex flex-col">
            <MarqueeRow items={firstRow} />
            {/* second row sits directly under the first, sharing one border */}
            <div className="-mt-px">
              <MarqueeRow items={secondRow} reverse />
            </div>
          </div>
        </section>

        <div className="mt-7 flex justify-center">
          <Button variant="outline" className="group my-5 w-fit">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2"
            >
              Show all testimonials
            </Link>
          </Button>
        </div>
      </Container>
    </Reveal>
  );
};

export { Testimonial };

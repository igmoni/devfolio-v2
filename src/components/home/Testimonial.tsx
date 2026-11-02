import { Mailbox, Quote } from "lucide-react";

import { testimonials } from "@/lib/testimonials";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";

const Testimonial = () => {
  const isMarquee = testimonials.length >= 3;

  return (
    <Reveal delay={0.1}>
      <Container className="mb-5">
        <section className="space-y-8 overflow-hidden">
          <Heading as="h2" Icon={<Mailbox />}>
            Testimonials
          </Heading>

          <div className="w-full overflow-hidden">
            <div
              className={`flex items-stretch gap-4 ${
                isMarquee ? "animate-marquee w-max" : "w-full justify-center"
              }`}
            >
              {testimonials.map((item) => (
                <article
                  key={item.id}
                  className={`flex shrink-0 flex-col justify-between gap-6 rounded-2xl border border-neutral-200 bg-neutral-100/70 p-6 transition-colors duration-300 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-neutral-700 ${
                    isMarquee
                      ? "w-[min(24.5rem,calc(100vw-3rem))]"
                      : "w-full max-w-full"
                  }`}
                >
                  <Quote
                    size={22}
                    className="text-neutral-400 dark:text-neutral-600"
                  />

                  <p className="text-sm leading-7 wrap-break-word text-neutral-600 dark:text-neutral-400">
                    {item.text}
                  </p>

                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    — {item.name}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </Reveal>
  );
};

export { Testimonial };

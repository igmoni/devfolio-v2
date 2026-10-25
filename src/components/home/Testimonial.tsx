import { Mailbox } from "lucide-react";

import { testimonials } from "@/lib/testimonials";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";

const Testimonial = () => {
  const isMarquee = testimonials.length >= 3;

  return (
    <Reveal delay={0.1}>
      <Container>
        <section className="space-y-8 overflow-hidden">
          <Heading as="h2" Icon={<Mailbox />}>
            Testimonials
          </Heading>

          <div className="w-full overflow-hidden">
            <div
              className={`flex w-max items-center gap-4 ${
                isMarquee
                  ? "animate-marquee"
                  : "mx-auto flex-wrap justify-center"
              }`}
            >
              {testimonials.map((item) => (
                <article
                  key={item.id}
                  className="flex w-[min(22.5rem,calc(100vw-3rem))] shrink-0 flex-col justify-between gap-6 rounded-2xl border border-neutral-200 bg-neutral-100/70 p-5 text-center transition-colors duration-300 hover:border-neutral-300 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-neutral-700"
                >
                  <p className="text-sm leading-7 wrap-break-word text-neutral-600 dark:text-neutral-400">
                    “{item.text}”
                  </p>

                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    - {item.name}
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

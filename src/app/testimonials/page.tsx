import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { Separator } from "@/components/ui/separator";
import { testimonials } from "@/lib/testimonials";

export const metadata = {
  title: "Testimonials",
  description: "What people have to say about my work.",
};

export default function page() {
  return (
    <Container>
      <Reveal>
        <Heading as="h1">what people said.</Heading>
        <SubHeading>Kind words from people who&apos;ve seen my work.</SubHeading>
        <Separator className="my-5 mt-10" />
      </Reveal>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
        {testimonials.map((item, id) => (
          <Reveal delay={id * 0.08} key={id}>
            <div
              key={item.id}
              className="h-full border-b border-dashed border-neutral-800 md:odd:border-r"
            >
              <TestimonialCard item={item} />
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

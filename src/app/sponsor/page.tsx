import type { Metadata } from "next";
import Link from "next/link";

import {
  Armchair,
  ArrowUpRight,
  Coffee,
  FlaskConical,
  HandHeart,
  HeartHandshake,
  type LucideIcon,
  PartyPopper,
  Pencil,
  Receipt,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { SponsorsCard } from "@/components/sponsors/SponsorsCard";
import { TakeSeatButton } from "@/components/sponsors/TakeSeatButton";
import { Separator } from "@/components/ui/separator";
import { sponsorConfig } from "@/config/sponsor";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Support independent, ad-free work. One payment, your name joins the supporters.",
};

type Item = { icon: LucideIcon; title: string; body: string };

const benefits: Item[] = [
  {
    icon: HeartHandshake,
    title: "Keeps it free",
    body: "The registry, the writeups, the demos. Seats keep all of it open and ad free.",
  },
  {
    icon: Receipt,
    title: "Pays the bills",
    body: "Domain, hosting, and the tools behind the site. Boring costs, covered on time.",
  },
  {
    icon: FlaskConical,
    title: "Funds the weird stuff",
    body: "Small experiments and useful components exist because someone backed them early.",
  },
];

const steps: Item[] = [
  {
    icon: Armchair,
    title: "Take a seat",
    body: `Checkout takes about a minute. ${sponsorConfig.price} once, nothing recurring.`,
  },
  {
    icon: Pencil,
    title: "Make it yours",
    body: "Right after payment, add your name, link, and logo on the claim page.",
  },
  {
    icon: PartyPopper,
    title: "Join the supporters",
    body: "One deploy later, your name joins the supporters on the home page, permanently.",
  },
];

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="space-y-6 py-6">
      {items.map(({ icon: Icon, title, body }, i) => (
        <li key={title} className="flex max-w-md items-start gap-4">
          <Icon className="mt-0.5 size-6 shrink-0" strokeWidth={1.5} />
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              <span className="text-muted-foreground mr-2 font-mono text-[10px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {title}
            </p>
            <p className="text-muted-foreground text-sm">{body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

const SponsorPage = () => {
  return (
    <div className="mt-5 px-4 md:px-6 lg:px-0">
      <Container>
        <Reveal>
          <Heading as="h1">Sponsor the work.</Heading>
          <SubHeading>Support the work and help keep it growing.</SubHeading>
          <Separator className="mt-10" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-8 py-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md space-y-4">
              <Heading as="h3">A little support goes a long way.</Heading>
              <SubHeading>
                Everything on this site is built and paid for out of pocket: the
                components, the case studies, the small experiments. Your
                support keeps it independent and ad free. 11.11 dollars monthly,
                and your name stays with the supporters.
              </SubHeading>

              <div className="flex flex-wrap items-start gap-3 pt-2">
                <TakeSeatButton />
                <Link
                  href="/sponsor/claim"
                  className="bg-muted hover:bg-muted/70 inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition"
                >
                  Already paid? Claim it
                </Link>
              </div>

              <p className="text-muted-foreground text-xs">
                Your name and logo stay featured while sponsored. Questions?{" "}
                <a
                  href={sponsorConfig.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground inline-flex items-center gap-0.5 font-medium underline underline-offset-4"
                >
                  DM me on X
                  <ArrowUpRight className="size-3" />
                </a>
              </p>
            </div>

            <div
              className="relative mr-6 hidden h-32 w-48 md:block"
              aria-hidden
            >
              <Sparkles className="text-muted-foreground absolute top-0 left-0 size-6" />
              <Coffee className="text-muted-foreground absolute top-0 right-0 size-6" />
              <HandHeart
                className="absolute bottom-0 left-8 size-20"
                strokeWidth={1.25}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SponsorsCard intro="You just scrolled to the most important section of the site. This tiny project is sponsored by:" />
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <Heading as="h2">What a seat does</Heading>
            <ItemList items={benefits} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <Heading as="h2">How it works</Heading>
            <ItemList items={steps} />
          </div>
        </Reveal>
      </Container>
    </div>
  );
};

export default SponsorPage;

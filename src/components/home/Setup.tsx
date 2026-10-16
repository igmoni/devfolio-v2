import Link from "next/link";

import { ArrowRight, Code2 } from "lucide-react";

import { setupConfig } from "@/config/common";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";

const Setup = () => {
  return (
    <Container>
      <Heading Icon={<Code2 />} as="h2">
        Development
      </Heading>
      <div className="my-5 flex flex-col gap-5">
        {setupConfig.map((item) => (
          <SetupCard
            title={item.title}
            description={item.description}
            href={item.href}
          />
        ))}
      </div>
    </Container>
  );
};

export { Setup };

const SetupCard = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl bg-neutral-100 p-3 px-5 ring ring-neutral-300 dark:bg-neutral-900 dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2)] dark:ring-neutral-800"
    >
      <div>
        <h4 className="text-base font-semibold">{title}</h4>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
      <ArrowRight className="text-neutral-500 opacity-0 transition-all duration-200 group-hover:opacity-100" />
    </Link>
  );
};

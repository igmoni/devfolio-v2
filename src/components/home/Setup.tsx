import { Code2 } from "lucide-react";

import { setupConfig } from "@/config/common";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { NavigationCard } from "../common/NavigationCard";
import { Reveal } from "../common/Reveal";

const Setup = () => {
  return (
    <Reveal delay={0.1}>
      <Container>
        <Heading Icon={<Code2 />} as="h2">
          Development
        </Heading>
        <div className="my-5 flex flex-col gap-3">
          {setupConfig.map((item, id) => (
            <Reveal delay={id * 0.2}>
              <NavigationCard
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Reveal>
  );
};

export { Setup };

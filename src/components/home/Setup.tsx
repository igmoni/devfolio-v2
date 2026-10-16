import { Code2 } from "lucide-react";

import { setupConfig } from "@/config/common";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { NavigationCard } from "../common/NavigationCard";

const Setup = () => {
  return (
    <Container>
      <Heading Icon={<Code2 />} as="h2">
        Development
      </Heading>
      <div className="my-5 flex flex-col gap-3">
        {setupConfig.map((item) => (
          <NavigationCard
            key={item.title}
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

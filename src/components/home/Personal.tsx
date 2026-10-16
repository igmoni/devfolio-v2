import { Signature } from "lucide-react";

import { personalConfig } from "@/config/common";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { NavigationCard } from "../common/NavigationCard";

const Personal = () => {
  return (
    <Container>
      <Heading as="h2" Icon={<Signature />}>
        Personal
      </Heading>
      <div className="my-5 flex flex-col gap-3">
        {personalConfig.map((item) => (
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

export { Personal };

import { Signature } from "lucide-react";

import { personalConfig } from "@/config/common";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { NavigationCard } from "../common/NavigationCard";
import { Reveal } from "../common/Reveal";

const Personal = () => {
  return (
    <Reveal delay={0.1}>
      <Container>
        <Heading as="h2" Icon={<Signature />}>
          Personal
        </Heading>
        <div className="my-5 flex flex-col gap-3">
          {personalConfig.map((item, id) => (
            <Reveal delay={id * 0.1}>
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

export { Personal };

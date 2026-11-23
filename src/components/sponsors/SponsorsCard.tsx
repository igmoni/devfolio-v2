import { MessageSquareQuote } from "lucide-react";

import { getSponsors } from "@/lib/sponsors/sponsors";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { SponsorsGrid } from "./SponsorsGrid";

const SponsorsCard = async ({ intro }: { intro?: string }) => {
  const sponsors = await getSponsors();

  return (
    <Container>
      <Heading as="h2" Icon={<MessageSquareQuote />}>
        Sponsors
      </Heading>
      <SponsorsGrid sponsors={sponsors} intro={intro} />
    </Container>
  );
};

export { SponsorsCard };

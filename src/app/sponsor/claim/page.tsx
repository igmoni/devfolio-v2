import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { ClaimForm } from "@/components/sponsors/ClaimForm";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Claim your seat",
  robots: { index: false },
};

type Props = { searchParams: Promise<{ payment_id?: string }> };

const ClaimPage = async ({ searchParams }: Props) => {
  const { payment_id } = await searchParams;

  return (
    <Container>
      <Reveal>
        <div className="space-y-2 pt-2">
          <Heading as="h1">Claim your seat</Heading>
          <SubHeading>
            Add your name, a link and a logo so people know who helps keep the
            work independent.
          </SubHeading>
          <Separator className="my-5" />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ClaimForm initialPaymentId={payment_id ?? ""} />
      </Reveal>
    </Container>
  );
};

export default ClaimPage;

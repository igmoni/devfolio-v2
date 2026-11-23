import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { SubHeading } from "@/components/common/SubHeading";
import { ClaimForm } from "@/components/sponsors/ClaimForm";

export const metadata: Metadata = {
  title: "Claim your seat",
  robots: { index: false },
};

type Props = { searchParams: Promise<{ payment_id?: string }> };

const ClaimPage = async ({ searchParams }: Props) => {
  const { payment_id } = await searchParams;

  return (
    <Container>
      <div className="space-y-2 pt-2">
        <Heading as="h1">Claim your seat</Heading>
        <SubHeading>
          Add your name, a link and a logo so people know who helps keep the
          work independent.
        </SubHeading>
      </div>

      <ClaimForm initialPaymentId={payment_id ?? ""} />
    </Container>
  );
};

export default ClaimPage;

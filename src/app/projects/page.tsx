import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <Container className="mt-5">
      <Reveal>
        <Heading as="h1">Projects</Heading>
        <SubHeading>A few products and experiments I've shipped.</SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>
    </Container>
  );
};

export default page;

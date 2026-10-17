import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <Container className="mt-5">
      <Heading as="h1">Blog</Heading>
      <SubHeading>
        Thoughts, tutorials, and insights on engineering and programming.
      </SubHeading>
      <Separator className="my-5 mt-10" />
    </Container>
  );
};

export default page;

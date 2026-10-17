import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { movies } from "@/lib/personal";

const page = () => {
  return (
    <Container className="mt-5">
      <Heading as="h1">Movies</Heading>
      <SubHeading>
        Movies and shows that have inspired and entertained me.
      </SubHeading>

      <Separator className="my-5 mt-10" />
      <div className="my-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {movies.map((item) => (
          <div className="rounded-xl bg-neutral-100 p-3 px-5 ring ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700">
            <h3 className="font-semibold">{item.title}</h3>
            <SubHeading className="mt-1">{item.year}</SubHeading>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default page;

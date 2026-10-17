import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { experience } from "@/config/experience";

const page = () => {
  return (
    <Container className="mt-5">
      <Heading as="h1">Work Experience</Heading>
      <SubHeading>
        My work experiences across different companies and roles.
      </SubHeading>
      <Separator className="my-5 mt-10" />
      <div className="mt-10 flex flex-col gap-8">
        {experience.map((item) => {
          return (
            <article key={item.id} className="group relative py-2">
              <div>
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-neutral-800 dark:text-neutral-200">
                        {item.company}
                      </h3>
                    </div>

                    <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {item.post}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-500 sm:text-right">
                      {item.duration}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500 sm:text-right">
                      {item.place}
                    </p>
                  </div>
                </div>
                <div className="my-2 h-px w-full bg-neutral-200 dark:bg-neutral-800" />

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {item.description}
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-neutral-200">
                      Technologies &amp; Tools
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map(({ name, icon: Icon }) => (
                        <span
                          key={name}
                          title={name}
                          className="group/icon border-border bg-muted/50 text-foreground hover:bg-muted focus-visible:ring-ring inline-flex items-center gap-0 rounded-md border border-dashed px-2 py-2 text-sm font-medium transition-all duration-300 ease-out outline-none hover:scale-[1.03] hover:gap-1.5 hover:shadow-sm focus-visible:gap-1.5 focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          <span className="flex size-5 shrink-0 items-center justify-center">
                            <Icon />
                          </span>

                          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover/icon:max-w-24 group-hover/icon:opacity-100">
                            {name}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-neutral-200">
                      What I did
                    </h4>

                    <ul className="space-y-2">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="text-sm leading-6 text-neutral-400"
                        >
                          <span className="mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Container>
  );
};

export default page;

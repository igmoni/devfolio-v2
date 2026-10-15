"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { experience } from "@/config/experience";
import { Experience as Exp } from "@/svgs/essentials/Experience";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Button } from "../ui/button";

const Experience = () => {
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleExperience = (id: number) => {
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <Container>
      <Heading
        as="h2"
        className="-ml-1.5 flex items-center gap-2"
        Icon={<Exp className={"size-6"} />}
      >
        Experience
      </Heading>

      <div className="relative mt-8">
        {/* One continuous timeline line */}
        <div className="absolute -top-5 bottom-0 left-1.25 w-px bg-neutral-800" />

        <div className="flex flex-col gap-8">
          {experience.map((item) => {
            const isExpanded = expanded.includes(item.id);

            return (
              <article key={item.id} className="group relative py-2">
                {/* One dot for every experience */}
                <span className="ring-background absolute top-3.5 left-0 z-10 size-2.75 rounded-full bg-neutral-500 ring-4" />

                <div className="pl-8">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-neutral-800 dark:text-neutral-200">
                          {item.post}
                        </h3>

                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${item.post} details`}
                          onClick={() => toggleExperience(item.id)}
                          className="rounded-md p-1 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 group-hover:opacity-100 ${
                              isExpanded
                                ? "rotate-180 opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </button>
                      </div>

                      <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        {item.company}
                      </p>
                    </div>

                    <p className="text-sm text-neutral-500 sm:text-right">
                      {item.duration}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    {item.description}
                  </p>

                  {isExpanded && (
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
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {experience.length > 3 && (
        <div className="flex justify-center">
          <Button variant={"outline"} className={"my-3 w-fit"}>
            Show all work experiences
          </Button>
        </div>
      )}
    </Container>
  );
};

export { Experience };

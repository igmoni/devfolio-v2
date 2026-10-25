"use client";

import { useEffect, useState } from "react";

import { Dumbbell, Footprints, Languages, Waves } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";

const gymStats = [
  { subject: "Bench", weight: 45, max: 100 },
  { subject: "Squat", weight: 50, max: 100 },
  { subject: "Leg Press", weight: 80, max: 150 },
  { subject: "Shoulder", weight: 35, max: 80 },
  { subject: "Deadlift", weight: 90, max: 150 },
].map((stat) => ({
  ...stat,
  percentage: Math.min((stat.weight / stat.max) * 100, 100),
}));

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
  { name: "Marathi", level: "Fluent" },
  { name: "Kannada", level: "Fluent" },
  { name: "Tamil", level: "Conversational" },
  { name: "French", level: "Learning" },
];

const activities = [
  {
    title: "Running",
    description: "A few 10Ks and 5Ks so far.",
    icon: Footprints,
  },
  {
    title: "Swimming",
    description: "Working on technique, endurance, and staying active.",
    icon: Waves,
  },
];

const Page = () => {
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setBarsVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Side Quests</Heading>

        <SubHeading>
          What I do when I&apos;m not building: gym, running, swimming, and exploring
          languages.
        </SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      {/* Gym */}
      <Reveal delay={0.1}>
        <section className="space-y-6">
          <Heading as="h2" Icon={<Dumbbell />}>
            Gym
          </Heading>

          <div className="grid gap-8 rounded-2xl border border-neutral-200 bg-neutral-100/50 p-5 md:grid-cols-2 md:items-center md:p-8 dark:border-neutral-800 dark:bg-neutral-900/40">
            {/* Radar chart */}
            <div className="h-[280px] min-w-0 sm:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={gymStats} outerRadius="68%" cx="50%" cy="50%">
                  <PolarGrid stroke="#404040" />

                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: "currentColor",
                      fontSize: 11,
                    }}
                  />

                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />

                  <Radar
                    dataKey="percentage"
                    stroke="#0EA5E9"
                    fill="#0EA5E9"
                    fillOpacity={0.25}
                    strokeWidth={2}
                    dot={{
                      r: 3,
                      fill: "#0EA5E9",
                    }}
                    isAnimationActive
                    animationBegin={200}
                    animationDuration={1400}
                    animationEasing="ease-out"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Weight progress bars */}
            <div className="space-y-6">
              {gymStats.map((stat, index) => (
                <div key={stat.subject} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {stat.subject}
                    </span>

                    <span className="shrink-0 font-medium text-sky-500 tabular-nums">
                      {stat.weight} / {stat.max} kg
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-sky-500 transition-[width] duration-[1200ms] ease-out"
                      style={{
                        width: barsVisible
                          ? `${Math.min((stat.weight / stat.max) * 100, 100)}%`
                          : "0%",
                        transitionDelay: barsVisible
                          ? `${index * 120}ms`
                          : "0ms",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Separator className="my-10" />

      {/* Running and swimming */}
      <Reveal delay={0.1}>
        <section className="space-y-6">
          <Heading as="h2">Outside the gym</Heading>

          <div className="grid gap-4 sm:grid-cols-2">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <article
                  key={activity.title}
                  className="rounded-2xl border border-neutral-200 bg-neutral-100/50 p-6 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700"
                >
                  <Icon
                    className="mb-5 text-neutral-500"
                    size={22}
                    strokeWidth={1.5}
                  />

                  <h3 className="font-medium">{activity.title}</h3>

                  <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                    {activity.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </Reveal>

      <Separator className="my-10" />

      {/* Languages */}
      <Reveal delay={0.1}>
        <section className="space-y-6 pb-12">
          <Heading as="h2" Icon={<Languages />}>
            Languages
          </Heading>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((language) => (
              <div
                key={language.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-100/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/40"
              >
                <span className="text-sm font-medium">{language.name}</span>

                <span className="text-xs text-neutral-500">
                  {language.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </Container>
  );
};

export default Page;

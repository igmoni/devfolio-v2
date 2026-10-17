import Link from "next/link";

import { LinkIcon, Puzzle } from "lucide-react";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import {
  devices,
  software,
  vsCodeExtensions,
  webExtensions,
} from "@/lib/gears";
import { Monitor } from "@/svgs/devices/Monitor";

const Page = () => {
  return (
    <Container className="mt-5">
      <Reveal>
        <Heading as="h1">Gears</Heading>
        <SubHeading>My gears and tools I use to get my work done.</SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>
      {/* Devices */}
      <Reveal delay={0.1}>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Devices</h2>

          <div className="flex flex-col gap-4">
            {devices.map((device) => {
              const Icon = device.icon;

              return (
                <div key={device.name} className="flex items-center gap-4">
                  <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736f70] dark:border-white/10">
                    <Icon className="size-5" />
                  </div>

                  <div className="flex items-center gap-1">
                    <Link
                      href={device.href}
                      className="text-sm text-neutral-500 underline-offset-2"
                      target="_blank"
                    >
                      {device.name}
                    </Link>
                    <LinkIcon className="size-4 text-neutral-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        {/* Web Extensions */}
        <div className="space-y-4 pt-10">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736f70] dark:border-white/10">
              <Puzzle className="size-4" />
            </div>
            <h2 className="text-2xl font-semibold">Web Extensions</h2>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {webExtensions.map((extension, index) => (
              <div key={extension.name} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-black/10 bg-neutral-100 text-neutral-900 dark:border-white/10 dark:bg-neutral-800 dark:text-white">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>

                  <h3 className="text-secondary ml-4 flex items-center gap-1 text-sm underline-offset-2 hover:underline">
                    <Link
                      target="_blank"
                      href={extension.href}
                      className="text-neutral-500"
                    >
                      {extension.name}
                    </Link>
                    <LinkIcon className="size-4 text-neutral-500" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        {/* Software */}
        <div className="space-y-4 pt-10">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736f70] dark:border-white/10">
              <Monitor className="size-4" />
            </div>
            <h2 className="text-2xl font-semibold">Software</h2>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {software.map((app, index) => (
              <div key={app.name} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-black/10 bg-neutral-100 text-neutral-900 dark:border-white/10 dark:bg-neutral-800 dark:text-white">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>

                  <h3 className="text-secondary ml-4 flex items-center gap-1 text-sm underline-offset-2 hover:underline">
                    <Link
                      target="_blank"
                      href={app.href}
                      className="text-neutral-500"
                    >
                      {app.name}
                    </Link>
                    <LinkIcon className="size-4 text-neutral-500" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.4}>
        {/* VS Code / Cursor Extensions */}
        <div className="space-y-4 pt-10">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736f70] dark:border-white/10">
              <Puzzle className="size-4" />
            </div>
            <h2 className="text-2xl font-semibold">
              VS Code/Cursor Extensions
            </h2>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {vsCodeExtensions.map((extension, index) => (
              <div key={extension.name} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-black/10 bg-neutral-100 text-neutral-900 dark:border-white/10 dark:bg-neutral-800 dark:text-white">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>

                  <h3 className="text-secondary ml-4 flex items-center gap-1 text-sm underline-offset-2 hover:underline">
                    <Link
                      target="_blank"
                      href={extension.href}
                      className="text-neutral-500"
                    >
                      {extension.name}
                    </Link>
                    <LinkIcon className="size-4 text-neutral-500" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
};

export default Page;

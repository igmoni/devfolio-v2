"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { footerLinks } from "@/config/common";
import { heroConfig } from "@/config/hero";

import { Container } from "./Container";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  const { socialLinks: socials, name } = heroConfig;
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 pb-24 dark:border-neutral-800 dark:bg-neutral-900">
      <Container className="px-5 pt-16 pb-8 sm:pt-24">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
              Have a project in mind?
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-start gap-2 text-5xl leading-none tracking-tight sm:text-7xl"
            >
              Let&apos;s talk
              <ArrowUpRight className="mt-1 size-7 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-10" />
            </Link>
          </div>

          <p className="max-w-xs text-sm leading-6 text-neutral-500">
            Building things for the web, exploring ideas, and figuring things
            out along the way.
          </p>
        </div>

        <div className="my-12 h-px bg-neutral-800 sm:my-16" />

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">
              Explore
            </p>

            <nav className="flex flex-wrap gap-x-5 gap-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="sm:justify-self-end">
            <p className="mb-4 font-mono text-xs tracking-widest text-neutral-500 uppercase">
              Elsewhere
            </p>

            <div className="flex flex-wrap gap-4">
              {socials.map(({ id, name, icon: Icon, value }) => (
                <a
                  key={id}
                  href={value}
                  target={value.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    value.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={name}
                  title={name}
                  className="text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
                >
                  <Icon className={"size-6"} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-neutral-800 pt-6 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year ?? "abc"} {name}. All rights reserved.
          </span>
          <span>Designed & built with intention.</span>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };

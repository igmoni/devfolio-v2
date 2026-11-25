import Image from "next/image";

import { ArrowUpRight, Quote } from "lucide-react";

import { getAvatar, type Testimonial } from "@/lib/testimonials";

type Props = {
  item: Testimonial;
  duplicate?: boolean;
};

export function TestimonialCard({ item, duplicate = false }: Props) {
  const avatar = getAvatar(item);
  const isGenerated = !item.avatar;

  const className =
    "group relative flex min-w-0 flex-1 flex-col justify-between gap-6 overflow-hidden bg-white p-6 transition-colors duration-300 hover:bg-neutral-50 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-950/80";

  const content = (
    <>
      {/* Accent line */}
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-[#2563eb] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />

      {/* Quote mark */}
      <Quote
        aria-hidden
        className="absolute top-4 right-4 size-8 -rotate-6 text-neutral-300 opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100 dark:text-neutral-700"
        strokeWidth={1.5}
      />

      {/* Testimonial */}
      <p className="w-full min-w-0 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {item.text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={item.name}
          width={36}
          height={36}
          unoptimized={isGenerated}
          className="size-9 shrink-0 rounded-full object-cover ring-1 ring-neutral-200 transition duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:ring-neutral-400 dark:ring-neutral-800 dark:group-hover:ring-neutral-500"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-tight font-semibold text-neutral-900 dark:text-neutral-100">
            {item.name}
          </p>

          <p className="font-mono text-[11px] leading-snug text-neutral-500 dark:text-neutral-500">
            {item.role}
          </p>
        </div>

        {item.link && (
          <ArrowUpRight
            size={16}
            className="shrink-0 text-neutral-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:text-neutral-600 dark:group-hover:text-neutral-200"
          />
        )}
      </div>
    </>
  );

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={duplicate ? -1 : undefined}
        aria-hidden={duplicate || undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <article aria-hidden={duplicate || undefined} className={className}>
      {content}
    </article>
  );
}

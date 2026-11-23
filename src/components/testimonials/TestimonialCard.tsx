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
    "testimonial-card-pattern group relative flex w-full min-h-40 flex-col justify-between gap-6 overflow-hidden p-6 transition-colors duration-300 hover:bg-white/[0.02]";

  const content = (
    <>
      {/* accent line that draws in on hover */}
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#4b9bff] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />

      {/* faint quote mark */}
      <Quote
        aria-hidden
        className="absolute top-4 right-4 size-8 -rotate-6 text-neutral-800 opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100"
        strokeWidth={1.5}
      />

      <p className="text-muted-foreground pr-6 text-[15px] leading-relaxed">
        {item.text}
      </p>

      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={item.name}
          width={36}
          height={36}
          unoptimized={isGenerated}
          className="size-9 shrink-0 rounded-full object-cover ring-1 ring-neutral-800 transition duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:ring-neutral-500"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-tight font-semibold text-neutral-100">
            {item.name}
          </p>
          <p className="font-mono text-[11px] leading-snug text-neutral-500">
            {item.role}
          </p>
        </div>

        {item.link && (
          <ArrowUpRight
            size={16}
            className="shrink-0 text-neutral-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-200"
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

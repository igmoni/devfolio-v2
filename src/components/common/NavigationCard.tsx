import Link from "next/link";

import { ArrowRight } from "lucide-react";

export const NavigationCard = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl bg-neutral-100 p-3 px-5 ring ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700"
    >
      <div>
        <h4 className="text-base font-semibold">{title}</h4>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
      <ArrowRight className="text-neutral-500 opacity-0 transition-all duration-200 group-hover:opacity-100" />
    </Link>
  );
};

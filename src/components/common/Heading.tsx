import React from "react";

import { cn } from "cn";

import { instrumentSerif } from "@/config/font";

type HeadingProps = {
  children: React.ReactNode;
  as: "h1" | "h2" | "h3" | "h4";
  className?: string;
  Icon?: React.ReactNode;
};

const headingSizes = {
  h1: "text-4xl sm:text-6xl",
  h2: "text-3xl sm:text-4xl",
  h3: "text-2xl sm:text-3xl",
  h4: "text-xl sm:text-2xl",
};

const Heading = ({ children, className, as, Icon }: HeadingProps) => {
  const Tag = as;

  return (
    <Tag
      className={cn(
        "mt-7 font-semibold italic",
        headingSizes[as],
        instrumentSerif.className,
        Icon && "flex items-center gap-2",
        className
      )}
    >
      {Icon}
      {children}
    </Tag>
  );
};

export { Heading };

import React from "react";

import { cn } from "cn";

import { instrumentSerif } from "@/config/font";

const Heading = ({
  children,
  className,
  as,
}: {
  children: React.ReactNode;
  as: "h1" | "h2" | "h3";
  className?: string;
}) => {
  const Tag = as;
  return (
    <Tag
      className={cn(
        `mt-7 text-3xl font-semibold ${instrumentSerif.className} italic`,
        className
      )}
    >
      {children}
    </Tag>
  );
};

export { Heading };

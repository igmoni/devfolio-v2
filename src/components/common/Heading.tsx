
import React from "react";
import { cn } from "cn";
import { instrumentSerif } from "@/config/font";

type HeadingProps = {
  children: React.ReactNode;
  as: "h1" | "h2" | "h3";
  className?: string;
  Icon?: React.ReactNode;
};

const Heading = ({ children, className, as, Icon }: HeadingProps) => {
  const Tag = as;

  return (
    <Tag
      className={cn(
        `mt-7 text-3xl font-semibold ${instrumentSerif.className} italic`,
        Icon && "flex items-center gap-2",
        className,
      )}
    >
      {Icon}
      {children}
    </Tag>
  );
};

export { Heading };

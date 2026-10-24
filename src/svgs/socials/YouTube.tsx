import { cn } from "cn";

import { SvgType } from "@/types/common";

const YouTubeIcon = ({ className }: SvgType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube",
        className
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      {/* Outer box */}
      <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />

      {/* Play */}
      <path d="M10 9l5 3l-5 3l0 -6" />
    </svg>
  );
};

export { YouTubeIcon };

import { cn } from "cn";

import { SvgType } from "@/types/common";

const Pinterest = ({ className }: SvgType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("", className)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      {/* Pin line */}
      <path d="M8 20l4 -9" />

      {/* Curve */}
      <path d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7" />

      {/* Circle */}
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    </svg>
  );
};

export { Pinterest };

import React from "react";

const Sponsor = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 64 64"
      fill="none"
      color="currentColor"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="text-foreground [--cutout-paper:var(--background)] dark:[--cutout-ink:var(--background)] dark:[--cutout-paper:var(--foreground)]"
      //   style="--cutout-accent:var(--primary);--cutout-wash:color-mix(in oklch, var(--primary) 18%, var(--cutout-paper))"
    >
      <g
        transform="rotate(8 32 32)"
        color="var(--cutout-ink, currentColor)"
        stroke="currentColor"
      >
        <path
          d="M29 10 35 25 51 30 36 37 30 54 23 39 8 33 23 26Z"
          transform="translate(1 2)"
          fill="var(--foreground)"
          stroke="var(--foreground)"
          stroke-width="10"
          opacity="0.1"
        ></path>
        <path
          d="M29 10 35 25 51 30 36 37 30 54 23 39 8 33 23 26Z"
          fill="var(--cutout-paper)"
          stroke="var(--cutout-paper)"
          stroke-width="9"
        ></path>
        <path
          d="M29 10 35 25 51 30 36 37 30 54 23 39 8 33 23 26Z"
          fill="var(--cutout-wash)"
        ></path>
        <path
          d="m29 10 1 23 21-3-15 7-6 17V33L8 33l15-7Z"
          fill="currentColor"
          stroke-width="1.5"
        ></path>
        <path
          d="m47 8 1 5 5 2-5 2-1 5-2-5-4-2 4-2Z"
          fill="var(--chart-1)"
          stroke-width="2"
        ></path>
        <path d="m12 47-2 3m34-3 3 3" stroke-width="2.5"></path>
      </g>
    </svg>
  );
};

export { Sponsor };

import { cn } from "cn";

export default function Mail({ className }: SvgType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("", className)}
    >
      <g transform="scale(10.6667)">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />

        <path d="M3 7l9 6l9 -6" />
      </g>
    </svg>
  );
}

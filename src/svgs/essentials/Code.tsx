import { cn } from "cn";

const Code = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 18c1.81-1.58 3.44-3.42 4.84-5.49.21-.3.21-.72 0-1.02C20.44 9.42 18.81 7.58 17 6M7 18c-1.82-1.58-3.45-3.42-4.85-5.49-.2-.3-.2-.72 0-1.02C3.55 9.42 5.18 7.58 7 6m7-2-4 16"
      />
    </svg>
  );
};

export { Code };

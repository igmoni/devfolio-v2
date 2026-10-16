import { cn } from "cn";

const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-base text-neutral-500", className)}>{children}</p>
  );
};

export { SubHeading };

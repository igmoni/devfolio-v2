import { cn } from "@/lib/utils";
import { ContainerProps } from "@/types/common";

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section className={cn("mx-auto mt-5 mb-10 w-full max-w-3xl", className)}>
      {children}
    </section>
  );
};

export { Container };

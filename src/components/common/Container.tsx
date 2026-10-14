import { cn } from "@/lib/utils";

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section className={cn("mx-auto max-w-5xl bg-green-500", className)}>
      {children}
    </section>
  );
};

export { Container };

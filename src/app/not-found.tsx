import Link from "next/link";

import { Footer } from "@/components/common/Footer";
import { Quote } from "@/components/common/Quote";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col">
      <section className="flex flex-1 flex-col items-center justify-center px-5 py-30 text-center">
        <p className="text-foreground text-7xl font-bold tracking-tight sm:text-8xl">
          404
        </p>

        <h1 className="text-foreground mt-2 text-lg font-semibold sm:text-xl">
          Page not found
        </h1>

        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6 sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-7 flex items-center gap-3">
          <Button variant="default">
            <Link href="/">Home</Link>
          </Button>

          <Button variant={"secondary"}>
            <Link href="/blog">Blog</Link>
          </Button>
        </div>
      </section>

      <Quote />
      <Footer />
    </main>
  );
}

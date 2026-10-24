import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function Coffee({ className }: { className?: string }) {
  return (
    <Link
      href="https://www.buymeacoffee.com/igmoni"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <Image
        src="/assets/coffee.png"
        alt="Buy Me A Coffee"
        width={100}
        height={100}
        className={cn(
          "dark:shadow-acternity-white size-10 rounded-md",
          className
        )}
      />
    </Link>
  );
}

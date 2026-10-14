import Link from "next/link";

import { navItems } from "@/config/common";

import { Container } from "./Container";

const Navbar = () => {
  return (
    <Container
      className={
        "absolute bottom-5 left-1/2 h-14 max-w-4xl rounded-xl bg-white text-black shadow-sm"
      }
    >
      <div className="flex items-center gap-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} className="size-10" href={item.value}>
              <Icon className="size-7 text-neutral-500" />
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export { Navbar };

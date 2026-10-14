import Link from "next/link";

import { navItems, navSocialLinks } from "@/config/common";

import { Container } from "./Container";
import { ToggleTheme } from "./ToggleTheme";

const Navbar = () => {
  return (
    <Container
      className={
        "absolute bottom-5 left-1/2 flex h-14 max-w-4xl -translate-x-1/2 items-center gap-3 rounded-3xl bg-white p-2 text-black shadow-sm ring ring-neutral-200"
      }
    >
      <div className="flex items-center gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              className="flex size-10 items-center justify-center rounded-2xl shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1)] ring ring-neutral-200"
              href={item.value}
            >
              <Icon className="size-5 text-neutral-500" />
            </Link>
          );
        })}
      </div>
      <div className="h-full w-[1.5px] bg-linear-to-b from-white via-neutral-300 to-white" />
      <div className="flex items-center gap-3">
        {navSocialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              className="flex size-10 items-center justify-center rounded-2xl shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1)] ring ring-neutral-200"
              href={item.value}
            >
              <Icon className="size-5 text-neutral-500" />
            </Link>
          );
        })}
      </div>
      <div className="h-full w-[1.5px] bg-linear-to-b from-white via-neutral-300 to-white" />
      <div className="flex size-10 cursor-pointer items-center justify-center rounded-2xl shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1)] ring ring-neutral-200">
        <ToggleTheme />
      </div>
    </Container>
  );
};

export { Navbar };

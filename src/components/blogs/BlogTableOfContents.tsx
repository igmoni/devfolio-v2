"use client";

import { useEffect, useState } from "react";

import { List, X } from "lucide-react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function BlogTableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById("blog-content");
    if (!article) return;

    const headings = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2")
    ).filter((heading) => heading.id && heading.textContent?.trim());

    const tocItems = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent!.trim(),
      level: Number(heading.tagName.slice(1)),
    }));

    setItems(tocItems);

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(
        scrollableHeight > 0
          ? Math.min(
              100,
              Math.max(0, (window.scrollY / scrollableHeight) * 100)
            )
          : 0
      );
    };

    const updateActive = () => {
      let current = tocItems[0]?.id ?? "";

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 140) {
          current = heading.id;
        } else {
          break;
        }
      }

      setActiveId(current);
      updateProgress();
    };

    updateActive();

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  if (!items.length) return null;

  const activeIndex = items.findIndex((item) => item.id === activeId);

  return (
    <div className="fixed top-6 right-5 z-50 sm:top-8 sm:right-8">
      {/* Circular progress button */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={
          isOpen ? "Close table of contents" : "Open table of contents"
        }
        aria-expanded={isOpen}
        className="relative flex size-11 items-center justify-center rounded-full border border-white/15 bg-[#111111] text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg
          viewBox="0 0 44 44"
          className="absolute inset-0 size-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 119.38} 119.38`}
            className="transition-[stroke-dasharray] duration-150"
          />
        </svg>
      </button>

      {/* TOC panel */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close table of contents"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 -z-10 cursor-default"
          />

          <nav
            aria-label="Table of contents"
            className="absolute top-14 right-0 w-100 overflow-hidden rounded-2xl border border-white/10 bg-[#191919] text-white shadow-2xl"
          >
            <div className="px-4 pt-4 pb-3">
              <p className="text-[11px] font-bold tracking-[0.14em] text-white/40 uppercase">
                Table of contents
              </p>
            </div>

            <ul className="max-h-[min(65vh,600px)] [scrollbar-width:none] space-y-0.5 overflow-y-auto px-3 pb-3 [&::-webkit-scrollbar]:hidden">
              {items.map((item, index) => {
                const active = activeId === item.id;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setActiveId(item.id)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] leading-5 transition-colors ${
                        item.level === 3 ? "pl-6" : ""
                      } ${
                        active
                          ? "bg-white/10 font-semibold text-white"
                          : "text-white/55 hover:bg-white/[0.04] hover:text-white/90"
                      }`}
                    >
                      <span className="min-w-0 flex-1">{item.text}</span>

                      {active && (
                        <span className="size-1.5 shrink-0 rounded-full bg-white" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

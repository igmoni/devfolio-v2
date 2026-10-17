"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

export function PageViews() {
  const pathname = usePathname();
  const [views, setViews] = useState<number | 0>(0);

  useEffect(() => {
    const controller = new AbortController();

    setViews(0);

    fetch(`/api/analytics?path=${encodeURIComponent(pathname)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Analytics fetch failed");
        return res.json();
      })
      .then((data) => setViews(data.pageviews))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, [pathname]);

  return (
    <div className="mx-auto mt-10 mb-5 flex w-fit items-center justify-center rounded-xl border border-neutral-200 px-5 py-2 dark:border-neutral-700">
      <p className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-green-500" />
        {new Intl.NumberFormat("en", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(views)}{" "}
        views
      </p>
    </div>
  );
}

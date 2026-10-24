"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { EyeIcon } from "lucide-react";

export function PageViews() {
  const pathname = usePathname();

  const [viewData, setViewData] = useState<{
    pathname: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/analytics?path=${encodeURIComponent(pathname)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Analytics fetch failed");
        return res.json();
      })
      .then((data) => {
        setViewData({
          pathname,
          count: data.pageviews,
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, [pathname]);

  const views = viewData?.pathname === pathname ? viewData.count : 0;

  return (
    <div className="mx-auto flex w-fit items-center justify-center rounded-xl border border-neutral-200 px-2 py-0.5 text-neutral-500 dark:border-neutral-700">
      <p className="flex items-center gap-2">
        <EyeIcon className="text-neutral-500" />
        {new Intl.NumberFormat("en", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(views)}
      </p>
    </div>
  );
}

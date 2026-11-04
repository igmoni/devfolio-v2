import { after, NextResponse } from "next/server";

import { createGeoProxy } from "@usenotra/geo/next";

const geo = createGeoProxy({
  token: process.env.NOTRA_GEO_TOKEN!,
  endpoint: "https://ingest.usenotra.com",
});

export function proxy(request: Request) {
  after(() => geo(request));
  return NextResponse.next();
}

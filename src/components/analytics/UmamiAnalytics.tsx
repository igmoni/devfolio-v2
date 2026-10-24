import { Suspense } from "react";

import UmamiClient from "./UmamiClient";

export function UmamiAnalytics() {
  return (
    <Suspense fallback={null}>
      <UmamiClient />
    </Suspense>
  );
}

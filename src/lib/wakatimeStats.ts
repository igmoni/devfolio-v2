import type {
  WakaTimeApiResponse,
  WakaTimeData,
  WakaTimeHeartbeat,
  WakaTimeStatus,
} from "@/types/wakatime";

export function normalizeEditor(name?: string): string {
  if (!name) return "Cursor";

  const value = name.toLowerCase();

  if (value.includes("cursor")) return "Cursor";

  if (
    value.includes("visual studio") ||
    value.includes("vs code") ||
    value.includes("vscode")
  ) {
    return "VS Code";
  }

  return name;
}

// Convert seconds into a readable duration.
export function formatDuration(totalSeconds = 0): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} min ${remainingSeconds} sec`;
  }

  return `${minutes} min ${remainingSeconds} sec`;
}

// Safely read a heartbeat timestamp, in milliseconds.
function getHeartbeatTime(heartbeat: WakaTimeHeartbeat): number {
  if (typeof heartbeat.time === "number") {
    return heartbeat.time * 1000;
  }

  if (heartbeat.created_at) {
    return new Date(heartbeat.created_at).getTime();
  }

  return 0;
}

// Convert the WakaTime API response into the shape our UI needs.
export function parseWakaTime(
  apiData: WakaTimeApiResponse,
  options: {
    now?: number;
    onlineThresholdSeconds?: number;
  } = {}
): WakaTimeData {
  const now = options.now ?? Date.now();
  const thresholdMs = (options.onlineThresholdSeconds ?? 180) * 1000;

  const heartbeats = apiData.heartbeats?.data ?? [];
  const today = apiData.todaySummary?.data?.[0];
  const yesterday = apiData.yesterdaySummary?.data?.[0];

  const yesterdayTime =
    yesterday?.grand_total?.text ?? "No coding time recorded";

  // No heartbeat means we cannot confirm current activity.
  if (heartbeats.length === 0) {
    return {
      status: "offline",
      yesterdayTime,
    };
  }

  // Find the most recent valid heartbeat.
  const latestHeartbeat = heartbeats.reduce((latest, current) => {
    return getHeartbeatTime(current) > getHeartbeatTime(latest)
      ? current
      : latest;
  });

  const lastHeartbeatTime = getHeartbeatTime(latestHeartbeat);

  // Invalid or stale timestamps must not count as active.
  const isOnline =
    lastHeartbeatTime > 0 &&
    lastHeartbeatTime <= now + 30_000 &&
    now - lastHeartbeatTime < thresholdMs;

  if (!isOnline) {
    return {
      status: "offline",
      yesterdayTime,
    };
  }

  // Heartbeats can contain either Unix-style or Windows-style paths.
  const entity = latestHeartbeat.entity ?? "";
  const file = entity.split(/[\\/]/).pop() || null;

  return {
    status: "online",
    editor: normalizeEditor(latestHeartbeat.editor) || "Cursor",
    project: latestHeartbeat.project ?? null,
    file,
    totalSeconds: today?.grand_total?.total_seconds ?? 0,
    yesterdayTime,
  };
}

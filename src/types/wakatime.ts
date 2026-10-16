export type WakaTimeStatus = "online" | "offline";

export type WakaTimeData = {
  status: WakaTimeStatus;
  editor?: string;
  project?: string | null;
  file?: string | null;
  totalSeconds?: number;
  yesterdayTime: string;
};

export type WakaTimeHeartbeat = {
  time?: number;
  created_at?: string;
  entity?: string;
  editor?: string;
  project?: string | null;
};

export type WakaTimeSummary = {
  grand_total?: {
    text?: string;
    total_seconds?: number;
  };
  editors?: {
    name: string;
    total_seconds: number;
  };
};

export type WakaTimeApiResponse = {
  heartbeats?: {
    data?: WakaTimeHeartbeat[];
  };
  todaySummary?: {
    data?: WakaTimeSummary[];
  };
  yesterdaySummary?: {
    data?: WakaTimeSummary[];
  };
};

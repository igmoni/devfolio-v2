export type SetupStep = {
  id: string;
  title: string;
  description: string;
  code?: string;
  link?: {
    label: string;
    href: string;
    download?: boolean;
  };
  settings?: boolean;
};

export type SetupSection = {
  id: string;
  title: string;
  icon: "download" | "extensions" | "settings" | "check";
  steps: SetupStep[];
};

export type EditorSettings = Record<string, unknown>;

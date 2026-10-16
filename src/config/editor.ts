import type { EditorInfoCard } from "@/types/editor";

export const editorInfo: EditorInfoCard[] = [
  {
    label: "Editor",
    value: "Cursor / VS Code",
    detail: "My everyday coding environment.",
    icon: "code",
  },
  {
    label: "Font",
    value: "Fira Code",
    detail: "Monospaced font with programming ligatures.",
    icon: "keyboard",
  },
  {
    label: "Color theme",
    value: "Cursor Dark",
    detail: "A dark interface with a transparent terminal background.",
    icon: "palette",
  },
  {
    label: "Formatting",
    value: "Prettier",
    detail: "Format code automatically when saving.",
    icon: "settings",
  },
];

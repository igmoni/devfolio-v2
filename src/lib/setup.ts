import type { EditorSettings, SetupSection } from "@/types/setup";

export const editorSettings: EditorSettings = {
  "editor.linkedEditing": false,
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.cursorBlinking": "expand",
  "editor.fontFamily": "Fira Code, Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.hover.enabled": "on",
  "editor.stickyScroll.enabled": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.wordWrap": "wordWrapColumn",
  "editor.quickSuggestions": { strings: "on" },
  "editor.fontSize": 13,
  "editor.minimap.enabled": true,
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  "explorer.compactFolders": false,
  "files.autoSave": "afterDelay",
  "workbench.iconTheme": "a-file-icon-vscode",
  "workbench.productIconTheme": "fluent-icons",
  "workbench.colorTheme": "Cursor Dark",
  "workbench.statusBar.visible": true,
  "workbench.colorCustomizations": {
    "terminal.background": "#00000000",
  },
  "breadcrumbs.enabled": false,
  "workbench.startupEditor": "none",
  "workbench.editor.enablePreviewFromQuickOpen": false,
  "emmet.triggerExpansionOnTab": true,
  "emmet.useInlineCompletions": true,
  "tailwindCSS.emmetCompletions": true,
  "workbench.activityBar.compact": true,
  "workbench.activityBar.location": "top",
  "workbench.sideBar.location": "right",
};

export const setupSections: SetupSection[] = [
  {
    id: "01",
    title: "Download necessary files",
    icon: "download",
    steps: [
      {
        id: "1.1",
        title: "Download Fira Code",
        description: "Download and extract the font archive.",
        link: {
          label: "Fira-code.zip",
          href: "/assets/fira-code.zip",
          download: true,
        },
      },
      {
        id: "1.2",
        title: "Install the font",
        description:
          "Open the extracted ttf folder, select the font files, right-click, and choose Install. Restart Cursor / VS Code if it was open.",
      },
      {
        id: "1.3",
        title: "Download the extension list",
        description: "Save this list to your computer for reference.",
        link: {
          label: "vsc-extensions.txt",
          href: "/assets/vsc-extensions.txt",
          download: true,
        },
      },
      {
        id: "1.4",
        title: "Open your editor",
        description:
          "Open VS Code / Cursor in your project or downloads directory.",
      },
      {
        id: "1.5",
        title: "Install the import extension",
        description:
          "Install VSC Export & Import extension in VSCode / Cursor.",
      },
    ],
  },
  {
    id: "02",
    title: "Install all the extensions",
    icon: "extensions",
    steps: [
      {
        id: "2.1",
        title: "Open the Command Palette",
        description: "Open Command Palette by pressing the keyboard shortcut",
        code: "Ctrl + Shift + P",
      },
      {
        id: "2.2",
        title: "Run the import command",
        description: "Enter the text in prompt and press Enter ⏎",
        code: "VSC Export & Import",
      },

      {
        id: "2.4",
        title: "Installation",
        description: "All extension will start to install.",
      },
    ],
  },
  {
    id: "03",
    title: "VS Code / Cursor settings",
    icon: "settings",
    steps: [
      {
        id: "3.1",
        title: "Open the Command Palette",
        description: "Open Command Palette by pressing the keyboard shortcut",
        code: "Ctrl + Shift + P",
      },
      {
        id: "3.2",
        title: "Open settings.json",
        description: "Enter the text in prompt and press Enter ⏎",
        code: "Preferences: Open User Settings (JSON)",
      },
      {
        id: "3.3",
        title: "Copy the settings below",
        description: "Copy the settings.json from the below window",
        settings: true,
      },
    ],
  },
  {
    id: "04",
    title: "Complete setup",
    icon: "check",
    steps: [
      {
        id: "4.1",
        title: "Verify the font",
        description:
          "Paste the code in the settings.json file in VSCode / Cursor",
      },
      {
        id: "4.2",
        title: "Check extensions and formatting",
        description:
          "Save the settings.json file with Ctrl + S and restart VSCode / Cursor",
      },
    ],
  },
];

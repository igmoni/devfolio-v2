export const githubConfig = {
  username: "igmoni",
  githubLink: "https://www.github.com/igmoni",
  subtitle: "proof of progress",
  blockSize: 11,
  blockMargin: 3,
  fontSize: 12,
  maxLevel: 4,

  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  weekDays: ["", "M", "", "W", "", "F", ""],
  totalCountLabel: `{{count}} contributions in the last year`,
  theme: {
    dark: [
      "rgb(22, 27, 34)", // No contributions
      "rgb(12, 45, 80)", // Dark blue
      "rgb(0, 91, 172)", // Medium blue
      "rgb(30, 144, 255)", // Bright blue
      "rgb(87, 185, 255)", // Very bright blue
    ],
    light: [
      "rgb(235, 237, 240)", // Light gray
      "rgb(166, 210, 255)", // Light blue
      "rgb(92, 173, 255)", // Medium blue
      "rgb(48, 129, 226)", // Dark blue
      "rgb(31, 81, 163)", // Very dark blue
    ],
  },

  errorState: {
    title: "Unable to load GitHub Contributions",
    description: "Check out my profile directly for the latest activity",
    buttonText: "View on GitHub",
  },

  loadingState: {
    title: "Loading GitHub activities...",
    description: "Fetching the latest data from the GitHub",
  },
};

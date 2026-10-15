import dynamic from "next/dynamic";

export const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  { ssr: false }
);

export const filterLastYear = (
  contributions: Contribution[]
): Contribution[] => {
  const today = new Date();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  return contributions.filter(({ date }) => {
    const itemDate = new Date(date);

    return itemDate >= oneYearAgo && itemDate <= today;
  });
};

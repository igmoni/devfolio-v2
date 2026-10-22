
const SITE_URL =
  process.env.SITE_URL || "http://localhost:3000";

const posts = [
  {
    title: "Building Real Interfaces with React",
    slug: "building-real-interfaces-with-react",
    description: "Building real interfaces with React.",
    date: "2026-10-22",
  },
  {
    title: "CSS in Four Days",
    slug: "css-in-four-days",
    description: "Learning CSS in four days.",
    date: "2026-10-22",
  },
  {
    title: "Git and GitHub Guide",
    slug: "git-and-github-guide",
    description: "A guide to Git and GitHub.",
    date: "2026-10-22",
  },
  {
    title: "HTML in One Day",
    slug: "html-in-one-day",
    description: "Learning HTML in one day.",
    date: "2026-10-22",
  },
  {
    title: "JavaScript Isn't Hard",
    slug: "javascript-isnt-hard",
    description: "Making JavaScript easier to understand.",
    date: "2026-10-22",
  },
  {
    title: "Writing Safer JavaScript with TypeScript",
    slug: "writing-safer-javascript-with-typescript",
    description: "Writing safer JavaScript with TypeScript.",
    date: "2026-10-22",
  },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = posts
    .map((post) => {
      const url = `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`;

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const baseUrl = SITE_URL.replace(/\/$/, "");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Mohan's Blog</title>
    <link>${escapeXml(baseUrl)}/blog</link>
    <description>Latest articles from my blog.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
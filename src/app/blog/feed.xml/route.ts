// src/app/blog/feed.xml/route.ts

const SITE_URL = "https://localhost:3000";

const posts = [
  {
    title: "Your first blog post",
    description: "A short description of your post.",
    slug: "your-first-blog-post",
    date: "2026-10-16",
  },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = posts
    .map(
      (post) => `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${SITE_URL}/blog/${post.slug}</link>
          <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
          <description>${escapeXml(post.description)}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
      `
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Mohan's Blog</title>
        <link>${SITE_URL}/blog</link>
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

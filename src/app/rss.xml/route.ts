import { site } from "@/site.config";
import { getAllEntries } from "@/lib/content";
import { rfc822 } from "@/lib/format";

/**
 * RSS feed, covering every collection.
 *
 * `force-static` is what lets a Route Handler survive `output: "export"` — it's
 * executed once at build time and written to `out/rss.xml`.
 *
 * Feeds matter more than they look on a site like this: they're how anyone who
 * cares follows new notes and posts without you having to announce each one.
 */
export const dynamic = "force-static";

/** Escapes the five XML entities. Without this a stray `&` invalidates the feed. */
function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const entries = getAllEntries().slice(0, 50);
  const updated = entries[0]?.data.date ?? new Date();

  const items = entries
    .map((entry) => {
      const url = `${site.url}${entry.href}`;
      return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(entry.data.summary)}</description>
      <pubDate>${rfc822(entry.data.date)}</pubDate>
      <category>${escapeXml(entry.collection)}</category>
${entry.data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(updated)}</lastBuildDate>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

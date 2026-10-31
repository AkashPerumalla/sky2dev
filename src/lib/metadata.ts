import type { Metadata } from "next";
import type { Entry } from "./content";
import { site } from "@/site.config";

/**
 * Builds per-entry metadata — canonical URL, Open Graph, Twitter card.
 * One function so every collection gets identical, correct tags.
 */
export function entryMetadata(entry: Entry): Metadata {
  const url = `${site.url}${entry.href}`;

  return {
    title: entry.data.title,
    description: entry.data.summary,
    alternates: { canonical: entry.href },
    openGraph: {
      type: "article",
      title: entry.data.title,
      description: entry.data.summary,
      url,
      publishedTime: entry.data.date.toISOString(),
      modifiedTime: (entry.data.updated ?? entry.data.date).toISOString(),
      tags: [...entry.data.tags],
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.data.title,
      description: entry.data.summary,
    },
    // Drafts stay out of search results even if someone links to them.
    robots: entry.data.draft ? { index: false, follow: false } : undefined,
  };
}

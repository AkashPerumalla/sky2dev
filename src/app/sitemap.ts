import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { getAllEntries, getAllTags, tagSlug } from "@/lib/content";

/**
 * Generated at build time from the content directory, so a new post is in the
 * sitemap the moment it's published — nothing to remember to update.
 * Drafts are excluded because the loader filters them out in production.
 */
// Required by `output: "export"` — generates sitemap.xml once, at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/projects", "/writing", "/notes", "/tags", "/about"];

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const entries: MetadataRoute.Sitemap = getAllEntries().map((entry) => ({
    url: `${site.url}${entry.href}`,
    lastModified: entry.data.updated ?? entry.data.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const tags: MetadataRoute.Sitemap = getAllTags().map(({ tag }) => ({
    url: `${site.url}/tags/${tagSlug(tag)}`,
    changeFrequency: "monthly",
    priority: 0.3,
  }));

  return [...pages, ...entries, ...tags];
}

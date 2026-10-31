import { getEntry, staticParamsFor } from "@/lib/content";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { site } from "@/site.config";

// Required by `output: "export"`, same as the sitemap and RSS routes.
export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
// Static per route; the card itself carries the entry title.
export const alt = `Project on ${site.name}'s site`;

/**
 * One card per entry, generated at build time alongside the page. Shares
 * staticParamsFor with the page route so an empty collection emits the same
 * sentinel slug instead of failing the export.
 */
export function generateStaticParams() {
  return staticParamsFor("projects");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("projects", slug);

  return ogCard({
    title: entry?.data.title ?? site.name,
    eyebrow: "Project",
  });
}

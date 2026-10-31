import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { site } from "@/site.config";

// Required by `output: "export"`, same as the sitemap and RSS routes.
export const dynamic = "force-static";

export const alt = `${site.name}, ${site.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return ogCard({
    title: site.name,
    eyebrow: site.role,
    attribution: site.specialty,
    footer: site.location,
  });
}

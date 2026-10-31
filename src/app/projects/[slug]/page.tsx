import { notFound } from "next/navigation";
import { getCollection, getEntry } from "@/lib/content";
import type { ProjectData } from "@/lib/content/schema";
import { entryMetadata } from "@/lib/metadata";
import { Article } from "@/components/article";
import { Badge, ExternalLink } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCollection("projects").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getEntry("projects", slug);
  return entry ? entryMetadata(entry) : {};
}

export default async function ProjectEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getEntry("projects", slug);

  if (!entry) notFound();

  const data = entry.data as ProjectData;

  return (
    <Article
      entry={entry}
      backHref="/projects"
      backLabel="Projects"
      aside={
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-5 text-sm text-muted">
          <Badge tone="accent">{data.status}</Badge>

          {data.tech.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}

          <span className="flex-1" />

          {data.url && <ExternalLink href={data.url}>Live</ExternalLink>}
          {data.repo && <ExternalLink href={data.repo}>Source</ExternalLink>}
        </div>
      }
    />
  );
}

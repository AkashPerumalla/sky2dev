import { notFound } from "next/navigation";
import { getEntry, staticParamsFor } from "@/lib/content";
import { entryMetadata } from "@/lib/metadata";
import { Article } from "@/components/article";
import { ExternalLink } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return staticParamsFor("notes");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getEntry("notes", slug);
  return entry ? entryMetadata(entry) : {};
}

export default async function NoteEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getEntry("notes", slug);

  if (!entry) notFound();

  return (
    <Article
      entry={entry}
      backHref="/notes"
      backLabel="Notes"
      aside={
        entry.data.source ? (
          <p className="mt-5 text-sm text-muted">
            <ExternalLink href={entry.data.source}>
              {entry.data.sourceLabel ?? "Source"}
            </ExternalLink>
          </p>
        ) : null
      }
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getEntriesByTag, tagSlug } from "@/lib/content";
import { EntryList } from "@/components/entry-list";
import { PageHeader } from "@/components/ui";

type Params = { tag: string };

export function generateStaticParams(): Params[] {
  return getAllTags().map(({ tag }) => ({ tag: tagSlug(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  const label = getAllTags().find((t) => tagSlug(t.tag) === tag)?.tag ?? tag;

  return {
    title: `#${label}`,
    description: `Everything tagged ${label}.`,
    alternates: { canonical: `/tags/${tag}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const match = getAllTags().find((t) => tagSlug(t.tag) === tag);

  if (!match) notFound();

  const entries = getEntriesByTag(match.tag);

  return (
    <>
      <PageHeader
        title={match.tag}
        description={`${entries.length} ${entries.length === 1 ? "entry" : "entries"} across the site.`}
      />
      {/* showCollection, because this list mixes writing, notes and projects. */}
      <EntryList entries={entries} showCollection />
    </>
  );
}

import { notFound } from "next/navigation";
import { getEntry, staticParamsFor } from "@/lib/content";
import { entryMetadata } from "@/lib/metadata";
import { Article } from "@/components/article";

type Params = { slug: string };

/** Tells the static export which pages to emit. */
export function generateStaticParams(): Params[] {
  return staticParamsFor("writing");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  return entry ? entryMetadata(entry) : {};
}

export default async function WritingEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);

  if (!entry) notFound();

  return <Article entry={entry} backHref="/writing" backLabel="Writing" />;
}

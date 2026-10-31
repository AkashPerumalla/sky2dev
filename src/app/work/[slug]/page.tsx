import { notFound } from "next/navigation";
import { getEntry, staticParamsFor } from "@/lib/content";
import type { WorkData } from "@/lib/content/schema";
import { entryMetadata } from "@/lib/metadata";
import { Article } from "@/components/article";
import { formatDateRange, formatDuration } from "@/lib/format";
import { ExternalLink, Meta, MetaDot } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return staticParamsFor("work");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getEntry("work", slug);
  return entry ? entryMetadata(entry) : {};
}

export default async function WorkEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getEntry("work", slug);

  if (!entry) notFound();

  const data = entry.data as WorkData;

  return (
    <Article
      entry={entry}
      backHref="/work"
      backLabel="Work"
      showDate={false}
      aside={
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-sm">
            {data.companyUrl ? (
              <ExternalLink href={data.companyUrl} className="font-medium">
                {data.company}
              </ExternalLink>
            ) : (
              <span className="font-medium">{data.company}</span>
            )}
          </p>
          <Meta className="mt-1.5">
            <span>{formatDateRange(data.start, data.end)}</span>
            <MetaDot />
            <span>{formatDuration(data.start, data.end)}</span>
            {data.location && (
              <>
                <MetaDot />
                <span>{data.location}</span>
              </>
            )}
          </Meta>
        </div>
      }
    />
  );
}

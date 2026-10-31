import Link from "next/link";
import type { Entry } from "@/lib/content";
import { formatDate, isoDate } from "@/lib/format";
import { Mdx } from "./mdx";
import { Badge, Meta, MetaDot, TagRow } from "./ui";

/**
 * Shared layout for every entry detail page.
 *
 * One component means writing, notes, projects and work all get the same
 * reading experience, and a typography fix lands everywhere at once. The
 * `aside` slot is for collection-specific metadata (project links, role dates).
 */
export function Article({
  entry,
  backHref,
  backLabel,
  aside,
  showDate = true,
}: {
  entry: Entry;
  backHref: string;
  backLabel: string;
  aside?: React.ReactNode;
  /** Work entries carry their own date range, so the publish date is noise there. */
  showDate?: boolean;
}) {
  const { data } = entry;

  return (
    <article className="mx-auto max-w-prose">
      <Link
        href={backHref}
        className="font-mono text-[0.6875rem] text-faint transition-colors hover:text-accent"
      >
        ← {backLabel}
      </Link>

      <header className="mt-6 mb-10">
        <Meta>
          {showDate && (
            <time dateTime={isoDate(data.date)}>{formatDate(data.date)}</time>
          )}
          {entry.collection === "writing" && (
            <>
              <MetaDot />
              <span>{entry.readingTime} min read</span>
            </>
          )}
          {data.updated && (
            <>
              <MetaDot />
              <span>Updated {formatDate(data.updated)}</span>
            </>
          )}
        </Meta>

        <h1 className="mt-2 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
          {data.title}
        </h1>

        {(data.draft || ("wip" in data && data.wip)) && (
          <div className="mt-3 flex gap-2">
            {data.draft && <Badge tone="warn">Draft</Badge>}
            {"wip" in data && data.wip && (
              <Badge tone="warn">Work in progress</Badge>
            )}
          </div>
        )}

        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted text-pretty">
          {data.summary}
        </p>

        <TagRow tags={data.tags} className="mt-5" />

        {aside}
      </header>

      <Mdx source={entry.body} />
    </article>
  );
}

import Link from "next/link";
import type { Entry } from "@/lib/content";
import type { ProjectData, WorkData, NoteData } from "@/lib/content/schema";
import {
  formatDate,
  formatDateRange,
  formatDuration,
  isoDate,
} from "@/lib/format";
import { Badge, ExternalLink, Meta, MetaDot, TagRow } from "./ui";

/**
 * Listing components.
 *
 * Tags render as links, so they sit *outside* the title link rather than inside
 * a clickable row — nested anchors are invalid HTML and break keyboard
 * navigation. The title is the link; the row is just layout.
 */

const COLLECTION_LABEL = {
  work: "Work",
  projects: "Project",
  writing: "Writing",
  notes: "Note",
} as const;

/** Generic row for writing and notes. */
export function EntryRow({
  entry,
  showCollection = false,
}: {
  entry: Entry;
  showCollection?: boolean;
}) {
  return (
    <li className="group border-b border-line py-5 first:pt-0 last:border-0">
      <div className="flex flex-col gap-x-6 gap-y-1.5 sm:flex-row-reverse sm:items-baseline sm:justify-between">
        <Meta className="shrink-0 sm:pt-1">
          {showCollection && (
            <>
              <span className="text-accent">
                {COLLECTION_LABEL[entry.collection]}
              </span>
              <MetaDot />
            </>
          )}
          <time dateTime={isoDate(entry.data.date)}>
            {formatDate(entry.data.date)}
          </time>
          {entry.collection === "writing" && (
            <>
              <MetaDot />
              <span>{entry.readingTime} min</span>
            </>
          )}
        </Meta>

        <h3 className="text-[0.9375rem] leading-snug font-medium sm:flex-1">
          <Link
            href={entry.href}
            className="transition-colors group-hover:text-accent"
          >
            {entry.data.title}
          </Link>
          {entry.data.draft && (
            <span className="ml-2 align-middle">
              <Badge tone="warn">Draft</Badge>
            </span>
          )}
        </h3>
      </div>

      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted">
        {entry.data.summary}
      </p>

      <TagRow tags={entry.data.tags} className="mt-2.5" />
    </li>
  );
}

export function EntryList({
  entries,
  showCollection = false,
}: {
  entries: Entry[];
  showCollection?: boolean;
}) {
  return (
    <ul>
      {entries.map((entry) => (
        <EntryRow
          key={`${entry.collection}/${entry.slug}`}
          entry={entry}
          showCollection={showCollection}
        />
      ))}
    </ul>
  );
}

const STATUS_TONE = {
  active: "accent",
  shipped: "neutral",
  experiment: "warn",
  archived: "neutral",
} as const;

/** Project card — status, stack, and direct links to repo and demo. */
export function ProjectCard({ entry }: { entry: Entry<"projects"> }) {
  const data = entry.data as ProjectData;

  return (
    <li className="group flex flex-col rounded-lg border border-line bg-elevated p-5 transition-colors hover:border-accent/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[0.9375rem] font-medium">
          <Link
            href={entry.href}
            className="transition-colors group-hover:text-accent"
          >
            {data.title}
          </Link>
        </h3>
        <Badge tone={STATUS_TONE[data.status]}>{data.status}</Badge>
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {data.summary}
      </p>

      {data.tech.length > 0 && (
        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {data.tech.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
      )}

      {(data.repo || data.url) && (
        <div className="mt-4 flex items-center gap-4 border-t border-line pt-3.5 text-xs text-muted">
          {data.url && <ExternalLink href={data.url}>Live</ExternalLink>}
          {data.repo && <ExternalLink href={data.repo}>Source</ExternalLink>}
        </div>
      )}
    </li>
  );
}

export function ProjectGrid({ entries }: { entries: Entry<"projects">[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {entries.map((entry) => (
        <ProjectCard key={entry.slug} entry={entry} />
      ))}
    </ul>
  );
}

/** One role in the work timeline. */
export function WorkItem({ entry }: { entry: Entry<"work"> }) {
  const data = entry.data as WorkData;

  return (
    <li className="group relative border-l border-line pb-9 pl-6 last:pb-0">
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-line transition-colors group-hover:bg-accent"
      />

      <Meta>
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

      <h3 className="mt-1.5 text-[0.9375rem] font-medium">
        <Link
          href={entry.href}
          className="transition-colors group-hover:text-accent"
        >
          {data.position}
        </Link>
      </h3>

      <p className="mt-0.5 text-sm text-muted">
        {data.companyUrl ? (
          <ExternalLink href={data.companyUrl}>{data.company}</ExternalLink>
        ) : (
          data.company
        )}
      </p>

      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
        {data.summary}
      </p>

      <TagRow tags={data.tags} className="mt-2.5" />
    </li>
  );
}

/**
 * Note row. Notes are short, so the summary carries the whole idea and the
 * source link matters more than a click-through.
 */
export function NoteRow({ entry }: { entry: Entry<"notes"> }) {
  const data = entry.data as NoteData;

  return (
    <li className="group border-b border-line py-5 first:pt-0 last:border-0">
      <Meta>
        <time dateTime={isoDate(data.date)}>{formatDate(data.date)}</time>
      </Meta>

      <h3 className="mt-1.5 text-[0.9375rem] leading-snug font-medium">
        <Link
          href={entry.href}
          className="transition-colors group-hover:text-accent"
        >
          {data.title}
        </Link>
      </h3>

      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted">
        {data.summary}
      </p>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <TagRow tags={data.tags} />
        {data.source && (
          <ExternalLink
            href={data.source}
            className="font-mono text-[0.6875rem] text-faint"
          >
            {data.sourceLabel ?? "Source"}
          </ExternalLink>
        )}
      </div>
    </li>
  );
}

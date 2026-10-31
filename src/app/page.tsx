import Link from "next/link";
import { site } from "@/site.config";
import { getCollection } from "@/lib/content";
import type { WorkData } from "@/lib/content/schema";
import { formatDateRange } from "@/lib/format";
import { EntryList, NoteRow, ProjectGrid } from "@/components/entry-list";
import { ExternalLink, SectionHeading } from "@/components/ui";
import { EmailLink } from "@/components/email-link";

/**
 * Home page.
 *
 * Deliberately a dashboard of the latest activity rather than a static intro:
 * on a site that keeps growing, the front page should prove it's alive. Every
 * section below fills itself from the content directory.
 */
export default function HomePage() {
  const work = getCollection("work");
  const projects = getCollection("projects");
  const writing = getCollection("writing");
  const notes = getCollection("notes");

  // Newest project still marked active; drives the status pill.
  const nowBuilding = projects.find((p) => p.data.status === "active");

  const current = work[0];
  const currentData = current?.data as WorkData | undefined;
  const isCurrentRole = currentData && !currentData.end;

  // Featured first, then fill up to 4 with the most recent.
  const shownProjects = [
    ...projects.filter((p) => p.data.featured),
    ...projects.filter((p) => !p.data.featured),
  ].slice(0, 4);

  return (
    <div className="space-y-20">
      <section className="hero-grid">
        {/*
          A live signal that the site is maintained. Pulled from the newest
          active project rather than hardcoded, so it can never go stale while
          the content moves on.
        */}
        {nowBuilding && (
          <Link
            href={nowBuilding.href}
            className="rise group mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-3 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg"
          >
            <span className="relative flex size-1.5 shrink-0">
              <span className="ping-soft absolute inline-flex size-full rounded-full bg-accent" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            {/* "Currently building" plus a long project title wraps the pill
                to two lines on a phone, so the label shortens there. */}
            <span className="hidden sm:inline">Currently building</span>
            <span className="sm:hidden">Now</span>
            <span className="text-fg">{nowBuilding.data.title}</span>
          </Link>
        )}

        <h1 className="rise text-4xl font-semibold tracking-[-0.03em] text-balance [animation-delay:40ms] sm:text-6xl">
          {site.name}
        </h1>

        <p className="rise mt-3 text-base text-muted [animation-delay:80ms] sm:text-lg">
          {site.role}
          {isCurrentRole && currentData && (
            <>
              {" at "}
              {currentData.companyUrl ? (
                <ExternalLink href={currentData.companyUrl} className="text-fg">
                  {currentData.company}
                </ExternalLink>
              ) : (
                <span className="text-fg">{currentData.company}</span>
              )}
            </>
          )}
          <span className="text-faint"> · {site.specialty}</span>
        </p>

        <p className="rise mt-7 max-w-prose text-[1.0625rem] leading-relaxed text-muted text-pretty [animation-delay:120ms]">
          {site.bio}
        </p>

        {/* Proof row. Checkable numbers do more here than any adjective. */}
        <dl className="rise mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-line py-7 [animation-delay:160ms] sm:grid-cols-4">
          {site.highlights.map((item) => (
            <div key={item.label}>
              <dt className="text-xl font-semibold tracking-tight text-fg tabular sm:text-2xl">
                {item.value}
              </dt>
              <dd className="mt-1.5 text-xs leading-snug text-faint">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm [animation-delay:200ms]">
          {site.socials.map((social) => (
            <li key={social.label}>
              <ExternalLink href={social.href} className="text-muted">
                {social.label}
              </ExternalLink>
            </li>
          ))}
          <li>
            <EmailLink className="text-muted transition-colors hover:text-accent" />
          </li>
        </ul>
      </section>

      {/*
        Projects lead: they're the strongest material and the only section
        guaranteed to have content. Writing and notes are omitted entirely while
        empty rather than showing a placeholder — an empty section high on the
        page reads as neglect, and these fill themselves the moment a file
        lands in content/.
      */}
      {shownProjects.length > 0 && (
        <section>
          <SectionHeading title="Projects" href="/projects" />
          <ProjectGrid entries={shownProjects} />
        </section>
      )}

      {writing.length > 0 && (
        <section>
          <SectionHeading title="Writing" href="/writing" />
          <EntryList entries={writing.slice(0, 4)} />
        </section>
      )}

      {notes.length > 0 && (
        <section>
          <SectionHeading title="Recent notes" href="/notes" />
          <ul>
            {notes.slice(0, 5).map((entry) => (
              <NoteRow key={entry.slug} entry={entry} />
            ))}
          </ul>
        </section>
      )}

      {work.length > 0 && (
        <section>
          <SectionHeading title="Experience" href="/work" />
          <ul className="space-y-3 text-sm">
            {work.slice(0, 4).map((entry) => {
              const data = entry.data as WorkData;
              return (
                <li
                  key={entry.slug}
                  className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <Link
                    href={entry.href}
                    className="transition-colors hover:text-accent"
                  >
                    <span className="font-medium">{data.position}</span>
                    <span className="text-muted"> · {data.company}</span>
                  </Link>
                  <span className="shrink-0 font-mono text-[0.6875rem] text-faint">
                    {formatDateRange(data.start, data.end)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

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

  const current = work[0];
  const currentData = current?.data as WorkData | undefined;
  const isCurrentRole = currentData && !currentData.end;

  // Featured first, then fill up to 4 with the most recent.
  const shownProjects = [
    ...projects.filter((p) => p.data.featured),
    ...projects.filter((p) => !p.data.featured),
  ].slice(0, 4);

  return (
    <div className="space-y-16">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {site.name}
        </h1>

        <p className="mt-2 text-[0.9375rem] text-muted">
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
        </p>

        <p className="mt-1 text-[0.9375rem] text-faint">{site.specialty}</p>

        <p className="mt-6 max-w-prose leading-relaxed text-muted">
          {site.bio}
        </p>

        <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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

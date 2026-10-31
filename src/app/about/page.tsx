import type { Metadata } from "next";
import { site } from "@/site.config";
import { PageHeader, ExternalLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

/**
 * The one page written as prose rather than loaded from content/.
 * It changes rarely and is specific enough that a Markdown file would be
 * indirection for its own sake.
 */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-prose">
      <PageHeader title="About" />

      <div className="prose">
        <p>
          I&rsquo;m {site.name}, a {site.role.toLowerCase()}. {site.bio}
        </p>

        <h2>What&rsquo;s here</h2>
        <p>
          This site is a running log rather than a finished portfolio. Four
          things live on it:
        </p>
        <ul>
          <li>
            <strong>Work</strong> — roles I&rsquo;ve held and what I actually
            did in them.
          </li>
          <li>
            <strong>Projects</strong> — things I&rsquo;ve built, including the
            experiments that went nowhere.
          </li>
          <li>
            <strong>Writing</strong> — longer pieces, where I&rsquo;ve thought
            something through enough to take a position.
          </li>
          <li>
            <strong>Notes</strong> — short learnings, captured as they happen.
          </li>
        </ul>

        <h2>Elsewhere</h2>
        <ul>
          {site.socials.map((social) => (
            <li key={social.label}>
              <ExternalLink href={social.href}>{social.label}</ExternalLink>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        </ul>

        <h2>This site</h2>
        <p>
          Built with Next.js and statically exported, so every page is plain
          HTML. Content is Markdown in a git repository — no database, no CMS,
          nothing to keep running. Syntax highlighting and typography are
          resolved at build time, so no JavaScript is needed to read anything
          here.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, tagSlug } from "@/lib/content";
import { EmptyState, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tags",
  description: "Everything on the site, grouped by topic.",
  alternates: { canonical: "/tags" },
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <>
      <PageHeader
        title="Tags"
        description="Tags are shared across work, projects, writing and notes — so a topic shows every angle I've come at it from."
      />

      {tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                href={`/tags/${tagSlug(tag)}`}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {tag}
                <span className="font-mono text-[0.6875rem] text-faint">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState>No tags yet — add some to your frontmatter.</EmptyState>
      )}
    </>
  );
}

import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import { WorkItem } from "@/components/entry-list";
import { EmptyState, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Where I've worked and what I did there.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const entries = getCollection("work");

  return (
    <>
      <PageHeader
        title="Work"
        description="Where I've worked and what I actually did there."
      />
      {entries.length > 0 ? (
        <ul>
          {entries.map((entry) => (
            <WorkItem key={entry.slug} entry={entry} />
          ))}
        </ul>
      ) : (
        <EmptyState>No roles added yet.</EmptyState>
      )}
    </>
  );
}

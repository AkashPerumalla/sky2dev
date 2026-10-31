import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import { NoteRow } from "@/components/entry-list";
import { EmptyState, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Notes",
  description: "Short things I've learned, logged as I go.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  const entries = getCollection("notes");

  return (
    <>
      <PageHeader
        title="Notes"
        description="Short learnings, logged as they happen. The bar is deliberately lower than Writing; a note can be three sentences."
      />
      {entries.length > 0 ? (
        <ul>
          {entries.map((entry) => (
            <NoteRow key={entry.slug} entry={entry} />
          ))}
        </ul>
      ) : (
        <EmptyState>First notes coming soon.</EmptyState>
      )}
    </>
  );
}

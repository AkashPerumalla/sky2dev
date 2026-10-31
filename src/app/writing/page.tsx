import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import { EntryList } from "@/components/entry-list";
import { EmptyState, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and longer thinking.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const entries = getCollection("writing");

  return (
    <>
      <PageHeader
        title="Writing"
        description="Longer pieces — things I've thought about enough to argue a position on."
      />
      {entries.length > 0 ? (
        <EntryList entries={entries} />
      ) : (
        <EmptyState>First posts coming soon.</EmptyState>
      )}
    </>
  );
}

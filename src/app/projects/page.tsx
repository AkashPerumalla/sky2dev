import type { Metadata } from "next";
import { getCollection } from "@/lib/content";
import type { ProjectData } from "@/lib/content/schema";
import { ProjectGrid } from "@/components/entry-list";
import { EmptyState, PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built — shipped, abandoned, and in progress.",
  alternates: { canonical: "/projects" },
};

/** Groups the grid by status so active work reads first and archives sink. */
const GROUPS = [
  { key: "active", label: "In progress" },
  { key: "shipped", label: "Shipped" },
  { key: "experiment", label: "Experiments" },
  { key: "archived", label: "Archived" },
] as const;

export default function ProjectsPage() {
  const entries = getCollection("projects");

  return (
    <>
      <PageHeader
        title="Projects"
        description="Things I've built. Experiments and dead ends are here too — they're usually where the learning was."
      />

      {entries.length === 0 && <EmptyState>No projects yet.</EmptyState>}

      <div className="space-y-12">
        {GROUPS.map((group) => {
          const inGroup = entries.filter(
            (entry) => (entry.data as ProjectData).status === group.key,
          );
          if (inGroup.length === 0) return null;

          return (
            <section key={group.key}>
              <SectionHeading title={group.label} />
              <ProjectGrid entries={inGroup} />
            </section>
          );
        })}
      </div>
    </>
  );
}

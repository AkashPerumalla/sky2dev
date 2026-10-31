import { z } from "zod";

/**
 * Frontmatter schemas, one per collection.
 *
 * These are validated at build time. A typo in a date, a missing title, or a
 * `status` value that isn't in the allowed list fails `npm run build` with the
 * offending file and field named — instead of silently rendering a broken page
 * you notice six months later.
 *
 * Adding a field: add it here (optional, so existing files stay valid), then
 * use it in the page components. Nothing else needs to change.
 */

/** Fields every collection shares. */
const base = z.object({
  title: z.string().min(1, "must not be empty"),

  /** One-line summary. Used in listings, social cards, and the RSS feed. */
  summary: z.string().min(1, "must not be empty"),

  /** Publish date, `YYYY-MM-DD`. Drives sort order everywhere. */
  date: z.coerce.date(),

  /** Set when you meaningfully revise an entry. Shown as "Updated ...". */
  updated: z.coerce.date().optional(),

  /** Shared across all collections, so an interest surfaces wherever it shows up. */
  tags: z.array(z.string().min(1)).default([]),

  /** Hidden from listings, feeds and the sitemap. Still viewable at its URL in dev. */
  draft: z.boolean().default(false),

  /** Pinned to the home page. */
  featured: z.boolean().default(false),
});

/** A role, internship, or stretch of self-directed work. */
export const workSchema = base.extend({
  company: z.string().min(1),
  companyUrl: z.string().url().optional(),
  /** Job title at this company. */
  position: z.string().min(1),
  location: z.string().optional(),
  /** `YYYY-MM` or `YYYY-MM-DD`. */
  start: z.coerce.date(),
  /** Omit entirely while you're still there — renders as "Present". */
  end: z.coerce.date().optional(),
});

/** Anything you built — shipped product, weekend hack, or ongoing experiment. */
export const projectSchema = base.extend({
  status: z
    .enum(["active", "shipped", "archived", "experiment"])
    .default("active"),
  /** Source code. */
  repo: z.string().url().optional(),
  /** Live deployment or demo. */
  url: z.string().url().optional(),
  /** Stack badges, rendered in listing order. */
  tech: z.array(z.string().min(1)).default([]),
});

/** Longer-form essays and thinking. */
export const writingSchema = base.extend({
  /** Marks a piece as unfinished thinking rather than a settled argument. */
  wip: z.boolean().default(false),
});

/** Short TIL-style learnings. Low friction on purpose — this is what keeps a site alive. */
export const noteSchema = base.extend({
  /** Where you learned it: a doc, a talk, a post, a conversation. */
  source: z.string().url().optional(),
  sourceLabel: z.string().optional(),
});

export const schemas = {
  work: workSchema,
  projects: projectSchema,
  writing: writingSchema,
  notes: noteSchema,
} as const;

export type CollectionName = keyof typeof schemas;

export const collectionNames = Object.keys(schemas) as CollectionName[];

export type WorkData = z.infer<typeof workSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type WritingData = z.infer<typeof writingSchema>;
export type NoteData = z.infer<typeof noteSchema>;

export type CollectionData = {
  work: WorkData;
  projects: ProjectData;
  writing: WritingData;
  notes: NoteData;
};

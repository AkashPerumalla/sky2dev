import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  schemas,
  collectionNames,
  type CollectionName,
  type CollectionData,
} from "./schema";

/**
 * The content layer.
 *
 * Reads Markdown/MDX off disk, validates frontmatter against the collection's
 * Zod schema, and hands back typed entries. Runs only at build time, so the
 * cost is paid once and the output is static HTML.
 *
 * Why plain files + fs instead of a CMS or a content framework: the content is
 * the asset here. Markdown in git has no vendor, no auth to re-establish after
 * a year away, no migration when a framework is abandoned, and it diffs in a
 * pull request. The whole loader is ~150 lines you can read and debug.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Dev shows drafts so you can preview; production never does. */
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

const WORDS_PER_MINUTE = 200;

export type Entry<C extends CollectionName = CollectionName> = {
  collection: C;
  /** Filename without extension. Becomes the URL segment. */
  slug: string;
  /** Site-relative URL, e.g. `/writing/why-static-sites`. */
  href: string;
  data: CollectionData[C];
  /** Raw MDX source, not yet compiled. */
  body: string;
  wordCount: number;
  /** Rounded up, minimum 1. */
  readingTime: number;
};

/** Build-time memoization — a page tree re-reading content per route adds up. */
const cache = new Map<CollectionName, Entry[]>();

function collectionDir(collection: CollectionName) {
  return path.join(CONTENT_DIR, collection);
}

function isContentFile(filename: string) {
  return (
    (filename.endsWith(".md") || filename.endsWith(".mdx")) &&
    // Ignore editor scratch files and partials.
    !filename.startsWith("_") &&
    !filename.startsWith(".")
  );
}

function slugify(filename: string) {
  return filename.replace(/\.mdx?$/, "");
}

function countWords(body: string) {
  const text = body
    // Strip fenced code blocks so a long snippet doesn't inflate reading time.
    .replace(/```[\s\S]*?```/g, " ")
    // Strip JSX/HTML tags.
    .replace(/<[^>]+>/g, " ");
  const matches = text.match(/\b\w[\w'-]*\b/g);
  return matches ? matches.length : 0;
}

/**
 * Reads and validates one collection. Throws on the first invalid file with the
 * path and failing fields named, so a bad commit fails the build loudly.
 */
function loadCollection<C extends CollectionName>(collection: C): Entry<C>[] {
  const dir = collectionDir(collection);

  if (!fs.existsSync(dir)) return [];

  const entries = fs
    .readdirSync(dir)
    .filter(isContentFile)
    .map((filename) => {
      const fullPath = path.join(dir, filename);
      const raw = fs.readFileSync(fullPath, "utf8");

      // gray-matter throws raw YAMLExceptions, which don't say which file
      // broke. Re-throw with the path so the fix is obvious from CI output.
      let frontmatter: Record<string, unknown>;
      let body: string;
      try {
        const parsedFile = matter(raw);
        frontmatter = parsedFile.data;
        body = parsedFile.content;
      } catch (cause) {
        const reason = cause instanceof Error ? cause.message : String(cause);
        throw new Error(
          `Could not parse YAML frontmatter in content/${collection}/${filename}\n` +
            `  ${reason}\n` +
            `Values starting with \`, @, %, &, *, ! or : must be quoted.`,
        );
      }

      const parsed = schemas[collection].safeParse(frontmatter);

      if (!parsed.success) {
        const problems = parsed.error.issues
          .map((issue) => {
            const field = issue.path.join(".") || "(root)";
            return `  • ${field}: ${issue.message}`;
          })
          .join("\n");

        throw new Error(
          `Invalid frontmatter in content/${collection}/${filename}\n${problems}\n` +
            `See src/lib/content/schema.ts for the ${collection} schema.`,
        );
      }

      const wordCount = countWords(body);

      return {
        collection,
        slug: slugify(filename),
        href: `/${collection}/${slugify(filename)}`,
        data: parsed.data as CollectionData[C],
        body,
        wordCount,
        readingTime: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
      } satisfies Entry<C>;
    })
    .filter((entry) => SHOW_DRAFTS || !entry.data.draft);

  // Work sorts by when the role started; everything else by publish date.
  entries.sort((a, b) => {
    if (collection === "work") {
      const aStart = (a.data as CollectionData["work"]).start.getTime();
      const bStart = (b.data as CollectionData["work"]).start.getTime();
      return bStart - aStart;
    }
    return b.data.date.getTime() - a.data.date.getTime();
  });

  return entries;
}

/** All entries in a collection, newest first, drafts excluded in production. */
export function getCollection<C extends CollectionName>(
  collection: C,
): Entry<C>[] {
  if (!cache.has(collection)) {
    cache.set(collection, loadCollection(collection) as Entry[]);
  }
  return cache.get(collection) as Entry<C>[];
}

/** One entry, or undefined if the slug doesn't exist. */
export function getEntry<C extends CollectionName>(
  collection: C,
  slug: string,
): Entry<C> | undefined {
  return getCollection(collection).find((entry) => entry.slug === slug);
}

/** Every entry across every collection, newest first. Used by tags, sitemap, RSS. */
export function getAllEntries(): Entry[] {
  return collectionNames
    .flatMap((name) => getCollection(name) as Entry[])
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Entries pinned with `featured: true`, newest first. */
export function getFeatured(limit?: number): Entry[] {
  const featured = getAllEntries().filter((entry) => entry.data.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export type TagSummary = {
  tag: string;
  count: number;
};

/** Normalizes a tag for use in a URL. `Machine Learning` -> `machine-learning`. */
export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Every tag in use, most-used first, ties broken alphabetically. */
export function getAllTags(): TagSummary[] {
  const counts = new Map<string, number>();

  for (const entry of getAllEntries()) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Entries carrying a tag, matched on the slugified form so case doesn't matter. */
export function getEntriesByTag(tag: string): Entry[] {
  const target = tagSlug(tag);
  return getAllEntries().filter((entry) =>
    entry.data.tags.some((t) => tagSlug(t) === target),
  );
}

/**
 * Params for a collection's dynamic route.
 *
 * `output: "export"` refuses a dynamic route that generates zero pages, which
 * would break the build for any collection you haven't written in yet — an
 * entirely normal state for a new site, and for one where everything in a
 * collection is still a draft. Emitting a sentinel slug keeps the route valid;
 * the page renders a 404 for it, and nothing links to it or lists it.
 */
export function staticParamsFor(collection: CollectionName): { slug: string }[] {
  const entries = getCollection(collection);
  if (entries.length === 0) return [{ slug: EMPTY_COLLECTION_SLUG }];
  return entries.map((entry) => ({ slug: entry.slug }));
}

export const EMPTY_COLLECTION_SLUG = "__empty";

export { collectionNames };
export type { CollectionName };

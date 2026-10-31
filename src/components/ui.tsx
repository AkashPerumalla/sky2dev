import Link from "next/link";
import { tagSlug } from "@/lib/content";
import { cn } from "@/lib/cn";

/** The title block at the top of every listing page. */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-12">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-muted">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}

/** A clickable tag. Links to the cross-collection tag page. */
export function Tag({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${tagSlug(tag)}`}
      className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {tag}
    </Link>
  );
}

export function TagRow({
  tags,
  className,
}: {
  tags: readonly string[];
  className?: string;
}) {
  if (tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
}

/** Non-interactive label — project status, tech stack, "Draft", "WIP". */
export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "warn";
}) {
  const tones = {
    neutral: "border-line bg-surface text-muted",
    accent: "border-accent/30 bg-accent-soft text-accent",
    warn: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  } as const;

  return (
    <span
      className={cn(
        "rounded border px-1.5 py-0.5 font-mono text-[0.6875rem] whitespace-nowrap",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Small monospace metadata line — dates, reading time, counts. */
export function Meta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6875rem] text-faint",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MetaDot() {
  return <span aria-hidden="true">·</span>;
}

/** Shown wherever a collection has no entries yet. */
export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-line px-5 py-8 text-center text-sm text-faint">
      {children}
    </p>
  );
}

/** Section heading used on the home page, with an optional "see all" link. */
export function SectionHeading({
  title,
  href,
  linkLabel = "All",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-line pb-2">
      <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-faint uppercase">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-xs text-muted transition-colors hover:text-accent"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

/** Outbound link with a trailing arrow glyph. */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-1 transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      <svg
        className="size-3 shrink-0 opacity-60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  );
}

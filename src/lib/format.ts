/**
 * Date formatting.
 *
 * Everything formats in UTC on purpose. Frontmatter dates like `2026-10-31`
 * parse to UTC midnight, so formatting in a local timezone west of UTC would
 * render them a day early. Pinning to UTC makes the output identical on your
 * laptop and on the build server.
 */

const UTC = "UTC" as const;

/** `31 Oct 2026` */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: UTC,
  }).format(date);
}

/** `Oct 2026` — for role start/end dates, where the day is noise. */
export function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: UTC,
  }).format(date);
}

/** `Jan 2024 – Present` */
export function formatDateRange(start: Date, end?: Date) {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : "Present"}`;
}

/** `2026` — for the footer and year-grouped listings. */
export function formatYear(date: Date) {
  return String(date.getUTCFullYear());
}

/** `2026-10-31` for the `datetime` attribute and the sitemap. */
export function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/** RFC 822, which is what RSS readers expect. */
export function rfc822(date: Date) {
  return date.toUTCString();
}

/** `1 yr 4 mo` — duration of a role, for the work timeline. */
export function formatDuration(start: Date, end?: Date) {
  const finish = end ?? new Date();
  const months =
    (finish.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (finish.getUTCMonth() - start.getUTCMonth());
  const total = Math.max(1, months);
  const years = Math.floor(total / 12);
  const remainder = total % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr`);
  if (remainder > 0) parts.push(`${remainder} mo`);
  return parts.join(" ");
}

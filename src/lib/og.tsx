import { ImageResponse } from "next/og";
import { site } from "@/site.config";

/**
 * Shared social card renderer.
 *
 * One layout for every page type, so a link to a note and a link to a project
 * look like they came from the same site. Rendered at build time by satori,
 * which supports a subset of CSS: flexbox only, every element with more than
 * one child needs an explicit `display: flex`.
 *
 * Dark deliberately. These are seen inside LinkedIn and X feeds, which are
 * mostly white, so a dark card separates from the surrounding page.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#0b0b0d";
const FG = "#ededf0";
const MUTED = "#9b9ba6";
const ACCENT = "#90a8ff";
const LINE = "#27272e";

export function ogCard({
  title,
  eyebrow,
  attribution,
  footer,
}: {
  title: string;
  /** Small label above the title: the collection name, or the role. */
  eyebrow?: string;
  /**
   * Bottom-left text. Defaults to your name, which is what an entry card
   * wants. The home card overrides it, because there the name is already the
   * title and printing it twice looks like a template that wasn't filled in.
   */
  attribution?: string;
  /** Bottom-right text. */
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
        }}
      >
        {/* Mark + domain */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="44" height="44" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#2448d8" />
            <path
              d="M5 16h5l2.5-6.5L17 22.5l2.5-6.5H27"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 24, color: MUTED }}>
            {site.url.replace("https://", "")}
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 52 ? 60 : 72,
              lineHeight: 1.12,
              color: FG,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
        </div>

        {/* Attribution */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            fontSize: 26,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", color: FG }}>
            {attribution ?? site.name}
          </div>
          <div style={{ display: "flex" }}>{footer ?? site.specialty}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

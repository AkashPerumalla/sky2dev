/**
 * Single source of truth for everything about you.
 *
 * This is the only file you need to touch to rebrand, change domain, or add a
 * social link. Nothing else in the codebase hardcodes your name or URL.
 */
export const site = {
  name: "Akash Perumalla",
  shortName: "Akash",

  /** Shown under your name on the home page. One line, no period. */
  role: "Software Engineer",

  /**
   * Your domain. Used for canonical URLs, the sitemap, RSS and social cards.
   * No trailing slash.
   */
  url: "https://example.com",

  /** The two-or-three sentence pitch on the home page. */
  bio: "I build software, write about what I learn along the way, and keep a running log of ideas worth remembering.",

  /** Used for <meta description> and the RSS channel description. */
  description:
    "Personal site of Akash Perumalla — software engineer. Projects, writing, and notes on what I'm learning.",

  email: "akashperumalla143d@gmail.com",

  /** Order here is the order they render. Drop any you don't use. */
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/in/" },
    { label: "X", href: "https://x.com/" },
  ],

  /** Top navigation. Order here is the order they render. */
  nav: [
    { label: "Work", href: "/work" },
    { label: "Projects", href: "/projects" },
    { label: "Writing", href: "/writing" },
    { label: "Notes", href: "/notes" },
    { label: "About", href: "/about" },
  ],

  /** Shown in the footer. */
  startYear: 2026,
} as const;

export type Site = typeof site;

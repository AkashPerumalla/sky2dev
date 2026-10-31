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

  /** The specialism, shown beside the role and used in the page title. */
  specialty: "Embedded Android & real-time systems",

  /**
   * Your domain. Used for canonical URLs, the sitemap, RSS and social cards.
   * No trailing slash.
   */
  url: "https://sky2dev.dev",

  /** The two-or-three sentence pitch on the home page. */
  bio: "I build embedded Android and real-time systems: hardware interfacing over serial, SPI, UART and I2C, AOSP platform modification, and the Spring Boot services that sit above them. I have taken four systems from requirements through to deployment, including a patient monitor now in clinical use and a handheld satellite phone built under India's iDEX defence innovation programme.",

  /** Used for <meta description> and the RSS channel description. */
  description:
    "Akash Perumalla, a software engineer working on embedded Android, real-time systems and the services above them. Projects, writing and notes on what I'm learning.",

  email: "akashperumalla0215@gmail.com",

  location: "Hyderabad, Telangana",

  /** Order here is the order they render. Drop any you don't use. */
  socials: [
    { label: "GitHub", href: "https://github.com/AkashPerumalla" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/akashperumalla0215/" },
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

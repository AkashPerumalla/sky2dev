import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/site.config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

/*
 * Fonts are downloaded at build time and self-hosted from your own domain —
 * no request to Google at runtime, no layout shift, no third-party tracking.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative URL below resolve against your domain.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${site.name} — RSS` }],
    },
  },
  robots: { index: true, follow: true },
};

/**
 * Sets the theme class before first paint so there's no flash of the wrong
 * theme. Has to be inline and blocking — a deferred script runs too late.
 * Reads the saved choice, falls back to the OS preference.
 */
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} flex min-h-dvh flex-col`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-1.5 focus:text-sm focus:text-accent-fg"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="mx-auto w-full max-w-wide flex-1 px-5 py-14 sm:px-8">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}

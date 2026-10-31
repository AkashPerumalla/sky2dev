"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/site.config";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";

/**
 * Sticky header. Client-side only for the active-link state, which needs the
 * current pathname. Nav items come from `site.config.ts`, so adding a section
 * is a one-line change there.
 */
export function SiteHeader() {
  const pathname = usePathname();

  function isActive(href: string) {
    // `/writing/some-post` should still light up the `Writing` tab.
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-wide items-center gap-x-6 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="shrink-0 font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {site.shortName}
        </Link>

        {/* Scrolls horizontally on narrow screens instead of wrapping or breaking. */}
        <ul className="scrollbar-none flex flex-1 items-center gap-x-5 overflow-x-auto text-sm">
          {site.nav.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-fg",
                  isActive(item.href) ? "text-fg" : "text-muted",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { cn } from "@/lib/cn";

/**
 * Email link that copies the address instead of firing a mailto:.
 *
 * Progressive enhancement, deliberately: the element really is an
 * `<a href="mailto:…">`. Before hydration, with JavaScript off, or if the
 * Clipboard API is unavailable (it needs a secure context), the click falls
 * through and behaves exactly as a mailto: link always did. The copy behaviour
 * is an upgrade on top of a working link, never a replacement for one — so
 * this can't end up as a dead element.
 *
 * Modifier-clicks and middle-clicks are left alone, so cmd/ctrl-click still
 * opens a mail client for anyone who wants that.
 */
export function EmailLink({
  className,
  label = "Email",
}: {
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Don't call setState after the component is gone.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Let the browser handle cmd/ctrl/shift/alt-clicks as a normal mailto:.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    // No Clipboard API (insecure context, old browser) — leave mailto: alone.
    if (!navigator.clipboard?.writeText) return;

    event.preventDefault();

    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Permission denied or a blocked context — fall back to the mail client
      // rather than silently doing nothing.
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <a
      href={`mailto:${site.email}`}
      onClick={handleClick}
      title={`${site.email} — click to copy`}
      className={cn("group inline-flex items-center gap-1", className)}
    >
      {/*
        Both labels occupy the same grid cell, so the cell is sized to the wider
        of the two and the row never reflows when the text swaps. A width change
        here would nudge every link beside it.
      */}
      <span className="inline-grid">
        {/*
          The two labels swap instantly rather than crossfading. A fade leaves
          both glyph sets overlapping for its duration, which reads as blurred
          text rather than as a transition.
        */}
        <span
          className={cn(
            "col-start-1 row-start-1",
            copied ? "invisible" : "visible",
          )}
          aria-hidden={copied}
        >
          {label}
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1",
            copied ? "visible" : "invisible",
          )}
          aria-hidden={!copied}
        >
          Copied
        </span>
      </span>

      <svg
        className={cn(
          "size-3 shrink-0 transition-opacity duration-150",
          copied ? "opacity-100" : "opacity-40",
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {copied ? (
          <path d="M20 6 9 17l-5-5" />
        ) : (
          <>
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>

      {/* Announced to screen readers; the visual swap above is silent to them. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${site.email} copied to clipboard` : ""}
      </span>
    </a>
  );
}

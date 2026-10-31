"use client";

/**
 * Theme toggle.
 *
 * Deliberately stateless: both icons are always in the DOM and CSS picks which
 * one shows based on the `dark` class. That means no React state, no hydration
 * mismatch, and no flash — the class is already set by the inline script in
 * `layout.tsx` before first paint.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage — the toggle still works for this page.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="-m-1.5 cursor-pointer rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <svg
        className="size-4 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        className="hidden size-4 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}

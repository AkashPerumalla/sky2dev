import Link from "next/link";
import { site } from "@/site.config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const range =
    year > site.startYear ? `${site.startYear}–${year}` : String(year);

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-wide flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {range} {site.name}
        </p>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="me noreferrer"
                className="transition-colors hover:text-fg"
              >
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-fg"
            >
              Email
            </a>
          </li>
          <li>
            <Link href="/rss.xml" className="transition-colors hover:text-fg">
              RSS
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

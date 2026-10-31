# Personal site

A continuously-updated personal site: work history, projects, writing, and
short notes. Content is Markdown in this repository; the site is a static
export, so every page is plain HTML with no server behind it.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Adding content

One command, one file:

```bash
npm run new notes "Route params are a Promise now"
npm run new writing "Static until proven otherwise"
npm run new projects "My new thing"
npm run new work "Senior Engineer"
```

Each creates a Markdown file with valid frontmatter in `content/<collection>/`,
marked `draft: true`. Delete that line to publish. Nothing else needs changing —
listings, the tag index, the sitemap and the RSS feed all read from the
filesystem at build time.

Drafts are visible in `npm run dev` and excluded from production builds,
the sitemap, and the feed.

### The four collections

| Collection | For | Bar for publishing |
|---|---|---|
| `work/` | Roles and what you did in them | One per role |
| `projects/` | Things you built, including dead ends | Anything you'd show someone |
| `writing/` | Essays and longer thinking | You have a position to argue |
| `notes/` | Short learnings, TIL-style | Three sentences and a link |

The split is deliberate. If essays are the only option, the bar is "I have a
thesis" and the site goes quiet. Notes keep it alive.

Tags are shared across all four, so `/tags/typescript` shows the role, the
project, the essay and the note together.

### Frontmatter

Validated against [Zod schemas](src/lib/content/schema.ts) at build time — a
missing field or a malformed date **fails the build** with the file and field
named, rather than rendering a broken page.

Shared by every collection:

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `summary` | yes | Used in listings, social cards, and RSS |
| `date` | yes | `YYYY-MM-DD`; drives sort order |
| `updated` | no | Renders as "Updated …" |
| `tags` | no | Defaults to `[]` |
| `draft` | no | Hidden in production |
| `featured` | no | Pinned on the home page |

Collection-specific fields: `work` adds `position`, `company`, `companyUrl`,
`location`, `start`, `end` (omit while current). `projects` adds `status`
(`active` / `shipped` / `experiment` / `archived`), `repo`, `url`, `tech`.
`notes` adds `source`, `sourceLabel`. `writing` adds `wip`.

A YAML gotcha: values starting with a backtick, `@`, `%`, `&`, `*`, `!` or `:`
must be quoted.

### Code blocks

Syntax highlighting is resolved at build time — no JavaScript ships to the
reader. Both light and dark themes are baked in as CSS variables, so switching
theme never re-highlights.

````markdown
```ts title="src/lib/content/schema.ts" {2-4}
// `title` adds a filename label; {2-4} highlights those lines
````

## Customizing

[`src/site.config.ts`](src/site.config.ts) is the only file with your name,
domain, bio, socials and navigation in it. Everything else reads from there.

Colors live as semantic tokens at the top of
[`src/app/globals.css`](src/app/globals.css) (`--bg`, `--fg`, `--accent`, …),
defined once for light and once for dark. Retheming the site means editing that
one block.

## Deploying

`npm run build` produces `out/` — a complete static site. The same directory
deploys to any of these without a code change:

| Host | Setup |
|---|---|
| **GitHub Pages** | Settings → Pages → Source → *GitHub Actions*. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys on push to `main`. |
| **Cloudflare Pages** | Connect repo. Build command `npm run build`, output directory `out`. |
| **Netlify** | Connect repo. [`netlify.toml`](netlify.toml) supplies the settings. |
| **Vercel** | Connect repo. Auto-detected; no config needed. |

### Before you go live

1. Set `url` in `src/site.config.ts` to your domain — canonical URLs, the
   sitemap, and RSS all derive from it.
2. Fill in `socials` and `email` in the same file.
3. **Custom domain on GitHub Pages:** add a `public/CNAME` file containing just
   your domain.
4. **Repo subpath instead of a domain** (`user.github.io/repo`): set
   `NEXT_PUBLIC_BASE_PATH=/repo` in the workflow's build step.

`public/.nojekyll` is required for GitHub Pages — without it, Jekyll strips the
`_next/` directory and the site loads unstyled.

## Why this stack

- **Static export** — no server to patch, no runtime to go stale, and the build
  output is host-portable. Moving providers is one DNS change.
- **Markdown in git** — the content is the asset. No CMS account to
  re-authenticate after a year away, no database to migrate, and every change
  diffs in a pull request.
- **Schema-validated frontmatter** — you're the only person who would notice a
  quietly broken page, and you aren't looking. Build-time validation is what
  makes the site safe to ignore for six months.
- **Zero client JS by default** — highlighting, typography and theming are all
  resolved at build time, so the archive can grow to hundreds of entries
  without getting slower.
- **One config file** — rebranding or changing domain touches
  `src/site.config.ts` and nothing else.

Escape hatch: deleting the `output: "export"` line in
[`next.config.ts`](next.config.ts) turns this back into a full server-rendered
Next.js app, with API routes and dynamic rendering available. Nothing here
forecloses that.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server, drafts visible |
| `npm run build` | Static export to `out/` |
| `npm run typecheck` | Type check without emitting |
| `npm run new <collection> "Title"` | Scaffold a content file |

# Running this site

Everything you need to add content, change how it looks, deploy it, and fix it
when it breaks. Written to be useful after six months away.

---

## 1. Daily use

### Adding something

```bash
npm run new notes "Route params are a Promise now"
npm run new writing "Static until proven otherwise"
npm run new projects "My new thing"
npm run new work "Senior Engineer"
```

This creates a file in `content/<collection>/` with valid frontmatter, marked
`draft: true`. Write the body, delete the `draft: true` line, commit, push. The
listing page, tag index, sitemap and RSS feed all update themselves.

### Seeing it before it's public

```bash
npm run dev
```

Drafts are visible at <http://localhost:3000> and excluded from production. So
you can push a half-finished piece safely; it deploys without publishing.

### Publishing

```bash
git add .
git commit -m "Add note on X"
git push
```

That is the whole publishing pipeline. GitHub Actions type-checks, validates
every frontmatter field, builds, and deploys. Live in about a minute.

---

## 2. The four collections

| Collection | For | Bar for publishing |
|---|---|---|
| `work/` | Roles and what you did in them | One per role |
| `projects/` | Systems you built, including unfinished ones | Anything you'd show someone |
| `writing/` | Essays | You have a position to argue |
| `notes/` | Short learnings | Three sentences and a link |

The writing/notes split is deliberate. If essays are the only option, the bar
becomes "I have a thesis" and the site goes quiet by month four. Notes keep it
alive between essays. A note can genuinely be three sentences.

Tags are shared across all four, so `/tags/android` shows the role, the
project, the essay and the note together.

---

## 3. Frontmatter reference

Validated by Zod at build time. A missing field or malformed date **fails the
build** with the file and field named. Schemas live in
[`src/lib/content/schema.ts`](../src/lib/content/schema.ts).

### Every collection

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `summary` | yes | Listings, social cards, RSS |
| `date` | yes | `YYYY-MM-DD`, drives sort order |
| `updated` | no | Renders as "Updated …" |
| `tags` | no | Defaults to `[]` |
| `draft` | no | Hidden in production |
| `featured` | no | Pinned on the home page |

### Collection-specific

**`work/`** — `position`, `company`, `companyUrl`, `location`, `start`, `end`.
Omit `end` while you're still there; it renders as "Present" and makes it the
role shown on the home page. Duration is computed, never typed.

**`projects/`** — `status` (`active` / `shipped` / `experiment` / `archived`),
`repo`, `url`, `tech`. The projects page groups by status so current work reads
first.

**`notes/`** — `source`, `sourceLabel` for where you learned it.

**`writing/`** — `wip` marks unfinished thinking.

### The YAML trap

Values starting with a backtick, `@`, `%`, `&`, `*`, `!` or `:` must be quoted.
This bit us once already:

```yaml
# Breaks the build
summary: `new Date()` returns UTC midnight

# Fine
summary: "`new Date()` returns UTC midnight"
```

---

## 4. Code blocks

Highlighting is resolved at build time, so no JavaScript reaches the reader and
both themes are baked in.

````markdown
```ts title="src/lib/content/schema.ts" {2-4}
// `title` adds a filename label
// {2-4} highlights those lines
```
````

---

## 5. Changing how it looks

**Name, domain, bio, socials, nav** — all in
[`src/site.config.ts`](../src/site.config.ts). Nothing else hardcodes them.

**Colours** — semantic tokens at the top of
[`src/app/globals.css`](../src/app/globals.css): `--bg`, `--fg`, `--accent`,
`--muted`, `--line`, each defined once for light and once for dark. Components
reference `bg-surface` and `text-muted`, never a hex value, so retheming the
whole site means editing that one block.

**Article typography** — the `.prose` block in the same file. Hand-written
rather than a plugin, so every rule is visible and editable.

---

## 6. How deployment works

```
git push
   ↓
GitHub Actions (.github/workflows/deploy.yml)
   ↓  npm ci          exact lockfile, no drift
   ↓  npm run typecheck
   ↓  npm run build   → out/   (validates all frontmatter)
   ↓
GitHub Pages → sky2dev.dev
```

The build output is a plain static directory. The same `out/` deploys to
Cloudflare Pages, Netlify or Vercel without a code change, so moving host is
one DNS change rather than a migration.

### Rolling back

```bash
git revert HEAD
git push
```

Redeploys the previous state. There's no database and no migrations, so a
revert is genuinely a full rollback.

### Checking a deploy

```bash
gh run list --repo AkashPerumalla/sky2dev --limit 3
gh run watch <run-id> --repo AkashPerumalla/sky2dev
```

---

## 7. Domain

| Item | Value |
|---|---|
| Domain | sky2dev.dev |
| Registrar / DNS | Porkbun |
| Expires | **2027-01-31** |
| Apex | Four A records + four AAAA to GitHub Pages |
| `www` | CNAME → `akashperumalla.github.io` |
| Custom domain | Set on the repo, not via `public/CNAME` |
| HTTPS | Enforced, Let's Encrypt, auto-renewing |

Under the Actions deploy flow, GitHub does **not** read `public/CNAME` to set
the domain. It has to be set on the repository (Settings → Pages, or the API).
The file is kept because it's inert elsewhere and harmless.

```bash
# Verify DNS
dig +short sky2dev.dev

# Verify the custom domain and HTTPS
gh api repos/AkashPerumalla/sky2dev/pages -q '"\(.cname) https=\(.https_enforced)"'
```

---

## 8. Troubleshooting

**Build fails: "Invalid frontmatter in content/…"**
The error names the file and field. Usually a missing `summary` or a date that
isn't `YYYY-MM-DD`.

**Build fails: "Could not parse YAML frontmatter"**
A value starts with a reserved character. Quote it. See §3.

**Build fails: "returned an empty array from generateStaticParams()"**
Shouldn't happen — `staticParamsFor()` handles empty collections by emitting a
sentinel slug that renders a 404. If it reappears, that helper has been bypassed.

**Site loads unstyled**
Assets are being requested from a path that doesn't exist. Either the custom
domain came unset on the repo, or something set `NEXT_PUBLIC_BASE_PATH`.

**Deploy job fails, build job passes**
Almost always a Pages configuration problem rather than a code problem. Check
Settings → Pages → Source is "GitHub Actions".

**RSS shows raw XML**
Hard-reload. `public/rss.xsl` styles it; a cached response won't have it.

**A new entry doesn't appear**
`draft: true` is still in the frontmatter, or the date is in the future.

---

## 9. Maintenance schedule

**Every few months**

```bash
npm outdated          # see what moved
npm update            # minor and patch, safe
npm run build         # confirm nothing broke
```

Major version bumps (Next, React, Tailwind) deserve their own branch and a
visual check of a project page, a note, and dark mode.

**Annually**
- Domain renewal, 31 January
- Check the Let's Encrypt certificate renewed (it's automatic, but confirm)

**Watch for**
GitHub Actions deprecation warnings in the workflow log. Currently
`actions/deploy-pages@v4` reports a Node 20 deprecation; it's GitHub's own
action and v4 is current, so there's nothing to do yet.

---

## 10. Recommended improvements

In the order I'd do them.

### High value

**1. A favicon.** There is none, so browsers show a default globe icon in tabs
and bookmarks. Add `src/app/icon.svg` (or `icon.png`, at least 180×180) and
Next generates the link tags automatically.

**2. Social card images.** `og:image` is absent, so a link shared to LinkedIn
or X renders as a bare text block with no image. For a portfolio this is the
single biggest missed opportunity, because LinkedIn is where it'll be shared.
Next can generate them per page at build time via `opengraph-image.tsx`, using
the entry title and your name. Works with static export.

### Worth doing

**3. Real project dates.** Currently spread plausibly across your Avantel
tenure, since the resume dates roles but not systems. The one thing on the site
only you can correct.

**4. Avantel's company URL.** Add `companyUrl:` to `content/work/avantel.md`
and the company name becomes a link.

**5. Your voice in the entries.** The prose is mine, rewritten to read plainly.
Anyone who has spoken to you will notice. The patient monitor page is the one
most likely to be read closely.

### Optional

**6. Analytics.** If you want to know whether anyone reads it. A privacy-
respecting option (Plausible, Umami, Cloudflare Web Analytics) avoids a cookie
banner entirely.

**7. Pin the runner image.** The workflow uses `ubuntu-latest`, which migrates
to Ubuntu 26 in October 2026. Pinning `ubuntu-24.04` trades automatic updates
for predictability.

**8. A `/uses` or `/now` page.** Cheap to add, and both are commonly linked.

---

## 11. Where things live

```
content/            Markdown. The actual content.
  work/ projects/ writing/ notes/
docs/GUIDE.md       This file.
public/             Served as-is.
  CNAME             Domain, for GitHub Pages.
  rss.xsl           Makes the feed readable in a browser.
  _headers          Security + caching (Cloudflare/Netlify only).
  .nojekyll         Stops Pages stripping _next/. Do not delete.
scripts/new-entry.mjs
src/
  site.config.ts    Name, domain, bio, socials, nav.
  app/              Routes, sitemap, robots, RSS.
  components/       UI.
  lib/content/      Loader + Zod schemas. The core.
  lib/format.ts     Dates, in UTC deliberately.
.github/workflows/deploy.yml
next.config.ts      output: "export" lives here.
```

---

## 12. Why it's built this way

**Static export.** No server to patch, no runtime to go stale, and the output
is host-portable. Deleting the `output: "export"` line in `next.config.ts`
turns this back into a full server-rendered Next app with API routes, if that's
ever needed. Nothing here forecloses it.

**Markdown in git.** The content is the asset. No CMS account to
re-authenticate after a year, no database to migrate, and every change diffs in
a commit.

**Schema-validated frontmatter.** You are the only person who would notice a
quietly broken page, and you aren't looking. Build-time validation is what makes
the site safe to ignore for months.

**Almost no client JavaScript.** Highlighting, typography and theming resolve at
build time. The only script that ships for reading is the email copy button.

**One config file.** Rebranding or changing domain touches `src/site.config.ts`
and nothing else.

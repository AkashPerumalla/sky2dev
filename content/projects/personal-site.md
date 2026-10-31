---
title: This site
summary: A statically exported Next.js site where all content is validated Markdown in git.
date: 2026-10-31
status: active
repo: https://github.com/AkashPerumalla/sky2dev
tech: [Next.js, TypeScript, Tailwind, MDX]
tags: [web, typescript]
---

The site you're reading. Built to be added to for years without becoming a
maintenance burden.

## The constraint

Most personal sites die the same way: adding a post means touching component
code, so the friction quietly rises until you stop. The fix is to make content
*data*, not code.

Adding an entry here is one file:

```bash
npm run new writing "The thing I learned"
```

That writes a Markdown file with valid frontmatter. Nothing else needs to change
— the listing page, the tag index, the sitemap and the RSS feed all pick it up
from the filesystem on the next build.

## Validated frontmatter

Every collection has a Zod schema. A bad date or a missing field fails the build
with the file named, instead of rendering a broken page:

```ts title="src/lib/content/schema.ts"
export const projectSchema = base.extend({
  status: z
    .enum(["active", "shipped", "archived", "experiment"])
    .default("active"),
  repo: z.string().url().optional(),
  tech: z.array(z.string().min(1)).default([]),
});
```

That one guarantee is what makes the site safe to ignore for six months.

## Why static export

`output: "export"` means every page is pre-rendered HTML. The same `out/`
directory deploys to GitHub Pages, Cloudflare Pages, Netlify or Vercel with no
code change, so switching hosts costs one DNS record. There's no server to
patch and no runtime to go stale.

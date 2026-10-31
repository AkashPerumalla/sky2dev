---
title: This site
summary: A statically exported Next.js site where every piece of content is validated Markdown held in git.
date: 2026-10-31
status: shipped
repo: https://github.com/AkashPerumalla/sky2dev
url: https://sky2dev.dev
tech: [Next.js, TypeScript, Tailwind, MDX]
tags: [web, typescript]
---

The site you're reading. Built to be added to for years without becoming a
maintenance burden.

## The constraint

Most personal sites die the same way. Adding a post means editing component
code, so friction rises quietly until publishing stops being worth the evening
it costs. Treating content as data rather than code removes that.

Adding an entry here is one file:

```bash
npm run new writing "The thing I learned"
```

That writes a Markdown file with valid frontmatter. Nothing else needs to
change. The listing page, the tag index, the sitemap and the RSS feed all pick
it up from the filesystem on the next build.

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

That single guarantee is what makes the site safe to leave alone for six
months at a time.

## Why static export

`output: "export"` means every page is pre-rendered HTML. The same `out/`
directory deploys to GitHub Pages, Cloudflare Pages, Netlify or Vercel without
a code change, so switching hosts costs one DNS record. No server needs
patching and no runtime goes stale.

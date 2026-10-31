---
title: Validate content at build time, not render time
summary: Putting a schema over Markdown frontmatter turns a silently broken page into a failed build.
date: 2026-10-18
tags: [typescript, zod, process]
---

Content with optional-everything types fails quietly: a missing `title` renders
an empty `<h1>` and nobody notices for months.

Parsing frontmatter through a schema moves the failure to the build:

```ts
const parsed = schema.safeParse(frontmatter);

if (!parsed.success) {
  throw new Error(
    `Invalid frontmatter in ${file}\n` +
      parsed.error.issues
        .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
        .join("\n"),
  );
}
```

The error names the file and the field, so the fix is obvious even when you
haven't touched the repo in half a year. The point isn't type safety for its own
sake — it's that *you* are the only person who would ever notice the bug, and
you're not looking.

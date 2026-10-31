---
title: The only feature a personal site needs
summary: Every abandoned developer blog was abandoned for the same reason, and it isn't a lack of ideas.
date: 2026-10-28
featured: true
tags: [writing, web, process]
draft: true # written as a format example — replace or delete
---

Every developer I know has a personal site. Most of them have three posts, the
newest from two years ago. Mine was heading the same way, and the reason had
nothing to do with running out of things to say.

## The real failure mode

Publishing had a cost, and the cost was never the writing.

It was remembering how the build worked. It was the dependency that had gone
stale since last time. It was the component I had to edit to add the post to the
index, and the slightly different component for the tag page. By the time I'd
remembered all of it, the thought I wanted to write down had gone cold.

A site you return to twice a year has to survive being forgotten. That's a
harder requirement than it sounds, and almost no framework optimizes for it.

## What survives being forgotten

Three properties, in order of how much they matter:

**Content is files.** Markdown in a git repository. No database to migrate, no
CMS login to re-establish, no API that changed its auth flow while you weren't
looking. The content outlives whatever renders it.

**Adding an entry touches exactly one file.** Not a file plus an index plus a
route. If publishing requires editing code, publishing is a programming task,
and programming tasks need a free evening.

**Mistakes fail loudly.** A schema over the frontmatter means a wrong date
breaks the build, not the page. Loud failure at build time is a gift; silent
failure is how you discover in month eight that four posts have been 404ing.

## Lower the bar, not the standard

The other half of the fix is structural. I keep two separate collections:
essays, and short notes.

Essays are for things I've thought about enough to argue a position on. They're
slow, and that's correct. But if essays are the only option, the bar is "I have
a thesis," and most weeks I don't.

Notes have a bar of three sentences and a link. Something I learned, written
down while it was still surprising. They cost nothing to publish, and they're
the reason the site has anything recent on it at all.

The essays are what people read. The notes are what keep the site alive long
enough for anyone to find them.

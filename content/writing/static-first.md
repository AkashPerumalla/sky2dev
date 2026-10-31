---
title: Static until proven otherwise
summary: Why I reach for a pre-rendered page before anything that needs a server running.
date: 2026-09-05
tags: [web, architecture, performance]
---

A pre-rendered HTML file has a property nothing else does: it keeps working.
Not "has good uptime" — there is nothing in the request path that can be down.

## What you give up

Honest accounting first. Going static costs you:

- Server-side request handling — no API routes, no form POSTs.
- On-demand revalidation and per-request personalization.
- Runtime image optimization.

For a content site, that list is free. Nothing on this site needs to know who
you are.

## What you get

```bash
npm run build   # → out/
```

That directory is the entire site. It deploys to any static host, which means:

| Property | Why it matters |
|---|---|
| No server | Nothing to patch, nothing to pay for, nothing to wake up to |
| Host-portable | Switching providers is one DNS change, not a migration |
| Fast by construction | First byte is a file read from a CDN edge |
| Archivable | The output is still readable in ten years without a runtime |

That last one is underrated. A static build is a *snapshot*. Zip it and it still
renders in 2036.

## The test

Before adding anything that needs a server, I ask whether the page differs per
visitor. Usually it doesn't — it differs per *deploy*, and that's a build-time
problem wearing a runtime costume.

Start static. Reach for a server when a real requirement forces it, and not
one page sooner.

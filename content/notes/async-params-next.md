---
title: Route params are a Promise now
summary: In recent Next.js versions, `params` in a page component must be awaited — forgetting it fails the type check, not the runtime.
date: 2026-10-30
tags: [nextjs, react, typescript]
source: https://nextjs.org/docs
sourceLabel: Next.js docs
draft: true # written as a format example — replace or delete
---

Dynamic route props are async:

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ...
}
```

The old synchronous shape still type-checks against `any` if you're careless
with the prop type, which is how this one bites — it surfaces as a confusing
runtime value rather than a clear error. Typing the prop as `Promise<...>`
explicitly makes it impossible to get wrong.

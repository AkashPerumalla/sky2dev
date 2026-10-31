---
title: Format build-time dates in UTC
summary: "A date-only string parses as UTC midnight, so formatting it in a local timezone west of UTC renders the day before."
date: 2026-10-26
tags: [javascript, dates]
---

A date-only string parses as UTC midnight. Format it without pinning the
timezone and anyone west of Greenwich sees yesterday:

```js
const d = new Date("2026-10-31");

d.toLocaleDateString("en-GB");
// "30/10/2026" in New York — off by one

d.toLocaleDateString("en-GB", { timeZone: "UTC" });
// "31/10/2026" everywhere
```

Worse, it's inconsistent rather than broken: correct on your machine, wrong on
a CI runner in a different region. Any date that came from a file rather than
from a user gets `timeZone: "UTC"`.

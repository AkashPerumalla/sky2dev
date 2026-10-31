---
title: On embedded Android, permissions are not the boundary
summary: When an app needs direct peripheral access, the fix is usually not a manifest entry. It is a change to the platform image that ships the app as privileged.
date: 2026-10-31
tags: [android, aosp, embedded, ndk]
draft: true # drafted for you to rewrite in your own voice; delete this line to publish
---

Working on a handheld satcom device, I needed the application to talk directly
to SPI, UART, GPIO and I2C. My first instinct was to go looking for the
permission that unlocks it. There isn't one.

Stock Android deliberately provides no route from an app process to raw
peripherals. The access is not gated behind a permission you can request; it
does not exist at the application layer at all. Once that was clear, the
question changed. Rather than asking what my application was allowed to do, I
had to ask what the platform needed to grant, and whether I could change the
platform.

On a custom device you can. Modifying AOSP so the application ships as a
privileged system app moves it inside the trust boundary, which is what makes
both direct peripheral access and persistent background execution possible. The
NDK layer does the actual talking to hardware. The platform change is only what
gives it standing to.

The general lesson: where you control the device image, the manifest is not the
limit of what is possible. It is the limit of what is possible without
rebuilding the platform, and those are very different constraints. A week spent
hunting for a permission that does not exist is a week not spent on the
platform change that would have worked.

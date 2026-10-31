---
title: On embedded Android, permissions aren't the boundary — the platform is
summary: When an app needs direct peripheral access, the fix usually isn't a manifest entry. It's a change to the platform image that ships the app as privileged.
date: 2026-10-31
tags: [android, aosp, embedded, ndk]
draft: true # drafted for you to rewrite in your own voice — delete this line to publish
---

Working on a handheld satcom device, I needed the application to talk directly
to SPI, UART, GPIO and I2C. The reflex is to go looking for the permission that
unlocks it. There isn't one.

Ordinary Android deliberately has no route from an app process to raw
peripherals. The access isn't gated behind a permission you can request — it
doesn't exist at the application layer at all. So the question stops being *can
my app do this* and becomes *what does the platform need to grant, and can I
change the platform?*

On a custom device you can. Modifying AOSP to ship the application as a
**privileged system app** moves it inside the trust boundary, which is what
makes both direct peripheral access and persistent background execution
possible. The NDK layer then does the actual talking; the platform change is
only what gives it standing to.

The transferable part: on a product where you control the image, the manifest
isn't the edge of what's possible. It's the edge of what's possible *without
rebuilding the platform* — and those are very different limits. A week spent
looking for the permission that doesn't exist is a week not spent on the
platform change that does.

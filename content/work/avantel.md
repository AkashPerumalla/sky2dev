---
title: Software Engineer at Avantel
position: Software Engineer — Embedded Android & System Software
company: Avantel Limited
location: Hyderabad, Telangana
start: 2024-11-01
summary: Building embedded Android and real-time systems across medical, defence and satellite ground infrastructure — from NDK-level hardware interfacing up to the Spring Boot services behind them.
date: 2024-11-01
tags: [android, aosp, embedded, java, spring-boot, real-time]
---

I work across the full depth of the Android stack here — native code talking to
hardware over serial, SPI, UART and I2C at the bottom, AOSP platform
modification in the middle, and Spring Boot service layers at the top.

Four systems, each taken from requirements through to deployment:

- **[Patient Monitoring System](/projects/patient-monitoring-system)** — a
  multi-parameter patient monitor now in active clinical use at Lakshmi
  Foundation Hospital.
- **[Handheld Satellite Phone](/projects/handheld-satellite-phone)** — the MMI
  application layer for a satcom handset built under India's iDEX Challenge 19.
- **[Satellite Ground Station Hub](/projects/satellite-ground-station-hub)** — a
  unified monitoring and control platform replacing 8–10 vendor-specific tools.
- **[Maritime Situational Awareness](/projects/maritime-situational-awareness)** —
  fusing AIS transponder and multi-band radar feeds into one vessel-tracking
  display. Ongoing.

## What the work actually involves

The common thread is that none of these are application-layer problems. A
patient monitor that drops samples is a clinical risk, not a bug report. A
satcom handset has to provision itself as a privileged system app because the
peripherals it needs aren't reachable from userspace. A ground station hub is
really a protocol integration problem wearing a dashboard.

So most of the engineering goes into the layers people don't see: threading
models that hold a sample rate under load, AOSP changes that grant an
application the access it needs, and protocol abstractions that make the next
vendor's equipment a configuration change rather than a rewrite.

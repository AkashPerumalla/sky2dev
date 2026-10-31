---
title: Handheld Satellite Phone
summary: The MMI application layer for a handheld satcom device built under India's iDEX Challenge 19 defence innovation programme.
date: 2025-08-01
status: shipped
featured: true
tech: [Android, AOSP, NDK, JNI, SPI, UART, GPIO, I2C]
tags: [android, aosp, embedded, defence, ndk]
---

Developed the MMI (man–machine interface) application layer for a handheld
satellite communications device, built under **iDEX Challenge 19** — part of
India's Innovations for Defence Excellence programme.

## Getting to the hardware

The application implements native SPI, UART, GPIO and I2C interfaces through the
Android NDK. On a normal Android device none of that is reachable — the
peripherals a satcom handset depends on sit below anything a userspace app is
permitted to touch.

So the platform itself had to change. I modified AOSP to provision the
application as a **privileged system app** on a Telit smart module, which gave
it direct peripheral access and let it run background services persistently
rather than at the mercy of the ordinary process lifecycle.

That's the part worth generalizing: on embedded Android, the question "can my
app do this?" is usually the wrong one. The right one is "what does the platform
need to grant, and can I change the platform?"

## What it does

- Satcom voice calling and messaging
- Offline maps
- Conversation threads
- Full-duplex live streaming
- A network monitoring service managing failover to a Wi-Fi-linked external
  high-gain antenna

The failover service is the quiet one, and the one a field user would notice
first if it were missing — link quality on a handheld satcom device is not a
stable thing, and the handset has to make that someone else's problem.

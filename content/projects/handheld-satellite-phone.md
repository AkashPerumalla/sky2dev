---
title: Handheld Satellite Phone
summary: The MMI application layer for a handheld satcom device built under India's iDEX Challenge 19 defence innovation programme.
date: 2025-08-01
status: shipped
featured: true
tech: [Android, AOSP, NDK, JNI, SPI, UART, GPIO, I2C]
tags: [android, aosp, embedded, defence, ndk]
---

I developed the MMI application layer for a handheld satellite communications
device, built under iDEX Challenge 19, part of India's Innovations for Defence
Excellence programme.

## Reaching the hardware

The application implements native SPI, UART, GPIO and I2C interfaces through
the Android NDK. On a stock Android device none of those are reachable. The
peripherals a satcom handset depends on sit well below anything a userspace
application is permitted to touch, and no permission exists to request them.

The platform itself had to change. I modified AOSP to provision the application
as a privileged system app on a Telit smart module, which gave it direct
peripheral access and allowed its background services to run persistently
rather than at the mercy of the ordinary process lifecycle.

This generalises. On embedded Android, asking whether an application is allowed
to do something is usually the wrong question. The useful question is what the
platform must grant, and whether you control the platform well enough to grant
it.

## Capabilities

The handset supports satcom voice calling and messaging, offline maps,
conversation threads and full-duplex live streaming. A network monitoring
service sits underneath all of it, managing failover to a Wi-Fi-linked external
high-gain antenna.

That failover service attracts no attention when it works, which is the point.
Link quality on a handheld satcom device is not stable, and the handset has to
absorb that instead of passing it to the operator.

---
title: Patient Monitoring System
summary: A multi-parameter patient monitor built for iMEDS Global, now in active clinical use at Lakshmi Foundation Hospital.
date: 2025-02-01
status: shipped
featured: true
tech: [Android, Java, NDK, Serial, Multi-threading]
tags: [android, embedded, real-time, medical, java]
---

An Android patient monitoring application interfacing over serial communication
with ZUG Medical and Witleaf multi-parameter modules — ECG, RESP, SpO₂, NIBP and
TEMP. Architected and built end to end, from requirements through to deployment.
It is in active clinical use at Lakshmi Foundation Hospital.

## Holding the sample rate

The waveform rendering and data acquisition run concurrently across four
parameter streams, sustaining **2000+ samples per second** on a multi-threaded
Java architecture.

That number is the whole design constraint. A waveform that stutters under load
isn't a cosmetic problem on a patient monitor — a clinician reading an ECG trace
is reading the *shape*, and dropped samples change the shape. Acquisition and
rendering therefore can't contend: the thread pulling from the serial link
cannot be the thread drawing to the screen, and neither can be blocked by the
one writing to storage.

## Alarms

The alarm subsystem is dual-class, separating **physiological** alarms (the
patient's condition) from **technical** ones (a lead off, a module
disconnected). They're distinct conditions requiring distinct responses, so they
get distinct visual states and audio tones rather than a single undifferentiated
alert.

Two properties mattered more than the rest:

- **Per-patient persistence.** Alarm and arrhythmia logging is keyed to patient
  ID, so the record follows the patient rather than the device.
- **Boot persistence.** Monitoring resumes across a restart. A ward monitor that
  forgets its state after a power event has failed at the one moment it was
  needed.

## What I'd carry forward

Building for a clinical setting changes what "done" means. The questions that
dominated weren't about features — they were about what happens on power loss,
on a disconnected lead, on a device that's been running for three weeks without
a restart. Most software never has to answer those. Better software would.

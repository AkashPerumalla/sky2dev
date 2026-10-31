---
title: Patient Monitoring System
summary: A multi-parameter patient monitor built for iMEDS Global, now in clinical use at Lakshmi Foundation Hospital.
date: 2025-02-01
status: shipped
featured: true
tech: [Android, Java, NDK, Serial, Multi-threading]
tags: [android, embedded, real-time, medical, java]
---

An Android patient monitoring application that interfaces over serial
communication with ZUG Medical and Witleaf multi-parameter modules, covering
ECG, RESP, SpO₂, NIBP and TEMP. I architected and built it end to end, from
requirements through to deployment. It is in clinical use at Lakshmi Foundation
Hospital.

## Holding the sample rate

Waveform rendering and data acquisition run concurrently across four parameter
streams, sustaining over 2000 samples per second on a multi-threaded Java
architecture.

That figure drove the entire design. A clinician reading an ECG trace is
reading its shape, so dropped samples change what the trace says, not merely
how smoothly it animates. Acquisition and rendering could not be allowed to
contend for the same thread, and neither could block behind storage writes.

## Alarms

The alarm subsystem separates physiological alarms, which concern the patient,
from technical ones such as a detached lead or a disconnected module. These
demand different responses from ward staff, so each class has its own visual
state and audio tone rather than sharing a single undifferentiated alert.

Two behaviours mattered more than the rest. Alarm and arrhythmia logging is
keyed to patient ID, so the record follows the patient rather than the device.
Monitoring also resumes across a restart, because a monitor that forgets its
state after a power event has failed at precisely the moment it was needed.

## What I took from it

Building for a ward changes the definition of finished. The questions that
dominated review were not about features. They were about behaviour on power
loss, on a disconnected lead, and on a device left running for three weeks
without a restart. Most software is never asked those questions.

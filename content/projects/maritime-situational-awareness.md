---
title: Maritime Situational Awareness System
summary: Fusing AIS transponder and multi-band radar feeds from multiple vendors into a single real-time vessel-tracking display.
date: 2026-09-01
status: active
tech: [Java, Real-time, Radar, AIS]
tags: [real-time, sensor-fusion, maritime, java]
---

Currently building a real-time situational awareness platform that fuses
heterogeneous **AIS transponder** and **multi-band radar (S/X)** feeds from
multiple equipment vendors into a unified vessel-tracking display.

## Why fusion is the hard part

AIS and radar disagree, and both are right.

AIS is cooperative — a vessel reports its own identity and position. Radar is
non-cooperative — it detects what's physically there, including vessels not
transmitting at all. One source has identity without guaranteed presence; the
other has presence without identity. Different update rates, different accuracy
characteristics, different failure modes.

Reconciling them into one track picture is the actual engineering problem. A
display that shows two contacts where there is one vessel is worse than showing
neither, because now the operator is debugging the system instead of watching
the water.

## Status

In progress. I'll write this up properly once it's deployed — particularly the
track correlation logic, which is where the interesting decisions live.

---
title: Maritime Situational Awareness System
summary: Fusing AIS transponder and multi-band radar feeds from several vendors into one real-time vessel-tracking display.
date: 2026-09-01
status: active
tech: [Java, Real-time, Radar, AIS]
tags: [real-time, sensor-fusion, maritime, java]
---

I am building a real-time situational awareness platform that fuses
heterogeneous AIS transponder and multi-band radar (S/X) feeds from several
equipment vendors into a single vessel-tracking display.

## Why fusion is the difficult part

AIS and radar disagree with each other, and both are telling the truth.

AIS is cooperative. A vessel broadcasts its own identity and position, which
means the data is rich but depends on the vessel choosing to transmit. Radar is
non-cooperative. It detects what is physically present, including vessels
running dark, but it cannot say who they are. One source gives identity without
guaranteed presence, the other presence without identity, and they differ in
update rate, accuracy and failure mode.

Reconciling the two into a single track picture is the real engineering
problem. A display showing two contacts where one vessel exists is worse than
showing nothing, because the operator stops watching the water and starts
debugging the system.

## Status

In progress. I intend to write this up properly once it is deployed,
particularly the track correlation logic, which is where the interesting
decisions are.

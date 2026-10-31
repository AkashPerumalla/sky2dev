---
title: Satellite Ground Station Hub
summary: A unified monitoring and control platform that replaced 8–10 vendor-specific M&C tools with a single Spring Boot interface.
date: 2026-02-01
status: shipped
tech: [Spring Boot, REST, JWT, SNMP, UDP, SPI, Serial]
tags: [spring-boot, backend, protocols, satellite, java]
---

A ground station runs equipment from many vendors, and each vendor ships its own
monitoring and control tool. That means 8–10 separate interfaces, 8–10 ways of
expressing the same concepts, and an operator holding the translation in their
head.

I designed a unified M&C platform that replaced all of them with a single Spring
Boot interface, secured via JWT and exposed over REST APIs.

## The part that made it last

The temptation in an integration project is to write one adapter per device. It
works, and it produces a codebase where the eleventh device costs exactly as
much as the first.

Instead I built reusable **protocol abstraction layers** — SNMP (including trap
handling), UDP, SPI and serial. Equipment is integrated by composing against the
protocol it speaks, not by writing bespoke code for the box. Onboarding a new
piece of equipment got **25% cheaper** as a result, and that figure improves as
more devices land on the existing layers.

## The lesson

The vendor-specific tools weren't badly built — they were each solving their own
problem correctly. The cost was entirely in the seams between them. A lot of
integration work is like that: nothing is broken, and the system is still hard
to operate.

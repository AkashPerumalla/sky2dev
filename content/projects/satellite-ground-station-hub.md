---
title: Satellite Ground Station Hub
summary: A unified monitoring and control platform that replaced 8 to 10 vendor-specific M&C tools with a single Spring Boot interface.
date: 2026-02-01
status: shipped
tech: [Spring Boot, REST, JWT, SNMP, UDP, SPI, Serial]
tags: [spring-boot, backend, protocols, satellite, java]
---

A ground station runs equipment from many vendors, and each vendor ships its
own monitoring and control software. That left operators moving between 8 to 10
separate tools, each expressing the same concepts differently, with the
translation held in someone's head.

I designed a unified M&C platform to replace them with one Spring Boot
interface, secured with JWT and exposed over REST APIs.

## Protocol abstraction

The obvious approach is one adapter per device. It works, and it produces a
codebase where the eleventh device costs as much to add as the first.

I built reusable protocol abstraction layers instead, covering SNMP with trap
handling, UDP, SPI and serial communication. Equipment is integrated by
composing against the protocol it already speaks rather than by writing bespoke
code for the box. Onboarding new equipment became roughly 25% cheaper, and that
figure improves as more devices land on layers that already exist.

## What I took from it

None of the vendor tools were badly built. Each solved its own problem
correctly. The entire cost sat in the gaps between them, which is true of a
great deal of integration work: nothing is broken, and the system as a whole is
still difficult to operate.

---
title: Software Engineer at Avantel
position: Software Engineer, Embedded Android & System Software
company: Avantel Limited
location: Hyderabad, Telangana
start: 2024-11-01
summary: Embedded Android and real-time systems for medical, defence and satellite ground infrastructure, from NDK-level hardware interfacing up to the Spring Boot services above it.
date: 2024-11-01
tags: [android, aosp, embedded, java, spring-boot, real-time]
---

My work here covers the whole Android stack. At the lowest level, native code
talks to hardware over serial, SPI, UART and I2C. Above that sits AOSP platform
modification. Above that, the Spring Boot services that move the data onward.

I have taken four systems from requirements through to deployment:

- **[Patient Monitoring System](/projects/patient-monitoring-system)**, a
  multi-parameter monitor now in clinical use at Lakshmi Foundation Hospital.
- **[Handheld Satellite Phone](/projects/handheld-satellite-phone)**, the MMI
  application layer for a satcom handset built under iDEX Challenge 19.
- **[Satellite Ground Station Hub](/projects/satellite-ground-station-hub)**, a
  unified monitoring and control platform that replaced 8 to 10 vendor tools.
- **[Maritime Situational Awareness](/projects/maritime-situational-awareness)**,
  fusing AIS and radar feeds into one vessel-tracking display. Still in progress.

## The nature of the work

None of these are application-layer problems.

If a patient monitor drops samples, that is a clinical risk, not a defect to
triage next sprint. A satcom handset cannot reach its peripherals from
userspace at all, so the platform has to be rebuilt around it. A ground station
hub looks like a dashboard, but the real work is protocol integration.

Most of the engineering therefore goes into layers a user never sees. Threading
models that hold a sample rate under sustained load. AOSP changes that grant an
application the access it needs. Protocol abstractions that reduce the next
vendor's equipment to a configuration change.

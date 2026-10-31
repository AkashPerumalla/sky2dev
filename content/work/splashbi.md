---
title: Associate Consultant at SplashBI
position: Associate Consultant (Apprenticeship)
company: SplashBI
location: Hyderabad, Telangana
start: 2024-04-01
end: 2024-09-30
summary: Enterprise reporting on Oracle EBS, including a migration of 25 to 50 legacy Discoverer reports onto the SplashBI platform with data integrity validated across three systems.
date: 2024-04-01
tags: [sql, plsql, oracle-ebs, nodejs, reporting]
---

I built query-based enterprise reports over Oracle EBS Procure-to-Pay and
Order-to-Cash data, writing SQL and PL/SQL against schemas that had accumulated
years of special cases.

The largest piece of work was a migration. Between 25 and 50 legacy Discoverer
reports had to move through EIS Explorer onto the SplashBI platform. Porting
them was straightforward. Proving the numbers still matched was not, and that
is where most of the time went: every report was validated across all three
systems before it was signed off. A reporting migration that quietly changes a
total does more damage than one that fails outright, because nobody goes looking
for it.

I also wrote RESTful APIs in Node.js for blog management workflows, covering
CRUD operations and integration with the existing backend services.

## What I took from it

Enterprise data taught me that correctness is partly a social question. The
schema tells you what values are permitted. Only the people who use the report
every month can tell you what those values are supposed to mean, and they are
usually the ones who notice when you get it wrong.

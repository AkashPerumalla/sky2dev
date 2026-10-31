---
title: RAG System with an Evaluation Layer
summary: Capstone for the IIIT-H PG certification — a real-world retrieval-augmented generation system built with evaluation treated as a first-class component.
date: 2026-06-01
status: active
tech: [Python, PyTorch, RAG, Docker]
tags: [ai, ml, rag, python, evaluation]
---

Capstone project for my PG certification in AI & ML at IIIT Hyderabad: a
real-world retrieval-augmented generation system with an evaluation layer built
on the **RAGBench** and **RGB** benchmarks.

## Why the evaluation layer is the project

A RAG pipeline is easy to stand up and very hard to trust. Retrieval returns
*something* for every query, the generator writes fluent text over whatever it
was handed, and the output looks equally confident whether the retrieved context
was relevant or useless. Failure is invisible from the outside.

So the evaluation layer isn't instrumentation bolted on at the end — it's the
part that makes the rest meaningful. Benchmarking against RAGBench and RGB
separates failures that look identical in the output:

- Retrieval returned nothing relevant.
- Retrieval worked, generation ignored it.
- Retrieval worked, generation used it, and the answer is still wrong.

Those have different fixes, and without an evaluation harness you cannot tell
them apart.

## Status

In progress alongside the certification, through to August 2026.

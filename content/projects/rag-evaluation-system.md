---
title: RAG System with an Evaluation Layer
summary: Capstone for the IIIT-H PG certification, a retrieval-augmented generation system built with evaluation as a first-class component.
date: 2026-06-01
status: active
tech: [Python, PyTorch, RAG, Docker]
tags: [ai, ml, rag, python, evaluation]
---

My capstone project for the PG certification in AI and ML at IIIT Hyderabad: a
real-world retrieval-augmented generation system with an evaluation layer built
on the RAGBench and RGB benchmarks.

## Why the evaluation layer is the project

A RAG pipeline is quick to assemble and difficult to trust. Retrieval returns
something for every query it is given. The generator writes fluent prose over
whatever it receives. The output looks equally confident whether the retrieved
context was relevant or useless, so failure leaves no visible trace.

The evaluation layer is therefore not instrumentation added at the end. It is
what makes the rest of the system meaningful. Benchmarking against RAGBench and
RGB separates three failures that look identical from the outside:

1. Retrieval returned nothing relevant.
2. Retrieval worked and generation ignored it.
3. Retrieval worked, generation used it, and the answer is still wrong.

Each has a different fix, and without a harness you cannot tell which one you
are looking at.

## Status

In progress alongside the certification, running through to August 2026.

# ADR 0007 — Lighthouse summary without reports

Date: 2026-11-28
Status: Accepted

## Context

The Lighthouse summary runs even if the build or report collection fails. A missing report directory causes a second failure in the summary step. An empty directory produces a table with no rows.

## Decision

The summary prints `No Lighthouse reports were generated.` and exits successfully when the report directory is missing or contains no Lighthouse JSON reports. The build and collection steps retain their own exit status.

When report files exist, the summary continues to report medians by page, including when collection produced only some of the expected runs. Unreadable or malformed reports still fail the summary step.

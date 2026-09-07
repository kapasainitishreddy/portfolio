# GitHub Portfolio Release Queue

This file is the durable handoff queue for portfolio-completion work. It is intentionally operational, not a claim of legal or accessibility certification.

Last updated: 2026-09-07

| Priority | Project / repo | Current state | Next internally buildable item | External gate |
| ---: | --- | --- | --- | --- |
| 1 | Portfolio (`kapasainitishreddy/portfolio`) | Release candidate is internally green on code head `c346b1e9925d6fcccf68fd89e5c1bf7754c3b3ec`; PR #12 remains draft | None before live acceptance; preserve the reconciled main-based release candidate | Production host/domain, production site URL, Resend credentials/delivery, live browser/device/header acceptance |
| 2 | Circuit (`kapasainitishreddy/ai-atlas`) | Active | Re-scan open PRs and current main, then complete the highest-impact release flow and regression coverage | Record only if encountered |
| 3 | Books / Aasta (`kapasainitishreddy/Aasta`) | Queued | Re-scan release state and publication/export flow | Record only if encountered |
| 4 | SyncedIn | Queued | Resolve exact repository name, then release pass | Record only if encountered |
| 5 | FutureOS | Queued | Release pass | Record only if encountered |
| 6 | AppGraft | Queued | Release pass | Record only if encountered |
| 7 | Actra / productivity-pro | Queued | Release pass | Record only if encountered |
| 8 | Noxly / keeply | Queued | Release pass | Record only if encountered |
| 9 | Unsaid / male-mental | Queued | Release pass | Record only if encountered |
| 10 | Neuro | Queued | Release pass | Record only if encountered |
| 11 | Looksmaxing | Queued | Release pass | Record only if encountered |
| 12 | Gathered | Queued | Release pass | Record only if encountered |
| 13 | Gympose | Queued | Release pass | Record only if encountered |
| 14 | Choices | Queued | Release pass | Record only if encountered |
| 15 | Still | Queued | Release pass | Record only if encountered |
| 16 | Syrava | Queued | Release pass | Record only if encountered |
| 17 | Flare | Queued | Release pass | Record only if encountered |
| 18 | Harvestly | Queued | Release pass | Record only if encountered |
| 19 | SeenIT | Queued | Release pass | Record only if encountered |
| 20 | Remaining repositories | Queued | Order by release impact and buildability | Record only if encountered |

## Portfolio release evidence

Code head `c346b1e9925d6fcccf68fd89e5c1bf7754c3b3ec` was verified by GitHub Actions release-gate run `34069289190` with install, tests, lint, TypeScript, server production build, high-severity dependency audit, and static production export passing. PR #12 is intentionally unmerged.

Do not treat the queue-file commit itself as a re-verification of executable code. Any later executable change must receive fresh exact-head verification before the release candidate is promoted.

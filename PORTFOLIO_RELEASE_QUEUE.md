# GitHub Portfolio Release Queue

This file is the durable handoff queue for portfolio-completion work. It records source/release state and exact external gates; it is not a claim of legal, accessibility, privacy, or security certification.

Last updated: 2026-09-07

| Priority | Project / repo | Current state | Next internally buildable item | External gate |
| ---: | --- | --- | --- | --- |
| 1 | Portfolio (`kapasainitishreddy/portfolio`) | PARKED EXTERNAL. PR #12 release code head `c346b1e9925d6fcccf68fd89e5c1bf7754c3b3ec` has successful release-gate evidence. Queue docs live on the same draft branch. | Preserve code head; no more source churn before live acceptance. | Production host/domain and `NEXT_PUBLIC_SITE_URL`; Resend credentials/delivery; live browser/device/security-header acceptance. |
| 2 | Circuit (`kapasainitishreddy/ai-atlas`) | PARKED EXTERNAL. Draft PR #184 on `circuit/privacy-data-rights`; do not push merely to update queue because branch pushes have triggered Cloudflare production-build attempts. | None safe without reopening an owner-controlled deployment path. | Healthy/private exact checkout; staging/native/provider/security acceptance; production deployment credentials. |
| 3 | Books / Aasta (`kapasainitishreddy/books`) | PARKED EXTERNAL. Draft PR #9, last tracked head `c5699242b48bfef30abf9165f0602cf2d632bd57`. | Resume only when exact checkout/export verification is available. | Publication/export/runtime acceptance and owner-controlled release gates. |
| 4 | SyncedIn (`kapasainitishreddy/Sinkedin`) | PARKED EXTERNAL. Draft PR #4 on `feat/application-os`. | Resume only with executable exact checkout. | Runner/device/provider/production acceptance as recorded on PR. |
| 5 | FutureOS | BLOCKED DISCOVERY. No accessible installed repository resolved under the expected name during prior scan. | Re-scan installed repositories on a later run; do not invent a target. | Owner connection / exact repository resolution. |
| 6 | AppGraft (`kapasainitishreddy/appgraft`) | PARKED EXTERNAL. Draft PR #4, last tracked head `726b474...`. | Resume exact-head verification when checkout is available. | Runner/provider/device/release gates recorded on PR. |
| 7 | Actra / productivity-pro | PARKED EXTERNAL. Draft PR #5, last tracked head `1ea9d611...`. | Resume exact-head verification when checkout is available. | Runner/provider/device/release gates recorded on PR. |
| 8 | Noxly / keeply | PARKED EXTERNAL. Draft PR #192, last tracked head `fb9ef...`. | Resume exact-head verification when checkout is available. | Runner/provider/device/release gates recorded on PR. |
| 9 | Unsaid / male-mental | PARKED EXTERNAL. Draft PR #2, last tracked head `9d43...`. | Resume exact-head verification when checkout is available. | Runner/provider/device/release gates recorded on PR. |
| 10 | Neuro (`kapasainitishreddy/neuro-`) | PARKED EXTERNAL. Draft PR #1, last tracked head `d249...`. | Resume exact-head verification when checkout is available. | Runner/provider/device/release gates recorded on PR. |
| 11 | Looksmaxing (`kapasainitishreddy/looksmaxing`) | PARKED EXTERNAL. Draft PR #33 head `068bfb094edcb603ae94fdf37343b698020af223`. Latest pass fixed opaque/malformed browser Origin handling before Nutrition Vision identity/body/quota/provider work and added regressions. | No more source churn until full direct verifier/device/provider paths can run. | Healthy private checkout/runner for `npm run verify:direct`, Gitleaks/Semgrep; `VISION_SUBJECT_SALT` + provider secret/deploy; real consent/photo/provider/quota smoke; Android/AAB/Play acceptance. |
| 12 | Gathered (`kapasainitishreddy/Gathered`) | PARKED EXTERNAL. Draft PR #6 head `e08b36d719876a62bfe03cd51da0d2bb5cf30916`. Latest pass made Play subscription line-item selection order-independent and added billing-recovery regression coverage. | No more source churn until exact-head private suite/native paths can execute. | Healthy checkout/runner; `npm ci`, direct verify, worker tests, Android prepare/device; production OAuth/Play verifier bindings; live Play lifecycle; signing/security/store review. |
| 13 | Gympose (`kapasainitishreddy/Gympose`) | PARKED EXTERNAL. Draft PR #2 head `a7d72b3b24e229544bbae793a8917a6144384b36`. Latest pass bounded routine JSON imports, capped routine/superset cardinality, and added fail-safe import UX/regressions. | No more source churn until exact-head app/build/native checks can run. | Healthy checkout/runner; test/typecheck/lint/build/E2E; Capacitor/Gradle/device; production auth/backend, privacy/support, signing/store/legal/media review. |
| 14 | Choices | ACTIVE NEXT | Resolve exact installed repository and open release PR; inspect full user journey and highest-impact source blocker. | Record only if encountered. |
| 15 | Still | QUEUED | Release pass after Choices is internally parked. | Record only if encountered. |
| 16 | Syrava | QUEUED | Release pass. | Record only if encountered. |
| 17 | Flare | QUEUED | Release pass. | Record only if encountered. |
| 18 | Harvestly | QUEUED | Release pass. | Record only if encountered. |
| 19 | SeenIT | QUEUED | Release pass. | Record only if encountered. |
| 20 | Remaining repositories | QUEUED | Order by release impact and buildability after named priority list. | Record only if encountered. |

## Evidence recorded this run

### Portfolio
Code head `c346b1e9925d6fcccf68fd89e5c1bf7754c3b3ec` was previously verified by GitHub Actions release-gate run `34069289190` with install, tests, lint, TypeScript, server production build, high-severity dependency audit, and static production export passing. Queue-only commits use `[skip ci]` and are not executable re-verification.

### Looksmaxing
PR #33 head `068bfb094edcb603ae94fdf37343b698020af223`. Source commit `c555677e7949f22e3217b2798fd767c933c9e9ee` rejects opaque/malformed browser Origin values before sensitive Nutrition Vision work; regression commit `068bfb094edcb603ae94fdf37343b698020af223` locks allowed preflight, opaque/malformed rejection and intentional originless native/server behavior. Focused execution: exact committed ingress blob hash matched locally; `node --check` passed; ingress behavior harness passed 7/7. Full private repository suite was not executed.

### Gathered
PR #6 head `e08b36d719876a62bfe03cd51da0d2bb5cf30916`. Source commit `6d51192db836fd972080953ebb4dd1c4185b13a3` selects the latest parseable expiry among matching Google Play SubscriptionsV2 line items instead of trusting array order; regression commit `e08b36d719876a62bfe03cd51da0d2bb5cf30916` covers expired/current/malformed/unrelated/reversed line items. Focused Node harness passed 6/6. Full private repository suite was not executed.

### Gympose
PR #2 head `a7d72b3b24e229544bbae793a8917a6144384b36`. Source commits `d223fd27181f5753aaeaad2d1f81eca890ee0a89` and `318163080b1e57c92e3be768aa5e622ab4c68944` bound routine imports to 256 KB/100 routines, reject duplicate weekdays and overlong superset ids, reject oversized files before browser read, surface file-read errors and allow retrying the same file. Regression commit `a7d72b3b24e229544bbae793a8917a6144384b36` adds plan-exchange boundary tests. Focused Node harness passed 6/6. Full private repository suite was not executed.

Any executable source change after a recorded head requires fresh evidence before that project is promoted. Do not convert focused harness evidence into a claim that the full application, accessibility, privacy, security, or compliance suite passed.

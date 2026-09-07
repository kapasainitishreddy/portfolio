# Build Priority Queue

This file is the durable handoff for the recurring portfolio-completion workflow. It records product order, release-candidate state, and the next internally buildable target. Production merges/deployments, billing/secrets, store submissions, and legal/vendor approvals remain owner-controlled gates.

Last updated: 2026-09-07

## Queue

1. **Portfolio** — `kapasainitishreddy/portfolio` — **internal release candidate ready; external/manual gates remain**
   - Candidate: PR #12, branch `release/portfolio-main-hardening-20260906`, head `c346b1e9925d6fcccf68fd89e5c1bf7754c3b3ec`.
   - Verified GitHub Actions at that exact head: `quality` success; `release-gate` success.
   - Remaining owner/external gates: select production hosting/domain; configure production `NEXT_PUBLIC_SITE_URL`; configure Resend sender/destination only if hosted contact is desired; exercise real production contact delivery; verify live HTTPS/CSP/HSTS/referrer/permissions headers; complete real-browser/device visual/keyboard/reduced-motion/performance QA; legal/vendor review where desired.
2. **Circuit / ai-atlas** — `kapasainitishreddy/ai-atlas` — **ACTIVE NEXT**
3. **Books / Aasta** — repo to resolve from connected GitHub — queued
4. **SyncedIn** — repo to resolve from connected GitHub — queued
5. **FutureOS** — repo to resolve from connected GitHub — queued
6. **AppGraft** — repo to resolve from connected GitHub — queued
7. **Actra / productivity-pro** — repo to resolve from connected GitHub — queued
8. **Noxly / keeply** — repo to resolve from connected GitHub — queued
9. **Unsaid / male-mental** — repo to resolve from connected GitHub — queued
10. **Neuro** — queued
11. **Looksmaxing** — queued
12. **Gathered** — queued
13. **Gympose** — queued
14. **Choices** — queued
15. **Still** — queued
16. **Syrava** — queued
17. **Flare** — queued
18. **Harvestly** — queued
19. **SeenIT** — queued
20. **Remaining repositories** — queued after the named products

## Operating rule

Stay on the highest-priority internally buildable release candidate until it is internally release-ready. When the remaining gate is owner-controlled or external (production credentials, deployment access, signing/store approval, billing/provider approval, or legal/vendor action), record the exact gate here and move to the next internally buildable project without repeatedly burning runs on the blocked gate.

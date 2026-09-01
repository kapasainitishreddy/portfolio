# Profile and Multi-Client Case Studies Implementation Plan

1. Add failing quality tests for profile image, favicon, multi-client section order, case count, and required case categories.
2. Add exact user-photo profile and favicon binary assets to `public/`.
3. Update the hero to render the profile photo above the proof metrics with responsive sizing.
4. Update site metadata and manifest to use the photo favicon.
5. Add typed multi-client startup case-study data with eight anonymized cases and no invented metrics.
6. Add a compact expandable `StartupCaseStudies` section and place it after Selected Work and before Experience.
7. Keep personal/open-source projects in the existing Project Library so client work remains clearly separated.
8. Run quality tests and static production build; fix all failures.
9. Merge to `main`, sync the GitHub Pages default branch, deploy, and verify the live page.

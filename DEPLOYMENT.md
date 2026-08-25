# Deployment

This is a Next.js App Router site with a server-side `/api/contact` route. Treat a
hosted build as a release candidate only after the exact commit, production URL,
headers, contact delivery, and browser acceptance have been verified.

## Required production configuration

| Variable | Release requirement |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Required.** Exact canonical HTTPS origin used for metadata, sitemap, Open Graph, and JSON-LD. |
| `RESEND_API_KEY` | **Required if the contact form is enabled.** Enables email delivery. |
| `CONTACT_FROM_EMAIL` | **Required if the contact form is enabled.** Must be a sender the Resend account is allowed to use. |
| `CONTACT_TO_EMAIL` | **Required if the contact form is enabled.** Destination for submitted messages. |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Leave unset/false unless analytics are intentionally enabled and privacy disclosure is updated first. |

The contact route fails closed with HTTP 503 when the delivery provider is not
configured. Do not call the contact journey production-ready until a real form
submission reaches the intended mailbox.

## Release commands

Run these from the exact commit intended for deployment:

```bash
npm ci
npm test
npm run lint
npm run typecheck
npm run build
```

Then boot the production build and perform an interactive browser pass before
promoting it.

## Vercel

1. Import this repository and select the intended release branch.
2. Add the production environment variables above.
3. Build with `npm run build`.
4. Confirm the resulting production deploy is built from the exact expected Git SHA.
5. Verify the canonical URL, headers, contact API, desktop/mobile layout, keyboard
   focus, reduced motion, 404/error states, and console/network errors.

## Netlify

1. Link the **confirmed canonical portfolio project**; do not reuse a sibling demo
   site merely because it has “portfolio” in its name.
2. Configure the Next.js runtime and production environment variables.
3. Build with `npm run build` and deploy the exact intended SHA.
4. Run the same production verification checklist as above.

`netlify.toml` remains the repository-level Netlify build configuration. Confirm
that the connected project recognizes Next.js functions before release.

## Mandatory production verification

- HTTPS loads on the exact canonical domain.
- `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, and `X-Permitted-Cross-Domain-Policies`
  are present as intended on production responses.
- `/`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, the social image,
  favicon, résumé asset, and custom 404 work from the production origin.
- A legitimate contact submission is delivered once; malformed, oversized,
  cross-site, and abusive bursts are rejected without exposing visitor payloads in
  logs.
- “Ask Nitish” remains deterministic-only for this release: Chrome/Puter AI and
  voice input are disabled in `/assistant/site.json`.
- Desktop and phone layouts have no clipping/overflow; keyboard-only navigation,
  focus visibility, reduced-motion behavior, and static WebGL fallbacks are checked.
- No secret is present in the client bundle or repository.
- Dependency/secret scans are clean for the exact release lockfile.

## Dependency security hold

Do not deploy merely because the UI builds. The checked-in lockfile must use a
Next.js version that is currently patched for the applicable security advisories.
If an upstream Next.js security release is pending or the lockfile is behind the
patched maintenance line, upgrade and regenerate the lockfile before calling the
site release-ready.

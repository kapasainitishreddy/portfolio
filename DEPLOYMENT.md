# Deployment

This is a standard Next.js (App Router) app and deploys cleanly to either Vercel
or Netlify. The contact form runs as a serverless function and needs no database.

## Environment variables

All are optional. Set them in your host's dashboard (and in `.env.local` for
local development).

| Variable                       | Purpose                                          |
| ------------------------------ | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`         | Canonical URL used for SEO, sitemap, OG tags     |
| `RESEND_API_KEY`               | Enables email delivery of contact submissions    |
| `CONTACT_FROM_EMAIL`           | Verified Resend sender address                   |
| `CONTACT_TO_EMAIL`             | Where contact messages are delivered             |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Leave `false` unless you explicitly opt in       |

Set `NEXT_PUBLIC_SITE_URL` to your real domain (for example
`https://sainitish.dev`) so canonical links, the sitemap and social cards resolve
correctly.

---

## Deploy to Vercel (recommended)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js. Leave the defaults:
   - **Build command:** `next build`
   - **Output:** handled automatically
4. Add the environment variables above under **Settings → Environment Variables**.
5. Click **Deploy**.

Every push to your default branch redeploys automatically.

---

## Deploy to Netlify

1. Push this repository to a Git provider.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Build settings:
   - **Build command:** `next build`
   - **Publish directory:** `.next`
4. Install the official Next.js runtime so API routes and image optimization work:
   - Netlify usually detects it automatically. If not, add
     [`@netlify/plugin-nextjs`](https://github.com/netlify/next-runtime):

   ```toml
   # netlify.toml
   [build]
     command = "next build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

5. Add the environment variables above under **Site settings → Environment variables**.
6. Deploy.

---

## Notes

- The WebGL ink engine runs entirely in the browser and is dynamically imported,
  so it does not affect server build output or cold starts.
- The `/api/contact` route runs on the Node.js runtime.
- No database, queue or external infrastructure is required.

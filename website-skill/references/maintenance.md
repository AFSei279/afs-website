# Maintenance

How to keep the site healthy over time without breaking it.

## Safe dependency updates

`npm update` updates every package to its latest semver-compatible version, which is usually safe but occasionally breaks something silently. Better procedure:

1. Check what's outdated:
   ```bash
   npm outdated
   ```
2. Update **patch and minor** versions in batches by topic (Next.js + React together, Tailwind + plugins together, etc.):
   ```bash
   npm update next react react-dom
   ```
3. After each batch: `npm run build` and a quick local `npm run dev` smoke test.
4. Commit each batch separately. If a deploy later breaks, the bisect is trivial.
5. **Major versions** (Next.js 14 → 15, Tailwind 3 → 4) get their own PR. Read the migration guide first — those releases break things on purpose.

`npm audit` will flag vulnerabilities. For a static site, most "high severity" warnings are about server-side code that doesn't run on the production site. Read the advisory before panicking. Fix anything that affects the build or client bundle.

## Content edits

For text-only edits (copy changes, prices, hours), the workflow is:

1. Edit the relevant `.tsx` file under `src/app/`.
2. `npm run dev` and check the page locally.
3. Commit with a descriptive message: `content: update homepage hero copy`.
4. Push to `main`. Auto-deploys.

If the user edits content frequently and wants a non-developer-friendly workflow, that's the trigger to introduce one of:

- **MDX files** — content in `src/content/*.mdx`, page templates render them. Still requires a commit, but no JSX skill needed for edits.
- **A headless CMS** (Sanity, Storyblok, Contentful) — non-developer UI, but adds a deploy webhook and a build step that fetches content. Worth it once content is changing weekly.

Don't introduce a CMS preemptively.

## Broken-link / image checks

Once a quarter, run a link check against the live site:

```bash
npx linkinator https://afs-ta.com/ --recurse
```

This catches both internal links that broke during refactors and external links that have rotted.

For images: the `public/` folder collects orphans over time. Periodically grep the source for each image filename and delete unused ones to keep the deployed bundle small.

## Backups

GitHub is the source of truth — the repo *is* the backup. But:

- Make sure the GitHub account has 2FA enabled.
- Add at least one collaborator with admin rights, so a single account loss doesn't lock the project.
- Form service inboxes are not on GitHub — periodically export submissions, especially before changing form providers.

## Monitoring

The site is small enough that uptime monitoring is optional, but if the user wants peace of mind:

- **UptimeRobot** free tier — pings the homepage every 5 min, emails on failure.
- **Plausible** has a "site is up" check built in for paid plans.

For runtime errors (a JS exception in a component), there's no automatic surfacing on a static site. Sentry's free tier covers this if it becomes a concern.

## When to outgrow GitHub Pages

GitHub Pages is the right call for a Lead-Gen site of this size. Trigger to migrate:

- **Need server-side logic that can't be done with a third-party service.** E.g., a portal where clients log in, a custom API integration that can't expose its key in the browser.
- **A/B testing becomes a serious channel.** Server-side variant assignment is much cleaner than client-side.
- **Image optimization becomes a real bottleneck.** Vercel or Cloudflare Pages can run `next/image` with optimization, which can shave 30–50% off image bytes.
- **Preview deployments per PR become important** (a content team wants to see PRs rendered before merge).

When that day comes, the move is: deploy the existing repo to Vercel or Cloudflare Pages, switch the DNS, remove `output: "export"` from `next.config.mjs`, remove `unoptimized: true`, and optionally migrate the form to an API route. The codebase doesn't need a rewrite.

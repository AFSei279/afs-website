---
name: afs-website
description: Build, deploy, and maintain the AFS Tech & Assets business website — a Next.js static-export Lead-Gen site hosted on GitHub Pages. Use this skill whenever the user works on their company website (afs-ta.com or the AFS site), wants to add or edit pages/sections/landing pages, set up or change forms or booking integrations, deploy changes, run SEO/performance checks, update dependencies, or do any maintenance on the AFS Website project. Trigger even when the user just says things like "add a service page", "deploy the site", "fix the contact form", "make the homepage faster", "I want to publish a new landing page" — assume these refer to the AFS website unless the user clearly points elsewhere.
---

# AFS Website Skill

This skill captures everything needed to build, deploy and keep the AFS Tech & Assets website healthy. The site is a **Next.js Lead-Gen site** that is **statically exported** and **hosted on GitHub Pages**. Lead capture happens through a third-party form service because GitHub Pages cannot run server code.

The skill is opinionated on purpose — every choice has a reason explained inline so you can deviate when there is a real reason to, but follow the defaults otherwise.

## Mental model

GitHub Pages serves static files only. That single constraint shapes every other decision:

- **No Next.js API routes, no server components with `dynamic = "force-dynamic"`, no `getServerSideProps`.** The build must succeed under `output: "export"`.
- **Forms post to an external service** (Formspree, Web3Forms, Getform). The form component just renders HTML and submits to a third-party endpoint.
- **Booking uses an external embed** (Cal.com or Calendly). Don't try to roll your own.
- **Analytics that work without cookies** (Plausible, Umami) keep the site GDPR-friendly without a banner — important because AFS is German/EU based.
- **Images go through `next/image` with `unoptimized: true`** — the optimization server doesn't exist on GitHub Pages.

If a feature would require a server, the answer is almost always "use a third-party service" before "switch hosting". Switching hosting is a separate, deliberate decision (see `references/maintenance.md` → "When to outgrow GitHub Pages").

## Workflow at a glance

1. **Setup or open the project** — see `references/setup.md`. If the project doesn't exist yet, bootstrap from the assets in this skill.
2. **Make changes locally** — `npm run dev`, work in `src/app/` (App Router) or `src/pages/` (only if explicitly using Pages Router).
3. **Verify the build succeeds statically** — `npm run build` must complete without "Server-side …" errors. If it fails, see `references/troubleshooting.md`.
4. **Push to `main`** — the GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes to the `gh-pages` branch / Pages.
5. **Verify deployment** — open the live URL, run a quick Lighthouse pass for any page that changed substantially (see `references/seo-performance.md`).
6. **For maintenance tasks** — see `references/maintenance.md`.

## Project conventions

These are the conventions to follow when adding or editing code in the AFS website project. They exist so the site stays consistent and easy to maintain:

- **Framework**: Next.js 14+ App Router, TypeScript, `output: "export"` always set in `next.config.mjs`.
- **Styling**: Tailwind CSS. No CSS-in-JS, no separate `.module.css` unless absolutely necessary. Brand colors and fonts live in `tailwind.config.ts`.
- **Components**: Server Components by default. Add `"use client"` only when actually needed (forms, interactive widgets, hooks). Be explicit about why.
- **Routing**: One folder per route under `src/app/`. Landing pages live under `src/app/lp/<campaign-name>/page.tsx`.
- **Content**: Page copy lives directly in the `.tsx` files. If content starts being edited frequently or by non-developers, that's the trigger to introduce a content layer (Contentlayer or MDX). Don't add it preemptively.
- **Forms**: One reusable `<LeadForm />` component. The endpoint is read from `NEXT_PUBLIC_LEAD_FORM_ENDPOINT`. See `assets/lead-form.tsx`.
- **SEO**: Every page exports a `metadata` object. The site has a `robots.txt`, a `sitemap.ts`, and `opengraph-image.png`. See `references/seo-performance.md`.
- **Images**: `next/image` with `unoptimized: true`. Source images live in `public/`. Always specify width and height to avoid layout shift.
- **Tracking**: Plausible by default. Script lives in `src/app/layout.tsx`. No GA4 unless the user explicitly asks (it requires a cookie banner).

## Key decisions and why

These are the non-obvious calls baked into the skill. If the user wants to change one, that's fine — just understand the trade-off first:

**Static export over a dynamic host.** GitHub Pages is free, has good uptime, integrates with the GitHub workflow, and is plenty fast for a Lead-Gen site. The cost is no server code — but for a marketing site that's almost never a real limit.

**Tailwind over a UI kit.** UI kits (MUI, Chakra) ship a lot of CSS the site doesn't need and lock the design into someone else's system. Tailwind keeps the bundle small and the brand control high.

**Plausible over Google Analytics.** No cookies = no banner = better UX and faster compliance. Plausible costs ~9 €/month, Umami self-hosted is free. If the user pushes back on cost, suggest Umami self-hosted on a small VPS or Vercel free tier.

**External form service over a custom backend.** Setting up a serverless function on Vercel/Cloudflare for a single contact form is over-engineering. Formspree free tier handles 50 submissions/month; that's enough to validate the funnel before investing more.

**Cal.com over Calendly.** Cal.com is open source, EU-hosted available, and has a generous free tier. Calendly is fine too if the user already has an account.

## When the user asks for X, do Y

A short table of common requests so the skill triggers consistently:

- "Add a new service page" → New route under `src/app/leistungen/<slug>/page.tsx`, copy the structure from an existing service page, add to the navigation in `src/components/Navigation.tsx`, add to `sitemap.ts`.
- "Set up a campaign landing page" → New route under `src/app/lp/<campaign>/page.tsx` with **no link from main nav**, `<LeadForm formId="...">` configured for that campaign, optional `noindex` if the page is paid-traffic only.
- "Deploy" / "Publish" / "Push live" → Verify `npm run build` succeeds locally, then `git push origin main`. The workflow does the rest. Confirm the GitHub Actions run is green before declaring done.
- "Fix the contact form" → First check the form endpoint in `.env.local` (or `.env.production`), then the third-party dashboard for blocked submissions, then the network tab. Don't immediately rewrite component code.
- "Make it faster" → Run Lighthouse, focus on Core Web Vitals (LCP, INP, CLS). Image dimensions and font loading are usually the wins. See `references/seo-performance.md`.
- "Update dependencies" → Use the safe-update procedure in `references/maintenance.md`. Don't run `npm update` blindly.
- "I need to A/B test something" → GitHub Pages has no server-side splitter. Suggest a client-side library (e.g., GrowthBook with the JS SDK) or, if A/B testing becomes core, that's the trigger to outgrow GitHub Pages.

## Reference files

Read these as you need them — they're loaded only when relevant:

- `references/setup.md` — Bootstrap a fresh Next.js + Tailwind + static-export project, including all config files.
- `references/deployment.md` — GitHub Actions workflow, custom domain (afs-ta.com) setup, DNS records, HTTPS, troubleshooting failed deploys.
- `references/lead-gen.md` — Form services compared, Cal.com embed, UTM parameter capture, lead routing to email or CRM.
- `references/seo-performance.md` — Metadata patterns, sitemap, robots.txt, Open Graph images, Lighthouse workflow, common Core Web Vitals fixes.
- `references/maintenance.md` — Safe dependency updates, content edit checklist, backup strategy, monitoring, when to outgrow GitHub Pages.
- `references/troubleshooting.md` — `output: "export"` build errors, hydration mismatches, 404s on refresh, asset path issues with custom domains.

## Bundled assets

Use these as starting points; copy into the project and adapt:

- `assets/next.config.mjs` — Pre-configured for static export with `unoptimized` images and trailing slashes.
- `assets/deploy.yml` — GitHub Actions workflow that builds and publishes to GitHub Pages.
- `assets/lead-form.tsx` — Reusable lead-capture form component that posts to a configurable endpoint and tracks the submission in Plausible.
- `assets/layout.tsx` — Root layout with Plausible script, default metadata, and font setup.
- `assets/sitemap.ts` — Sitemap generator that picks up routes automatically.
- `assets/robots.txt` — Default robots config (allows everything except `/lp/` paid landing pages).

## Important: don't break the static build

Before suggesting any code that requires server-side execution (API routes, server actions, middleware, ISR), stop and check whether it's compatible with `output: "export"`. If it isn't, suggest the third-party-service alternative or — if the feature is fundamental — name the trade-off clearly: "this would require moving off GitHub Pages to e.g. Vercel."

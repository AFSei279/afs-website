# SEO and Performance

A Lead-Gen site only generates leads if people find it and the page loads fast enough that they stay. This file is the working checklist for both.

## Per-page metadata

Every page must export a `metadata` object. Without this, the page inherits whatever boilerplate is in `layout.tsx`, which makes every page look identical in search results.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vermögensverwaltung für mittelständische Unternehmer | AFS Tech & Assets",
  description: "Strategische Vermögensplanung und Asset-Management für …",
  openGraph: {
    title: "AFS Tech & Assets — Vermögensverwaltung",
    description: "…",
    images: ["/og/home.png"],
    locale: "de_DE",
    type: "website",
  },
  alternates: { canonical: "https://afs-ta.com/" },
};
```

Rules of thumb:
- Title under ~60 characters so Google doesn't truncate it.
- Description ~150–160 characters, written for the user, not for keywords.
- Always set `alternates.canonical` to avoid duplicate-content issues with/without trailing slash.

## Sitemap

`src/app/sitemap.ts` (see `assets/sitemap.ts`) generates `/sitemap.xml` automatically. It should list every page that should be indexed and **omit** the `/lp/` paid landing pages.

After deploy, submit the sitemap URL once in Google Search Console. After that, Google revisits it on its own.

## robots.txt

In `public/robots.txt` (see `assets/robots.txt`):

```
User-agent: *
Allow: /
Disallow: /lp/

Sitemap: https://afs-ta.com/sitemap.xml
```

The `Disallow: /lp/` keeps paid landing pages out of organic search — they often duplicate the homepage's value prop and would compete with it for ranking.

## Open Graph images

Each top-level page should have its own OG image at `public/og/<slug>.png`, 1200×630 px, under 1 MB. Generic homepage image as fallback.

For pages where the user wants something quick: a 1200×630 PNG with the page title typed over the brand-colored background works fine. Don't agonize over the design — Google and LinkedIn shrink it to a thumbnail.

## Structured data (JSON-LD)

For an Organization page, add this to `layout.tsx` or a top-level page:

```tsx
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AFS Tech & Assets",
  url: "https://afs-ta.com",
  logo: "https://afs-ta.com/logo.png",
  email: "andre@afs-ta.com",
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
/>
```

For service pages, use the `Service` schema. For an FAQ section, `FAQPage` — Google sometimes shows these as rich results.

## Performance: the workflow

After any structural change, run a Lighthouse pass on the changed page. Target: all four scores ≥ 90, Core Web Vitals all green.

```bash
# After deploying:
npx lighthouse https://afs-ta.com/ --view --preset=desktop
npx lighthouse https://afs-ta.com/ --view --form-factor=mobile
```

Mobile is the score that matters most — Google indexes the mobile version, and most B2B traffic is now mobile-first too.

## Common Core Web Vitals fixes

**LCP (Largest Contentful Paint)** is usually the hero image:
- Make sure `next/image` has `priority` set on above-the-fold images.
- Provide explicit `width`/`height` to prevent layout reflow.
- Compress: any image over ~150 KB after `unoptimized: true` should be re-exported. Use `squoosh.app` or `sharp` locally.

**INP (Interaction to Next Paint)** is usually JavaScript:
- Audit `"use client"` components — every one ships JS to the browser. If a component doesn't actually need to be interactive, remove the directive.
- Lazy-load heavy widgets (Cal embed, video players) with `dynamic(() => import(...), { ssr: false })`.

**CLS (Cumulative Layout Shift)** is usually fonts or images without dimensions:
- Use `next/font` for fonts (zero-CLS by design).
- Always set `width` and `height` on images, even decorative ones.

## Indexing checklist (after going live)

Once: set up Google Search Console, verify ownership via DNS TXT record, submit the sitemap. After that, just monitor Coverage in Search Console for any "excluded" or "error" pages. Common offenders:

- "Discovered – currently not indexed" — usually fine for new pages, indexes within a few days.
- "Crawled – currently not indexed" — content quality issue. Beef up the page or noindex it.
- "Page with redirect" — a canonical mismatch. Check the page's `alternates.canonical`.

For Bing, set up Bing Webmaster Tools and submit the same sitemap. It takes 5 minutes and adds a small but real traffic stream.

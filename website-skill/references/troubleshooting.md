# Troubleshooting

The most common ways the AFS site can break, with fixes.

## Build fails: `Page "/api/foo" cannot be exported`

`output: "export"` doesn't allow API routes. Either:

- Delete the route if it's leftover scaffolding.
- Move the logic to a third-party service (form provider, etc.).
- If the route is fundamental, that's the trigger to leave GitHub Pages — see `maintenance.md` → "When to outgrow GitHub Pages".

## Build fails: `Image is missing required "width" property`

When `images.unoptimized` is true, every `<Image>` needs explicit `width` and `height` props (or the `fill` prop for absolute-positioned images inside a relative parent).

```tsx
// Wrong:
<Image src="/hero.jpg" alt="…" />

// Right:
<Image src="/hero.jpg" alt="…" width={1600} height={900} />

// Or for full-bleed:
<div className="relative h-screen w-full">
  <Image src="/hero.jpg" alt="…" fill className="object-cover" />
</div>
```

## Build fails: `Dynamic server usage`

A page or layout is calling something that requires a server (`cookies()`, `headers()`, dynamic route segments without `generateStaticParams`, etc.). Find the call and either remove it or render the dependent UI client-side.

For dynamic routes, add `generateStaticParams`:

```tsx
export async function generateStaticParams() {
  return [{ slug: "team" }, { slug: "vermoegensplanung" }, /* … */];
}
```

## Site deployed but shows GitHub's 404 page

Check **Settings → Pages** on the repo:
- Source must be **GitHub Actions**, not "Deploy from a branch".
- For a custom domain: the domain must be set and DNS must point at GitHub's IPs.

If both look right, look at the latest workflow run in the Actions tab — was the artifact uploaded?

## CSS or images broken after deploy (work locally)

Almost always a path issue:

1. Check `next.config.mjs` — is `basePath` set correctly?
   - Custom domain at root: leave unset.
   - Project page (`<user>.github.io/repo-name/`): set `basePath: "/repo-name"`.
2. Check that `unoptimized: true` is set under `images`.
3. Hard-refresh the live site (Cmd-Shift-R) — old cached HTML can reference paths that no longer exist.

## 404 when refreshing a non-root page

Static export produces `out/foo/index.html` for `/foo`. If the deployed file structure is missing the trailing-slash variant, refreshes 404.

Set `trailingSlash: true` in `next.config.mjs` (already in the bundled template). Also make sure links use the trailing-slash form — Next.js's `<Link>` handles this automatically when the config is set.

## Hydration mismatch warnings in console

Server-rendered HTML differs from client-rendered HTML. Common causes:

- Using `Date`, `Math.random()`, or `window` during render.
- Conditional rendering based on `typeof window !== "undefined"`.
- Date formatting that depends on locale (server is UTC, client is German timezone).

Fix: move the dynamic logic into a `useEffect` and set state, or use `next/dynamic` with `ssr: false` for the offending component.

## Form submissions not arriving

Check in this order:

1. **Browser network tab** — did the POST go out and return 200? If 4xx/5xx, the endpoint URL or payload format is wrong.
2. **Form service dashboard** — submission may have arrived but been flagged as spam.
3. **Email forwarding** — submission arrived in the form service inbox but isn't reaching `andre@afs-ta.com`. Check the email rule in the form provider settings.
4. **Honeypot triggering on real users** — rare, but possible. Inspect the form HTML to confirm the honeypot field is `display: none` and not just visually hidden in a way bots can detect (which would also hide it from screen readers).

## Plausible events not showing up

Events take 1–2 minutes to appear in the Plausible dashboard. If they never appear:

- Check the Plausible script is loading (network tab, look for `plausible.io/api/event`).
- Check no ad blocker is on (Plausible respects privacy but uBlock still sometimes blocks it).
- Confirm the goal event name in the dashboard matches exactly what's sent (case-sensitive).

## Custom domain shows "certificate error"

GitHub Pages auto-provisions Let's Encrypt certs, but it needs DNS to be in place first. Sequence:

1. Set DNS records.
2. Wait for propagation (`dig afs-ta.com +short` shows GitHub IPs).
3. In Pages settings, set the custom domain.
4. Wait — the cert provisioning can take 5–30 min.
5. Once the lock icon appears, tick "Enforce HTTPS".

If it's been an hour and there's still no cert, remove and re-add the custom domain in Pages settings. That kicks the provisioner.

# Deployment

How GitHub Pages publishes the AFS site, how the custom domain is wired up, and how to debug failed deploys.

## How it works

`assets/deploy.yml` defines a GitHub Actions workflow that runs on every push to `main`:

1. Checks out the repo.
2. Sets up Node 20.
3. `npm ci` then `npm run build` (which produces `out/`).
4. Uploads `out/` as a Pages artifact.
5. Deploys the artifact to GitHub Pages.

There is no separate `gh-pages` branch — GitHub Pages now supports deploying directly from Actions, which is faster and avoids a noisy branch. Make sure **Settings → Pages → Source** is set to **GitHub Actions** (not "Deploy from a branch").

## Custom domain (afs-ta.com)

Two pieces have to line up: a `CNAME` file in the build output, and DNS records at the registrar.

### 1. CNAME file

Create `public/CNAME` with one line:

```
afs-ta.com
```

(or `www.afs-ta.com` if the apex/www decision goes the other way — see below). `next build` copies `public/` into `out/` so this lands in the deployed artifact automatically.

### 2. DNS records

For the apex domain `afs-ta.com`, add four `A` records pointing at GitHub's Pages IPs:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.afs-ta.com`, add a `CNAME` record pointing to `<github-username>.github.io`.

Pick one as the primary and have the other redirect. GitHub Pages handles the redirect automatically once both are configured and the custom domain is set in **Settings → Pages**.

### 3. HTTPS

After DNS propagates (can take up to 24 h, usually under 1 h), tick **Enforce HTTPS** in the Pages settings. GitHub provisions a Let's Encrypt cert automatically.

## Asset paths and `basePath`

If the site is **at the root of a custom domain**, leave `basePath` unset in `next.config.mjs`. If it's served from a project page like `<user>.github.io/afs-website/`, set:

```js
basePath: "/afs-website",
assetPrefix: "/afs-website/",
```

Mixing these up is the most common cause of broken images and CSS after deploy.

## Verifying a deploy

After pushing:

1. Open the **Actions** tab on GitHub. The latest run should be green within ~2 min.
2. Open the live URL in an incognito window (avoids cache).
3. Click through the changed pages, plus the contact form.
4. Run Lighthouse on any page that changed structurally (see `seo-performance.md`).

## Debugging failed deploys

**The build step fails:**
- Reproduce locally with `npm ci && npm run build`. If it fails locally, fix it locally first.
- If it only fails in CI, check Node version (the workflow pins to 20). A package may need a different version.

**The build succeeds but the site shows a 404:**
- Check `Settings → Pages → Source`. If it says "Deploy from a branch" instead of "GitHub Actions", switch it.
- Check that `out/index.html` was produced.

**CSS or images are missing after deploy:**
- Almost always a `basePath` / `assetPrefix` issue. See above.
- Or `unoptimized: true` is missing in `next.config.mjs` and `next/image` is rendering broken URLs.

**Custom domain shows a GitHub 404:**
- DNS not propagated yet. Wait, then run `dig afs-ta.com +short` and confirm the A records.
- `CNAME` file missing from `public/`. Re-deploy after adding it.

**Custom domain shows the old "user.github.io" URL in the address bar:**
- Custom domain not set in **Settings → Pages**. Set it, save, redeploy.

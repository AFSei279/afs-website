# Project Setup

How to bootstrap a fresh Next.js + Tailwind + static-export project for AFS, or restore a missing config in an existing one.

## Bootstrap a new project

Run from inside the workspace folder (`AFS Website/`):

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

If the folder isn't empty (e.g. the AFS logo is already there), `create-next-app` will refuse. Either move the logo aside, run the command, then move it back into `public/`, or scaffold into a temp folder and `mv` files over.

After the scaffold completes, replace these files with the templates in `assets/` of this skill:

- `next.config.mjs` ← `assets/next.config.mjs`
- `src/app/layout.tsx` ← `assets/layout.tsx`
- `src/app/sitemap.ts` ← `assets/sitemap.ts`
- `public/robots.txt` ← `assets/robots.txt`

Then create:

- `.github/workflows/deploy.yml` ← `assets/deploy.yml`
- `src/components/LeadForm.tsx` ← `assets/lead-form.tsx`
- `.env.local` with `NEXT_PUBLIC_LEAD_FORM_ENDPOINT=` (placeholder; fill after picking a form provider)
- `.env.production` with the production endpoint

## Verify the static build works

This is the single most important verification step. If it fails now, every deploy will fail later.

```bash
npm run build
```

The output should end with `Generating static pages` and produce an `out/` directory. Common failures:

- **`Page "/api/..." cannot be exported`** — Delete or move API routes; the site has no server.
- **`Image is missing required "width" property`** — Add `width` and `height` to every `<Image>` (required when `unoptimized` is set).
- **`Dynamic server usage`** — A page is calling `cookies()`, `headers()`, or similar. Either remove the call or render the page client-side.

## Tailwind brand setup

Edit `tailwind.config.ts` to add AFS brand tokens. The values here are placeholders — confirm with the user before using:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // TODO: confirm exact hex values from the AFS logo / brand guidelines
        brand: {
          DEFAULT: "#0F2A44",   // primary deep blue, placeholder
          accent: "#C8A24A",    // gold accent, placeholder
          ink: "#0B0B0B",
          paper: "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
};
export default config;
```

When you (Claude) run this skill against the AFS project for the first time, sample the actual brand colors from `public/AFS_Tech&Assets_Logo.png` (or ask the user) before committing these tokens.

## First deploy

Before the first deploy, make sure the GitHub repo has Pages enabled:

1. Repo → Settings → Pages → Source: **GitHub Actions** (not "Deploy from a branch").
2. Push to `main`. The workflow runs and publishes.
3. After the first successful run, the live URL appears in Settings → Pages.

For custom domain setup (`afs-ta.com`), see `deployment.md`.

# Lead Generation

The site exists to turn visitors into qualified inquiries. This file covers the components that make that happen on a static site: forms, booking, tracking, and lead routing.

## Form services compared

GitHub Pages can't process form submissions, so a third-party endpoint receives the POST. The shortlist:

**Formspree** — Free tier 50 submissions/month, simple drop-in, EU data residency available on paid plans. Good default for the AFS site to start.

**Web3Forms** — Free tier 250 submissions/month, no signup required for the basic tier (just an access key emailed to you). Faster to set up than Formspree.

**Getform** — More features (file uploads, multi-step), free tier 50 submissions/month. Good if forms will get more complex over time.

**Self-hosted (Cloudflare Pages Functions)** — Free, full control, no third-party dependency. But it adds an external service to maintain. Only worth it if submission volume goes high enough that paid form-service tiers become expensive.

Pick **Web3Forms** for the first iteration unless the user has a preference. Switching later is cheap — it's just an endpoint URL change.

## How `<LeadForm />` works

The component in `assets/lead-form.tsx`:

1. Renders a styled form with name, email, phone, message, and an honeypot field for bot traps.
2. Reads the endpoint from `process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT`.
3. POSTs as JSON.
4. Tracks the submission as a Plausible custom event (`Lead Submitted`) on success.
5. Shows an inline thank-you state — no redirect, so paid-traffic attribution stays intact.

To use it on a page:

```tsx
import { LeadForm } from "@/components/LeadForm";

export default function ContactPage() {
  return <LeadForm formId="contact" />;
}
```

The `formId` is sent with the submission so you can tell different forms apart in the inbox.

## Capturing UTM parameters

For Google/LinkedIn Ads to be useful, lead sources need to flow into the form submission. Add this to `<LeadForm />`:

```tsx
"use client";
import { useEffect, useState } from "react";

function useUtmParams() {
  const [utm, setUtm] = useState<Record<string, string>>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
      .forEach((k) => {
        const v = params.get(k);
        if (v) captured[k] = v;
      });
    setUtm(captured);
  }, []);
  return utm;
}
```

Include `utm` in the POST body. Most form services accept arbitrary fields and forward them in the email.

For UTMs to survive multi-page visits (user lands on `/lp/...?utm_source=google`, navigates to `/kontakt`, fills the form), persist them in `sessionStorage` on first arrival.

## Booking integration (Cal.com)

Add an embed somewhere prominent — a section on the homepage and a dedicated `/termin` page:

```tsx
"use client";
import { useEffect } from "react";

export function CalEmbed({ link }: { link: string }) {
  useEffect(() => {
    (async () => {
      const Cal = (await import("@calcom/embed-snippet")).default;
      Cal("init", { origin: "https://cal.com" });
      Cal("inline", { elementOrSelector: "#cal-embed", calLink: link });
    })();
  }, [link]);
  return <div id="cal-embed" className="min-h-[600px]" />;
}
```

`@calcom/embed-snippet` is a tiny package; its dynamic `import` keeps the booking widget out of the initial bundle so non-booking pages load fast.

## Tracking with Plausible

The Plausible script lives in `src/app/layout.tsx` (see `assets/layout.tsx`). For custom events:

```tsx
declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}
window.plausible?.("Lead Submitted", { props: { form: formId } });
```

Goal events to set up in the Plausible dashboard:
- `Lead Submitted` — the main conversion
- `Booking Started` — when the Cal embed loads on `/termin`
- Custom events per landing page if running paid campaigns

## Lead routing

Where do submissions go? Three options, in order of operational simplicity:

1. **Email only** — form service emails `andre@afs-ta.com`. Fine for low volume. Risk: leads land in inbox noise.
2. **Email + auto-forward to a CRM via Zapier/Make** — bridges from the form service to HubSpot/Pipedrive/etc. Costs ~10–20 €/month but adds tracking and pipeline.
3. **Form service → CRM webhook directly** — some form services support webhooks natively. Fewer moving parts than Zapier if the CRM has an inbound webhook.

For the AFS site at launch: option 1. Revisit when there are 10+ leads/week and option 2 becomes the obvious next step.

## Anti-spam

Without server code, defenses are limited but the basics work:

- **Honeypot field** (a hidden input that real users won't fill — bots usually do). Already in `assets/lead-form.tsx`.
- **Form-service spam filter** (most have one built in).
- **Cloudflare Turnstile** if spam becomes a real problem. The widget is client-side and works on static sites.

Don't add reCAPTCHA — it requires accepting Google's third-party cookies, which kills the cookie-banner-free setup.

## Compliance (DSGVO/GDPR)

For a German business, the contact form needs:

- A link to the privacy policy near the submit button.
- A checkbox for explicit consent if the form data is used for anything beyond responding to the inquiry (e.g. newsletter signup). For pure inquiry forms, the consent is implicit in the submission.
- Storage and processing details in the privacy policy: which form service, where it's hosted, how long data is kept.
- An impressum page (`/impressum`) — required for any commercial site in Germany.

The skill doesn't ship a privacy policy template — these need legal review and shouldn't be auto-generated. Recommend the user use a service like e-recht24.de or have a lawyer draft one.

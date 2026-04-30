"use client";

import { FormEvent, useEffect, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

interface LeadFormProps {
  /** Logical id, sent with the submission so different forms can be told apart in the inbox. */
  formId: string;
  /** Optional override of the env-configured endpoint. */
  endpoint?: string;
  /** Optional success copy. */
  successMessage?: string;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function readPersistedUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  // Capture UTMs once on first arrival and persist them for the session
  // so a visitor who lands on /lp and converts later on /kontakt still
  // attributes correctly.
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v;
  }
  if (Object.keys(fromUrl).length > 0) {
    sessionStorage.setItem("afs_utm", JSON.stringify(fromUrl));
    return fromUrl;
  }
  try {
    return JSON.parse(sessionStorage.getItem("afs_utm") ?? "{}");
  } catch {
    return {};
  }
}

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

export function LeadForm({
  formId,
  endpoint,
  successMessage = "Vielen Dank, wir melden uns innerhalb eines Werktags.",
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    setUtm(readPersistedUtm());
  }, []);

  const targetEndpoint =
    endpoint ?? process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT ?? "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorText(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — real visitors leave this empty. Bots usually fill every field.
    if (data.get("company_website")) {
      // Fake a success so the bot doesn't retry.
      setStatus("success");
      return;
    }

    const payload: Record<string, string> = {
      formId,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      ...utm,
    };

    if (!targetEndpoint) {
      setStatus("error");
      setErrorText(
        "Formular-Endpunkt ist nicht konfiguriert (NEXT_PUBLIC_LEAD_FORM_ENDPOINT)."
      );
      return;
    }

    try {
      const res = await fetch(targetEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      window.plausible?.("Lead Submitted", { props: { form: formId } });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorText(
        "Da ist etwas schiefgegangen. Bitte versuchen Sie es noch einmal oder schreiben Sie uns direkt an andre@afs-ta.com."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-900">
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot — visually hidden but still in the DOM for bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          Telefon (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <p className="text-xs text-gray-600">
        Mit dem Absenden stimmen Sie unserer{" "}
        <a href="/datenschutz/" className="underline">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-brand px-5 py-2.5 font-medium text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Wird gesendet …" : "Anfrage senden"}
      </button>

      {status === "error" && errorText && (
        <p role="alert" className="text-sm text-red-700">
          {errorText}
        </p>
      )}
    </form>
  );
}

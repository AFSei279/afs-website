"use client";

import { FormEvent, useEffect, useState } from "react";
import { SITE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

interface LeadFormProps {
  /** Logischer Identifier — wird mit der Anfrage gesendet, damit du verschiedene Formulare im Posteingang unterscheiden kannst. */
  formId: string;
  /** Optionaler Voreintrag für das Nachricht-Feld (z. B. mit Tool-Ergebnissen). */
  defaultMessage?: string;
  /** Benutzerdefinierte Erfolgs-Nachricht. */
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
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string> }
    ) => void;
  }
}

export function LeadForm({
  formId,
  defaultMessage = "",
  successMessage = "Vielen Dank — wir melden uns innerhalb eines Werktags.",
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    setUtm(readPersistedUtm());
  }, []);

  const endpoint = process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT ?? "";
  const accessKey = process.env.NEXT_PUBLIC_LEAD_FORM_ACCESS_KEY ?? "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorText(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("company_website")) {
      setStatus("success");
      return;
    }

    if (!endpoint) {
      setStatus("error");
      setErrorText(
        "Formular-Endpoint ist nicht konfiguriert. Bitte schreiben Sie uns direkt an " +
          SITE.contactEmail +
          "."
      );
      return;
    }

    // Web3Forms erwartet "access_key" und "subject" im Payload.
    const payload: Record<string, string> = {
      ...(accessKey ? { access_key: accessKey } : {}),
      subject: `Anfrage über ${formId} — ${SITE.shortName}`,
      from_name: String(data.get("name") ?? ""),
      formId,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      company: String(data.get("company") ?? ""),
      message: String(data.get("message") ?? ""),
      ...utm,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      window.plausible?.("Lead Submitted", { props: { form: formId } });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorText(
        "Da ist etwas schiefgegangen. Bitte versuchen Sie es noch einmal oder schreiben Sie uns direkt an " +
          SITE.contactEmail +
          "."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-signal-green bg-signal-green-bg p-6 text-signal-green">
        <p className="font-semibold">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lf-name" className="field-label">
            Name *
          </label>
          <input
            id="lf-name"
            name="name"
            required
            autoComplete="name"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="lf-company" className="field-label">
            Unternehmen
          </label>
          <input
            id="lf-company"
            name="company"
            autoComplete="organization"
            className="field-input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lf-email" className="field-label">
            E-Mail *
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="lf-phone" className="field-label">
            Telefon (optional)
          </label>
          <input
            id="lf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="lf-message" className="field-label">
          Ihre Nachricht *
        </label>
        <textarea
          id="lf-message"
          name="message"
          rows={5}
          required
          defaultValue={defaultMessage}
          className="field-input"
        />
      </div>

      <p className="text-xs text-brand-muted">
        Mit dem Absenden stimmen Sie unserer{" "}
        <a href="/datenschutz/" className="underline hover:text-brand">
          Datenschutzerklärung
        </a>{" "}
        zu. Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary disabled:opacity-60"
      >
        {status === "submitting" ? "Wird gesendet …" : "Anfrage senden"}
      </button>

      {status === "error" && errorText && (
        <p role="alert" className="text-sm text-signal-red">
          {errorText}
        </p>
      )}
    </form>
  );
}

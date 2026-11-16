import Link from "next/link";
import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/lib/site";

/**
 * Kampagnen-Landingpage für den QR-Code im Video-Spot auf den
 * FeSa-Snackautomaten. Bewusst kurz und für das Smartphone gebaut:
 * Wer hier landet, hat gerade am Automaten gescannt.
 * Nicht in der Navigation, nicht in der Sitemap, noindex.
 */
export const metadata: Metadata = {
  title: "Ihr kostenloses Probebild — Werbebilder & Videos",
  description:
    "Werbebilder und kurze Werbevideos für Ihren Betrieb — mit KI erstellt, von Hand geprüft. Das erste Probebild ist kostenlos.",
  alternates: { canonical: "/lp/probebild/" },
  robots: { index: false, follow: true },
};

const BEISPIELE = [
  { t: "Social-Media-Posts", d: "Aktionen, Saison, Neuheiten — fertig zum Posten." },
  { t: "Kurzvideos & Reels", d: "10–60 Sekunden, Hoch- oder Querformat." },
  { t: "Plakate & Flyer", d: "Druckfertig für Schaufenster und Theke." },
];

const SCHRITTE = [
  "Formular ausfüllen — 1 Minute",
  "Wir melden uns innerhalb eines Werktags",
  "Sie erhalten Ihr Probebild — kostenlos und unverbindlich",
];

const DEFAULT_MESSAGE =
  "Ich möchte ein kostenloses Probebild.\n\nMein Betrieb / Branche: \nWofür soll das Bild sein (z. B. Instagram, Aktion, Plakat): \n";

export default function ProbebildLandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Werbebilder &amp; Videos
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Dein Laden.{" "}
            <span className="text-brand-accent">Deine Werbung.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Professionelle Werbebilder und kurze Videos für Gastro, Handwerk und
            Handel — mit KI erstellt, von Hand geprüft.
          </p>
          <div className="mt-6 inline-flex items-center rounded-full bg-brand-accent px-5 py-2 text-base font-bold text-brand-dark">
            1. Probebild gratis
          </div>
          <div className="mt-8">
            <a
              href="#anfrage"
              className="inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-brand shadow-sm transition hover:bg-white/90 sm:w-auto"
            >
              Jetzt Probebild sichern
            </a>
          </div>
        </div>
      </section>

      {/* Was wir machen */}
      <section className="container-page py-12">
        <h2 className="text-2xl font-bold sm:text-3xl">Was wir für Sie erstellen</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {BEISPIELE.map((b) => (
            <article key={b.t} className="card">
              <h3 className="text-lg font-semibold text-brand">{b.t}</h3>
              <p className="mt-2 text-sm text-brand-muted">{b.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* So geht's + Formular */}
      <section id="anfrage" className="scroll-mt-24 bg-white">
        <div className="container-page grid gap-10 py-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold sm:text-3xl">So einfach geht&apos;s</h2>
            <ol className="mt-6 space-y-4">
              {SCHRITTE.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-brand-dark">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-brand-ink">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-brand-muted">
              Logo oder Fotos können Sie uns danach einfach per Mail an{" "}
              <a href={`mailto:${SITE.contactEmail}`} className="underline hover:text-brand">
                {SITE.contactEmail}
              </a>{" "}
              schicken.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="card">
              <LeadForm
                formId="lp-probebild-fesa-automat"
                defaultMessage={DEFAULT_MESSAGE}
                successMessage="Danke! Wir melden uns innerhalb eines Werktags und besprechen Ihr kostenloses Probebild."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Weiterführend */}
      <section className="container-page py-10 text-center">
        <p className="text-sm text-brand-muted">
          Pakete und Preise im Überblick:{" "}
          <Link href="/leistungen/werbebilder-videos/" className="font-semibold text-brand underline">
            Werbebilder &amp; Videos
          </Link>
        </p>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `${SITE.shortName} — Lokale KI, sichere Daten, klarer Plan`,
  description:
    "AFS Tech & Assets unterstützt KMU bei der Einführung lokaler, DSGVO-freundlicher KI: Hardware-Auswahl, Installation, RAG mit Unternehmensdaten und Integration in bestehende Workflows.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-accent blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/40 blur-3xl" />
        </div>

        <div className="container-page relative grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              AFS Tech &amp; Assets GmbH
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              Lokale KI für den Mittelstand —{" "}
              <span className="text-brand-accent">ohne Datenabfluss</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Sie wollen Sprachmodelle und RAG mit Ihren Unternehmensdaten nutzen, aber
              keine Daten in fremde Cloud-Dienste geben? AFS plant, wählt aus, installiert
              und integriert lokale KI auf Ihrer Hardware — DSGVO-konform, transparent,
              wartbar.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/lokaler-ki-hardware-rechner/"
                className="inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
              >
                Hardware-Rechner starten
              </Link>
              <Link
                href="/kontakt/"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Beratung anfragen
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              <li>✓ DSGVO-konform</li>
              <li>✓ Daten bleiben im Haus</li>
              <li>✓ Keine versteckten Folgekosten</li>
            </ul>
          </div>

          <div className="hidden md:block">
            <div className="relative ml-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
              {/* Wenn das Bild noch nicht abgelegt ist, bleibt der Platzhalter sichtbar. */}
              <Image
                src="/photos/andre-portrait.jpg"
                alt={`${SITE.founder.name}, ${SITE.founder.role}`}
                width={600}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Drei Säulen */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Drei Bausteine. Ein Ergebnis.
          </h2>
          <p className="mt-4 text-base text-brand-muted">
            Wir begleiten Sie von der ersten Hardware-Frage bis zur produktiv laufenden
            KI-Lösung — ohne Vendor-Lock-in und ohne Marketing-Magie.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <article className="card flex flex-col">
            <div className="text-3xl">🧭</div>
            <h3 className="mt-3 text-lg font-semibold text-brand">Beratung</h3>
            <p className="mt-2 flex-1 text-sm text-brand-muted">
              Wo lohnt sich KI in Ihrem Unternehmen, wo ist sie Spielerei? Wir analysieren
              Use Cases, klären Datenbasis und Compliance, und liefern eine umsetzbare
              Roadmap statt einer Powerpoint.
            </p>
            <Link
              href="/leistungen/#beratung"
              className="mt-5 text-sm font-semibold text-brand hover:underline"
            >
              Mehr erfahren →
            </Link>
          </article>

          <article className="card flex flex-col">
            <div className="text-3xl">🖥️</div>
            <h3 className="mt-3 text-lg font-semibold text-brand">Hardware &amp; Setup</h3>
            <p className="mt-2 flex-1 text-sm text-brand-muted">
              Apple Silicon, NVIDIA-Workstation oder Server im Rack? Wir bewerten Ihren
              Bedarf, empfehlen die richtige Klasse und installieren Ollama, LM Studio oder
              Open WebUI sauber konfiguriert.
            </p>
            <Link
              href="/leistungen/#hardware"
              className="mt-5 text-sm font-semibold text-brand hover:underline"
            >
              Mehr erfahren →
            </Link>
          </article>

          <article className="card flex flex-col">
            <div className="text-3xl">🔗</div>
            <h3 className="mt-3 text-lg font-semibold text-brand">Integration &amp; RAG</h3>
            <p className="mt-2 flex-1 text-sm text-brand-muted">
              Ihre Dokumente, Ihre Modelle. Wir bauen Retrieval-Augmented-Generation auf
              Ihren Bestandsdaten und integrieren das Modell in Workflows, die Ihre Teams
              schon nutzen.
            </p>
            <Link
              href="/leistungen/#integration"
              className="mt-5 text-sm font-semibold text-brand hover:underline"
            >
              Mehr erfahren →
            </Link>
          </article>
        </div>
      </section>

      {/* Tool Teaser */}
      <section className="bg-white">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              Kostenloses Tool
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Reicht Ihre Hardware für lokale KI?
            </h2>
            <p className="mt-4 text-base text-brand-muted">
              Der AFS-Hardware-Rechner schätzt in unter einer Minute, ob Ihr Mac, PC
              oder Server für Llama, Qwen, Mistral oder DeepSeek geeignet ist. Inklusive
              Speicherbedarf, Ampelbewertung und konkreter Hardware-Empfehlung.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-brand-ink">
              <li>• Berücksichtigt RAM, VRAM, Quantisierung und Kontextlänge</li>
              <li>• Modellklassen von 3B bis 70B</li>
              <li>• Empfehlung für Apple Silicon, NVIDIA-GPUs und Server</li>
            </ul>
            <Link
              href="/tools/lokaler-ki-hardware-rechner/"
              className="btn-primary mt-8"
            >
              Jetzt prüfen
            </Link>
          </div>

          <div className="card border-2 border-brand-accent/30 bg-brand-paper">
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-signal-green" />
              <p className="text-sm font-semibold text-signal-green">
                Beispielergebnis: Geeignet
              </p>
            </div>
            <p className="mt-4 text-sm text-brand-muted">
              MacBook Pro M3 Max · 64 GB Unified Memory · Llama 3.1 8B Q4 · 8k Kontext
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-brand-muted">Geschätzter Bedarf</p>
                <p className="text-2xl font-bold text-brand">~13 GB</p>
              </div>
              <div>
                <p className="text-brand-muted">Empfehlung</p>
                <p className="text-base font-semibold text-brand">
                  Apple Silicon ab 16 GB
                </p>
              </div>
            </div>
            <p className="mt-6 rounded-md bg-signal-green-bg p-3 text-xs text-signal-green">
              Ihre Hardware ist für diese Modellklasse gut geeignet — auch mit Spielraum
              für längere Kontexte.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="container-page py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:items-center">
          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-brand-line shadow-md md:order-2 md:max-w-none">
            <Image
              src="/photos/andre-portrait-smile.jpg"
              alt={SITE.founder.name}
              width={600}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="md:order-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              Über AFS
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              {SITE.founder.name}
            </h2>
            <p className="mt-2 text-base text-brand-muted">
              {SITE.founder.role} · {SITE.founder.title}
            </p>
            <p className="mt-6 text-base text-brand-ink">
              Seit über 15 Jahren begleite ich Anforderungs- und
              Architekturprojekte in regulierten Industrien — Daimler, Siemens, VW, Audi,
              Continental, Vaillant, BSH, Wavelight und Bundesagentur für Arbeit, um nur
              einige zu nennen. Mit AFS Tech &amp; Assets bringe ich diese Methodik in den
              KI-Bereich: <strong>klare Anforderungen, saubere Architektur,
              nachvollziehbare Entscheidungen</strong> — und Daten, die Ihr Haus nicht
              verlassen.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                IREB CPRE Advanced
              </span>
              <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                ISO 26262 FuSa
              </span>
              <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                ITIL v4
              </span>
              <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                Dipl. Wirtsch.-Inf.
              </span>
            </div>
            <Link href="/ueber-mich/" className="btn-secondary mt-8">
              Mehr über mich
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container-page py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Bereit für lokale KI im eigenen Haus?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Erzählen Sie uns kurz, wo Sie stehen — wir melden uns innerhalb eines
            Werktags mit einer ehrlichen Einschätzung. Kein Sales-Funnel, keine
            Newsletter-Falle.
          </p>
          <Link
            href="/kontakt/"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
          >
            Kostenloses Erstgespräch anfragen
          </Link>
        </div>
      </section>
    </>
  );
}

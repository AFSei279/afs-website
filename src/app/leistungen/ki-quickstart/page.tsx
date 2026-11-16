import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "KI-Quickstart für KMU — Festpreis",
  description:
    "KI-Quickstart von AFS Tech & Assets: Workshop, Prozessanalyse und drei umgesetzte KI-Automatisierungen zum Festpreis — DSGVO-bewusst, dokumentiert, mit optionaler monatlicher Betreuung.",
  alternates: { canonical: "/leistungen/ki-quickstart/" },
};

const PROBLEME = [
  "Angebote, E-Mails und Protokolle werden jedes Mal von Hand geschrieben.",
  "Wissen steckt in Köpfen, PDFs und Ordnern — niemand findet es schnell.",
  "Mitarbeitende nutzen ChatGPT privat, ohne Regeln und ohne Datenschutz.",
  "Man weiß, dass KI helfen könnte — aber nicht, wo man anfangen soll.",
];

const ABLAUF = [
  {
    n: "01",
    t: "Prozess-Workshop",
    d: "Halbtägiger Remote-Workshop: Wir nehmen Ihre wiederkehrenden Aufgaben auf und bewerten sie nach Zeitersparnis, Risiko und Umsetzbarkeit.",
  },
  {
    n: "02",
    t: "Top-3-Auswahl",
    d: "Sie erhalten eine kurze Bewertung aller Kandidaten und wir legen gemeinsam die drei Automatisierungen mit dem größten Hebel fest.",
  },
  {
    n: "03",
    t: "Umsetzung",
    d: "Wir bauen die drei Automatisierungen — z. B. Angebotsentwürfe, E-Mail-Vorsortierung, Wissenssuche in Ihren Dokumenten — mit Cloud- oder lokaler KI.",
  },
  {
    n: "04",
    t: "Übergabe & Schulung",
    d: "Kurze Schulung für Ihr Team, Dokumentation jeder Automatisierung und eine KI-Nutzungsrichtlinie für Ihr Unternehmen.",
  },
];

const BEISPIELE = [
  { t: "Angebote & Briefe", d: "Aus Stichpunkten oder Aufmaß wird ein fertiger Angebotsentwurf in Ihrem Stil." },
  { t: "E-Mail-Eingang", d: "Anfragen werden automatisch kategorisiert, zusammengefasst und mit Antwortentwurf vorbereitet." },
  { t: "Wissenssuche", d: "Fragen an Ihre eigenen Handbücher, Verträge und Vorlagen — mit Quellenangabe." },
  { t: "Protokolle", d: "Aus Besprechungsnotizen werden strukturierte Protokolle mit Aufgabenliste." },
  { t: "Dokumentenprüfung", d: "Rechnungen, Lieferscheine oder Formulare werden ausgelesen und auf Vollständigkeit geprüft." },
  { t: "Social Media & Texte", d: "Beiträge, Produkttexte und Newsletter aus Ihren Eckdaten — konsistent im Ton." },
];

const PAKETE = [
  {
    name: "KI-Quickstart",
    preis: "1.890 €",
    einheit: "einmalig, Festpreis",
    highlight: true,
    punkte: [
      "Halbtägiger Prozess-Workshop (remote)",
      "Bewertung aller Automatisierungs-Kandidaten",
      "3 umgesetzte KI-Automatisierungen",
      "Dokumentation & Team-Schulung (2 h)",
      "KI-Nutzungsrichtlinie für Ihr Unternehmen",
      "30 Tage Nachbetreuung inklusive",
    ],
    cta: "Quickstart anfragen",
  },
  {
    name: "KI-Betreuung",
    preis: "ab 249 €",
    einheit: "pro Monat, monatlich kündbar",
    highlight: false,
    punkte: [
      "Pflege und Anpassung Ihrer Automatisierungen",
      "Kleine Erweiterungen bis 2 Std. pro Monat inklusive",
      "Monatlicher Check-in (30 Min.)",
      "Support per E-Mail mit Antwort binnen 2 Werktagen",
      "Hinweise zu neuen Modellen und Werkzeugen",
    ],
    cta: "Betreuung anfragen",
  },
];

export default function KiQuickstartPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Leistung · KI-Quickstart
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            In vier Wochen von „KI müssten wir mal…“ zu{" "}
            <span className="text-brand-accent">drei laufenden Automatisierungen</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Festpreis statt Stundenzettel: Wir finden die Aufgaben, bei denen KI Ihrem
            Team spürbar Zeit spart, setzen die drei wichtigsten um und übergeben sie
            sauber dokumentiert.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakt/?thema=KI-Quickstart"
              className="inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
            >
              Kostenloses Erstgespräch
            </Link>
            <Link
              href="#preise"
              className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Preise ansehen
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            <li>✓ Festpreis, keine versteckten Kosten</li>
            <li>✓ DSGVO-bewusst — auf Wunsch komplett lokal</li>
            <li>✓ Methodisch: Anforderungen zuerst, dann Technik</li>
          </ul>
        </div>
      </section>

      {/* Probleme */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Kommt Ihnen das bekannt vor?</h2>
        </div>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          {PROBLEME.map((p) => (
            <li key={p} className="card flex gap-3 text-sm text-brand-ink">
              <span className="text-brand-accent-dark">→</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Beispiele */}
      <section className="bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Typische Automatisierungen</h2>
            <p className="mt-4 text-base text-brand-muted">
              Welche drei es bei Ihnen werden, entscheiden wir gemeinsam im Workshop.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BEISPIELE.map((b) => (
              <article key={b.t} className="card">
                <h3 className="text-lg font-semibold text-brand">{b.t}</h3>
                <p className="mt-3 text-sm text-brand-muted">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">So läuft der Quickstart ab</h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ABLAUF.map((s) => (
            <li key={s.n} className="card">
              <span className="text-3xl font-bold text-brand-accent">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-brand">{s.t}</h3>
              <p className="mt-2 text-sm text-brand-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Preise */}
      <section id="preise" className="scroll-mt-24 bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Preise</h2>
            <p className="mt-4 text-base text-brand-muted">
              Alle Preise netto zzgl. gesetzlicher USt. Lizenzkosten für KI-Dienste
              (z. B. API-Nutzung) trägt der Kunde direkt — wir beraten zur günstigsten Variante.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {PAKETE.map((p) => (
              <article
                key={p.name}
                className={`card flex flex-col ${p.highlight ? "ring-2 ring-brand-accent" : ""}`}
              >
                <h3 className="text-xl font-semibold text-brand">{p.name}</h3>
                <p className="mt-4 text-4xl font-bold text-brand">{p.preis}</p>
                <p className="text-sm text-brand-muted">{p.einheit}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-brand-ink">
                  {p.punkte.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="text-brand-accent-dark">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/kontakt/?thema=${encodeURIComponent(p.name)}`}
                  className="btn-primary mt-8 text-center"
                >
                  {p.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Lohnt sich KI für Ihren Betrieb?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            In 30 Minuten klären wir, welche Aufgaben sich automatisieren lassen und ob
            der Quickstart für Sie passt — kostenlos und unverbindlich.
          </p>
          <Link
            href="/kontakt/?thema=KI-Quickstart"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
          >
            Erstgespräch anfragen
          </Link>
          <p className="mt-4 text-sm text-white/60">
            Oder direkt per Mail an{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="underline hover:text-white">
              {SITE.contactEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

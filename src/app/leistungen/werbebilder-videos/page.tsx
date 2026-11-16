import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Werbebilder & Videos für Betriebe — mit KI",
  description:
    "Professionelle Werbebilder, Social-Media-Grafiken und kurze Werbevideos für kleine und mittelständische Betriebe — schnell, im eigenen Markenstil und zum Festpreis. KI-gestützt erstellt, von Hand geprüft.",
  alternates: { canonical: "/leistungen/werbebilder-videos/" },
};

const FORMATE = [
  { t: "Social-Media-Beiträge", d: "Fertige Bilder und Karussells für Instagram, Facebook und LinkedIn — passend zu Anlass und Saison." },
  { t: "Produkt- & Angebotsbilder", d: "Ihr Produkt in neuer Umgebung, freigestellt oder als Aktionsgrafik — aus Ihren eigenen Fotos." },
  { t: "Kurzvideos & Reels", d: "15–60 Sekunden Werbevideos im Hoch- oder Querformat, mit Text, Musik und Untertiteln." },
  { t: "Anzeigenmotive", d: "Motive für Google-, Meta- oder lokale Anzeigen in allen benötigten Größen." },
  { t: "Flyer & Plakate", d: "Druckfertige Gestaltung für Aktionen, Eröffnungen und Veranstaltungen." },
  { t: "Website-Bilder", d: "Titelbilder und Illustrationen, die zu Ihrer Marke passen — statt austauschbarer Stockfotos." },
];

const ABLAUF = [
  { n: "01", t: "Briefing", d: "Kurzes Gespräch oder Fragebogen: Ziel, Zielgruppe, Anlass, Ihre Farben, Logo und vorhandene Fotos." },
  { n: "02", t: "Entwürfe", d: "Sie erhalten innerhalb weniger Werktage erste Entwürfe zur Auswahl." },
  { n: "03", t: "Feinschliff", d: "Zwei Korrekturrunden sind inklusive — bis Bild und Text sitzen." },
  { n: "04", t: "Lieferung", d: "Alle Dateien in den passenden Formaten für Social Media, Web und Druck." },
];

const PAKETE = [
  {
    name: "Bilder-Paket",
    preis: "390 €",
    einheit: "einmalig",
    highlight: false,
    punkte: [
      "10 Werbebilder im eigenen Markenstil",
      "Formate für Social Media, Web und Anzeigen",
      "Texte und Slogans auf Wunsch inklusive",
      "2 Korrekturrunden",
    ],
  },
  {
    name: "Video-Paket",
    preis: "690 €",
    einheit: "einmalig",
    highlight: true,
    punkte: [
      "3 Kurzvideos à 15–60 Sekunden",
      "Hoch- und Querformat",
      "Text-Einblendungen, Musik und Untertitel",
      "Passende Vorschaubilder",
      "2 Korrekturrunden",
    ],
  },
  {
    name: "Content-Abo",
    preis: "490 €",
    einheit: "pro Monat, monatlich kündbar",
    highlight: false,
    punkte: [
      "12 Social-Media-Bilder pro Monat",
      "2 Kurzvideos pro Monat",
      "Redaktionsplan für Ihre Kanäle",
      "Saison- und Aktionsmotive inklusive",
    ],
  },
];

const HINWEISE = [
  "Wir arbeiten mit aktuellen KI-Werkzeugen und prüfen jedes Ergebnis von Hand — auf Qualität, Markenkonsistenz und Plausibilität.",
  "Echte Personen, Marken oder Kunstwerke Dritter bilden wir nicht ohne Erlaubnis nach.",
  "Wo eine Kennzeichnung als KI-generiert sinnvoll oder vorgeschrieben ist, weisen wir Sie darauf hin.",
  "Ihre eigenen Fotos und Daten verwenden wir ausschließlich für Ihren Auftrag.",
];

export default function WerbebilderVideosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Leistung · Werbebilder &amp; Videos
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Werbung, die nach Agentur aussieht —{" "}
            <span className="text-brand-accent">ohne Agenturpreise</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Werbebilder, Social-Media-Grafiken und kurze Videos für Ihren Betrieb:
            KI-gestützt erstellt, im eigenen Markenstil und von Hand geprüft.
            Schnell geliefert, zum Festpreis.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakt/?thema=Werbebilder%20%26%20Videos"
              className="inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
            >
              Projekt anfragen
            </Link>
            <Link
              href="#preise"
              className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Preise ansehen
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            <li>✓ Erste Entwürfe in wenigen Werktagen</li>
            <li>✓ Festpreis inkl. Korrekturen</li>
            <li>✓ Alle Formate aus einer Hand</li>
          </ul>
        </div>
      </section>

      {/* Formate */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Was wir für Sie erstellen</h2>
          <p className="mt-4 text-base text-brand-muted">
            Für Handwerk, Gastronomie, Einzelhandel, Praxen und Dienstleister.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FORMATE.map((f) => (
            <article key={f.t} className="card">
              <h3 className="text-lg font-semibold text-brand">{f.t}</h3>
              <p className="mt-3 text-sm text-brand-muted">{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">So einfach geht es</h2>
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
        </div>
      </section>

      {/* Preise */}
      <section id="preise" className="container-page scroll-mt-24 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Preise</h2>
          <p className="mt-4 text-base text-brand-muted">
            Alle Preise netto zzgl. gesetzlicher USt. Kosten für bezahlte Anzeigen
            (Werbebudget) sind nicht enthalten.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                {p.name} anfragen
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Transparenz */}
      <section className="bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">KI — transparent und verantwortungsvoll</h2>
            <ul className="mt-6 space-y-3 text-sm text-brand-ink">
              {HINWEISE.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-brand-accent-dark">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Bereit für bessere Werbung?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Schicken Sie uns Ihr Logo und ein paar Stichworte — Sie erhalten ein
            kostenloses Probemotiv und ein konkretes Angebot.
          </p>
          <Link
            href="/kontakt/?thema=Werbebilder%20%26%20Videos"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
          >
            Probemotiv anfragen
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

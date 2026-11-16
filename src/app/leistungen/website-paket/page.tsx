import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Website-Paket für Betriebe — mit Wartung",
  description:
    "Schnelle, DSGVO-saubere Websites für Handwerk, Praxen und lokale Betriebe — zum Festpreis, ohne Cookie-Banner-Chaos, mit monatlicher Wartung, damit Sie sich um nichts kümmern müssen.",
  alternates: { canonical: "/leistungen/website-paket/" },
};

const VORTEILE = [
  { t: "Schnell", d: "Statische Seiten laden in unter einer Sekunde — gut für Besucher und für Google." },
  { t: "Sicher", d: "Kein WordPress, keine Plugins, keine Datenbank: nichts, was gehackt oder veraltet werden kann." },
  { t: "DSGVO-sauber", d: "Cookie-freie Statistik, Impressum und Datenschutzerklärung sauber eingebunden." },
  { t: "Günstig im Betrieb", d: "Hosting fast kostenlos — Sie zahlen für Pflege und Betreuung, nicht für Server." },
  { t: "Anfragen statt Visitenkarte", d: "Kontaktformular und Online-Terminbuchung bringen Ihnen direkt Anfragen." },
  { t: "Mobil zuerst", d: "Die meisten Kunden suchen am Handy — Ihre Seite ist dafür gebaut." },
];

const PAKETE = [
  {
    name: "Start",
    preis: "990 €",
    einheit: "einmalig",
    highlight: false,
    punkte: [
      "Onepager mit bis zu 5 Abschnitten",
      "Kontaktformular mit E-Mail-Weiterleitung",
      "Impressum & Datenschutz eingebunden",
      "Einrichtung Ihrer Domain & HTTPS",
      "Google-Unternehmensprofil verknüpft",
    ],
  },
  {
    name: "Business",
    preis: "1.890 €",
    einheit: "einmalig",
    highlight: true,
    punkte: [
      "Bis zu 6 Unterseiten (z. B. Leistungen, Team, Referenzen)",
      "Online-Terminbuchung (Cal.com)",
      "Lokale SEO-Grundoptimierung",
      "Cookie-freie Besucherstatistik",
      "Texte gemeinsam mit Ihnen erarbeitet",
      "Einweisung & kurze Dokumentation",
    ],
  },
];

const WARTUNG = [
  {
    name: "Wartung Basis",
    preis: "79 €",
    punkte: [
      "Hosting, Domain-Verwaltung & HTTPS",
      "Technische Updates & Monitoring",
      "1 kleine Inhaltsänderung pro Monat",
    ],
  },
  {
    name: "Wartung Plus",
    preis: "149 €",
    punkte: [
      "Alles aus Basis",
      "Inhaltsänderungen bis 1 Std. pro Monat",
      "Quartalsbericht zu Besuchern & Anfragen",
      "Bevorzugter Support binnen 1 Werktag",
    ],
  },
];

export default function WebsitePaketPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Leistung · Website-Paket
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Eine Website, die Anfragen bringt —{" "}
            <span className="text-brand-accent">und um die Sie sich nie kümmern müssen</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Für Handwerksbetriebe, Praxen, Kanzleien und lokale Dienstleister: schnell,
            sicher, DSGVO-sauber. Zum Festpreis erstellt und auf Wunsch monatlich gepflegt.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakt/?thema=Website-Paket"
              className="inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
            >
              Website anfragen
            </Link>
            <Link
              href="#preise"
              className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Preise ansehen
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            <li>✓ Online in 2–3 Wochen</li>
            <li>✓ Festpreis</li>
            <li>✓ Kein WordPress-Wartungsstress</li>
          </ul>
        </div>
      </section>

      {/* Vorteile */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Warum diese Websites anders sind</h2>
          <p className="mt-4 text-base text-brand-muted">
            Dieselbe Technik wie bei afs-ta.com — die Seite, auf der Sie gerade sind.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VORTEILE.map((v) => (
            <article key={v.t} className="card">
              <h3 className="text-lg font-semibold text-brand">{v.t}</h3>
              <p className="mt-3 text-sm text-brand-muted">{v.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Preise */}
      <section id="preise" className="scroll-mt-24 bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Erstellung</h2>
            <p className="mt-4 text-base text-brand-muted">
              Alle Preise netto zzgl. gesetzlicher USt. Domainkosten werden durchgereicht.
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
                  href={`/kontakt/?thema=${encodeURIComponent("Website " + p.name)}`}
                  className="btn-primary mt-8 text-center"
                >
                  Paket {p.name} anfragen
                </Link>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Wartung</h2>
            <p className="mt-4 text-base text-brand-muted">
              Monatlich kündbar. Ihre Seite bleibt aktuell, sicher und erreichbar.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {WARTUNG.map((w) => (
              <article key={w.name} className="card">
                <h3 className="text-xl font-semibold text-brand">{w.name}</h3>
                <p className="mt-4 text-4xl font-bold text-brand">{w.preis}</p>
                <p className="text-sm text-brand-muted">pro Monat</p>
                <ul className="mt-6 space-y-2 text-sm text-brand-ink">
                  {w.punkte.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="text-brand-accent-dark">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Ihre neue Website in drei Wochen</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Schreiben Sie uns kurz, was Ihr Betrieb macht — Sie bekommen innerhalb von
            zwei Werktagen einen konkreten Vorschlag mit Festpreis.
          </p>
          <Link
            href="/kontakt/?thema=Website-Paket"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
          >
            Website anfragen
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

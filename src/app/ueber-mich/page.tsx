import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Über mich",
  description:
    "André Ferreira Sadlo, Geschäftsführer der AFS Tech & Assets GmbH — 15+ Jahre Requirements Engineering, Architektur und Projektleitung in regulierten Branchen wie Automotive, Medizintechnik und öffentlicher Verwaltung.",
  alternates: { canonical: "/ueber-mich/" },
};

const KEY_CLIENTS = [
  "Daimler",
  "Siemens",
  "Volkswagen",
  "Audi",
  "Continental",
  "Schaeffler",
  "Vaillant",
  "BSH Hausgeräte",
  "Wavelight (Alcon)",
  "APTIV",
  "DELPHI",
  "Bundesagentur für Arbeit",
];

const CERTIFICATIONS = [
  {
    title: "IREB® CPRE",
    detail: "Foundation + Advanced Level Elicitation & Consolidation, RE@Agile Primer",
  },
  {
    title: "ISO 26262 Functional Safety",
    detail: "Functional Safety Engineer Level 1",
  },
  {
    title: "IQBBA Business Analyst",
    detail: "Certified Foundation Level Business Analyst",
  },
  {
    title: "ISQI® PM",
    detail: "Certified Professional for Project Management (Foundation)",
  },
  {
    title: "ITIL® v4",
    detail: "Service Management Foundation Level",
  },
  {
    title: "Dipl. Wirtsch.-Inf. (FH)",
    detail: "TH Nürnberg Georg Simon Ohm",
  },
];

const TIMELINE = [
  {
    period: "Seit 12/2025",
    company: "Viveka Inc., USA (Remote)",
    role: "Platform Architect & Interim Technical Lead",
    note: "Architektur, Stabilisierung und Produktionsreife einer SaaS-Plattform — inkl. AI-Integrationsinitiativen, OWASP/SOC2/ISO27001-Grundlagen, RBAC und Software-Lifecycle-Management.",
  },
  {
    period: "03/2024 – 01/2025",
    company: "Siemens Energy, Erlangen",
    role: "Senior Expert Requirements Engineer",
    note: "Großspeicher-Batteriemanagement: Requirementsstruktur, Normenkonformität, Stakeholder-Coaching, Trainingskonzept.",
  },
  {
    period: "07/2020 – 01/2023",
    company: "Wavelight (Alcon), Erlangen",
    role: "System Architekt",
    note: "Next-Generation-Augenlaserchirurgie — ganzheitlicher Netzplan über alle Softwarearchitekturbestandteile, Sub-System-Architekturen, POLARION-Integration.",
  },
  {
    period: "04/2021 – 07/2021",
    company: "Volkswagen, Wolfsburg",
    role: "Senior Requirements Engineer",
    note: "Projekt VW Trinity — Stakeholder-Workshops, methodische Beratung beim RE-Prozess.",
  },
  {
    period: "05/2019 – 02/2020",
    company: "APTIV, München",
    role: "Prozessberater & Requirements Engineer",
    note: "Kamerasystem für autonomes Fahren — Automotive SPICE, internationale Reviews mit OEM.",
  },
  {
    period: "09/2013 – 09/2015",
    company: "Siemens, Erlangen",
    role: "Requirements Engineer & Change Manager",
    note: "Inverter, DC/DC-Konverter und Elektromotoren im Automotive-Bereich — Lasten- und Pflichtenheft, Functional-Safety-Architektur, Change Control Board.",
  },
];

export default function UeberMichPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:items-center md:py-20">
          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-xl">
            <Image
              src="/photos/andre-portrait.jpg"
              alt={SITE.founder.name}
              width={600}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              {SITE.founder.role}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              {SITE.founder.name}
            </h1>
            <p className="mt-4 text-base text-white/80">
              {SITE.founder.title}
            </p>

            <p className="mt-8 text-lg text-white/90">
              Ich helfe Unternehmen seit über 15 Jahren, komplexe technische Vorhaben
              <em> tatsächlich</em> zu Ende zu bringen — von der ersten Anforderung bis
              zur ausgerollten Lösung. Mit AFS Tech &amp; Assets bringe ich diese
              Methodik in den KI-Bereich für den deutschen Mittelstand.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a
                href={`mailto:${SITE.founderEmail}`}
                className="inline-flex items-center rounded-md bg-brand-accent px-4 py-2 font-semibold text-brand-dark hover:bg-brand-accent-dark"
              >
                {SITE.founderEmail}
              </a>
              <a
                href={`tel:${SITE.founderPhone.replace(/\s/g, "")}`}
                className="inline-flex items-center rounded-md border border-white/30 bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20"
              >
                {SITE.founderPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Geschichte / Werdegang */}
      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="prose-reading max-w-none space-y-6 text-base text-brand-ink">
            <h2 className="text-3xl font-bold">Wie ich arbeite</h2>
            <p>
              Mein Berufsweg begann nicht mit KI, sondern mit{" "}
              <strong>Requirements Engineering in regulierten Industrien</strong>:
              Automotive (DAIMLER, VW, Audi, Continental, Schaeffler), Medizintechnik
              (Wavelight Augenlaser), Haushaltsgeräte (BSH), Energie (Siemens
              Großspeicher), öffentliche Verwaltung (Bundesagentur für Arbeit). In all
              diesen Projekten ging es darum, klare Anforderungen aus chaotischen
              Stakeholder-Erwartungen herauszuarbeiten, sie nachvollziehbar zu
              dokumentieren und in eine Architektur zu übersetzen, die ein
              Entwickler-Team auch wirklich umsetzen kann.
            </p>
            <p>
              Aktuell bin ich zusätzlich als{" "}
              <strong>Platform Architect & Interim Technical Lead bei Viveka Inc.
              (USA)</strong>{" "}
              tätig — verantwortlich für Architektur, Stabilisierung und
              Produktionsreife einer SaaS-Plattform inklusive
              AI-Integrationsinitiativen, Sicherheitsgrundlagen nach OWASP/SOC2/ISO27001
              und der Übersetzung von Business-Prioritäten in eine technische Roadmap.
            </p>
            <p>
              Aus dieser Mischung — <strong>Methodik aus dem regulierten
              Engineering plus aktuelle KI-Plattform-Erfahrung</strong> — ist AFS
              Tech &amp; Assets entstanden. Mein Ziel: lokale, DSGVO-freundliche KI im
              Mittelstand so einzuführen, dass sie nicht zur Schatten-IT wird, sondern
              zu einem nachvollziehbaren, wartbaren Bestandteil Ihrer Infrastruktur.
            </p>
            <p>
              Ich arbeite ehrlich: wenn Ihr Use Case keine KI braucht, sage ich Ihnen
              das. Wenn lokale Hardware nicht ausreicht, sage ich Ihnen das auch. Und
              wenn ein bestehendes Tool besser passt als eine Eigenentwicklung, ist das
              die richtige Empfehlung — auch wenn ich daran weniger verdiene.
            </p>

            <h2 className="mt-12 text-3xl font-bold">Auswahl aus dem Werdegang</h2>
            <p className="text-brand-muted">
              Eine kompakte Auswahl — den vollständigen Lebenslauf gibt es auf Anfrage.
            </p>

            <ol className="mt-6 space-y-6">
              {TIMELINE.map((entry) => (
                <li
                  key={entry.period + entry.company}
                  className="border-l-2 border-brand-accent pl-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                    {entry.period}
                  </p>
                  <p className="mt-1 text-base font-semibold text-brand">
                    {entry.role} · {entry.company}
                  </p>
                  <p className="mt-1 text-sm text-brand-muted">{entry.note}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <div className="card">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                Sprachen
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-brand-ink">
                <li>Deutsch — Muttersprache</li>
                <li>Portugiesisch — Zweitsprache</li>
                <li>Englisch — verhandlungssicher</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                Zertifikate &amp; Ausbildung
              </h3>
              <ul className="mt-3 space-y-3 text-sm">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.title}>
                    <p className="font-semibold text-brand">{c.title}</p>
                    <p className="text-xs text-brand-muted">{c.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Klienten */}
      <section className="bg-white">
        <div className="container-page py-16">
          <h2 className="text-3xl font-bold">Auswahl von Klienten und Projekten</h2>
          <p className="mt-3 max-w-3xl text-base text-brand-muted">
            Für diese Unternehmen habe ich in den letzten 15+ Jahren als Requirements
            Engineer, System Architekt, Projektleiter oder Berater gearbeitet — meist
            in mehrjährigen Mandaten und in Funktionen, die direkten Einfluss auf das
            Endprodukt hatten.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {KEY_CLIENTS.map((c) => (
              <li
                key={c}
                className="rounded-lg border border-brand-line bg-brand-paper px-4 py-3 text-center text-sm font-medium text-brand"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Klingt das nach dem richtigen Sparringspartner für Ihr Vorhaben?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Erstgespräch kostenfrei — 30 Minuten reichen meist, um zu verstehen, ob
            wir zueinander passen.
          </p>
          <Link
            href="/kontakt/"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-dark hover:bg-brand-accent-dark"
          >
            Erstgespräch anfragen
          </Link>
        </div>
      </section>
    </>
  );
}

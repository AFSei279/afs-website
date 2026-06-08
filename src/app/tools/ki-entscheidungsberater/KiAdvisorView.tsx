"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { KiDecisionAdvisor } from "@/components/KiDecisionAdvisor";

const FAQ = [
  {
    q: "Für wen ist dieser Berater gedacht?",
    a: "Für Entscheider, die wissen wollen, ob und wie sich KI im eigenen Unternehmen lohnt — ohne sich vorher in Hardware-Details einarbeiten zu müssen. Sie beantworten vier einfache Fragen und erhalten eine Empfehlung sowie eine ehrliche Kostenrechnung. Wer es technisch genauer mag, findet im Hardware-Rechner die Detailansicht.",
  },
  {
    q: "Warum überhaupt lokale KI statt einfach ChatGPT?",
    a: "Zwei Gründe: Datenschutz und Kosten. Bei lokaler KI verlassen Ihre Daten das Haus nicht — kein US-Cloud-Anbieter im Datenfluss, keine Auftragsverarbeitung mit Drittländern. Und ab einer gewissen Nutzerzahl ist die einmalige Hardware-Investition oft günstiger als ein dauerhaftes Pro-Kopf-Abo. Der Amortisationsrechner zeigt Ihnen, ab wann.",
  },
  {
    q: "Wie realistisch ist die Kostenrechnung?",
    a: "Die Standardwerte sind konservativ und beruhen auf aktuellen Marktpreisen (Stand 2026). ChatGPT Enterprise liegt bei rund 60 $/Nutzer/Monat mit einer Mindestabnahme von 150 Plätzen und Jahresvertrag; Business/Team bei etwa 20–25 $/Nutzer/Monat. Alle Werte — Hardware, Strom, Wartung, Preise — können Sie an Ihre Situation anpassen. Es ist eine Orientierung, kein verbindliches Angebot.",
  },
  {
    q: "Was bedeutet die 150-Plätze-Mindestabnahme bei Enterprise?",
    a: "ChatGPT Enterprise wird nicht pro tatsächlichem Nutzer abgerechnet, sondern verlangt mindestens 150 Plätze im Jahresvertrag. Für ein Unternehmen mit 20 Mitarbeitern heißt das: Sie zahlen trotzdem für 150 Plätze. Genau das macht lokale KI für den Mittelstand oft so attraktiv — der Rechner berücksichtigt diesen Effekt.",
  },
  {
    q: "Bleiben meine Eingaben privat?",
    a: "Ja. Die gesamte Berechnung läuft in Ihrem Browser. Es werden keine Daten an AFS oder Dritte gesendet, solange Sie nicht aktiv eine Beratung anfragen. Erst wenn Sie auf „Angebot & Beratung anfragen“ klicken, wird Ihre Konfiguration für das Kontaktformular übernommen.",
  },
];

export function KiAdvisorView() {
  const [defaultMessage, setDefaultMessage] = useState("");

  function handleRequestConsultation(summary: string) {
    setDefaultMessage(summary);
    setTimeout(() => {
      document.getElementById("lead-anchor")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            AFS Tool · kostenlos
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            KI-Entscheidungsberater
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            In vier einfachen Fragen zur passenden KI-Lösung — ohne Technik-Kauderwelsch.
            Sie erhalten eine konkrete Empfehlung und sehen schwarz auf weiß, ab wann sich
            eine lokale KI gegenüber einem ChatGPT-Abo rechnet.
          </p>
        </div>
      </section>

      {/* Berater */}
      <section className="container-page py-12 md:py-16">
        <KiDecisionAdvisor onRequestConsultation={handleRequestConsultation} />
      </section>

      {/* Warum lokale KI */}
      <section className="bg-white">
        <div className="container-page py-16">
          <h2 className="text-3xl font-bold">Die zwei Hebel: Datenschutz und Kosten</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="text-base font-semibold text-brand">
                Daten bleiben im Haus
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Läuft das Modell auf Ihrer Hardware, verlassen sensible Daten — Personal-,
                Mandanten-, Patienten- oder Vertragsdaten — Ihr Unternehmen nicht. Kein
                Cloud-Anbieter im Datenfluss, keine Auftragsverarbeitung mit Drittländern.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-brand">
                Einmal investieren statt ewig zahlen
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Ein Cloud-Abo kostet jeden Monat, pro Kopf, dauerhaft. Lokale Hardware ist
                eine einmalige Investition. Ab einer gewissen Nutzerzahl oder Laufzeit
                kippt die Rechnung zugunsten lokal — der Rechner zeigt Ihren Break-even.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-brand">
                Firmenwissen für alle
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Mit RAG wird Ihr Wissen — Handbücher, Verträge, Wiki — per KI durchsuchbar
                und beantwortbar. Mitarbeiter bekommen Antworten aus Ihren eigenen
                Dokumenten, nicht aus dem halben Internet.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-brand">
                Keine Abhängigkeit vom Anbieter
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Open-Weight-Modelle (Llama, Qwen, Mistral, DeepSeek) laufen unabhängig von
                Preis- und Funktionsänderungen eines einzelnen Anbieters. Sie behalten die
                Kontrolle über Ihre KI-Infrastruktur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Von der Empfehlung zur Umsetzung */}
      <section className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              Von der Empfehlung zur Umsetzung
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              AFS begleitet Sie vom ersten Klick bis zum laufenden System
            </h2>
            <p className="mt-4 text-base text-brand-muted">
              Der Berater gibt Ihnen die Richtung. Wir setzen sie um — ehrlich
              dimensioniert, DSGVO-konform, in Ihre bestehende IT integriert.
            </p>
          </div>

          <div className="card bg-brand text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              Hinweis
            </p>
            <p className="mt-3 text-sm text-white/85">
              Empfehlung und Kostenrechnung sind eine Orientierung und ersetzen keine
              individuelle Beratung. Der tatsächliche Bedarf hängt von Anwendungsfall,
              Modell, Datenmenge und Performance-Anforderungen ab.
            </p>
            <p className="mt-3 text-sm text-white/85">
              Das Erstgespräch ist kostenfrei.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-page py-16">
          <h2 className="text-3xl font-bold">Häufige Fragen</h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-lg border border-brand-line bg-white p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-brand-ink">
                  {item.q}
                  <span className="ml-4 text-brand transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-brand-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-anchor" className="bg-brand-paper">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold">Beratung & Angebot anfragen</h2>
            <p className="mt-3 text-base text-brand-muted">
              Wenn Sie den Berater durchlaufen haben, ist Ihre Empfehlung samt
              Kostenrechnung unten in der Nachricht bereits eingetragen. Wir antworten
              innerhalb eines Werktags mit einer ehrlichen Einschätzung.
            </p>

            <div className="mt-8">
              <LeadForm formId="ki-entscheidungsberater" defaultMessage={defaultMessage} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

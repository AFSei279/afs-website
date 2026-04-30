"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { HardwareCalculator } from "@/components/HardwareCalculator";

const FAQ = [
  {
    q: "Wie genau ist die Berechnung?",
    a: "Die Logik ist konservativ und liefert eine technische Orientierung — keine Benchmark-Garantie. Der tatsächliche Bedarf hängt vom konkreten Modell (Llama, Qwen, Mistral, DeepSeek), der Inferenz-Software (Ollama, llama.cpp, vLLM) und der Performance-Erwartung ab. Für eine belastbare Aussage führen wir gerne einen kostenlosen Hardware-Check durch.",
  },
  {
    q: "Was ist der Unterschied zwischen RAM und VRAM?",
    a: "RAM ist der Hauptspeicher der CPU. VRAM ist der schnelle Speicher direkt auf der GPU — bei NVIDIA-Karten der harte Engpass für Modellgewichte. Apple Silicon hat Unified Memory: CPU und GPU teilen sich denselben Speicher, daher fragen wir bei Apple nicht separat nach VRAM.",
  },
  {
    q: "Was bedeuten Q4, Q5, Q8 und FP16?",
    a: "Quantisierung reduziert die Genauigkeit der Modellgewichte und damit den Speicherbedarf. Q4 nutzt 4 Bit pro Gewicht (kleinste Variante, ~75 % weniger Speicher als FP16, kaum spürbarer Qualitätsverlust für die meisten Anwendungen). FP16 ist der unkomprimierte Originalzustand. Für produktive Use Cases im Mittelstand reicht Q4 fast immer.",
  },
  {
    q: "Funktioniert lokale KI auch DSGVO-konform?",
    a: "Ja — und das ist der zentrale Vorteil. Wenn das Modell auf Ihrer Hardware läuft, verlassen die Daten Ihr Haus nicht. Es gibt keinen US-Cloud-Anbieter im Datenfluss, keine Teilung mit dem Modell-Provider, keine Auftragsverarbeitungsverträge mit Drittländern. Genau dafür ist lokale KI gemacht.",
  },
  {
    q: "Welche Modelle laufen lokal?",
    a: "Praktisch alle Open-Weight-Modelle: Llama 3.x, Qwen 2.5, Mistral, DeepSeek-R1, Phi, Gemma. Die Auswahl wächst täglich. Für deutschsprachige Anwendungen sind aktuell Qwen 2.5 und Llama 3.x sehr stark.",
  },
  {
    q: "Was kostet ein lokaler KI-Server für die Firma?",
    a: "Sinnvolle Einstiegspunkte beginnen bei ca. 4.000 € (Mac Studio M4 Max, 64 GB) für Einzelnutzung bis zu 25.000–60.000 € für eine Multi-User-Workstation oder einen Server mit RTX 6000 Ada / H100. Wir helfen Ihnen, in der richtigen Klasse einzukaufen — nicht zu groß, aber auch nicht so klein, dass nach 6 Monaten der Wechsel ansteht.",
  },
];

export function HardwareRechnerView() {
  const [defaultMessage, setDefaultMessage] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);

  function handleRequestConsultation(summary: string) {
    setDefaultMessage(summary);
    setShowLeadForm(true);
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
            Lokaler KI-Hardware-Rechner
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Prüfen Sie in unter einer Minute, ob Ihr Mac, PC oder Server für lokale
            KI-Modelle wie Llama, Qwen, Mistral oder DeepSeek geeignet ist. Sie erhalten
            eine Ampelbewertung, den geschätzten Speicherbedarf und eine konkrete
            Hardware-Empfehlung.
          </p>
        </div>
      </section>

      {/* Rechner */}
      <section className="container-page py-12 md:py-16">
        <HardwareCalculator onRequestConsultation={handleRequestConsultation} />
      </section>

      {/* Erklärbereich */}
      <section className="bg-white">
        <div className="container-page py-16">
          <h2 className="text-3xl font-bold">Was Sie wissen sollten</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="text-base font-semibold text-brand">RAM vs. VRAM</h3>
              <p className="mt-2 text-sm text-brand-muted">
                Auf NVIDIA-GPUs ist VRAM der entscheidende Engpass: Was nicht in den
                VRAM passt, muss in den langsameren System-RAM ausweichen — die
                Inferenz wird dann zäh. Apple Silicon umgeht das durch Unified Memory:
                CPU und GPU teilen sich denselben schnellen Speicher.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-brand">Quantisierung</h3>
              <p className="mt-2 text-sm text-brand-muted">
                Quantisierung komprimiert die Modellgewichte. Q4 spart gegenüber FP16
                etwa 75 % Speicher bei kaum spürbarem Qualitätsverlust für die meisten
                Anwendungen. Höhere Quantisierungen (Q5, Q8) liegen dazwischen.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-brand">Kontextlänge</h3>
              <p className="mt-2 text-sm text-brand-muted">
                Je länger das Eingabe-Fenster, desto mehr Speicher braucht der
                KV-Cache. 32k Tokens entsprechen etwa 25–30 Seiten Text und kosten
                deutlich mehr Speicher als ein kurzer Chat.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-brand">
                Mehrere Nutzer gleichzeitig
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Ein Modell, das für einen Nutzer reicht, ist bei 5 gleichzeitigen
                Anfragen schnell überlastet — weil jeder Request einen eigenen
                KV-Cache braucht. Ab 4 Nutzern lohnt sich Server-Hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lokale KI für Unternehmen */}
      <section className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              Lokale KI im Unternehmen
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              AFS bringt das Ergebnis dieses Rechners auf die Straße
            </h2>
            <p className="mt-4 text-base text-brand-muted">
              Der Rechner sagt Ihnen, ob Ihre Hardware reicht. Wir setzen es um:
            </p>
            <ul className="mt-6 space-y-3 text-sm text-brand-ink">
              <li className="flex gap-3">
                <span className="text-brand-accent-dark">✓</span>
                <span>
                  <strong>Hardware-Auswahl</strong> — wir kaufen nicht zu groß und nicht
                  zu klein.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-accent-dark">✓</span>
                <span>
                  <strong>Lokale LLM-Installation</strong> — Ollama, LM Studio, Open
                  WebUI, vLLM, sauber konfiguriert.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-accent-dark">✓</span>
                <span>
                  <strong>RAG mit Unternehmensdaten</strong> — Ihre Dokumente werden
                  durchsuchbar, ohne dass sie das Haus verlassen.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-accent-dark">✓</span>
                <span>
                  <strong>DSGVO-Architektur</strong> — Daten bleiben on-prem, Zugriffe
                  protokolliert, Rollen sauber.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-accent-dark">✓</span>
                <span>
                  <strong>Integration</strong> — in Ihre bestehenden Tools (Microsoft 365,
                  Confluence, ERP, CRM, eigene Apps).
                </span>
              </li>
            </ul>
          </div>

          <div className="card bg-brand text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              Disclaimer
            </p>
            <p className="mt-3 text-sm text-white/85">
              Die Berechnung ist eine technische Orientierung und ersetzt keine
              individuelle Hardware-Planung. Der tatsächliche Bedarf hängt von Modell,
              Software, Betriebssystem, Kontextlänge, Anzahl Nutzer und
              Performance-Anforderungen ab.
            </p>
            <p className="mt-3 text-sm text-white/85">
              Für eine belastbare Empfehlung sprechen Sie mit uns. Das Erstgespräch ist
              kostenfrei.
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
              <details key={item.q} className="group rounded-lg border border-brand-line bg-white p-5">
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-brand-ink">
                  {item.q}
                  <span className="ml-4 text-brand transition group-open:rotate-45">+</span>
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
            <h2 className="text-3xl font-bold">Hardware-Check anfragen</h2>
            <p className="mt-3 text-base text-brand-muted">
              Wenn Sie die Eckdaten Ihrer Konfiguration eingegeben haben, sind sie
              unten in der Nachricht bereits eingetragen. Wir antworten innerhalb eines
              Werktags mit einer ehrlichen Einschätzung.
            </p>

            <div className="mt-8">
              <LeadForm formId="hardware-rechner" defaultMessage={defaultMessage} />
            </div>

            {!showLeadForm && (
              <p className="mt-4 text-xs text-brand-muted">
                Tipp: Wenn Sie oben im Rechner auf <em>Hardware-Check anfragen</em>{" "}
                klicken, wird Ihre Konfiguration automatisch in die Nachricht
                eingetragen.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

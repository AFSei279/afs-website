import Link from "next/link";

export const metadata = {
  title: "Leistungen",
  description:
    "AFS Tech & Assets unterstützt KMU bei der Einführung lokaler KI und entwickelt eigene Apps: Beratung, Hardware-Auswahl, LLM-Installation, RAG, DSGVO-Architektur, Schulung und App-Entwicklung.",
  alternates: { canonical: "/leistungen/" },
};

type Service = {
  id: string;
  title: string;
  intro: string;
  bullets: string[];
  deliverable: string;
  href?: string;
  hrefLabel?: string;
};

const SERVICES: Service[] = [
  {
    id: "beratung",
    title: "Beratung & Use-Case-Analyse",
    intro:
      "Bevor wir über Hardware oder Modelle sprechen, klären wir, ob KI für Ihren Use Case überhaupt das richtige Werkzeug ist — und welcher Use Case zuerst dran sein sollte.",
    bullets: [
      "Ist-Aufnahme: welche Daten gibt es, in welcher Qualität, mit welchem Zugriffsschutz?",
      "Use-Case-Bewertung: welche Anwendungen liefern messbaren Mehrwert, welche sind PR-Theater?",
      "Compliance-Check: DSGVO, Berufsgeheimnisse, branchenspezifische Auflagen.",
      "Roadmap: wo fangen wir an, was kommt danach, was kostet es realistisch?",
    ],
    deliverable:
      "Sie erhalten ein knappes, gut argumentiertes Strategiepapier mit klarer Empfehlung — keine 80-Seiten-Powerpoint.",
  },
  {
    id: "hardware",
    title: "Hardware-Auswahl & Setup",
    intro:
      "Ob ein MacBook reicht oder ob ein Server her muss, lässt sich ohne Use-Case nicht beantworten. Mit Use-Case lässt es sich sehr genau beantworten.",
    bullets: [
      "Bewertung Ihrer vorhandenen Hardware (siehe auch unser kostenloser KI-Hardware-Rechner).",
      "Auswahl der passenden Klasse: Apple Silicon, NVIDIA-Workstation, oder dedizierter Server.",
      "Beschaffungsempfehlung mit Preisspanne, Lieferzeit und Erweiterungsoptionen.",
      "Hardware-Setup vor Ort oder remote, inklusive Konfiguration und Tests.",
    ],
    deliverable:
      "Eine Hardware, die Ihrem Use Case angemessen ist — nicht überdimensioniert, nicht zu klein.",
  },
  {
    id: "installation",
    title: "Lokale LLM-Installation",
    intro:
      "Open-Source-Modelle laufen lokal — das ist die Grundlage. Ob die Installation zuverlässig läuft, hängt an der Software-Schicht und der Konfiguration.",
    bullets: [
      "Inferenz-Stack: Ollama, LM Studio, Open WebUI, vLLM, llama.cpp — wir wählen, was zu Ihrer Hardware und Ihrem Workflow passt.",
      "Modell-Auswahl: Llama, Qwen, Mistral, DeepSeek-R1, Phi, Gemma — passend zur Sprache, Aufgabe und Größe.",
      "Quantisierung und Performance-Tuning, sodass Antwortzeiten alltagstauglich sind.",
      "Update-Strategie: wer aktualisiert was wann, ohne dass alles bricht.",
    ],
    deliverable:
      "Eine produktiv laufende lokale KI mit dokumentierter Konfiguration und einem Wartungs-Playbook.",
  },
  {
    id: "integration",
    title: "RAG mit Unternehmensdaten & Integration",
    intro:
      "Eine lokale KI wird erst dann wertvoll, wenn sie Ihre Unternehmensdaten kennt — Verträge, Prozessdokumentation, technische Spezifikationen, Tickets.",
    bullets: [
      "Retrieval-Augmented Generation auf Ihren Bestandsdaten — ohne dass die Daten Ihr Haus verlassen.",
      "Anbindung an bestehende Quellen: Microsoft 365, Confluence, Fileshares, ERP, CRM, eigene Datenbanken.",
      "Berechtigungsmodell: das Modell sieht nur, was die anfragende Person sehen darf.",
      "API-Anbindung an Ihre Frontend-Tools, sodass die KI dort auftaucht, wo Ihre Teams ohnehin arbeiten.",
    ],
    deliverable:
      "Ein durchsuchbarer, kontextbewusster KI-Assistent, der auf Ihre Realität trainiert ist — und nicht auf das öffentliche Internet.",
  },
  {
    id: "compliance",
    title: "DSGVO-Architektur & Sicherheit",
    intro:
      "Lokale KI ist DSGVO-freundlicher als Cloud-KI — aber nicht automatisch DSGVO-konform. Architektur, Zugriffe und Protokollierung müssen stimmen.",
    bullets: [
      "Daten-Architektur: was bleibt on-prem, was darf nach außen?",
      "Zugriffskonzept (RBAC), Authentifizierung, Audit-Logging.",
      "Verarbeitungsverzeichnis-Beiträge und Datenflussdiagramme.",
      "Hardening nach OWASP-Top-10-Logik (auch für interne Tools).",
    ],
    deliverable:
      "Eine Architektur, die einer DSB- oder Auditor-Prüfung standhält — dokumentiert und nachvollziehbar.",
  },
  {
    id: "schulung",
    title: "Schulung & Coaching",
    intro:
      "Eine Lösung, die nur einer bedient, ist eine Risiko-Lösung. Wir machen Ihre Teams fähig, lokale KI selbst zu pflegen und weiterzuentwickeln.",
    bullets: [
      "Hands-on-Schulungen für IT-Verantwortliche zur Wartung und Erweiterung.",
      "Anwender-Workshops für die Fachabteilungen, die mit der KI arbeiten.",
      "Coaching beim Aufbau interner KI-Kompetenz.",
      "Methodisches Coaching zu Requirements Engineering und Systems Engineering — Hintergrund: 15+ Jahre IREB-zertifiziert.",
    ],
    deliverable:
      "Ein Team, das die KI-Lösung versteht, weiterentwickeln kann und nicht permanent Beraterstunden braucht.",
  },
  {
    id: "app-entwicklung",
    title: "App-Entwicklung",
    intro:
      "Native iOS- und plattformübergreifende Apps — von der Idee über Konzept und Design bis zum App-Store-Launch. Mit Brettany haben wir eine eigene Referenz-App im Store.",
    bullets: [
      "Konzept, UX und klickbarer Prototyp, bevor entwickelt wird.",
      "Native Entwicklung mit Swift / SwiftUI für iPhone und iPad.",
      "Plattformübergreifend mit React Native oder als PWA, wenn sinnvoll.",
      "App-Store-Launch inklusive TestFlight-Beta, Screenshots und Review-Begleitung.",
      "Wartungsoption mit klarer SLA — die App bleibt mit iOS-Updates kompatibel.",
    ],
    deliverable:
      "Eine fertige App im App Store — methodisch entwickelt, sauber dokumentiert und langfristig wartbar.",
    href: "/leistungen/app-entwicklung/",
    hrefLabel: "Beispiel Brettany ansehen",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <section className="bg-brand text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Leistungen
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Von der ersten Frage bis zur produktiv laufenden Lösung
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Wir begleiten den ganzen Weg — und Sie bestimmen, an welchen Punkten Sie
            uns brauchen. Sieben Bereiche von lokaler KI bis zur eigenen App — alle
            mit demselben Anspruch: durchdacht, sauber dokumentiert und in Ihrem
            Haus betreibbar.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="card scroll-mt-24"
            >
              <h2 className="text-xl font-semibold text-brand">{s.title}</h2>
              <p className="mt-3 text-sm text-brand-muted">{s.intro}</p>
              <ul className="mt-4 space-y-2 text-sm text-brand-ink">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand-accent-dark">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-md bg-brand/5 p-3 text-sm text-brand">
                <strong>Ergebnis:</strong> {s.deliverable}
              </div>
              {s.href ? (
                <Link
                  href={s.href}
                  className="mt-5 inline-flex text-sm font-semibold text-brand hover:underline"
                >
                  {s.hrefLabel ?? "Mehr erfahren"} →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-dark text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold">
            Sie wissen noch nicht, an welchem Punkt Sie einsteigen?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Genau dafür gibt es das kostenlose Erstgespräch. 30 Minuten reichen, um
            eine ehrliche Einschätzung zu geben, wo Sie stehen und was sinnvoll wäre.
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

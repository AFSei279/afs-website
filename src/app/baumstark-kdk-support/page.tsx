import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "BAUMSTARK KDK — Support & Hilfe",
  description:
    "Hilfe, Anleitungen und Kontakt zur BAUMSTARK KDK App — dem Trainingsplaner für Kraftdreikampf von AFS Tech & Assets. FAQ, Schritt-für-Schritt-Anleitungen und direkter Support.",
  alternates: { canonical: "/baumstark-kdk-support/" },
};

// TODO ANDRÉ: App-Store-URL ergänzen, sobald die App live ist.
const APP_STORE_URL = "#";

const HOW_TOS = [
  {
    title: "Erste Schritte",
    steps: [
      "App laden und öffnen — keine Registrierung nötig.",
      "Im Tab „Profil“ Bestleistungen, Körpergewicht und Wettkampfstil eintragen.",
      "Beim ersten Start liegt bereits ein Beispielplan bereit; über „Plan → +“ legen Sie einen eigenen an.",
    ],
  },
  {
    title: "Plan erstellen",
    steps: [
      "Im Tab „Plan“ oben rechts auf das Plus-Symbol tippen.",
      "Kategorie wählen: Wettkampfvorbereitung, Aufbau, Regeneration oder Frei.",
      "Bei der Wettkampfvorbereitung das Wettkampfdatum eintragen — der Plan wird passend aufgebaut.",
    ],
  },
  {
    title: "Einheit abarbeiten",
    steps: [
      "Im Tab „Training“ wird die nächste offene Einheit angezeigt.",
      "Satz antippen und tatsächliche Wiederholungen, Gewicht und optional RPE bestätigen.",
      "Der Pausen-Timer startet automatisch; „Einheit beenden“ schließt vorzeitig ab.",
    ],
  },
  {
    title: "Gewichte anpassen",
    steps: [
      "Ändern Sie ein 1RM im Profil, rechnet die App alle Plangewichte neu.",
      "Nach jeder Einheit fragt der Coach bei Abweichungen, ob der Plan leichter oder schwerer werden soll.",
      "Die Anpassung betrifft nur kommende Einheiten und nur die betroffene Übung.",
    ],
  },
];

const FAQS = [
  {
    q: "Was kostet BAUMSTARK KDK?",
    a: "Die App ist kostenlos. Es gibt keine Abos, keine Werbung und keine In-App-Käufe.",
  },
  {
    q: "Brauche ich ein Benutzerkonto?",
    a: "Nein. Die App funktioniert ohne Registrierung und ohne Login. Alle Daten bleiben auf Ihrem Gerät.",
  },
  {
    q: "Werden meine Trainingsdaten in der Cloud gespeichert?",
    a: "Nein. Die App speichert alles lokal auf dem iPhone und stellt keine Netzwerkverbindungen her. Nur wenn Sie iPhone-Backups nutzen, können die Daten Teil dieses Backups bei Apple sein.",
  },
  {
    q: "Wie werden die Trainingsgewichte berechnet?",
    a: "Alle Pläne arbeiten mit Prozentwerten Ihrer Bestleistungen (1RM), das Ergebnis wird auf 2,5 kg gerundet. Das geschätzte 1RM im Trainingslog berechnet die App nach der Epley-Formel.",
  },
  {
    q: "Warum sehe ich andere Assistenzübungen als mein Trainingspartner?",
    a: "Die Assistenz richtet sich nach dem Wettkampfstil: High Bar oder Low Bar bei der Kniebeuge, konventionell oder Sumo beim Kreuzheben. Beides stellen Sie im Profil ein; es gilt für neu erstellte Pläne.",
  },
  {
    q: "Ich habe weniger geschafft als geplant — ist das ein Problem?",
    a: "Nein, tragen Sie einfach die tatsächlichen Werte ein. Am Ende der Einheit schlägt die App von sich aus vor, die kommenden Einheiten für diese Übung um 5 % zu entlasten. Umgekehrt fragt sie bei deutlich mehr Leistung, ob es schwerer werden darf.",
  },
  {
    q: "Kann ich mehrere Pläne parallel führen?",
    a: "Ja. Im Tab „Plan“ wechseln Sie über das Listensymbol zwischen Ihren Plänen, benennen sie um oder löschen sie. Der Fortschritt wird pro Plan gespeichert.",
  },
  {
    q: "Ich habe einen Fehler gefunden — was tun?",
    a: "Schreiben Sie uns kurz mit einer Beschreibung des Problems und idealerweise einem Screenshot. Bitte geben Sie Gerätetyp und iOS-Version an, damit wir das Problem schnell eingrenzen können.",
  },
  {
    q: "Auf welchen Geräten läuft die App?",
    a: "BAUMSTARK KDK ist eine native iOS-App für das iPhone ab iOS 18. Eine iPad- und Android-Version ist derzeit nicht verfügbar.",
  },
];

export default function BaumstarkKdkSupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              BAUMSTARK KDK · Support
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              Hilfe rund um{" "}
              <span className="text-brand-accent">BAUMSTARK KDK</span>.
            </h1>
            <p className="mt-5 text-lg text-white/85">
              Anleitungen, Antworten auf häufige Fragen und ein direkter Draht zu uns —
              damit Sie sich auf das konzentrieren können, was zählt: Kniebeuge,
              Bankdrücken, Kreuzheben.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#anleitungen"
                className="inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
              >
                Anleitungen
              </Link>
              <Link
                href="#faq"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                FAQ
              </Link>
              <Link
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Kontakt
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              <li>✓ Keine Registrierung nötig</li>
              <li>✓ Daten bleiben auf Ihrem Gerät</li>
              <li>✓ Antwort vom Entwickler-Team</li>
            </ul>
          </div>
        </div>
      </section>

      {/* App Store Download */}
      <section className="border-b border-brand-line bg-white">
        <div className="container-page py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                BAUMSTARK KDK laden
              </p>
              <h2 className="mt-1 text-xl font-semibold text-brand">
                Der Trainingsplaner für Kraftdreikampf
              </h2>
              <p className="mt-2 max-w-xl text-sm text-brand-muted">
                Trainingslog, periodisierte Pläne, Pausen-Timer sowie 1RM- und
                Wilks-Rechner — kostenlos, ohne Account und vollständig offline.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={APP_STORE_URL}
                className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Im App Store laden
              </a>
              <Link href="/baumstark-kdk-privacy/" className="btn-secondary">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Anleitungen */}
      <section id="anleitungen" className="scroll-mt-24 container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Anleitungen</h2>
          <p className="mt-4 text-base text-brand-muted">
            Vier kurze How-tos zu den Funktionen, die Sie am häufigsten brauchen —
            vom ersten Start bis zur Anpassung Ihrer Trainingsgewichte.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {HOW_TOS.map((h) => (
            <article key={h.title} className="card">
              <h3 className="text-lg font-semibold text-brand">{h.title}</h3>
              <ol className="mt-3 space-y-2 text-sm text-brand-ink">
                {h.steps.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-semibold text-brand-accent-dark">
                      {i + 1}.
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Häufige Fragen</h2>
            <p className="mt-4 text-base text-brand-muted">
              Die wichtigsten Fragen zur App — kurz und ehrlich beantwortet.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-lg border border-brand-line bg-brand-paper p-5 open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-brand">
                  <span>{f.q}</span>
                  <span className="text-brand-accent transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-brand-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="scroll-mt-24 container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              Direkter Draht
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              BAUMSTARK KDK Support kontaktieren
            </h2>
            <p className="mt-4 text-base text-brand-muted">
              Sie haben einen Fehler entdeckt, eine Funktion vermisst oder eine Frage,
              die hier nicht beantwortet ist? Schreiben Sie uns — wir antworten in der
              Regel innerhalb eines Werktags.
            </p>

            <div className="mt-8">
              <LeadForm
                formId="baumstark-kdk-support"
                defaultMessage={"Gerät: \niOS-Version: \nApp-Version: \n\nBeschreibung:"}
                successMessage="Vielen Dank — wir haben Ihre Support-Anfrage erhalten und melden uns innerhalb eines Werktags."
              />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card">
              <h3 className="text-base font-semibold text-brand">
                Direkt per E-Mail
              </h3>
              <p className="mt-3 text-sm text-brand-muted">
                Sie können uns auch direkt schreiben:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:support@afs-ta.com?subject=BAUMSTARK%20KDK%20Support"
                  className="font-medium text-brand hover:underline"
                >
                  support@afs-ta.com
                </a>
              </p>
            </div>

            <div className="card bg-brand-paper">
              <h3 className="text-base font-semibold text-brand">
                Hilfreich beim Schreiben
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-brand-ink">
                <li>• Gerät (z. B. iPhone 13)</li>
                <li>• iOS-Version</li>
                <li>• App-Version</li>
                <li>• Schritt-für-Schritt-Beschreibung</li>
                <li>• Optional: Screenshot</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-base font-semibold text-brand">Weitere Infos</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/baumstark-kdk-privacy/"
                    className="text-brand hover:underline"
                  >
                    Datenschutzerklärung BAUMSTARK KDK
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leistungen/app-entwicklung/"
                    className="text-brand hover:underline"
                  >
                    Über AFS App-Entwicklung
                  </Link>
                </li>
                <li>
                  <Link href="/impressum/" className="text-brand hover:underline">
                    Impressum
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA / About */}
      <section className="bg-brand-dark text-white">
        <div className="container-page py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            BAUMSTARK KDK wird entwickelt von
          </p>
          <h2 className="mt-2 text-2xl font-bold">{SITE.name}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75">
            Die App entsteht aus der Praxis — entwickelt für die eigene
            Wettkampfvorbereitung im Kraftdreikampf und als Referenz dafür, wie wir
            App-Projekte für unsere Kunden umsetzen.
          </p>
          <Link
            href="/leistungen/app-entwicklung/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
          >
            Mehr über AFS App-Entwicklung
          </Link>
        </div>
      </section>
    </>
  );
}

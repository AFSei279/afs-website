import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Brettany — Support & Hilfe",
  description:
    "Hilfe, Anleitungen und Kontakt zur Brettany App — der iOS-App für Brettspiel-Sammlungen von AFS Tech & Assets. FAQ, Schritt-für-Schritt-Anleitungen und direkter Support.",
  alternates: { canonical: "/brettany-support/" },
};

// TODO ANDRÉ: App-Store-URL ergänzen, sobald die App live ist.
const APP_STORE_URL = "#";

const HOW_TOS = [
  {
    title: "Erste Schritte",
    src: "/leistungen/app-entwicklung/brettany/iphone-launch.png",
    alt: "Brettany Startbildschirm",
    steps: [
      "Brettany aus dem App Store laden und öffnen.",
      "Startbildschirm bestätigt, dass alles bereit ist — keine Registrierung nötig.",
      "Über das Menü direkt zur Sammlung oder zu den Spielergruppen wechseln.",
    ],
  },
  {
    title: "Spiele zur Sammlung hinzufügen",
    src: "/leistungen/app-entwicklung/brettany/iphone-collection.png",
    alt: "Spielesammlung in Brettany",
    steps: [
      "In der Sammlung oben rechts auf das Plus-Symbol tippen.",
      "Spiel manuell anlegen oder per Barcode-Scan erfassen.",
      "Cover, Verlag, Spieleranzahl und Spieldauer ergänzen — fertig.",
    ],
  },
  {
    title: "Neues Spiel anlegen",
    src: "/leistungen/app-entwicklung/brettany/iphone-new-game.png",
    alt: "Eingabemaske für ein neues Spiel",
    steps: [
      "Titel und Verlag eintragen, Spieleranzahl und Spieldauer festlegen.",
      "Optional Barcode scannen, um die Daten automatisch zu übernehmen.",
      "Spiel speichern — es taucht sofort in der Sammlung auf.",
    ],
  },
  {
    title: "Spielergruppen verwalten",
    src: "/leistungen/app-entwicklung/brettany/iphone-group.png",
    alt: "Spielergruppe „Familie Siebenschläfer“",
    steps: [
      "Im Bereich Spielergruppen eine neue Gruppe anlegen, z. B. „Familie“.",
      "Mitglieder hinzufügen — jedes Mitglied kann ein Lieblingsspiel haben.",
      "Beim Erfassen einer Partie die Gruppe auswählen, um die Statistiken sauber zu führen.",
    ],
  },
];

const FAQS = [
  {
    q: "Was kostet Brettany?",
    a: "Die App ist im App Store erhältlich. Den aktuellen Preis sehen Sie direkt im Store. Es gibt keine Abos, keine Werbung und keine versteckten In-App-Käufe.",
  },
  {
    q: "Brauche ich ein Benutzerkonto?",
    a: "Nein. Brettany funktioniert ohne Registrierung und ohne Login. Alle Daten bleiben auf Ihrem Gerät.",
  },
  {
    q: "Werden meine Daten in der Cloud gespeichert?",
    a: "Standardmäßig speichert Brettany alle Daten lokal auf Ihrem iPhone oder iPad. Wenn Sie iCloud-Synchronisation in den iOS-Einstellungen aktiviert haben, kann Apple Ihre Brettany-Daten verschlüsselt zwischen Ihren eigenen Geräten synchronisieren — wir haben darauf keinen Zugriff.",
  },
  {
    q: "Wie funktioniert der Barcode-Scan?",
    a: "Beim Anlegen eines neuen Spiels können Sie über das Kamera-Symbol den Strichcode auf der Spielebox scannen. Brettany verwendet die Kamera ausschließlich für diesen Zweck und sendet keine Bilder an einen Server.",
  },
  {
    q: "Werden Statistiken über alle Nutzer ausgewertet?",
    a: "Nein. Brettany sendet keine Nutzungsdaten an uns. Statistiken werden ausschließlich aus Ihren eigenen Partien-Daten auf Ihrem Gerät berechnet.",
  },
  {
    q: "Ich habe einen Fehler gefunden — was tun?",
    a: "Schreiben Sie uns kurz mit einer Beschreibung des Problems und idealerweise einem Screenshot. Bitte geben Sie Gerätetyp und iOS-Version an, damit wir das Problem schnell eingrenzen können.",
  },
  {
    q: "Kann ich Funktionen vorschlagen?",
    a: "Sehr gerne. Brettany lebt vom Feedback der Community. Nutzen Sie das Kontaktformular weiter unten oder schreiben Sie an support@afs-ta.com.",
  },
  {
    q: "Auf welchen Geräten läuft Brettany?",
    a: "Brettany ist eine native iOS-App und läuft auf iPhone und iPad mit einer aktuellen iOS-Version. Eine Android-Version ist aktuell nicht verfügbar.",
  },
];

export default function BrettanySupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              Brettany · Support
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              Hilfe rund um{" "}
              <span className="text-brand-accent">Brettany</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Anleitungen, Antworten auf häufige Fragen und ein direkter Draht zu uns —
              damit Sie sich auf das konzentrieren können, was zählt: gute Spieleabende.
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

          <div className="hidden md:block">
            <div className="relative ml-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <Image
                src="/leistungen/app-entwicklung/brettany/icon.png"
                alt="Brettany App-Icon"
                width={600}
                height={600}
                className="h-full w-full object-contain p-6"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Übersichts-Banner: alle Kern-Features auf einen Blick */}
      <section className="border-b border-brand-line bg-brand-paper">
        <div className="container-page py-12 md:py-16">
          <Image
            src="/brettany/uebersicht.png"
            alt="Brettany im Überblick: Spielesammlung, Spiel-Details, Partien festhalten, Statistiken und Leistungsvergleich"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="mx-auto h-auto w-full max-w-5xl rounded-2xl shadow-md"
          />
        </div>
      </section>

      {/* App Store Download */}
      <section className="border-b border-brand-line bg-white">
        <div className="container-page py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                Brettany laden
              </p>
              <h2 className="mt-1 text-xl font-semibold text-brand">
                Brettany im App Store
              </h2>
              <p className="mt-2 max-w-xl text-sm text-brand-muted">
                Brettany ist eine native iOS-App für iPhone und iPad. Sie finden die
                aktuelle Version direkt im App Store — ohne Account, ohne Werbung.
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
              <Link
                href="/brettany-privacy/"
                className="btn-secondary"
              >
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
            Vier kurze How-tos zu den Funktionen, die Sie in Brettany am häufigsten
            brauchen — vom ersten Start bis zur Verwaltung Ihrer Spielergruppen.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {HOW_TOS.map((h) => (
            <article
              key={h.title}
              className="card flex gap-5"
            >
              <div className="relative h-48 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-brand-paper">
                <Image
                  src={h.src}
                  alt={h.alt}
                  width={520}
                  height={1100}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
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
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Häufige Fragen
            </h2>
            <p className="mt-4 text-base text-brand-muted">
              Die wichtigsten Fragen zu Brettany — kurz und ehrlich beantwortet.
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
              Brettany Support kontaktieren
            </h2>
            <p className="mt-4 text-base text-brand-muted">
              Sie haben einen Fehler entdeckt, eine Funktion vermisst oder eine Frage,
              die hier nicht beantwortet ist? Schreiben Sie uns — wir antworten in der
              Regel innerhalb eines Werktags.
            </p>

            <div className="mt-8">
              <LeadForm
                formId="brettany-support"
                defaultMessage="Gerät: \niOS-Version: \nBrettany-Version: \n\nBeschreibung:"
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
                  href="mailto:support@afs-ta.com?subject=Brettany%20Support"
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
                <li>• Gerät (z. B. iPhone 15)</li>
                <li>• iOS-Version</li>
                <li>• Brettany-Version (Einstellungen → Info)</li>
                <li>• Schritt-für-Schritt-Beschreibung</li>
                <li>• Optional: Screenshot</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-base font-semibold text-brand">
                Weitere Infos
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/brettany-privacy/"
                    className="text-brand hover:underline"
                  >
                    Datenschutzerklärung Brettany
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
            Brettany wird entwickelt von
          </p>
          <h2 className="mt-2 text-2xl font-bold">{SITE.name}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75">
            Wir entwickeln Brettany aus eigenem Antrieb — als Referenz dafür, wie wir
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

import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "App-Entwicklung",
  description:
    "AFS Tech & Assets entwickelt native iOS- und plattformübergreifende Apps — von der Idee über Konzept und Design bis zum App-Store-Launch. Mit Brettany als praktischem Beispiel aus eigener Hand.",
  alternates: { canonical: "/leistungen/app-entwicklung/" },
};

const LEISTUNGEN = [
  {
    title: "Konzept & UX",
    text: "Wir klären zuerst, was die App können muss und für wen — bevor eine einzige Zeile Code entsteht. Personas, User-Flows, Wireframes, klare Anforderungen.",
  },
  {
    title: "Native iOS (Swift / SwiftUI)",
    text: "Hochwertige iPhone- und iPad-Apps mit aktueller Apple-Technologie. Schnell, akkuschonend, barrierefrei — und konsistent mit dem System-Design.",
  },
  {
    title: "Plattformübergreifend",
    text: "Wenn iOS, Android und Web aus einer Hand sinnvoll sind, setzen wir auf React Native oder eine Web-App als PWA. Sie bekommen die richtige Wahl für Ihren Fall, nicht den Lieblings-Stack des Entwicklers.",
  },
  {
    title: "Backend & Daten",
    text: "Vom lokalen SwiftData-Modell bis zum eigenen API-Backend mit DSGVO-konformer Datenhaltung in der EU. Optional inklusive lokaler KI-Funktionen.",
  },
  {
    title: "App-Store-Launch",
    text: "Wir kümmern uns um App Store Connect, Beta-Tests via TestFlight, Screenshots, Beschreibungen, Datenschutz-Angaben und das Review-Verfahren.",
  },
  {
    title: "Wartung & Weiterentwicklung",
    text: "Eine App ist nie wirklich fertig. Wir pflegen Updates, reagieren auf neue iOS-Versionen und entwickeln Funktionen iterativ auf Basis von Nutzer-Feedback.",
  },
];

const BRETTANY_FEATURES = [
  "Spielesammlung mit Cover, Verlag, Spieleranzahl, Spieldauer und Barcode",
  "Eigene Kategorien zum freien Strukturieren der Sammlung",
  "Spielergruppen und Profile — z. B. „Familie Siebenschläfer“ mit Lieblingsspiel je Person",
  "Partien dokumentieren und auswerten — Statistiken pro Spiel und pro Spielerin",
  "Schneller Erfassungs-Workflow mit Barcode-Scan",
  "Klares, ruhiges Design in den AFS-Markenfarben — vertraut für Apple-Nutzer",
];

const BRETTANY_SCREENS = [
  {
    src: "/leistungen/app-entwicklung/brettany/iphone-launch.png",
    alt: "Brettany Startbildschirm mit App-Icon und Untertitel auf einem iPhone",
    caption: "Startbildschirm",
  },
  {
    src: "/leistungen/app-entwicklung/brettany/iphone-collection.png",
    alt: "Leere Spielesammlung mit Hinweis auf das Plus-Symbol zum Hinzufügen",
    caption: "Spielesammlung",
  },
  {
    src: "/leistungen/app-entwicklung/brettany/iphone-new-game.png",
    alt: "Eingabemaske für ein neues Brettspiel mit Titel, Verlag, Spieleranzahl, Spieldauer und Barcode",
    caption: "Neues Spiel anlegen",
  },
  {
    src: "/leistungen/app-entwicklung/brettany/iphone-group.png",
    alt: "Bearbeiten der Spielergruppe „Familie Siebenschläfer“ mit Mitgliedern und Lieblingsspielen",
    caption: "Spielergruppen verwalten",
  },
];

export default function AppEntwicklungPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              Leistung · App-Entwicklung
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              Apps, die Menschen{" "}
              <span className="text-brand-accent">tatsächlich nutzen</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Vom ersten Konzept bis zum App-Store-Launch — wir entwickeln native iOS-
              und plattformübergreifende Apps mit klarem Fokus, sauberer Architektur und
              einem Design, das sich wie selbstverständlich anfühlt.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt/?thema=App-Entwicklung"
                className="inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
              >
                App-Idee besprechen
              </Link>
              <Link
                href="#brettany"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Beispiel ansehen
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              <li>✓ Native iOS &amp; plattformübergreifend</li>
              <li>✓ EU-Hosting, DSGVO-konform</li>
              <li>✓ Wartbar und transparent dokumentiert</li>
            </ul>
          </div>

          <div className="hidden md:block">
            <div className="relative ml-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <Image
                src="/leistungen/app-entwicklung/brettany/icon.png"
                alt="Brettany App-Icon — eine selbstentwickelte iOS-App von AFS Tech & Assets"
                width={600}
                height={600}
                className="h-full w-full object-contain p-6"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Was wir machen */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Was wir für Sie bauen
          </h2>
          <p className="mt-4 text-base text-brand-muted">
            Wir bauen keine Apps „nebenher". Jede App entsteht im selben methodischen
            Prozess wie unsere KI-Projekte — mit klaren Anforderungen, sauberer
            Architektur und nachvollziehbaren Entscheidungen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LEISTUNGEN.map((l) => (
            <article key={l.title} className="card">
              <h3 className="text-lg font-semibold text-brand">{l.title}</h3>
              <p className="mt-3 text-sm text-brand-muted">{l.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Brettany Case-Study */}
      <section
        id="brettany"
        className="scroll-mt-24 bg-white"
      >
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-brand-line bg-brand-paper shadow-md">
              <Image
                src="/leistungen/app-entwicklung/brettany/icon.png"
                alt="App-Icon von Brettany — Meeple und Würfel auf blauem Hintergrund"
                width={600}
                height={600}
                className="h-full w-full object-contain p-6"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
                Beispiel aus eigener Hand
              </p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                Brettany — das Cockpit für Brettspiel-Sammlungen
              </h2>
              <p className="mt-5 text-base text-brand-ink">
                <strong>Brettany</strong> ist eine native iOS-App, mit der Brettspiel-Fans
                ihre Sammlung erfassen, Spielergruppen verwalten und gespielte Partien
                dokumentieren. Aus den Daten entstehen ganz nebenbei aussagekräftige
                Statistiken — pro Spiel, pro Person, pro Gruppe.
              </p>
              <p className="mt-4 text-base text-brand-muted">
                Die App ist unser eigenes Referenzprojekt: konzipiert, designt und
                entwickelt von AFS Tech &amp; Assets. Sie zeigt, wie wir vorgehen — von der
                ersten Skizze über das Datenmodell bis zur fertigen App im App Store.
              </p>

              <ul className="mt-6 grid gap-2 text-sm text-brand-ink sm:grid-cols-2">
                {BRETTANY_FEATURES.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brand-accent-dark">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 text-xs">
                <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                  Swift &amp; SwiftUI
                </span>
                <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                  SwiftData
                </span>
                <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                  iPhone &amp; iPad
                </span>
                <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                  Barcode-Scanner
                </span>
                <span className="rounded-full bg-brand/5 px-3 py-1 font-medium text-brand">
                  Lokale Statistiken
                </span>
              </div>
            </div>
          </div>

          {/* Screenshot-Galerie */}
          <div className="mt-14">
            <h3 className="text-xl font-semibold text-brand">
              Ein Blick in die App
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-brand-muted">
              Vier Screens aus Brettany — vom Startbildschirm bis zur Verwaltung der
              Spielergruppen.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BRETTANY_SCREENS.map((s) => (
                <figure
                  key={s.src}
                  className="overflow-hidden rounded-xl border border-brand-line bg-brand-paper p-3 shadow-sm"
                >
                  <div className="relative mx-auto aspect-[9/19] w-full max-w-[260px] overflow-hidden rounded-lg bg-white">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={520}
                      height={1100}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm font-medium text-brand">
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vorgehen */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Wie wir vorgehen
          </h2>
          <p className="mt-4 text-base text-brand-muted">
            Vier Phasen, klare Übergaben, planbares Budget. Sie wissen jederzeit, wo wir
            stehen — und was als Nächstes passiert.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              t: "Discovery",
              d: "Workshop, Personas, Use-Cases, Erfolgskriterien, grobe Roadmap. Ergebnis: ein gemeinsames Verständnis, was gebaut wird — und was bewusst nicht.",
            },
            {
              n: "02",
              t: "Design & Prototyp",
              d: "Wireframes, klickbarer Prototyp, finales UI-Design. Ergebnis: eine App, die Sie vor dem Bau anfassen und testen können.",
            },
            {
              n: "03",
              t: "Entwicklung",
              d: "Iterative Sprints mit lauffähigen Builds via TestFlight. Sie sehen wöchentlich Fortschritt — keine Wundertüte am Ende.",
            },
            {
              n: "04",
              t: "Launch & Wartung",
              d: "App-Store-Einreichung, Monitoring, Updates. Optional: Wartungsvertrag mit klarer SLA.",
            },
          ].map((step) => (
            <li
              key={step.n}
              className="card relative"
            >
              <span className="text-3xl font-bold text-brand-accent">{step.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-brand">{step.t}</h3>
              <p className="mt-2 text-sm text-brand-muted">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Sie haben eine App-Idee?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Erzählen Sie uns in 30 Minuten, was Sie vorhaben. Sie bekommen eine ehrliche
            Einschätzung, ob und wie sich die Idee tragen lässt — kostenlos und
            unverbindlich.
          </p>
          <Link
            href="/kontakt/?thema=App-Entwicklung"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-dark shadow-sm transition hover:bg-brand-accent-dark"
          >
            Erstgespräch anfragen
          </Link>
          <p className="mt-4 text-sm text-white/60">
            Oder direkt per Mail an{" "}
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="underline hover:text-white"
            >
              {SITE.contactEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

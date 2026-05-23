import Link from "next/link";

export const metadata = {
  title: "Digitale Produkte",
  description:
    "Praxiswissen zum Mitnehmen: Guides und Tools rund um lokale KI, Hardware-Auswahl und DSGVO-konformen KI-Einsatz im Mittelstand — direkt als Download bei Gumroad.",
  alternates: { canonical: "/produkte/" },
};

type Product = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  format: string;
  href: string;
  price: string;
};

const PRODUCTS: Product[] = [
  {
    id: "lokale-ki-hardware-guide",
    badge: "PDF-Guide",
    title: "Lokale KI: Der Hardware-Guide 2026",
    subtitle: "Die richtige Hardware für Ihre lokale KI — ohne Rätselraten.",
    description:
      "Wer eine KI lokal betreiben will, steht schnell vor der Frage: Welche Hardware brauche ich eigentlich? Dieser Guide beantwortet sie konkret — ohne Marketing-Sprech, dafür mit klaren Empfehlungen für Apple Silicon, NVIDIA-Workstations und dedizierte Server.",
    bullets: [
      "Welche Parameter bei der Hardware-Wahl wirklich zählen (RAM, VRAM, Bandbreite).",
      "Modellklassen und ihre Anforderungen — von 7B bis 70B.",
      "Apple Silicon, NVIDIA-PCs und Server-Setups: Stärken und Grenzen der wichtigsten Plattformen.",
      "Konkrete Kaufempfehlungen mit Preisspannen für KMU-Budgets.",
      "Checkliste: Ist meine vorhandene Hardware KI-tauglich?",
    ],
    format: "PDF · Sofort-Download",
    href: "https://afstechassets.gumroad.com/l/local-ai-hardware-guide",
    price: "Jetzt kaufen",
  },
];

export default function ProduktePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Digitale Produkte
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Praxiswissen als Download
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Kompakte Guides für alle, die lokale KI verstehen und einsetzen wollen —
            ohne Berater-Stunden zu kaufen. Bezahlt und heruntergeladen in unter
            einer Minute über Gumroad.
          </p>
        </div>
      </section>

      {/* Produktkarten */}
      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="card flex flex-col scroll-mt-24"
            >
              {/* Badge */}
              <span className="inline-block self-start rounded-full bg-brand-accent/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                {p.badge}
              </span>

              {/* Titel & Untertitel */}
              <h2 className="mt-3 text-xl font-semibold text-brand">
                {p.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-brand-muted">
                {p.subtitle}
              </p>

              {/* Beschreibung */}
              <p className="mt-4 text-sm text-brand-ink">{p.description}</p>

              {/* Bullets */}
              <ul className="mt-4 space-y-2 text-sm text-brand-ink">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-px shrink-0 text-brand-accent-dark">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Format-Hinweis */}
              <p className="mt-5 text-xs text-brand-muted">{p.format}</p>

              {/* CTA */}
              <div className="mt-auto pt-6">
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  {p.price}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Vertrauenshinweis */}
      <section className="border-t border-brand-line bg-brand/3">
        <div className="container-page py-10 text-center">
          <p className="text-sm text-brand-muted">
            Alle Produkte werden über{" "}
            <Link
              href="https://gumroad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand hover:underline"
            >
              Gumroad
            </Link>{" "}
            verkauft und sind sofort nach dem Kauf als Download verfügbar.
            Fragen?{" "}
            <Link href="/kontakt/" className="font-medium text-brand hover:underline">
              Einfach melden.
            </Link>
          </p>
        </div>
      </section>

      {/* CTA-Sektion */}
      <section className="bg-brand-dark text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold">
            Sie suchen individuelle Unterstützung?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Die Guides geben eine solide Orientierung — aber jedes Unternehmen
            ist anders. Im kostenlosen Erstgespräch schauen wir gemeinsam, was
            konkret für Ihre Situation passt.
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

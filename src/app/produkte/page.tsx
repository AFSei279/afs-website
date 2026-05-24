import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Digitale Produkte",
  description:
    "Praxiswissen zum Mitnehmen: Guides und Tools rund um lokale KI, Hardware-Auswahl und DSGVO-konformen KI-Einsatz im Mittelstand — direkt als Download bei Gumroad.",
  alternates: { canonical: "/produkte/" },
};

type Product = {
  id: string;
  badge: string;
  badgeVariant?: "default" | "bundle";
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  format: string;
  href: string;
  price: string;
  image?: { src: string; alt: string; width: number; height: number };
  highlight?: boolean;
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
    image: {
      src: "/produkte/Lokale_KI_Hardware_Guide_Cover.png",
      alt: "Lokale KI: Der Hardware-Guide 2026 – Cover",
      width: 1672,
      height: 941,
    },
  },
  {
    id: "lokale-ki-setup-playbook",
    badge: "PDF-Guide",
    title: "Lokale KI: Das Setup-Playbook",
    subtitle: "Von der ersten Installation bis zum lokalen KI-Setup.",
    description:
      "Das Playbook zeigt dir Schritt für Schritt, wie du mit LM Studio, Ollama, Open WebUI, lokalen Modellen, Testprompts und ersten RAG-Grundlagen startest.",
    bullets: [
      "LM Studio, Ollama und Open WebUI",
      "Lokale Modelle installieren und testen",
      "10 direkt nutzbare Testprompts",
      "Lokale API- und Automationsgrundlagen",
      "Troubleshooting, 7-Tage-Plan und 30-Tage-Ausbauplan",
    ],
    format: "PDF · Sofort-Download",
    href: "https://afstechassets.gumroad.com/l/local-ai-setup-playbook",
    price: "Jetzt kaufen",
    image: {
      src: "/produkte/Lokale_KI_Das_Setup-Playbook_2026.png",
      alt: "Lokale KI: Das Setup-Playbook 2026 – Cover",
      width: 1672,
      height: 941,
    },
  },
];

const BUNDLE: Product = {
  id: "local-ai-starter-bundle",
  badge: "Bundle",
  badgeVariant: "bundle",
  title: "Local AI Starter Bundle",
  subtitle: "Das komplette Starterpaket für lokale KI: Hardware verstehen, Setup umsetzen und lokale KI sinnvoll starten.",
  description: "",
  bullets: [
    "Hardware-Guide + Setup-Playbook",
    "Mac, PC, Server, RAM, VRAM und Modellgrößen",
    "LM Studio, Ollama, Open WebUI und RAG-Grundlagen",
    "Checklisten, Testprompts und 30-Tage-Plan",
    "Einzeln 88 €, im Bundle 79 €",
  ],
  format: "2 PDFs · Sofort-Download",
  href: "https://afstechassets.gumroad.com/l/local-ai-starter-bundle",
  price: "Bundle kaufen",
  highlight: true,
};

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

      {/* Einzelprodukte */}
      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="card flex flex-col scroll-mt-24 overflow-hidden p-0"
            >
              {/* Produktbild */}
              {p.image && (
                <div className="overflow-hidden">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    width={p.image.width}
                    height={p.image.height}
                    unoptimized
                    className="w-full object-cover"
                  />
                </div>
              )}

              {/* Karteninhalt */}
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block self-start rounded-full bg-brand-accent/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                  {p.badge}
                </span>

                <h2 className="mt-3 text-xl font-semibold text-brand">
                  {p.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-brand-muted">
                  {p.subtitle}
                </p>

                <p className="mt-4 text-sm text-brand-ink">{p.description}</p>

                <ul className="mt-4 space-y-2 text-sm text-brand-ink">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-px shrink-0 text-brand-accent-dark">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs text-brand-muted">{p.format}</p>

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
              </div>
            </article>
          ))}
        </div>

        {/* Bundle-Karte */}
        <div className="mt-8">
          <article
            id={BUNDLE.id}
            className="card scroll-mt-24 overflow-hidden border-2 border-brand-accent p-0"
          >
            {/* Cover-Bild */}
            <div className="max-h-56 overflow-hidden">
              <Image
                src="/produkte/Lokale_KI_Starter_Bundle_2026_Cover_1280x720.png"
                alt="Lokale KI Starter Bundle 2026 – Cover"
                width={1280}
                height={720}
                unoptimized
                className="w-full object-cover object-center"
                priority
              />
            </div>

            {/* Karteninhalt */}
            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start">
              {/* Linke Spalte: Badges + Text */}
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-block rounded-full bg-brand-accent px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                    {BUNDLE.badge}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                    Empfohlen
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-semibold text-brand">
                  {BUNDLE.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-brand-muted">
                  {BUNDLE.subtitle}
                </p>

                <div className="mt-4 space-y-3 text-sm text-brand-ink">
                  <p>Das Bundle kombiniert zwei praxisnahe PDF-Guides:</p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Lokale KI: Der Hardware-Guide 2026</li>
                    <li>Lokale KI: Das Setup-Playbook 2026</li>
                  </ol>
                  <p>
                    Du lernst, welche Hardwareklasse zu deinem Anwendungsfall passt und wie du mit
                    LM Studio, Ollama, Open WebUI und ersten RAG-Grundlagen praktisch loslegst.
                  </p>
                </div>
              </div>

              {/* Rechte Spalte: Thumbnail + Bullets + CTA */}
              <div className="flex flex-1 flex-col">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src="/produkte/Lokale_KI_Starter_Bundle_2026_Thumbnail_600x600.png"
                    alt="Lokale KI Starter Bundle 2026 – Thumbnail"
                    width={600}
                    height={600}
                    unoptimized
                    className="w-full object-cover"
                  />
                </div>

                <ul className="space-y-2 text-sm text-brand-ink">
                  {BUNDLE.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-px shrink-0 text-brand-accent-dark">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs text-brand-muted">{BUNDLE.format}</p>

                <div className="mt-6">
                  <Link
                    href={BUNDLE.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center"
                  >
                    {BUNDLE.price}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Entscheidungshilfe */}
      <section className="border-t border-brand-line bg-brand/3">
        <div className="container-page py-14">
          <h2 className="text-2xl font-bold text-brand">
            Unsicher, welches Produkt zu dir passt?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-brand-line bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                Hardware-Guide
              </p>
              <p className="mt-2 text-sm text-brand-ink">
                Wenn du vor allem wissen möchtest, welche Hardware du brauchst, starte mit dem{" "}
                <strong className="text-brand">Hardware-Guide</strong>.
              </p>
              <Link
                href="https://afstechassets.gumroad.com/l/local-ai-hardware-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
              >
                Zum Hardware-Guide →
              </Link>
            </div>

            <div className="rounded-lg border border-brand-line bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                Setup-Playbook
              </p>
              <p className="mt-2 text-sm text-brand-ink">
                Wenn du bereits Hardware hast und loslegen willst, nimm das{" "}
                <strong className="text-brand">Setup-Playbook</strong>.
              </p>
              <Link
                href="https://afstechassets.gumroad.com/l/local-ai-setup-playbook"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
              >
                Zum Setup-Playbook →
              </Link>
            </div>

            <div className="rounded-lg border border-brand-accent/40 bg-brand-accent/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                Starter Bundle
              </p>
              <p className="mt-2 text-sm text-brand-ink">
                Wenn du lokale KI strukturiert starten möchtest, ist das{" "}
                <strong className="text-brand">Starter Bundle</strong> die beste Wahl.
              </p>
              <Link
                href="https://afstechassets.gumroad.com/l/local-ai-starter-bundle"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
              >
                Zum Starter Bundle →
              </Link>
            </div>

            <div className="rounded-lg border border-brand-line bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
                Beratung
              </p>
              <p className="mt-2 text-sm text-brand-ink">
                Für individuelle Unterstützung bei Hardware-Auswahl, Setup oder RAG
                mit Unternehmensdokumenten kannst du eine{" "}
                <strong className="text-brand">Beratung</strong> bei AFS Tech &amp; Assets GmbH anfragen.
              </p>
              <Link
                href="/kontakt/"
                className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
              >
                Beratung anfragen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vertrauenshinweis */}
      <section className="border-t border-brand-line">
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

import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Kontakt",
  description:
    "Kontakt zur AFS Tech & Assets GmbH — Erstgespräch zum Thema lokale KI im Mittelstand. Antwort innerhalb eines Werktags.",
  alternates: { canonical: "/kontakt/" },
};

export default function KontaktPage() {
  return (
    <>
      <section className="bg-brand text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Kontakt
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Lassen Sie uns kurz sprechen.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Schreiben Sie uns ein paar Sätze, wo Sie stehen — wir antworten innerhalb
            eines Werktags. Das Erstgespräch ist kostenfrei und unverbindlich.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <div>
            <LeadForm formId="kontakt" />
          </div>

          <aside className="space-y-6">
            <div className="card">
              <h2 className="text-base font-semibold text-brand">Direkt erreichen</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-brand-muted">
                    E-Mail (allgemein)
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${SITE.contactEmail}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {SITE.contactEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-brand-muted">
                    E-Mail (Geschäftsführer)
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${SITE.founderEmail}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {SITE.founderEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-brand-muted">
                    Telefon
                  </dt>
                  <dd>
                    <a
                      href={`tel:${SITE.founderPhone.replace(/\s/g, "")}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {SITE.founderPhone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card bg-brand-paper">
              <h2 className="text-base font-semibold text-brand">
                Was Sie erwartet
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-brand-ink">
                <li>• Antwort innerhalb eines Werktags</li>
                <li>• 30-minütiges Erstgespräch, kostenfrei</li>
                <li>• Klare Einschätzung — auch wenn Sie kein Kunde werden</li>
                <li>• Keine Newsletter-Falle, kein Sales-Funnel</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

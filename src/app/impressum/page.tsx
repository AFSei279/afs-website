import { SITE } from "@/lib/site";

export const metadata = {
  title: "Impressum",
  description: "Impressum der AFS Tech & Assets GmbH gemäß § 5 DDG.",
  alternates: { canonical: "/impressum/" },
};

export default function ImpressumPage() {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl space-y-8 text-base text-brand-ink">
        <header>
          <h1 className="text-4xl font-bold">Impressum</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Medienstaatsvertrag
            (MStV).
          </p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-brand">Anbieter</h2>
          <address className="mt-3 not-italic">
            {SITE.name}
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.zip} {SITE.address.city}
            <br />
            {SITE.address.country}
          </address>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">Vertretungsberechtigt</h2>
          <p className="mt-3">
            Geschäftsführer: {SITE.founder.name} (einzelvertretungsberechtigt)
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">Kontakt</h2>
          <p className="mt-3">
            E-Mail:{" "}
            <a className="underline hover:text-brand" href={`mailto:${SITE.contactEmail}`}>
              {SITE.contactEmail}
            </a>
            <br />
            Telefon: {SITE.founderPhone}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">Registereintrag</h2>
          <p className="mt-3">
            {SITE.legal.register}
            <br />
            Registergericht: {SITE.legal.court}
            <br />
            Registernummer: {SITE.legal.registerNumber}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">Umsatzsteuer-ID</h2>
          <p className="mt-3">
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{" "}
            {SITE.legal.vatId}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <address className="mt-3 not-italic">
            {SITE.founder.name}
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.zip} {SITE.address.city}
          </address>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">EU-Streitschlichtung</h2>
          <p className="mt-3 text-sm text-brand-muted">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
            (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              className="underline hover:text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>
            . Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p className="mt-3 text-sm text-brand-muted">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
            einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">Haftung für Inhalte</h2>
          <p className="mt-3 text-sm text-brand-muted">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
            diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
            DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
            forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">Haftung für Links</h2>
          <p className="mt-3 text-sm text-brand-muted">
            Unser Angebot enthält gegebenenfalls Links zu externen Webseiten Dritter,
            auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">Urheberrecht</h2>
          <p className="mt-3 text-sm text-brand-muted">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
            Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung,
            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
            des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
            Autors bzw. Erstellers.
          </p>
        </section>
      </div>
    </section>
  );
}

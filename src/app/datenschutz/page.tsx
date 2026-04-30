import { SITE } from "@/lib/site";

export const metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der AFS Tech & Assets GmbH gemäß DSGVO und BDSG.",
  alternates: { canonical: "/datenschutz/" },
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl space-y-8 text-base text-brand-ink">
        <header>
          <h1 className="text-4xl font-bold">Datenschutzerklärung</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Stand: {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long" })}
          </p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-brand">
            1. Verantwortlicher
          </h2>
          <address className="mt-3 not-italic text-sm">
            {SITE.name}
            <br />
            {SITE.founder.name} (Geschäftsführer)
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.zip} {SITE.address.city}
            <br />
            E-Mail:{" "}
            <a className="underline hover:text-brand" href={`mailto:${SITE.contactEmail}`}>
              {SITE.contactEmail}
            </a>
          </address>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">
            2. Welche Daten wir verarbeiten und warum
          </h2>

          <h3 className="mt-4 text-base font-semibold text-brand-ink">
            2.1 Aufruf der Website (Server-Logs)
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Diese Website wird auf GitHub Pages gehostet. Beim Aufruf werden technisch
            notwendige Verbindungsdaten verarbeitet (IP-Adresse, Datum/Uhrzeit, abgerufene
            Ressource, User-Agent). Diese Verarbeitung erfolgt durch GitHub, Inc., 88
            Colin P. Kelly Jr. St., San Francisco, CA 94107, USA. Rechtsgrundlage ist
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb der Website).
            Weitere Informationen unter{" "}
            <a
              href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
              className="underline hover:text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              docs.github.com (GitHub Privacy Statement)
            </a>
            .
          </p>

          <h3 className="mt-6 text-base font-semibold text-brand-ink">
            2.2 Kontaktformular
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Wenn Sie unser Kontaktformular nutzen, werden die von Ihnen angegebenen
            Daten (Name, E-Mail, Telefon, Unternehmen, Nachricht) zur Bearbeitung Ihrer
            Anfrage verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
            (vorvertragliche Maßnahmen) bzw. lit. f DSGVO (berechtigtes Interesse an
            der Beantwortung von Anfragen). Daten aus dem Kontaktformular speichern wir,
            bis der Zweck der Speicherung entfällt — in der Regel 24 Monate, sofern
            keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
          </p>
          <p className="mt-2 text-sm text-brand-muted">
            {/* TODO ANDRÉ: Bestätigen, welcher Form-Provider tatsächlich genutzt wird */}
            Die technische Übermittlung erfolgt über den Dienst{" "}
            <strong>Web3Forms</strong> (Hostinger Operations, UAB, Litauen). Web3Forms
            empfängt das Formular und leitet die Inhalte per E-Mail an uns weiter. Es
            werden keine Daten dauerhaft auf dem Server gespeichert.
          </p>

          <h3 className="mt-6 text-base font-semibold text-brand-ink">
            2.3 Reichweitenmessung mit Plausible Analytics
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Wir nutzen Plausible Analytics (Plausible Insights OÜ, Tallinn, Estland)
            zur cookie-freien, anonymisierten Reichweitenmessung. Plausible setzt keine
            Cookies und speichert keine personenbezogenen Daten oder IP-Adressen.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
            anonymisierter Statistik). Weitere Informationen unter{" "}
            <a
              href="https://plausible.io/data-policy"
              className="underline hover:text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              plausible.io/data-policy
            </a>
            .
          </p>

          <h3 className="mt-6 text-base font-semibold text-brand-ink">
            2.4 Schriftarten von Google Fonts
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Wir binden die Schriftart <em>Inter</em> lokal über Next.js ein — es findet
            keine Verbindung zu Google-Servern statt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">3. Ihre Rechte</h2>
          <p className="mt-3 text-sm text-brand-muted">
            Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16),
            Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
            Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Sie können
            erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft widerrufen.
            Sie haben außerdem ein Beschwerderecht bei der zuständigen
            Aufsichtsbehörde.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">4. Datensicherheit</h2>
          <p className="mt-3 text-sm text-brand-muted">
            Diese Website nutzt eine TLS-Verschlüsselung. Sie erkennen das am
            Schloss-Symbol in der Adresszeile Ihres Browsers und am Präfix{" "}
            <code>https://</code>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand">
            5. Änderungen dieser Datenschutzerklärung
          </h2>
          <p className="mt-3 text-sm text-brand-muted">
            Wir passen diese Datenschutzerklärung an, wenn sich die Rechtslage oder
            unsere Verarbeitungsprozesse ändern. Es gilt jeweils die aktuelle Version,
            abrufbar unter dieser URL.
          </p>
        </section>

        <p className="rounded-md bg-brand-accent/10 p-4 text-xs text-brand-muted">
          Hinweis: Diese Datenschutzerklärung ist eine Vorlage für den MVP-Stand. Sobald
          Form-Provider, Buchungstool oder weitere Dienste finalisiert sind, sollte sie
          ergänzt und ggf. von einem Fachanwalt geprüft werden — insbesondere wenn Sie
          Auftragsverarbeitungsverträge (AVV) abgeschlossen haben.
        </p>
      </div>
    </section>
  );
}

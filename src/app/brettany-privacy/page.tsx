import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Brettany — Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Brettany App von AFS Tech & Assets. Brettany verarbeitet keine personenbezogenen Daten — alle Inhalte bleiben lokal auf Ihrem Gerät.",
  alternates: { canonical: "/brettany-privacy/" },
};

export default function BrettanyPrivacyPage() {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl space-y-8 text-base text-brand-ink">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
            Brettany · Datenschutz
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Datenschutzerklärung Brettany App
          </h1>
          <p className="mt-3 text-sm text-brand-muted">
            Stand:{" "}
            {new Date().toLocaleDateString("de-DE", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </header>

        <p className="rounded-md border border-brand-line bg-brand-paper p-4 text-sm text-brand-ink">
          <strong>Kurzfassung:</strong> Brettany verarbeitet keine
          personenbezogenen Daten. Alle Inhalte (Spielesammlung, Spielergruppen,
          Partien) werden ausschließlich lokal auf Ihrem Gerät gespeichert. Es
          findet keine Übertragung an uns oder an Dritte statt. Es gibt keine
          Accounts, keine Logins, keinen serverseitigen Datenabruf, keine
          Werbung und kein Tracking.
        </p>

        {/* 1. Verantwortlicher */}
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
            <a
              className="underline hover:text-brand"
              href="mailto:support@afs-ta.com"
            >
              support@afs-ta.com
            </a>
          </address>
        </section>

        {/* 2. Datenverarbeitung in der App */}
        <section>
          <h2 className="text-xl font-semibold text-brand">
            2. Datenverarbeitung in der Brettany App
          </h2>

          <h3 className="mt-4 text-base font-semibold text-brand-ink">
            2.1 Lokal gespeicherte Daten
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Brettany speichert alle von Ihnen eingegebenen Inhalte
            ausschließlich lokal auf Ihrem iPhone oder iPad. Dazu gehören
            insbesondere die von Ihnen erfassten Spiele (Titel, Verlag,
            Spieleranzahl, Spieldauer, Barcode, Cover), Spielergruppen mit
            Mitgliedern und Lieblingsspielen sowie dokumentierte Partien und
            daraus berechnete Statistiken. Diese Daten verlassen Ihr Gerät
            nicht. Wir als Anbieter haben zu keinem Zeitpunkt Zugriff darauf.
          </p>

          <h3 className="mt-6 text-base font-semibold text-brand-ink">
            2.2 Keine Nutzerkonten, keine Anmeldung
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Brettany verlangt keine Registrierung und kein Benutzerkonto. Es
            werden weder Name, E-Mail-Adresse, Telefonnummer noch sonstige
            Identifikatoren von Ihnen erhoben.
          </p>

          <h3 className="mt-6 text-base font-semibold text-brand-ink">
            2.3 Keine Server-Kommunikation
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Brettany kommuniziert im normalen Betrieb nicht mit eigenen Servern
            von AFS Tech &amp; Assets. Es findet keine Übertragung Ihrer Inhalte
            an uns statt. Es werden keine Nutzungsstatistiken, Telemetrie- oder
            Crash-Daten an uns übermittelt.
          </p>

          <h3 className="mt-6 text-base font-semibold text-brand-ink">
            2.4 Kein Tracking, keine Werbung
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Brettany enthält keine Tracking-SDKs, keine Werbe-IDs und keine
            Werbung. Es findet keine Profilbildung statt. Es wird keine
            App-Tracking-Transparency (ATT) Berechtigung angefragt, da keine
            Tracking-Funktionen vorhanden sind.
          </p>
        </section>

        {/* 3. Berechtigungen */}
        <section>
          <h2 className="text-xl font-semibold text-brand">
            3. Verwendete Geräteberechtigungen
          </h2>

          <h3 className="mt-4 text-base font-semibold text-brand-ink">
            3.1 Kamera (Barcode-Scan)
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Beim erstmaligen Nutzen der Barcode-Scan-Funktion fragt Brettany
            über das iOS-System eine Kameraberechtigung an. Die Kamera wird
            ausschließlich verwendet, um den Strichcode einer Spielebox lokal
            auf dem Gerät auszulesen. Es werden keine Fotos gespeichert und
            keine Bilddaten an externe Server übermittelt. Sie können die
            Berechtigung jederzeit unter <em>Einstellungen → Datenschutz &amp;
            Sicherheit → Kamera</em> entziehen.
          </p>

          <h3 className="mt-6 text-base font-semibold text-brand-ink">
            3.2 Fotos (optional)
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Sofern Sie ein eigenes Cover-Foto zu einem Spiel ergänzen möchten,
            kann Brettany auf die Foto-Mediathek zugreifen. Diese Berechtigung
            wird nur bei tatsächlicher Nutzung der Funktion abgefragt und kann
            jederzeit in den iOS-Einstellungen widerrufen werden. Die
            ausgewählten Bilder werden ausschließlich lokal in der App
            gespeichert.
          </p>
        </section>

        {/* 4. iCloud */}
        <section>
          <h2 className="text-xl font-semibold text-brand">
            4. iCloud-Synchronisation (optional)
          </h2>
          <p className="mt-3 text-sm text-brand-muted">
            Wenn Sie auf Ihrem Gerät iCloud aktiviert haben und Brettany in den
            iOS-Einstellungen für iCloud freigegeben ist, kann iOS Ihre
            Brettany-Daten zwischen Ihren eigenen Apple-Geräten verschlüsselt
            synchronisieren. Diese Synchronisation erfolgt direkt zwischen
            Ihren Geräten und Apple, ohne dass wir darauf Zugriff haben oder
            die Inhalte einsehen können. Anbieter dieses Dienstes ist die Apple
            Inc., One Apple Park Way, Cupertino, CA 95014, USA. Weitere
            Informationen finden Sie in der{" "}
            <a
              href="https://www.apple.com/legal/privacy/de-ww/"
              className="underline hover:text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple Datenschutzrichtlinie
            </a>
            . Sie können die iCloud-Synchronisation für Brettany jederzeit
            unter <em>Einstellungen → [Ihr Name] → iCloud</em> deaktivieren.
          </p>
        </section>

        {/* 5. App Store */}
        <section>
          <h2 className="text-xl font-semibold text-brand">
            5. Bereitstellung über den Apple App Store
          </h2>
          <p className="mt-3 text-sm text-brand-muted">
            Brettany wird ausschließlich über den Apple App Store
            bereitgestellt. Beim Laden, Installieren und Aktualisieren der App
            verarbeitet Apple eigenständig Daten (z. B. Apple-ID,
            Download-Zeitpunkt, Gerätedaten). Auf diese Verarbeitung haben wir
            keinen Einfluss. Apple stellt uns als Entwickler im App Store
            Connect ausschließlich aggregierte und anonymisierte
            Statistik-Daten zu Downloads, Abstürzen und allgemeiner Nutzung zur
            Verfügung — und auch das nur, wenn Sie in den iOS-Einstellungen die
            Option <em>Mit App-Entwicklern teilen</em> aktiviert haben. Eine
            Zuordnung zu Ihrer Person ist uns nicht möglich. Verantwortlich für
            diese Datenverarbeitung ist die Apple Distribution International
            Ltd., Hollyhill Industrial Estate, Hollyhill, Cork, Irland. Die
            Datenschutzrichtlinie von Apple finden Sie unter{" "}
            <a
              href="https://www.apple.com/legal/privacy/de-ww/"
              className="underline hover:text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              apple.com/legal/privacy
            </a>
            .
          </p>
        </section>

        {/* 6. Support-Anfragen */}
        <section>
          <h2 className="text-xl font-semibold text-brand">
            6. Support-Anfragen
          </h2>
          <p className="mt-3 text-sm text-brand-muted">
            Wenn Sie uns über das Support-Formular auf{" "}
            <Link
              href="/brettany-support/"
              className="underline hover:text-brand"
            >
              afs-ta.com/brettany-support
            </Link>{" "}
            oder per E-Mail an{" "}
            <a
              href="mailto:support@afs-ta.com"
              className="underline hover:text-brand"
            >
              support@afs-ta.com
            </a>{" "}
            kontaktieren, verarbeiten wir Ihre Angaben (insbesondere Name,
            E-Mail und den Inhalt Ihrer Nachricht) ausschließlich zur
            Bearbeitung Ihrer Anfrage. Die technische Übermittlung des
            Web-Formulars erfolgt über den Dienstleister Web3Forms (Hostinger
            Operations, UAB, Litauen), der die Inhalte per E-Mail an uns
            weiterleitet und keine dauerhafte Speicherung vornimmt.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der Bearbeitung von Support-Anfragen). Wir speichern
            Support-Korrespondenz, bis der Zweck erfüllt ist und keine
            gesetzlichen Aufbewahrungsfristen mehr greifen — in der Regel
            längstens 24 Monate.
          </p>
        </section>

        {/* 7. Rechte */}
        <section>
          <h2 className="text-xl font-semibold text-brand">7. Ihre Rechte</h2>
          <p className="mt-3 text-sm text-brand-muted">
            Sie haben gegenüber uns als Verantwortlichem das Recht auf Auskunft
            (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
            Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit
            (Art. 20) und Widerspruch (Art. 21). Erteilte Einwilligungen können
            Sie jederzeit mit Wirkung für die Zukunft widerrufen. Sie haben
            außerdem ein Beschwerderecht bei der zuständigen Aufsichtsbehörde
            für den Datenschutz. Da Brettany keine personenbezogenen Daten an
            uns überträgt, beziehen sich diese Rechte in der Praxis vor allem
            auf Daten, die Sie uns über das Support-Formular oder per E-Mail
            zur Verfügung gestellt haben.
          </p>
          <p className="mt-3 text-sm text-brand-muted">
            Daten, die ausschließlich lokal in der App auf Ihrem Gerät
            gespeichert sind, können Sie jederzeit selbst löschen — entweder
            einzeln innerhalb der App oder durch Deinstallation von Brettany.
          </p>
        </section>

        {/* 8. Änderungen */}
        <section>
          <h2 className="text-xl font-semibold text-brand">
            8. Änderungen dieser Datenschutzerklärung
          </h2>
          <p className="mt-3 text-sm text-brand-muted">
            Wir passen diese Datenschutzerklärung an, wenn sich die Rechtslage,
            der Funktionsumfang von Brettany oder unsere
            Verarbeitungsprozesse ändern. Es gilt jeweils die aktuelle Version,
            abrufbar unter dieser URL. Wesentliche Änderungen geben wir
            zusätzlich in der App oder im App Store bekannt.
          </p>
        </section>

        <p className="rounded-md bg-brand-accent/10 p-4 text-xs text-brand-muted">
          Hinweis: Diese Datenschutzerklärung ist auf den aktuellen
          Funktionsumfang von Brettany abgestimmt. Sollten in zukünftigen
          Versionen neue Dienste (z. B. Cloud-Konten, eigene Server,
          Analytics-Tools) integriert werden, wird dieser Text rechtzeitig
          aktualisiert. Für eine abschließende rechtliche Prüfung — insbesondere
          bei wesentlichen Funktionsänderungen — empfehlen wir die Beratung
          durch einen Fachanwalt.
        </p>

        <div className="border-t border-brand-line pt-6 text-sm">
          <p className="text-brand-muted">
            Hilfe zur App?{" "}
            <Link href="/brettany-support/" className="font-medium text-brand hover:underline">
              Zum Brettany-Support
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

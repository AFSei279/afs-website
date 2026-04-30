# AFS Tech & Assets — Website

Lead-Gen-Website der AFS Tech & Assets GmbH mit dem MVP-Tool **Lokaler KI-Hardware-Rechner**.

- **Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · statischer Export
- **Hosting:** GitHub Pages auf der Domain `afs-ta.com`
- **Deploy:** Push auf `main` → GitHub Actions baut und veröffentlicht

## Erste Schritte (lokal)

```bash
# 1) Abhängigkeiten installieren
npm install

# 2) Environment-Variablen setzen
cp .env.local.example .env.local
# danach .env.local mit echten Werten füllen

# 3) Dev-Server
npm run dev    # http://localhost:3000
```

## Build und Verifikation

```bash
npm run build
# → erzeugt out/ — das ist, was auf GitHub Pages landet
```

Wenn `npm run build` lokal grün ist, geht der Deploy in der Regel auch durch.

## Was vor dem ersten Deploy noch zu erledigen ist

Siehe Punkt-für-Punkt-Liste in der unten verlinkten **OPEN_ITEMS.md**, oder kurz:

1. Logo nach `public/logo.png` legen (siehe `public/photos/README.md`).
2. Profilfotos in `public/photos/` ablegen (vier Dateinamen, siehe README).
3. Web3Forms-Account anlegen, Access Key in `.env.local` (lokal) und in den GitHub Repository Secrets eintragen.
4. Plausible-Account anlegen (oder `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` leer lassen — dann läuft die Seite ohne Analytics).
5. Impressum vervollständigen (HRB, USt-IdNr., GmbH-Anschrift) — siehe TODOs in `src/app/impressum/page.tsx`.
6. Domain `afs-ta.com` in GitHub Pages konfigurieren (siehe `OPEN_ITEMS.md`).

## Tools & Skill

Die Konventionen für dieses Projekt sind im `afs-website`-Skill dokumentiert (Ordner `website-skill/` bzw. `website-skill.skill`). Er ist die kanonische Quelle für Setup-, Deployment-, Wartungs- und Troubleshooting-Fragen.

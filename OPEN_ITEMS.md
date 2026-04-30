# Offene Punkte vor dem ersten Go-Live

Eine kuratierte Liste, was du noch erledigen musst, damit die Seite live gehen kann. Reihenfolge ist die empfohlene Bearbeitungsreihenfolge.

## 1. Bilder ablegen

In `public/photos/`:

- `andre-portrait.jpg` — Hero-Bild auf der Homepage und der „Über mich"-Seite (das ernste Porträt)
- `andre-portrait-smile.jpg` — Founder-Section auf der Homepage (lächelnd, Brille)
- `andre-portrait-3-quarter.jpg` — optional, aktuell nicht direkt eingebunden
- `andre-portrait-spotlight.jpg` — optional, aktuell nicht direkt eingebunden

Bitte komprimieren auf < 300 KB pro Datei (z. B. via [squoosh.app](https://squoosh.app), JPEG Qualität ~80).

## 2. Logo verschieben

```bash
cd "AFS Website"
mv "AFS_Tech&Assets_Logo.png" public/logo.png
```

(Das Logo liegt aktuell auf der Ebene über dem Projektordner — verschiebe es nach `public/logo.png`, damit es als Navigations-Logo lädt.)

## 3. Lokal installieren und ausprobieren

```bash
cd "AFS Website"
cp .env.local.example .env.local
# .env.local NICHT committen — sie ist gitignored
npm install
npm run dev
# → http://localhost:3000 öffnen
```

Wenn die Seite lokal sauber lädt: `npm run build` ausführen, das muss grün durchlaufen.

## 4. Form-Provider einrichten

**Empfehlung: Web3Forms** (kostenfrei, EU-friendly).

1. Auf [web3forms.com](https://web3forms.com) anmelden mit `kontakt@afs-ta.com`.
2. Du bekommst einen Access Key per E-Mail.
3. In `.env.local`:
   ```
   NEXT_PUBLIC_LEAD_FORM_ENDPOINT=https://api.web3forms.com/submit
   NEXT_PUBLIC_LEAD_FORM_ACCESS_KEY=dein-access-key-hier
   ```
4. Lokal testen: Formular ausfüllen, abschicken, E-Mail prüfen.
5. In GitHub: **Settings → Secrets and variables → Actions**:
   - Repository **Variable** `NEXT_PUBLIC_LEAD_FORM_ENDPOINT` = `https://api.web3forms.com/submit`
   - Repository **Secret** `NEXT_PUBLIC_LEAD_FORM_ACCESS_KEY` = der Access Key

## 5. Plausible einrichten (optional, aber empfohlen)

1. Auf [plausible.io](https://plausible.io) Site `afs-ta.com` anlegen.
2. In GitHub Repository Variable: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `afs-ta.com`.
3. Lokal in `.env.local` denselben Wert setzen.

Wenn die Variable leer bleibt, wird das Plausible-Skript schlicht nicht eingebunden — die Seite läuft normal.

## 6. Impressum vervollständigen

✅ Erledigt — alle Pflichtangaben sind eingetragen (Anschrift Stoke-on-Trent-Straße 1, 91058 Erlangen · HRB 18362 Amtsgericht Fürth · USt-IdNr. DE336045334).

Falls sich später etwas ändert: zentrale Pflege in `src/lib/site.ts`, von dort aus referenzieren Impressum und Datenschutz automatisch.

## 7. Repository auf GitHub anlegen und pushen

```bash
cd "AFS Website"
git init
git add .
git commit -m "initial: AFS website MVP with hardware calculator"

# Auf github.com einen leeren Repo "afs-website" anlegen, dann:
git branch -M main
git remote add origin git@github.com:<dein-user>/afs-website.git
git push -u origin main
```

## 8. GitHub Pages konfigurieren

1. Im Repo: **Settings → Pages → Source: GitHub Actions** (NICHT „Deploy from a branch").
2. Push auf `main` triggert den Workflow `Deploy to GitHub Pages`.
3. Erste Build dauert ~2 Minuten. Im Tab **Actions** verfolgen.
4. Nach erfolgreichem Build: URL erscheint in **Settings → Pages**.

## 9. Custom Domain `afs-ta.com` einrichten

1. Bei deinem DNS-Anbieter (vermutlich IONOS) für die Apex-Domain `afs-ta.com` vier `A`-Records anlegen:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
2. Für `www.afs-ta.com` einen `CNAME`-Record auf `<dein-github-user>.github.io`.
3. In GitHub: **Settings → Pages → Custom domain: `afs-ta.com`**, speichern.
4. Warten, bis das Schloss-Symbol erscheint (5–30 min).
5. **Enforce HTTPS** anhaken.

## 10. Suchmaschinen-Anmeldung

Nach dem ersten erfolgreichen Live-Stand:

1. [Google Search Console](https://search.google.com/search-console) — Property `afs-ta.com` anlegen, via DNS-TXT verifizieren, `https://afs-ta.com/sitemap.xml` einreichen.
2. [Bing Webmaster Tools](https://www.bing.com/webmasters) — analog, kostet 5 Minuten.

---

## Bekannte Einschränkungen / spätere Erweiterungen

Aus dem Briefing zum Hardware-Rechner — das sind die geplanten nächsten Schritte:

- PDF-Export des Ergebnisses
- Hardware-Preisvergleich oder Affiliate-Links
- Eigene Sub-Tools: MacBook KI-Rechner, GPU-VRAM-Rechner, NAS-Speicher-Rechner, Firmen-KI-Server-Rechner
- Lead-Magnet-Checkliste „Lokale KI im Unternehmen einführen"
- Englische Version
- Cal.com-Embed für direkte Buchung (statt nur Lead-Form)

Diese sind nicht im aktuellen Scope, aber alle architektonisch problemlos zu ergänzen.

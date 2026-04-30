# Brettany Screenshots

Lege hier die Bilder zur App-Entwicklungs-Seite ab. Die Seite `src/app/leistungen/app-entwicklung/page.tsx` referenziert exakt diese Dateinamen — bitte 1:1 so benennen:

| Dateiname             | Inhalt                                                              | Empfohlene Größe        |
| --------------------- | ------------------------------------------------------------------- | ----------------------- |
| `icon.png`            | Brettany App-Icon (quadratisch, blau/gold, ohne Rahmen)             | 1024 × 1024 px, < 200 KB |
| `iphone-launch.png`   | iPhone-Mockup mit Startbildschirm (Icon + „Brettany" + Untertitel)  | ca. 540 × 1100 px        |
| `iphone-collection.png` | iPhone-Mockup mit leerer Spielesammlung („Noch keine Spiele")      | ca. 540 × 1100 px        |
| `iphone-new-game.png` | iPhone-Mockup mit Eingabemaske „Neues Spiel"                        | ca. 540 × 1100 px        |
| `iphone-group.png`    | iPhone-Mockup mit „Gruppe bearbeiten" (Familie Siebenschläfer)      | ca. 540 × 1100 px        |

## Tipps

- Komprimieren via [squoosh.app](https://squoosh.app) (PNG mit OxiPNG oder als WebP), Ziel < 250 KB pro Bild.
- iPhone-Mockups sehen am besten im Verhältnis 9:19 aus — entspricht den iPhone 15/16-Modellen.
- Wenn du später eine iPad-Version hinzufügen willst, ergänze `ipad-details.png` (etwa 1200 × 1500 px) und nimm sie in `BRETTANY_SCREENS` in der Page-Datei auf.

## Vorschau

Die Bilder werden so eingebunden:

- `icon.png` erscheint im Hero (rechts neben dem Headline-Text) und in der Brettany-Case-Section (links neben dem Beschreibungstext).
- Die vier `iphone-*.png` werden als Galerie unten in der Case-Study angezeigt — eine 4er-Reihe auf großen Screens, 2er-Reihe auf Tablets, untereinander auf dem Phone.

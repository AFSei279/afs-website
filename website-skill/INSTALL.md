# Skill installieren

Du hast zwei Möglichkeiten, den `afs-website` Skill in Cowork zu nutzen:

## 1. Per `.skill`-Datei installieren (empfohlen)

Im Workspace-Ordner liegt die Datei **`website-skill.skill`** — eine gepackte Version dieses Skills.

So installierst du sie:

1. Cowork öffnen
2. Settings → Skills → "Install from file" (oder vergleichbar)
3. `website-skill.skill` aus dem Workspace-Ordner auswählen
4. Cowork-Session neu starten oder auf "Reload skills" klicken

Danach ist der Skill mit dem Namen `afs-website` verfügbar und triggert automatisch, wenn du etwas zu deiner Website fragst (z. B. *„füge eine neue Service-Seite hinzu"*).

## 2. Skill-Quellen direkt nutzen

Auch ohne Installation kann ich (Claude) in zukünftigen Sessions auf diesen Ordner zugreifen, weil er in deinem Workspace liegt. Du kannst dann einfach sagen:

> *„Lies die SKILL.md im Ordner `website-skill` und arbeite danach."*

Das funktioniert sofort, ist aber etwas weniger automatisch — der Skill wird nicht ohne Aufforderung aktiv.

## Skill aktualisieren

Wenn sich später etwas an deinem Setup ändert (anderer Form-Provider, neuer Hoster, neue Konventionen), bearbeite einfach die Dateien in `website-skill/` und sag mir, dass ich die `.skill`-Datei neu packen soll.

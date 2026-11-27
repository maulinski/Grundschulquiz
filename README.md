# Grundschulquiz

Multiple-Choice-Quiz für Grundschüler mit Profilen, Erfolgen und separater Prüfungsvorbereitung.

## Betrieb

Statische Website auf GitHub Pages, ohne Build-Schritt. Als Online-Web-App über Safari zum Home-Bildschirm hinzufügbar. Keine Offline-Unterstützung.

## Dateien

- `index.html`: Oberfläche und Einbindung der Skripte und Stylesheets.
- `script.js`: normales Quiz, Profile, Erfolge und Synchronisierung.
- `exam-quiz.js`: Prüfungsvorbereitung ohne Speicherung der Ergebnisse.
- `achievement-presentation.js`: Ergebnisdarstellung der Erfolge.
- `questions.js` / `Pruefungsfragen.js`: Fragenpools.
- `manifest.json`, `pwa.js`, `service-worker.js`, Icons: Web-App.

## JSONbin

Profile werden gemeinsam in einem Bin mit dem Format `{ "profiles": [] }` gespeichert. Die aktuelle Konfiguration verbindet neue Geräte automatisch; der Schlüssel wird im lokalen Browserspeicher gespeichert. Ein eingeschränkter Access Key sollte ausschließlich die nötigen Rechte besitzen. Ein im öffentlichen Frontend hinterlegter Schlüssel ist für Dritte lesbar; keinen Master Key verwenden. Bei gleichzeitigen Änderungen auf mehreren Geräten können sich Speicherungen überschreiben. Ein leerer Bin kann beim Verbinden aus lokalen Profilen initialisiert werden.

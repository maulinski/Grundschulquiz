# Grundschulquiz
Ein Multiple Choice Quiz zur Allgemeinbildung für Grundschüler. Die Fragen stammen aus allen möglichen Kategorien.

## JSONbin-Synchronisierung einrichten

Die App kann Profile und Statistiken über einen gemeinsamen JSONbin-Bin auf mehreren Geräten verwenden.

1. Lege in JSONbin einen Bin mit folgendem JSON an:
   ```json
   { "profiles": [] }
   ```
2. Erstelle für diesen Bin einen **eingeschränkten Access Key** mit Lese- und Änderungsrechten. Verwende nicht den Master Key.
3. Öffne die Quiz-Seite auf jedem Gerät und gib den Access Key einmal in „Geräte-Synchronisierung“ ein. Er wird nur im lokalen Speicher dieses Browsers abgelegt, nicht im Repository. Auf einem neuen Browser beziehungsweise Gerät muss er einmal eingegeben werden.
4. Wenn der Bin beim ersten Verbinden leer ist, werden eventuell bereits lokale Profile dieses Geräts in den Bin übernommen. Danach werden Profile und Statistiken aus dem gemeinsamen Bin geladen.

Die Bin-ID steht in `script.js`. Der Schlüssel wird absichtlich nicht in den Quellcode geschrieben. Dieses Repository und GitHub-Pages-Webseiten können öffentlich eingesehen werden; jeder im Frontend fest eingebaute Schlüssel wäre damit auslesbar. Auch ein im Browser gespeicherter Access Key ist für Nutzer dieses Browsers zugänglich. Beschränke ihn daher auf den einen Bin und rotiere ihn, falls er versehentlich veröffentlicht wurde.

Die Synchronisierung liest vor Änderungen den aktuellen Bin und schreibt anschließend den vollständigen Profilbestand zurück. Bei exakt gleichzeitigen Änderungen auf mehreren Geräten kann die zuletzt abgeschlossene Speicherung frühere Änderungen überschreiben. Für den privaten Einsatz ist das meist akzeptabel; verwende die App möglichst online und synchronisiere vor einem Profilwechsel.

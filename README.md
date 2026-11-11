# Grundschulquiz
Ein Multiple Choice Quiz zur Allgemeinbildung für Grundschüler. Die Fragen stammen aus allen möglichen Kategorien.

## JSONbin-Synchronisierung

Die Profile und Statistiken werden über den gemeinsamen JSONbin-Bin synchronisiert. Die Bedienelemente befinden sich einzeilig am unteren Bildschirmrand. Den JSONbin Access Key einmal pro Gerät in das Feld eintragen und **Verbinden** wählen; über **Synchronisieren** lassen sich die Daten später erneut laden.

Verwende einen eingeschränkten Access Key mit Lese- und Änderungsrechten für den Quiz-Bin, keinen Master Key. Die App speichert ihn im lokalen Browserspeicher. Da dieses Repository öffentlich ist, wird der Schlüssel nicht in den Quellcode geschrieben. Auf einem neuen Browser/Gerät muss der Key einmal eingegeben werden.

Der Bin muss das Format `{ "profiles": [] }` verwenden. Wenn er leer ist, importiert die App vorhandene lokale Profile vom Gerät, das zuerst verbindet. Bei gleichzeitigen Änderungen von mehreren Geräten kann eine Speicherung die andere überschreiben.

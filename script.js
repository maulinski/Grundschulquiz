const QUESTIONS_PER_ROUND = 10;

const STORAGE_KEY = "grundschulquiz-profile";

const questionPool = [
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Deutschland?", answers: ["Berlin", "Paris", "Rom", "Madrid"], correct: 0 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Frankreich?", answers: ["Berlin", "Paris", "Rom", "London"], correct: 1 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Italien?", answers: ["Wien", "Mailand", "Rom", "München"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Spanien?", answers: ["Barcelona", "Madrid", "Valencia", "Sevilla"], correct: 1 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Portugal?", answers: ["Lissabon", "Porto", "Coimbra", "Faro"], correct: 0 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt des Vereinigten Königreichs?", answers: ["Manchester", "Birmingham", "London", "Leeds"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Irland?", answers: ["Galway", "Cork", "Dublin", "Limerick"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Belgien?", answers: ["Antwerpen", "Brüssel", "Gent", "Charleroi"], correct: 1 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt der Niederlande?", answers: ["Rotterdam", "Den Haag", "Utrecht", "Amsterdam"], correct: 3 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Dänemark?", answers: ["Aarhus", "Odense", "Kopenhagen", "Aalborg"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Norwegen?", answers: ["Bergen", "Trondheim", "Oslo", "Stavanger"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Schweden?", answers: ["Göteborg", "Malmö", "Stockholm", "Uppsala"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Finnland?", answers: ["Turku", "Tampere", "Helsinki", "Lahti"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Polen?", answers: ["Krakau", "Warschau", "Gdańsk", "Posen"], correct: 1 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Tschechien?", answers: ["Ostrava", "Brünn", "Prag", "Liberec"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Österreich?", answers: ["Salzburg", "Innsbruck", "Wien", "Graz"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt der Schweiz?", answers: ["Zürich", "Genf", "Bern", "Basel"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Griechenland?", answers: ["Thessaloniki", "Patras", "Athen", "Iraklio"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Japan?", answers: ["Kyoto", "Osaka", "Tokio", "Sapporo"], correct: 2 },
  { category: "Geografie", question: "Wie heißt die Hauptstadt von Australien?", answers: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Hund?", answers: ["Säugetier", "Vogel", "Reptil", "Fisch"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Adler?", answers: ["Vogel", "Säugetier", "Fisch", "Amphibie"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört die Schildkröte?", answers: ["Reptil", "Vogel", "Säugetier", "Amphibie"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört die Forelle?", answers: ["Fisch", "Säugetier", "Reptil", "Vogel"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Frosch?", answers: ["Amphibie", "Fisch", "Vogel", "Säugetier"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört die Katze?", answers: ["Säugetier", "Insekt", "Vogel", "Amphibie"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Pinguin?", answers: ["Vogel", "Reptil", "Säugetier", "Fisch"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört die Eidechse?", answers: ["Reptil", "Vogel", "Säugetier", "Fisch"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Hai?", answers: ["Fisch", "Reptil", "Amphibie", "Vogel"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Salamander?", answers: ["Amphibie", "Fisch", "Reptil", "Vogel"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Wal?", answers: ["Säugetier", "Fisch", "Vogel", "Reptil"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört die Eule?", answers: ["Vogel", "Säugetier", "Insekt", "Amphibie"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört das Krokodil?", answers: ["Reptil", "Vogel", "Fisch", "Säugetier"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Lachs?", answers: ["Fisch", "Vogel", "Reptil", "Säugetier"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört die Kröte?", answers: ["Amphibie", "Insekt", "Säugetier", "Fisch"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Elefant?", answers: ["Säugetier", "Vogel", "Reptil", "Fisch"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört die Amsel?", answers: ["Vogel", "Säugetier", "Fisch", "Insekt"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört die Schlange?", answers: ["Reptil", "Vogel", "Fisch", "Insekt"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Karpfen?", answers: ["Fisch", "Insekt", "Vogel", "Reptil"], correct: 0 },
  { category: "Tiere", question: "Zu welcher Tiergruppe gehört der Molch?", answers: ["Amphibie", "Vogel", "Fisch", "Säugetier"], correct: 0 },
  { category: "Körper", question: "Womit sehen wir?", answers: ["Augen", "Ohren", "Nase", "Zunge"], correct: 0 },
  { category: "Körper", question: "Womit hören wir?", answers: ["Ohren", "Augen", "Hände", "Füße"], correct: 0 },
  { category: "Körper", question: "Womit riechen wir?", answers: ["Nase", "Zunge", "Augen", "Ohren"], correct: 0 },
  { category: "Körper", question: "Womit schmecken wir?", answers: ["Zunge", "Nase", "Hände", "Ohren"], correct: 0 },
  { category: "Körper", question: "Womit greifen wir?", answers: ["Hände", "Füße", "Ohren", "Nase"], correct: 0 },
  { category: "Körper", question: "Womit laufen wir?", answers: ["Füße", "Hände", "Ohren", "Nase"], correct: 0 },
  { category: "Körper", question: "Welches Organ pumpt Blut durch den Körper?", answers: ["Herz", "Lunge", "Leber", "Magen"], correct: 0 },
  { category: "Körper", question: "Mit welchem Organ atmen wir?", answers: ["Lunge", "Herz", "Niere", "Magen"], correct: 0 },
  { category: "Körper", question: "Welcher Teil schützt das Gehirn?", answers: ["Schädel", "Rippen", "Knöchel", "Zunge"], correct: 0 },
  { category: "Körper", question: "Was verbindet den Oberarm mit dem Unterarm?", answers: ["Ellenbogen", "Knöchel", "Knie", "Schulter"], correct: 0 },
  { category: "Körper", question: "Was verbindet den Fuß mit dem Bein?", answers: ["Knöchel", "Ellenbogen", "Hals", "Rücken"], correct: 0 },
  { category: "Körper", question: "Was hält unseren Körper aufrecht?", answers: ["Wirbelsäule", "Magen", "Lunge", "Herz"], correct: 0 },
  { category: "Körper", question: "Womit kauen wir Essen?", answers: ["Zähne", "Ohren", "Füße", "Augen"], correct: 0 },
  { category: "Körper", question: "Welche Gelenke beugen das Bein?", answers: ["Knie", "Ellenbogen", "Knöchel", "Hals"], correct: 0 },
  { category: "Körper", question: "Wie heißt der bewegliche Teil zwischen Kopf und Körper?", answers: ["Hals", "Knöchel", "Schulter", "Knie"], correct: 0 },
  { category: "Körper", question: "Was wächst auf dem Kopf?", answers: ["Haare", "Fingernägel", "Zähne", "Bauch"], correct: 0 },
  { category: "Körper", question: "Wie heißt die Vorderseite des Unterschenkels?", answers: ["Schienbein", "Arm", "Knie", "Hals"], correct: 0 },
  { category: "Körper", question: "Welche Körperteile haben Finger- und Fußnägel?", answers: ["Finger und Zehen", "Ohren und Nase", "Hände und Füße", "Augen und Ohren"], correct: 0 },
  { category: "Körper", question: "Welcher Muskel hilft beim Beugen des Arms?", answers: ["Bizeps", "Trizeps", "Wadenmuskel", "Brustmuskel"], correct: 0 },
  { category: "Körper", question: "Was schützt die Augen vor Schweiß?", answers: ["Augenbrauen", "Lippen", "Zähne", "Ohren"], correct: 0 },
  { category: "Natur", question: "Was brauchen Pflanzen als Lichtquelle zum Wachsen?", answers: ["Sonnenlicht", "Schokolade", "Sand", "Wasserflasche"], correct: 0 },
  { category: "Natur", question: "Was nehmen Pflanzen über ihre Wurzeln auf?", answers: ["Wasser", "Kohle", "Steine", "Luft"], correct: 0 },
  { category: "Natur", question: "Welcher Pflanzenteil nimmt Wasser aus dem Boden auf?", answers: ["Wurzel", "Blatt", "Blüte", "Stamm"], correct: 0 },
  { category: "Natur", question: "Welcher Pflanzenteil ist oft grün und fängt Licht ein?", answers: ["Blatt", "Wurzel", "Blüte", "Stamm"], correct: 0 },
  { category: "Natur", question: "Wie heißt der Vorgang, bei dem Pflanzen Licht nutzen und Nahrung herstellen?", answers: ["Fotosynthese", "Atmung", "Verdauung", "Regen"], correct: 0 },
  { category: "Natur", question: "In welcher Jahreszeit fallen viele Blätter von den Bäumen?", answers: ["Herbst", "Frühling", "Sommer", "Winter"], correct: 0 },
  { category: "Natur", question: "Welche Jahreszeit kommt nach dem Winter?", answers: ["Frühling", "Herbst", "Sommer", "Winter"], correct: 0 },
  { category: "Natur", question: "Wie nennt man gefrorenes Wasser?", answers: ["Eis", "Regen", "Wolke", "Dampf"], correct: 0 },
  { category: "Natur", question: "Wie heißt Wasser, das als Gas in der Luft ist?", answers: ["Wasserdampf", "Eis", "Schnee", "Regen"], correct: 0 },
  { category: "Natur", question: "Wie nennt man Wasser, das vom Himmel fällt?", answers: ["Regen", "Sonne", "Dampf", "Mond"], correct: 0 },
  { category: "Natur", question: "Was zeigt ein Thermometer an?", answers: ["Temperatur", "Lautstärke", "Kraft", "Zeit"], correct: 0 },
  { category: "Natur", question: "Welches Himmelsobjekt spendet der Erde Licht und Wärme?", answers: ["Sonne", "Mond", "Planet", "Stern"], correct: 0 },
  { category: "Natur", question: "Wie heißt der natürliche Begleiter der Erde?", answers: ["Mond", "Sonne", "Planet", "Komet"], correct: 0 },
  { category: "Natur", question: "Welches Tier baut oft einen Damm im Fluss?", answers: ["Biber", "Hase", "Fuchs", "Löwe"], correct: 0 },
  { category: "Natur", question: "Was entsteht, wenn Wassertröpfchen hoch oben in der Luft schweben?", answers: ["Wolke", "Eis", "Regen", "Sand"], correct: 0 },
  { category: "Natur", question: "Wie nennt man geschmolzenes Gestein, das aus einem Vulkan fließt?", answers: ["Lava", "Kies", "Schnee", "Wasser"], correct: 0 },
  { category: "Natur", question: "Was brauchen Menschen und Tiere zum Atmen?", answers: ["Sauerstoff", "Wasser", "Kohle", "Zucker"], correct: 0 },
  { category: "Natur", question: "Wie nennt man eine große Fläche mit vielen Bäumen?", answers: ["Wald", "Stein", "Meer", "Wiese"], correct: 0 },
  { category: "Natur", question: "Was fällt im Winter manchmal als weiße Flocken vom Himmel?", answers: ["Schnee", "Sand", "Asche", "Pappe"], correct: 0 },
  { category: "Natur", question: "Wie nennt man einen starken Wirbelsturm, der über Land zieht?", answers: ["Tornado", "See", "Berg", "Wald"], correct: 0 },
  { category: "Weltwissen", question: "Wie viele Tage hat eine Woche?", answers: ["Sieben", "Sechs", "Fünf", "Acht"], correct: 0 },
  { category: "Weltwissen", question: "Wie viele Monate hat ein Jahr?", answers: ["Zwölf", "Ten", "Acht", "Sechs"], correct: 0 },
  { category: "Weltwissen", question: "Wie viele Minuten hat eine Stunde?", answers: ["60", "50", "70", "80"], correct: 0 },
  { category: "Weltwissen", question: "Wie viele Stunden hat ein Tag?", answers: ["24", "12", "18", "20"], correct: 0 },
  { category: "Weltwissen", question: "Auf welchem Planeten leben wir?", answers: ["Erde", "Mars", "Jupiter", "Venus"], correct: 0 },
  { category: "Weltwissen", question: "Welcher Planet ist als roter Planet bekannt?", answers: ["Mars", "Erde", "Merkur", "Neptun"], correct: 0 },
  { category: "Weltwissen", question: "Wie viele Ecken hat ein Dreieck?", answers: ["Drei", "Zwei", "Vier", "Fünf"], correct: 0 },
  { category: "Weltwissen", question: "Wie viele Seiten hat ein Würfel?", answers: ["Sechs", "Drei", "Fünf", "Acht"], correct: 0 },
  { category: "Weltwissen", question: "Welche Farbe entsteht, wenn man Blau und Gelb mischt?", answers: ["Grün", "Rot", "Blau", "Orange"], correct: 0 },
  { category: "Weltwissen", question: "Welche Farbe hat ein Rubin meistens?", answers: ["Rot", "Blau", "Grün", "Gelb"], correct: 0 },
  { category: "Weltwissen", question: "Welche Sprache wird hauptsächlich in Deutschland gesprochen?", answers: ["Deutsch", "Französisch", "Englisch", "Spanisch"], correct: 0 },
  { category: "Weltwissen", question: "Wie viele Beine hat eine Spinne?", answers: ["Acht", "Sechs", "Vier", "Zehn"], correct: 0 },
  { category: "Weltwissen", question: "Wie viele Beine hat ein Insekt?", answers: ["Sechs", "Acht", "Zwei", "Vier"], correct: 0 },
  { category: "Weltwissen", question: "Welches Verkehrsmittel fährt auf Schienen?", answers: ["Zug", "Auto", "Boot", "Flugzeug"], correct: 0 },
  { category: "Weltwissen", question: "Welches Gerät zeigt die Uhrzeit an?", answers: ["Uhr", "Lampe", "Tisch", "Stuhl"], correct: 0 },
  { category: "Weltwissen", question: "Wie heißt das Märchenmädchen mit dem gläsernen Schuh?", answers: ["Aschenputtel", "Rotkäppchen", "Schneewittchen", "Rapunzel"], correct: 0 },
  { category: "Weltwissen", question: "Welcher Stern steht unserer Erde am nächsten?", answers: ["Sonne", "Mond", "Mars", "Jupiter"], correct: 0 },
  { category: "Weltwissen", question: "Wie nennt man ein Jungtier vom Hund?", answers: ["Welpe", "Küken", "Kalb", "Ferkel"], correct: 0 },
  { category: "Weltwissen", question: "Was zeigt ein Kompass an?", answers: ["Himmelsrichtungen", "Zahlen", "Farben", "Wetter"], correct: 0 },
  { category: "Mathematik", question: "Was ist 3 + 4?", answers: ["7", "6", "8", "5"], correct: 0 },
  { category: "Mathematik", question: "Was ist 8 + 7?", answers: ["15", "13", "14", "16"], correct: 0 },
  { category: "Mathematik", question: "Was ist 9 + 5?", answers: ["14", "12", "15", "13"], correct: 0 },
  { category: "Mathematik", question: "Was ist 6 + 9?", answers: ["15", "16", "14", "13"], correct: 0 },
  { category: "Mathematik", question: "Was ist 12 + 8?", answers: ["20", "18", "22", "19"], correct: 0 },
  { category: "Mathematik", question: "Was ist 15 + 6?", answers: ["21", "20", "22", "19"], correct: 0 },
  { category: "Mathematik", question: "Was ist 7 + 9?", answers: ["16", "15", "17", "14"], correct: 0 },
  { category: "Mathematik", question: "Was ist 11 + 4?", answers: ["15", "14", "16", "13"], correct: 0 },
  { category: "Mathematik", question: "Was ist 10 + 10?", answers: ["20", "18", "19", "21"], correct: 0 },
  { category: "Mathematik", question: "Was ist 13 + 7?", answers: ["20", "18", "21", "17"], correct: 0 },
  { category: "Mathematik", question: "Was ist 18 − 5?", answers: ["13", "12", "14", "11"], correct: 0 },
  { category: "Mathematik", question: "Was ist 16 − 9?", answers: ["7", "6", "8", "9"], correct: 0 },
  { category: "Mathematik", question: "Was ist 20 − 6?", answers: ["14", "13", "15", "12"], correct: 0 },
  { category: "Mathematik", question: "Was ist 25 − 8?", answers: ["17", "16", "18", "15"], correct: 0 },
  { category: "Mathematik", question: "Was ist 30 − 12?", answers: ["18", "17", "16", "19"], correct: 0 },
  { category: "Mathematik", question: "Was ist 14 − 7?", answers: ["7", "6", "8", "5"], correct: 0 },
  { category: "Mathematik", question: "Was ist 21 − 3?", answers: ["18", "17", "19", "16"], correct: 0 },
  { category: "Mathematik", question: "Was ist 17 − 9?", answers: ["8", "7", "9", "10"], correct: 0 },
  { category: "Mathematik", question: "Was ist 24 − 6?", answers: ["18", "17", "19", "16"], correct: 0 },
  { category: "Mathematik", question: "Was ist 27 − 9?", answers: ["18", "17", "19", "16"], correct: 0 },
  { category: "Mathematik", question: "Was ist 4 × 3?", answers: ["12", "9", "10", "14"], correct: 0 },
  { category: "Mathematik", question: "Was ist 6 × 3?", answers: ["18", "16", "15", "20"], correct: 0 },
  { category: "Mathematik", question: "Was ist 7 × 2?", answers: ["14", "12", "16", "13"], correct: 0 },
  { category: "Mathematik", question: "Was ist 5 × 5?", answers: ["25", "20", "24", "30"], correct: 0 },
  { category: "Mathematik", question: "Was ist 8 × 4?", answers: ["32", "28", "30", "34"], correct: 0 },
  { category: "Mathematik", question: "Was ist 9 × 2?", answers: ["18", "17", "16", "20"], correct: 0 },
  { category: "Mathematik", question: "Was ist 6 × 4?", answers: ["24", "22", "20", "26"], correct: 0 },
  { category: "Mathematik", question: "Was ist 3 × 7?", answers: ["21", "18", "24", "20"], correct: 0 },
  { category: "Mathematik", question: "Was ist 9 × 3?", answers: ["27", "24", "26", "28"], correct: 0 },
  { category: "Mathematik", question: "Was ist 8 × 5?", answers: ["40", "35", "36", "38"], correct: 0 },
  { category: "Mathematik", question: "Was ist 12 ÷ 3?", answers: ["4", "3", "5", "6"], correct: 0 },
  { category: "Mathematik", question: "Was ist 18 ÷ 3?", answers: ["6", "5", "7", "8"], correct: 0 },
  { category: "Mathematik", question: "Was ist 20 ÷ 4?", answers: ["5", "4", "6", "7"], correct: 0 },
  { category: "Mathematik", question: "Was ist 24 ÷ 6?", answers: ["4", "3", "5", "6"], correct: 0 },
  { category: "Mathematik", question: "Was ist 35 ÷ 5?", answers: ["7", "6", "8", "5"], correct: 0 },
  { category: "Mathematik", question: "Was ist 16 ÷ 4?", answers: ["4", "3", "5", "6"], correct: 0 },
  { category: "Mathematik", question: "Was ist 27 ÷ 3?", answers: ["9", "8", "10", "7"], correct: 0 },
  { category: "Mathematik", question: "Was ist 36 ÷ 6?", answers: ["6", "5", "7", "8"], correct: 0 },
  { category: "Mathematik", question: "Was ist 49 ÷ 7?", answers: ["7", "6", "8", "9"], correct: 0 },
  { category: "Mathematik", question: "Was ist 40 ÷ 8?", answers: ["5", "4", "6", "7"], correct: 0 },
  { category: "Mathematik", question: "Was ist 1 + 1?", answers: ["2", "1", "3", "0"], correct: 0 },
  { category: "Mathematik", question: "Was ist 2 + 2?", answers: ["4", "3", "5", "2"], correct: 0 },
  { category: "Mathematik", question: "Was ist 5 + 1?", answers: ["6", "5", "7", "4"], correct: 0 },
  { category: "Mathematik", question: "Was ist 10 + 2?", answers: ["12", "11", "13", "10"], correct: 0 },
  { category: "Mathematik", question: "Was ist 12 + 4?", answers: ["16", "15", "14", "18"], correct: 0 },
  { category: "Mathematik", question: "Was ist 6 + 6?", answers: ["12", "10", "11", "13"], correct: 0 },
  { category: "Mathematik", question: "Was ist 9 + 9?", answers: ["18", "17", "20", "19"], correct: 0 },
  { category: "Mathematik", question: "Was ist 7 + 3?", answers: ["10", "9", "11", "12"], correct: 0 },
  { category: "Mathematik", question: "Was ist 8 + 2?", answers: ["10", "9", "11", "12"], correct: 0 },
  { category: "Mathematik", question: "Was ist 11 + 5?", answers: ["16", "15", "17", "14"], correct: 0 },
  { category: "Mathematik", question: "Was ist 2 × 6?", answers: ["12", "10", "11", "14"], correct: 0 },
  { category: "Mathematik", question: "Was ist 3 × 3?", answers: ["9", "8", "10", "7"], correct: 0 },
  { category: "Mathematik", question: "Was ist 4 × 4?", answers: ["16", "15", "18", "14"], correct: 0 },
  { category: "Mathematik", question: "Was ist 5 × 4?", answers: ["20", "18", "22", "19"], correct: 0 },
  { category: "Mathematik", question: "Was ist 6 × 5?", answers: ["30", "24", "26", "28"], correct: 0 },
  { category: "Mathematik", question: "Was ist 7 × 5?", answers: ["35", "30", "32", "34"], correct: 0 },
  { category: "Mathematik", question: "Was ist 8 × 3?", answers: ["24", "23", "25", "26"], correct: 0 },
  { category: "Mathematik", question: "Was ist 9 × 4?", answers: ["36", "32", "35", "38"], correct: 0 },
  { category: "Mathematik", question: "Was ist 7 × 7?", answers: ["49", "45", "48", "46"], correct: 0 },
  { category: "Mathematik", question: "Was ist 8 × 8?", answers: ["64", "56", "60", "62"], correct: 0 }
];

let roundQuestions = [];
let questionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;
let currentPlayerName = "";

const welcomeScreen = document.querySelector("#welcome-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const nameInput = document.querySelector("#player-name");
const startButton = document.querySelector("#start-btn");
const logoutButton = document.querySelector("#logout-btn");
const quizCard = document.querySelector("#quiz-card");
const categoryElement = document.querySelector("#category");
const progressElement = document.querySelector("#progress");
const progressFill = document.querySelector("#progress-fill");
const questionElement = document.querySelector("#question");
const answersElement = document.querySelector("#answers");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-btn");
const resultTitle = document.querySelector("#result-title");
const scoreText = document.querySelector("#score-text");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-btn");
const profileName = document.querySelector("#profile-name");
const profileStreak = document.querySelector("#profile-streak");
const profileRounds = document.querySelector("#profile-rounds");
const profileBest = document.querySelector("#profile-best");

function getProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      name: "",
      streak: 0,
      lastPlayedDate: "",
      totalRounds: 0,
      bestScore: 0
    };
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return {
      name: "",
      streak: 0,
      lastPlayedDate: "",
      totalRounds: 0,
      bestScore: 0
    };
  }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function showScreen(screen) {
  welcomeScreen.classList.toggle("active", screen === welcomeScreen);
  welcomeScreen.classList.toggle("hidden", screen !== welcomeScreen);
  quizScreen.classList.toggle("active", screen === quizScreen);
  quizScreen.classList.toggle("hidden", screen !== quizScreen);
  resultScreen.classList.toggle("active", screen === resultScreen);
  resultScreen.classList.toggle("hidden", screen !== resultScreen);
}

function updateProfileDisplay() {
  const profile = getProfile();
  profileName.textContent = profile.name || "-";
  profileStreak.textContent = String(profile.streak);
  profileRounds.textContent = String(profile.totalRounds);
  profileBest.textContent = `${profile.bestScore}/10`;
}

function isSameDay(dateStringA, dateStringB) {
  if (!dateStringA || !dateStringB) return false;
  const first = new Date(dateStringA);
  const second = new Date(dateStringB);
  return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
}

function updateStreakAfterGame() {
  const profile = getProfile();
  const today = new Date().toISOString().slice(0, 10);

  if (!profile.lastPlayedDate) {
    profile.streak = 1;
  } else if (isSameDay(profile.lastPlayedDate, today)) {
    profile.streak = profile.streak || 1;
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().slice(0, 10);
    if (profile.lastPlayedDate === yesterdayString) {
      profile.streak += 1;
    } else {
      profile.streak = 1;
    }
  }

  profile.lastPlayedDate = today;
  profile.totalRounds += 1;
  profile.bestScore = Math.max(profile.bestScore, score);
  saveProfile(profile);
  updateProfileDisplay();
}

function startNewRound() {
  questionIndex = 0;
  score = 0;
  roundQuestions = shuffle(questionPool).slice(0, QUESTIONS_PER_ROUND);
  showScreen(quizScreen);
  renderQuestion();
  questionElement.focus();
}

function shuffle(items) {
  const cloned = [...items];
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[swap]] = [cloned[swap], cloned[index]];
  }
  return cloned;
}

function renderQuestion() {
  const item = roundQuestions[questionIndex];
  selectedAnswer = null;
  answered = false;

  categoryElement.textContent = item.category;
  progressElement.textContent = `Frage ${questionIndex + 1} von ${QUESTIONS_PER_ROUND}`;
  progressFill.style.width = `${((questionIndex + 1) / QUESTIONS_PER_ROUND) * 100}%`;
  questionElement.textContent = item.question;
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent = "Antwort prüfen";
  answersElement.replaceChildren();

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.setAttribute("aria-pressed", "false");
    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);
    const text = document.createElement("span");
    text.textContent = answer;
    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index));
    answersElement.append(button);
  });
}

function selectAnswer(index) {
  if (answered) return;
  selectedAnswer = index;
  answersElement.querySelectorAll(".answer-button").forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  nextButton.disabled = false;
}

function checkAnswer() {
  if (selectedAnswer === null || answered) return;
  answered = true;

  const correctIndex = roundQuestions[questionIndex].correct;
  answersElement.querySelectorAll(".answer-button").forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("correct");
    if (index === selectedAnswer && index !== correctIndex) button.classList.add("wrong");
  });

  if (selectedAnswer === correctIndex) {
    score += 1;
    feedbackElement.textContent = "Richtig! Sehr gut! 🎉";
    feedbackElement.classList.add("good");
  } else {
    feedbackElement.textContent = "Fast! Die grüne Antwort ist richtig. Weiter geht’s!";
    feedbackElement.classList.add("try-again");
  }

  nextButton.textContent = questionIndex === QUESTIONS_PER_ROUND - 1 ? "Ergebnis ansehen" : "Nächste Frage";
  nextButton.disabled = false;
}

function showResult() {
  updateStreakAfterGame();
  showScreen(resultScreen);
  scoreText.textContent = `Du hast ${score} von ${QUESTIONS_PER_ROUND} Punkten!`;

  if (score === 10) {
    resultTitle.textContent = "Perfekte Runde! 🌟";
    resultMessage.textContent = "10 von 10 – du hast jede Frage richtig beantwortet. Großartig!";
  } else if (score >= 7) {
    resultTitle.textContent = "Richtig stark! 🎉";
    resultMessage.textContent = "Das war ein tolles Ergebnis. Du weißt schon richtig viel!";
  } else if (score >= 3) {
    resultTitle.textContent = "Gut geknobelt! 💪";
    resultMessage.textContent = "Da war schon einiges richtig. Mit einer neuen Runde wirst du noch besser!";
  } else {
    resultTitle.textContent = "Weiter üben! 🌱";
    resultMessage.textContent = "Das war knifflig. Probier es gleich noch einmal – Übung macht schlau!";
  }
  restartButton.focus();
}

function goToNextQuestion() {
  if (!answered) {
    checkAnswer();
    return;
  }

  if (questionIndex < QUESTIONS_PER_ROUND - 1) {
    questionIndex += 1;
    renderQuestion();
    questionElement.focus();
  } else {
    showResult();
  }
}

function handleStart() {
  const cleanedName = nameInput.value.trim();
  if (!cleanedName) {
    nameInput.focus();
    return;
  }

  currentPlayerName = cleanedName;
  const profile = getProfile();
  profile.name = cleanedName;
  saveProfile(profile);
  updateProfileDisplay();
  startNewRound();
}

function handleLogout() {
  currentPlayerName = "";
  nameInput.value = "";
  showScreen(welcomeScreen);
  updateProfileDisplay();
}

startButton.addEventListener("click", handleStart);
logoutButton.addEventListener("click", handleLogout);
nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", () => {
  startNewRound();
});
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleStart();
  }
});

updateProfileDisplay();
showScreen(welcomeScreen);

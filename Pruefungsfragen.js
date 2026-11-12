// Separate Fragen für die Vorbereitung auf die nächste Probe.
// Format wie in questions.js: { category, question, answers, correct }.
// Fragen aus questions.js können als vollständige Objekte hierher kopiert werden.
// Erst ab 10 gültigen Fragen kann eine Vorbereitungsrunde gestartet werden.
window.examQuestionPool = [
  {
    category: "Wald",
    question: "Wie hoch werden Pflanzen in der Krautschicht meistens?",
    answers: [
      "Höchstens einen Meter",
      "Bis zu zehn Meter",
      "Über zwanzig Meter",
      "Genau fünf Meter"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Was brauchen die Pflanzen in der Krautschicht zum Wachsen?",
    answers: [
      "Sehr viel Dunkelheit",
      "Viel Licht",
      "Gar kein Wasser",
      "Eis und Schnee"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Was sammeln Bienen und Schmetterlinge in der Krautschicht?",
    answers: [
      "Grüne Blätter",
      "Kleine Steine",
      "Nektar von Blumen",
      "Frische Beeren"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Wann fangen Frühblüher an zu blühen?",
    answers: [
      "Mitten im Sommer",
      "Früh im Jahr",
      "Spät im Herbst",
      "Nur im Dezember"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Welche Sträucher wachsen laut Text in der Strauchschicht?",
    answers: [
      "Tannen und Fichten",
      "Rosen und Tulpen",
      "Holunder und Brombeeren",
      "Eichen und Buchen"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Was bauen Vögel in den dichten Sträuchern?",
    answers: [
      "Ihre Nester",
      "Tiefe Höhlen",
      "Kleine Brücken",
      "Hohe Türme"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Welches größere Tier sucht in der Strauchschicht Schutz?",
    answers: [
      "Der Uhu",
      "Das Eichhörnchen",
      "Der Schmetterling",
      "Das Reh"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Wie wird die Baumschicht im Text noch genannt?",
    answers: [
      "Keller des Waldes",
      "Dachgeschoss des Waldes",
      "Wohnzimmer des Waldes",
      "Garten des Waldes"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Was lassen die Baumkronen nur wenig hindurch?",
    answers: [
      "Sonnenlicht",
      "Regenwasser",
      "Frische Luft",
      "Kleine Vögel"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Welche Tiere leben laut Text in der Baumschicht?",
    answers: [
      "Wildschweine und Käfer",
      "Füchse und Rehe",
      "Uhu, Specht und Eichhörnchen",
      "Bienen und Schmetterlinge"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Wie viele Stockwerke hat der Wald insgesamt?",
    answers: [
      "Drei Stockwerke",
      "Fünf Stockwerke",
      "Zehn Stockwerke",
      "Zwei Stockwerke"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Welche Schicht ist die unterste Schicht des Waldbodens?",
    answers: [
      "Die Wurzelschicht",
      "Die Baumschicht",
      "Die Krautschicht",
      "Die Strauchschicht"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Was nehmen die Wurzeln aus der Erde auf?",
    answers: [
      "Sonnenlicht",
      "Bunte Blätter",
      "Wasser",
      "Kleine Steine"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Welches Tier ist ein typischer Bewohner der Wurzelschicht?",
    answers: [
      "Der Specht",
      "Der Schmetterling",
      "Das Reh",
      "Der Regenwurm"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Was graben Mäuse zwischen den Wurzeln?",
    answers: [
      "Tiefe Brunnen",
      "Tunnel",
      "Kleine Teiche",
      "Hohe Berge"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Wo ziehen Füchse ihre Jungen groß?",
    answers: [
      "In tiefen Bauten",
      "In hohen Nestern",
      "Auf dicken Ästen",
      "Im weichen Moos"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Wie hoch ist die Moosschicht ungefähr?",
    answers: [
      "Ungefähr 50 Zentimeter",
      "Ungefähr 5 Meter",
      "Ungefähr 5 Zentimeter",
      "Ungefähr 2 Meter"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Wie bedecken die Moose den Waldboden?",
    answers: [
      "Wie ein Dach",
      "Wie eine Mauer",
      "Wie ein Teppich",
      "Wie ein Netz"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Welche Tiere krabbeln laut Text in der Moosschicht herum?",
    answers: [
      "Käfer, Ameisen und Spinnen",
      "Füchse, Rehe und Wildschweine",
      "Uhus, Spechte und Eichhörnchen",
      "Bienen, Hummeln und Schmetterlinge"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Wie speichert das Moos das Wasser?",
    answers: [
      "Wie ein Eimer",
      "Wie ein Schwamm",
      "Wie eine Flasche",
      "Wie ein Teller"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Wie fühlen sich die Nadeln der Tanne an?",
    answers: [
      "Weich und biegsam",
      "Spitz und hart",
      "Klebrig und rau",
      "Trocken und stachelig"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Was hat die Tanne auf der Unterseite ihrer Nadeln?",
    answers: [
      "Kleine rote Punkte",
      "Zwei weiße Linien",
      "Gelbe Streifen",
      "Feine Härchen"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "In welche Richtung wachsen die Zapfen der Tanne?",
    answers: [
      "Nach unten",
      "Zur Seite",
      "Nach oben",
      "In die Erde"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Welche Farbe haben die Nadeln der Fichte?",
    answers: [
      "Sie sind ganz grün",
      "Unten weiß",
      "Im Sommer gelb",
      "Immer dunkelrot"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "In welche Richtung wachsen die Zapfen der Fichte?",
    answers: [
      "Nach oben",
      "Nach unten",
      "Schräg nach links",
      "Geradeaus"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Wie lautet der Merksatz zu Fichte und Tanne?",
    answers: [
      "Tanne sticht, Fichte nicht",
      "Beide stechen sehr stark",
      "Keine von beiden sticht",
      "Fichte sticht, Tanne nicht"
    ],
    correct: 3
  },

  // Thema: Waldarten
  {
    category: "Wald",
    question: "Wo findet man den Nadelwald besonders oft?",
    answers: [
      "Am warmen Meer",
      "In höheren, kälteren Lagen",
      "In der Wüste",
      "Mitten in Großstädten"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Warum wachsen im Gebirge vor allem Nadelbäume?",
    answers: [
      "Sie sind robuster",
      "Sie mögen kein Wasser",
      "Sie wachsen schneller",
      "Sie brauchen viel Hitze"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Wie sehen Nadelbäume im Winter aus?",
    answers: [
      "Sie sind ganz kahl",
      "Sie werden bunt",
      "Sie bleiben grün",
      "Sie verlieren ihre Äste"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Was passiert mit dem Laub im Laubwald im Herbst?",
    answers: [
      "Es bleibt grün",
      "Es wächst neu",
      "Es wird blau",
      "Es fällt ab"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Welche Bäume wachsen in einem Mischwald?",
    answers: [
      "Laubbäume und Nadelbäume",
      "Nur alte Eichen",
      "Nur Fichten und Tannen",
      "Nur Obstbäume"
    ],
    correct: 0
  },

  // Thema: Laub- und Nadelbäume (Birke, Linde, Kiefer)
  {
    category: "Wald",
    question: "Welche Farbe hat die Rinde der Birke?",
    answers: [
      "Dunkelbraun",
      "Weiß",
      "Rotbraun",
      "Grün"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Wie heißen die Früchte der Birke?",
    answers: [
      "Eicheln",
      "Kastanien",
      "Kätzchen",
      "Zapfen"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Welche Form haben die Blätter der Linde?",
    answers: [
      "Sie sind herzförmig",
      "Sie sind sternförmig",
      "Sie sind viereckig",
      "Sie sind ganz rund"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Wie heißen die Früchte der Linde?",
    answers: [
      "Bucheckern",
      "Nussfrüchte",
      "Hagebutten",
      "Brombeeren"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Wozu haben die Nussfrüchte der Linde ein Segel?",
    answers: [
      "Zum Schwimmen",
      "Zum Graben",
      "Um weit zu fliegen",
      "Als Regenschutz"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Welche Farbe hat die Rinde der Kiefer oben?",
    answers: [
      "Weiß",
      "Schwarz",
      "Grün",
      "Rot"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Wie wachsen die langen Nadeln der Kiefer?",
    answers: [
      "Immer zu zweit",
      "Alle einzeln",
      "Zu zehnt zusammen",
      "In kleinen Kreisen"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Welche Form haben die Zapfen der Kiefer?",
    answers: [
      "Lang und dünn",
      "Oval bis kugelig",
      "Viereckig und flach",
      "Spitz wie Nadeln"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Was haben Laubbäume im Winter nicht mehr?",
    answers: [
      "Ihre Wurzeln",
      "Ihre Rinde",
      "Ihre Blätter",
      "Ihren Stamm"
    ],
    correct: 2
  },

  // Thema: Funktionen des Waldes (Blatt A)
  {
    category: "Wald",
    question: "Welche Tiere leben laut Arbeitsblatt im Wald?",
    answers: [
      "Löwen und Giraffen",
      "Pinguine und Robben",
      "Delfine und Wale",
      "Rehe, Füchse und Spechte"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Was geben Bäume und Büsche den Tieren?",
    answers: [
      "Schutz und Verstecke",
      "Spielzeug und Bücher",
      "Kleidung und Schuhe",
      "Strom und Licht"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Welches Futter finden Tiere im Wald?",
    answers: [
      "Brot und Käse",
      "Nüsse, Beeren und Insekten",
      "Nudeln und Reis",
      "Äpfel und Bananen"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Was passiert, wenn der Wald verschwindet?",
    answers: [
      "Tiere ziehen in Häuser",
      "Es regnet nicht mehr",
      "Tiere verlieren ihr Zuhause",
      "Alle Bäume wachsen nach"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Wovon reinigen die Blätter des Waldes die Luft?",
    answers: [
      "Von Sauerstoff",
      "Von Regen",
      "Von Wind",
      "Von Schmutz"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Was ist ein Beispiel für Schmutz in der Luft?",
    answers: [
      "Autoabgase",
      "Blütenstaub",
      "Regentropfen",
      "Schneeflocken"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Worin wandeln die Blätter die schmutzige Luft um?",
    answers: [
      "In dunklen Rauch",
      "In saubere Luft",
      "In kalten Wind",
      "In warmes Wasser"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Wozu brauchen wir Menschen frische Luft?",
    answers: [
      "Zum Schlafen",
      "Zum Essen",
      "Zum Atmen",
      "Zum Laufen"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Welchen wichtigen Rohstoff gibt uns der Wald?",
    answers: [
      "Plastik",
      "Eisen",
      "Glas",
      "Holz"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Was wird laut Text aus Holz hergestellt?",
    answers: [
      "Häuser, Möbel und Papier",
      "Autos, Züge und Flugzeuge",
      "Töpfe, Pfannen und Besteck",
      "Schuhe, Jacken und Mützen"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Was halten die Wurzeln der Pflanzen und Bäume fest?",
    answers: [
      "Die Wolken",
      "Die Erde",
      "Die Vögel",
      "Den Wind"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Was passiert bei Regen dank der Wurzeln nicht?",
    answers: [
      "Bäume fallen um",
      "Blätter werden nass",
      "Erde wird weggespült",
      "Tiere werden schmutzig"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Was nehmen die Wurzeln bei Regen auf?",
    answers: [
      "Den Lärm",
      "Die Sonne",
      "Den Schmutz",
      "Das Wasser"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Wovor schützt uns der Wald noch?",
    answers: [
      "Vor Lärm",
      "Vor Hunger",
      "Vor Dunkelheit",
      "Vor Langeweile"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Warum kann der Wald Lärm gut abhalten?",
    answers: [
      "Weil er sehr hoch ist",
      "Bäume stehen dicht zusammen",
      "Weil dort niemand spricht",
      "Weil der Boden weich ist"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Was dämpfen die Bäume und Pflanzen?",
    answers: [
      "Den starken Regen",
      "Das helle Sonnenlicht",
      "Die lauten Geräusche",
      "Den kalten Winterwind"
    ],
    correct: 2
  },
  {
    category: "Wald",
    question: "Was macht oft lauten Lärm?",
    answers: [
      "Bienen und Käfer",
      "Bäume und Sträucher",
      "Wolken und Regen",
      "Autos und Maschinen"
    ],
    correct: 3
  },
  {
    category: "Wald",
    question: "Wozu dient der Wald für uns Menschen außerdem?",
    answers: [
      "Zur Erholung",
      "Zum Einkaufen",
      "Zum Autofahren",
      "Zum Fernsehen"
    ],
    correct: 0
  },
  {
    category: "Wald",
    question: "Was tut im Wald laut Text besonders gut?",
    answers: [
      "Ein lautes Konzert",
      "Ein Spaziergang",
      "Ein Wettrennen",
      "Ein großes Feuer"
    ],
    correct: 1
  },
  {
    category: "Wald",
    question: "Wie machen uns die Ruhe und die Natur im Wald?",
    answers: [
      "Müde und traurig",
      "Wütend und laut",
      "Glücklich und entspannt",
      "Hungrig und durstig"
    ],
    correct: 2
  }
];

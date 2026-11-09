const QUESTIONS_PER_ROUND = 10;

// 100 Wissensfragen in fünf Themenbereichen.
const factGroups = [
  {
    category: "Geografie",
    questions: [
      ["Wie heißt die Hauptstadt von Deutschland?", "Berlin"], ["Wie heißt die Hauptstadt von Frankreich?", "Paris"],
      ["Wie heißt die Hauptstadt von Italien?", "Rom"], ["Wie heißt die Hauptstadt von Spanien?", "Madrid"],
      ["Wie heißt die Hauptstadt von Portugal?", "Lissabon"], ["Wie heißt die Hauptstadt des Vereinigten Königreichs?", "London"],
      ["Wie heißt die Hauptstadt von Irland?", "Dublin"], ["Wie heißt die Hauptstadt von Belgien?", "Brüssel"],
      ["Wie heißt die Hauptstadt der Niederlande?", "Amsterdam"], ["Wie heißt die Hauptstadt von Dänemark?", "Kopenhagen"],
      ["Wie heißt die Hauptstadt von Norwegen?", "Oslo"], ["Wie heißt die Hauptstadt von Schweden?", "Stockholm"],
      ["Wie heißt die Hauptstadt von Finnland?", "Helsinki"], ["Wie heißt die Hauptstadt von Polen?", "Warschau"],
      ["Wie heißt die Hauptstadt von Tschechien?", "Prag"], ["Wie heißt die Hauptstadt von Österreich?", "Wien"],
      ["Wie heißt die Hauptstadt der Schweiz?", "Bern"], ["Wie heißt die Hauptstadt von Griechenland?", "Athen"],
      ["Wie heißt die Hauptstadt von Japan?", "Tokio"], ["Wie heißt die Hauptstadt von Australien?", "Canberra"]
    ],
    choices: ["Berlin", "Paris", "Rom", "Madrid", "Lissabon", "London", "Dublin", "Brüssel", "Amsterdam", "Kopenhagen", "Oslo", "Stockholm", "Helsinki", "Warschau", "Prag", "Wien", "Bern", "Athen", "Tokio", "Canberra"]
  },
  {
    category: "Tiere",
    questions: [
      ["Zu welcher Tiergruppe gehört der Hund?", "Säugetier"], ["Zu welcher Tiergruppe gehört der Adler?", "Vogel"],
      ["Zu welcher Tiergruppe gehört die Schildkröte?", "Reptil"], ["Zu welcher Tiergruppe gehört die Forelle?", "Fisch"],
      ["Zu welcher Tiergruppe gehört der Frosch?", "Amphibie"], ["Zu welcher Tiergruppe gehört die Katze?", "Säugetier"],
      ["Zu welcher Tiergruppe gehört der Pinguin?", "Vogel"], ["Zu welcher Tiergruppe gehört die Eidechse?", "Reptil"],
      ["Zu welcher Tiergruppe gehört der Hai?", "Fisch"], ["Zu welcher Tiergruppe gehört der Salamander?", "Amphibie"],
      ["Zu welcher Tiergruppe gehört der Wal?", "Säugetier"], ["Zu welcher Tiergruppe gehört die Eule?", "Vogel"],
      ["Zu welcher Tiergruppe gehört das Krokodil?", "Reptil"], ["Zu welcher Tiergruppe gehört der Lachs?", "Fisch"],
      ["Zu welcher Tiergruppe gehört die Kröte?", "Amphibie"], ["Zu welcher Tiergruppe gehört der Elefant?", "Säugetier"],
      ["Zu welcher Tiergruppe gehört die Amsel?", "Vogel"], ["Zu welcher Tiergruppe gehört die Schlange?", "Reptil"],
      ["Zu welcher Tiergruppe gehört der Karpfen?", "Fisch"], ["Zu welcher Tiergruppe gehört der Molch?", "Amphibie"]
    ],
    choices: ["Säugetier", "Vogel", "Reptil", "Fisch", "Amphibie"]
  },
  {
    category: "Körper",
    questions: [
      ["Womit sehen wir?", "Augen"], ["Womit hören wir?", "Ohren"], ["Womit riechen wir?", "Nase"],
      ["Womit schmecken wir?", "Zunge"], ["Womit greifen wir?", "Hände"], ["Womit laufen wir?", "Füße"],
      ["Welches Organ pumpt Blut durch den Körper?", "Herz"], ["Mit welchem Organ atmen wir?", "Lunge"],
      ["Welcher Teil schützt das Gehirn?", "Schädel"], ["Was verbindet den Oberarm mit dem Unterarm?", "Ellenbogen"],
      ["Was verbindet den Fuß mit dem Bein?", "Knöchel"], ["Was hält unseren Körper aufrecht?", "Wirbelsäule"],
      ["Womit kauen wir Essen?", "Zähne"], ["Welche Gelenke beugen das Bein?", "Knie"],
      ["Wie heißt der bewegliche Teil zwischen Kopf und Körper?", "Hals"], ["Was wächst auf dem Kopf?", "Haare"],
      ["Wie heißt die Vorderseite des Unterschenkels?", "Schienbein"], ["Welche Körperteile haben Finger- und Fußnägel?", "Finger und Zehen"],
      ["Welcher Muskel hilft beim Beugen des Arms?", "Bizeps"], ["Was schützt die Augen vor Schweiß?", "Augenbrauen"]
    ],
    choices: ["Augen", "Ohren", "Nase", "Zunge", "Hände", "Füße", "Herz", "Lunge", "Schädel", "Ellenbogen", "Knöchel", "Wirbelsäule", "Zähne", "Knie", "Hals", "Haare", "Schienbein", "Finger und Zehen", "Bizeps", "Augenbrauen"]
  },
  {
    category: "Natur",
    questions: [
      ["Was brauchen Pflanzen als Lichtquelle zum Wachsen?", "Sonnenlicht"], ["Was nehmen Pflanzen über ihre Wurzeln auf?", "Wasser"],
      ["Welcher Pflanzenteil nimmt Wasser aus dem Boden auf?", "Wurzel"], ["Welcher Pflanzenteil ist oft grün und fängt Licht ein?", "Blatt"],
      ["Wie heißt der Vorgang, bei dem Pflanzen Licht nutzen und Nahrung herstellen?", "Fotosynthese"],
      ["In welcher Jahreszeit fallen viele Blätter von den Bäumen?", "Herbst"], ["Welche Jahreszeit kommt nach dem Winter?", "Frühling"],
      ["Wie nennt man gefrorenes Wasser?", "Eis"], ["Wie heißt Wasser, das als Gas in der Luft ist?", "Wasserdampf"],
      ["Wie nennt man Wasser, das vom Himmel fällt?", "Regen"], ["Was zeigt ein Thermometer an?", "Temperatur"],
      ["Welches Himmelsobjekt spendet der Erde Licht und Wärme?", "Sonne"], ["Wie heißt der natürliche Begleiter der Erde?", "Mond"],
      ["Welches Tier baut oft einen Damm im Fluss?", "Biber"], ["Was entsteht, wenn Wassertröpfchen hoch oben in der Luft schweben?", "Wolke"],
      ["Wie nennt man geschmolzenes Gestein, das aus einem Vulkan fließt?", "Lava"], ["Was brauchen Menschen und Tiere zum Atmen?", "Sauerstoff"],
      ["Wie nennt man eine große Fläche mit vielen Bäumen?", "Wald"], ["Was fällt im Winter manchmal als weiße Flocken vom Himmel?", "Schnee"],
      ["Wie nennt man einen starken Wirbelsturm, der über Land zieht?", "Tornado"]
    ],
    choices: ["Sonnenlicht", "Wasser", "Wurzel", "Blatt", "Fotosynthese", "Herbst", "Frühling", "Eis", "Wasserdampf", "Regen", "Temperatur", "Sonne", "Mond", "Biber", "Wolke", "Lava", "Sauerstoff", "Wald", "Schnee", "Tornado"]
  },
  {
    category: "Weltwissen",
    questions: [
      ["Wie viele Tage hat eine Woche?", "Sieben"], ["Wie viele Monate hat ein Jahr?", "Zwölf"],
      ["Wie viele Minuten hat eine Stunde?", "60"], ["Wie viele Stunden hat ein Tag?", "24"],
      ["Auf welchem Planeten leben wir?", "Erde"], ["Welcher Planet ist als roter Planet bekannt?", "Mars"],
      ["Wie viele Ecken hat ein Dreieck?", "Drei"], ["Wie viele Seiten hat ein Würfel?", "Sechs"],
      ["Welche Farbe entsteht, wenn man Blau und Gelb mischt?", "Grün"], ["Welche Farbe hat ein Rubin meistens?", "Rot"],
      ["Wie heißt die Hauptstadt von Deutschland?", "Berlin"], ["Welche Sprache wird hauptsächlich in Deutschland gesprochen?", "Deutsch"],
      ["Wie viele Beine hat eine Spinne?", "Acht"], ["Wie viele Beine hat ein Insekt?", "Sechs"],
      ["Welches Verkehrsmittel fährt auf Schienen?", "Zug"], ["Welches Gerät zeigt die Uhrzeit an?", "Uhr"],
      ["Wie heißt das Märchenmädchen mit dem gläsernen Schuh?", "Aschenputtel"], ["Welcher Stern steht unserer Erde am nächsten?", "Sonne"],
      ["Wie nennt man ein Jungtier vom Hund?", "Welpe"], ["Was zeigt ein Kompass an?", "Himmelsrichtungen"]
    ],
    choices: ["Sieben", "Zwölf", "60", "24", "Erde", "Mars", "Drei", "Sechs", "Grün", "Rot", "Berlin", "Deutsch", "Acht", "Zug", "Uhr", "Aschenputtel", "Sonne", "Welpe", "Himmelsrichtungen", "Fünf"]
  }
];

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function makeQuestion(category, question, correctAnswer, choices) {
  const wrongAnswers = shuffle([...new Set(choices)]).filter((answer) => answer !== correctAnswer).slice(0, 3);
  const answers = shuffle([correctAnswer, ...wrongAnswers]);
  return { category, question, answers, correct: answers.indexOf(correctAnswer) };
}

const knowledgeQuestions = factGroups.flatMap((group) =>
  group.questions.map(([question, answer]) => makeQuestion(group.category, question, answer, group.choices))
);

function makeMathQuestions() {
  const result = [];
  function add(question, answer) {
    const options = [answer + 1, answer - 1, answer + 2, answer - 2, answer + 3]
      .filter((value) => value >= 0 && value !== answer).map(String);
    result.push(makeQuestion("Mathematik", question, String(answer), options));
  }

  for (let i = 0; i < 25; i += 1) {
    const a = i + 1;
    const b = (i * 7) % 20 + 1;
    add(`Was ist ${a} + ${b}?`, a + b);
  }
  for (let i = 0; i < 25; i += 1) {
    const a = 30 + i;
    const b = (i * 7) % 20 + 1;
    add(`Was ist ${a} − ${b}?`, a - b);
  }
  for (let i = 0; i < 25; i += 1) {
    const a = 2 + (i % 8);
    const b = 2 + Math.floor(i / 8);
    add(`Was ist ${a} × ${b}?`, a * b);
  }
  for (let i = 0; i < 25; i += 1) {
    const divisor = 2 + (i % 8);
    const quotient = 2 + Math.floor(i / 8);
    add(`Was ist ${divisor * quotient} ÷ ${divisor}?`, quotient);
  }
  return result;
}

const questionPool = [...knowledgeQuestions, ...makeMathQuestions()];

let roundQuestions = [];
let questionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;

const quizCard = document.querySelector("#quiz-card");
const resultCard = document.querySelector("#result");
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
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
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

function startNewRound() {
  questionIndex = 0;
  score = 0;
  roundQuestions = shuffle(questionPool).slice(0, QUESTIONS_PER_ROUND);
  quizCard.classList.remove("hidden");
  resultCard.classList.add("hidden");
  renderQuestion();
  questionElement.focus();
}

nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", startNewRound);
startNewRound();

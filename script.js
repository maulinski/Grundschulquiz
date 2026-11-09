const questions = [
  {
    category: "Allgemeinwissen",
    question: "Wie viele Tage hat eine Woche?",
    answers: ["Fünf", "Sechs", "Sieben", "Acht"],
    correct: 2
  },
  {
    category: "Tiere",
    question: "Welches Tier ist ein Säugetier?",
    answers: ["Forelle", "Schlange", "Maus", "Frosch"],
    correct: 2
  },
  {
    category: "Mathematik",
    question: "Was ist 8 + 7?",
    answers: ["13", "14", "15", "16"],
    correct: 2
  },
  {
    category: "Natur",
    question: "Was brauchen Pflanzen zum Wachsen?",
    answers: ["Wasser und Licht", "Schokolade", "Sand und Saft", "Nur Wind"],
    correct: 0
  },
  {
    category: "Weltwissen",
    question: "Auf welchem Planeten leben wir?",
    answers: ["Mars", "Erde", "Jupiter", "Venus"],
    correct: 1
  },
  {
    category: "Geografie",
    question: "Wie heißt die Hauptstadt von Deutschland?",
    answers: ["München", "Hamburg", "Berlin", "Köln"],
    correct: 2
  },
  {
    category: "Körper",
    question: "Womit hören wir?",
    answers: ["Mit den Augen", "Mit den Ohren", "Mit der Nase", "Mit den Händen"],
    correct: 1
  },
  {
    category: "Mathematik",
    question: "Wie viele Ecken hat ein Dreieck?",
    answers: ["Zwei", "Drei", "Vier", "Fünf"],
    correct: 1
  }
];

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
const scoreText = document.querySelector("#score-text");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-btn");

function renderQuestion() {
  const item = questions[questionIndex];
  selectedAnswer = null;
  answered = false;

  categoryElement.textContent = item.category;
  progressElement.textContent = `Frage ${questionIndex + 1} von ${questions.length}`;
  progressFill.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
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
  const buttons = answersElement.querySelectorAll(".answer-button");
  buttons.forEach((button, buttonIndex) => {
    const isSelected = buttonIndex === index;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  nextButton.disabled = false;
}

function checkAnswer() {
  if (selectedAnswer === null || answered) return;

  answered = true;
  const correctIndex = questions[questionIndex].correct;
  const buttons = answersElement.querySelectorAll(".answer-button");
  buttons.forEach((button, index) => {
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

  nextButton.textContent = questionIndex === questions.length - 1 ? "Ergebnis ansehen" : "Nächste Frage";
  nextButton.disabled = false;
}

function showResult() {
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
  scoreText.textContent = `Du hast ${score} von ${questions.length} Punkten!`;

  if (score === questions.length) {
    resultMessage.textContent = "Unglaublich – du hast alle Fragen richtig beantwortet!";
  } else if (score >= questions.length / 2) {
    resultMessage.textContent = "Toll gemacht! Du weißt schon richtig viel.";
  } else {
    resultMessage.textContent = "Gut geknobelt! Spiel einfach noch eine Runde.";
  }
  restartButton.focus();
}

function goToNextQuestion() {
  if (!answered) {
    checkAnswer();
    return;
  }

  if (questionIndex < questions.length - 1) {
    questionIndex += 1;
    renderQuestion();
    questionElement.focus();
  } else {
    showResult();
  }
}

function restartQuiz() {
  questionIndex = 0;
  score = 0;
  quizCard.classList.remove("hidden");
  resultCard.classList.add("hidden");
  renderQuestion();
  questionElement.focus();
}

nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", restartQuiz);
renderQuestion();

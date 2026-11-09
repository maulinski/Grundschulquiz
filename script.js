const QUESTIONS_PER_ROUND = 10;
const STORAGE_KEY = "grundschulquiz-profile";
const questionPool = window.questionPool || [];

if (!Array.isArray(questionPool) || questionPool.length < QUESTIONS_PER_ROUND) {
  throw new Error("Der Fragenpool fehlt oder enthält weniger als 10 Fragen. Bitte prüfe die Datei questions.js.");
}

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
const profileLastResult = document.querySelector("#profile-last-result");

function getProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { name: "", streak: 0, lastPlayedDate: "", totalRounds: 0, lastResult: 0 };
  }
  try {
    return { ...{ name: "", streak: 0, lastPlayedDate: "", totalRounds: 0, lastResult: 0 }, ...JSON.parse(raw) };
  } catch (error) {
    return { name: "", streak: 0, lastPlayedDate: "", totalRounds: 0, lastResult: 0 };
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
  profileStreak.textContent = String(profile.streak || 0);
  profileRounds.textContent = String(profile.totalRounds || 0);
  profileLastResult.textContent = `${profile.lastResult ?? 0}/10`;
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
  profile.totalRounds = (profile.totalRounds || 0) + 1;
  profile.lastResult = score;
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
restartButton.addEventListener("click", startNewRound);
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleStart();
  }
});

updateProfileDisplay();
showScreen(welcomeScreen);

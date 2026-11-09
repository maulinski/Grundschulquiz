const QUESTIONS_PER_ROUND = 10;
const PROFILES_KEY = "grundschulquiz-profiles";
const LEGACY_PROFILE_KEY = "grundschulquiz-profile";
const questionPool = window.questionPool;

if (!Array.isArray(questionPool) || questionPool.length < QUESTIONS_PER_ROUND) {
  throw new Error("Der Fragenpool fehlt oder enthält weniger als 10 Fragen. Bitte prüfe questions.js.");
}

let roundQuestions = [];
let questionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;
let activeProfileId = null;

const welcomeScreen = document.querySelector("#welcome-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const createProfileForm = document.querySelector("#create-profile-form");
const nameInput = document.querySelector("#player-name");
const profileMessage = document.querySelector("#profile-message");
const profilesList = document.querySelector("#profiles-list");
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

function createProfile(name) {
  return {
    id: globalThis.crypto?.randomUUID?.() || `profile-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    streak: 0,
    lastPlayedDate: "",
    totalRounds: 0,
    lastResult: 0
  };
}

function readProfiles() {
  try {
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || "[]");
    return Array.isArray(profiles) ? profiles : [];
  } catch (error) {
    return [];
  }
}

function saveProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

function migrateLegacyProfile() {
  if (readProfiles().length > 0) return;
  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_PROFILE_KEY) || "null");
    if (!legacy?.name) return;
    const profile = { ...createProfile(legacy.name), ...legacy };
    saveProfiles([profile]);
  } catch (error) {
    // Ignore invalid legacy data and show an empty profile list.
  }
}

function showScreen(screen) {
  [welcomeScreen, quizScreen, resultScreen].forEach((current) => {
    const isActive = current === screen;
    current.classList.toggle("active", isActive);
    current.classList.toggle("hidden", !isActive);
  });
}

function makeStat(label, value) {
  const item = document.createElement("div");
  item.className = "stat-item";
  const name = document.createElement("span");
  name.className = "stat-label";
  name.textContent = label;
  const content = document.createElement("strong");
  content.textContent = value;
  item.append(name, content);
  return item;
}

function updateProfile(profileId, updater) {
  const profiles = readProfiles();
  const index = profiles.findIndex((profile) => profile.id === profileId);
  if (index === -1) return;
  profiles[index] = updater(profiles[index]);
  saveProfiles(profiles);
  renderProfiles();
}

function renderProfiles() {
  const profiles = readProfiles();
  profilesList.replaceChildren();

  if (profiles.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-profiles";
    empty.textContent = "Noch keine Profile angelegt.";
    profilesList.append(empty);
    return;
  }

  profiles.forEach((profile) => {
    const card = document.createElement("article");
    card.className = "profile-card";
    const title = document.createElement("h2");
    title.className = "profile-card-title";
    title.textContent = profile.name;

    const stats = document.createElement("div");
    stats.className = "profile-grid";
    stats.append(
      makeStat("Serie", String(profile.streak || 0)),
      makeStat("gespielte Runden", String(profile.totalRounds || 0)),
      makeStat("Letztes Ergebnis", `${profile.lastResult ?? 0}/10`)
    );

    const start = document.createElement("button");
    start.className = "primary-button profile-start-button";
    start.type = "button";
    start.textContent = "Quiz starten";
    start.addEventListener("click", () => {
      activeProfileId = profile.id;
      startNewRound();
    });

    const actions = document.createElement("div");
    actions.className = "profile-actions";
    const reset = document.createElement("button");
    reset.className = "secondary-button";
    reset.type = "button";
    reset.textContent = "Statistik zurücksetzen";
    reset.addEventListener("click", () => {
      if (!window.confirm(`Möchtest du die Statistik von ${profile.name} zurücksetzen?`)) return;
      updateProfile(profile.id, (current) => ({
        ...current,
        streak: 0,
        lastPlayedDate: "",
        totalRounds: 0,
        lastResult: 0
      }));
    });

    const remove = document.createElement("button");
    remove.className = "secondary-button delete-profile-button";
    remove.type = "button";
    remove.textContent = "Profil löschen";
    remove.addEventListener("click", () => {
      if (!window.confirm(`Möchtest du das Profil ${profile.name} wirklich löschen?`)) return;
      saveProfiles(readProfiles().filter((current) => current.id !== profile.id));
      if (activeProfileId === profile.id) activeProfileId = null;
      renderProfiles();
    });

    actions.append(reset, remove);
    card.append(title, stats, start, actions);
    profilesList.append(card);
  });
}

function handleCreateProfile(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name) {
    profileMessage.textContent = "Bitte gib zuerst einen Namen ein.";
    nameInput.focus();
    return;
  }

  const profiles = readProfiles();
  if (profiles.some((profile) => profile.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
    profileMessage.textContent = "Dieses Profil gibt es bereits.";
    return;
  }

  profiles.push(createProfile(name));
  saveProfiles(profiles);
  nameInput.value = "";
  profileMessage.textContent = `Profil „${name}“ wurde angelegt.`;
  renderProfiles();
}

function shuffle(items) {
  const cloned = [...items];
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[swap]] = [cloned[swap], cloned[index]];
  }
  return cloned;
}

function startNewRound() {
  if (!activeProfileId) return;
  questionIndex = 0;
  score = 0;
  roundQuestions = shuffle(questionPool).slice(0, QUESTIONS_PER_ROUND);
  showScreen(quizScreen);
  renderQuestion();
  questionElement.focus();
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

function recordRoundResult() {
  const today = new Date().toISOString().slice(0, 10);
  updateProfile(activeProfileId, (profile) => {
    let streak = profile.streak || 0;
    if (!profile.lastPlayedDate) {
      streak = 1;
    } else {
      const previous = new Date(`${profile.lastPlayedDate}T00:00:00`);
      const current = new Date(`${today}T00:00:00`);
      const daysApart = Math.round((current - previous) / 86400000);
      if (daysApart === 0) streak = streak || 1;
      else if (daysApart === 1) streak += 1;
      else streak = 1;
    }
    return {
      ...profile,
      streak,
      lastPlayedDate: today,
      totalRounds: (profile.totalRounds || 0) + 1,
      lastResult: score
    };
  });
}

function showResult() {
  recordRoundResult();
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

createProfileForm.addEventListener("submit", handleCreateProfile);
nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", startNewRound);
document.querySelector("#home-btn").addEventListener("click", () => {
  activeProfileId = null;
  showScreen(welcomeScreen);
  nameInput.focus();
});

migrateLegacyProfile();
renderProfiles();
showScreen(welcomeScreen);

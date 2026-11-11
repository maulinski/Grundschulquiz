const QUESTIONS_PER_ROUND = 10;
const PROFILES_KEY = "grundschulquiz-profiles";
const LEGACY_PROFILE_KEY = "grundschulquiz-profile";
const JSONBIN_BIN_ID = "6af4621fac6210605a7f9356";
const JSONBIN_ACCESS_KEY_STORAGE = "grundschulquiz-jsonbin-access-key";
const JSONBIN_API_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
const questionPool = window.questionPool;

const ACHIEVEMENT_DEFINITIONS = [
  {
    id: "roundsPlayed",
    label: "Gespielte Runden",
    valueGetter: (profile) => Number(profile.totalRounds || 0),
    tiers: [
      { name: "Bronze", threshold: 5 },
      { name: "Silber", threshold: 20 },
      { name: "Gold", threshold: 50 },
      { name: "Platin", threshold: 100 }
    ]
  },
  {
    id: "perfectRounds",
    label: "Perfekte Runden",
    valueGetter: (profile) => Number(profile.perfectRounds || 0),
    tiers: [
      { name: "Bronze", threshold: 1 },
      { name: "Silber", threshold: 5 },
      { name: "Gold", threshold: 15 },
      { name: "Platin", threshold: 30 }
    ]
  },
  {
    id: "correctAnswers",
    label: "Korrekt beantwortete Fragen",
    valueGetter: (profile) => Number(profile.totalScore || 0),
    tiers: [
      { name: "Bronze", threshold: 25 },
      { name: "Silber", threshold: 100 },
      { name: "Gold", threshold: 300 },
      { name: "Platin", threshold: 750 }
    ]
  },
  {
    id: "bestRound",
    label: "Starke Runde",
    valueGetter: (profile) => Number(profile.bestRound || 0),
    tiers: [
      { name: "Bronze", threshold: 7 },
      { name: "Silber", threshold: 8 },
      { name: "Gold", threshold: 9 },
      { name: "Platin", threshold: 10 }
    ]
  }
];

if (!Array.isArray(questionPool) || questionPool.length < QUESTIONS_PER_ROUND) {
  throw new Error("Der Fragenpool fehlt oder enthält weniger als 10 Fragen. Bitte prüfe questions.js.");
}

let roundQuestions = [];
let questionIndex = 0;
let score = 0;
let selectedAnswer = null;
let displayedAnswers = [];
let answered = false;
let isStartingRound = false;
let activeProfileId = null;
let profilesCache = [];
let syncReady = false;
let syncQueue = Promise.resolve();

const welcomeScreen = document.querySelector("#welcome-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const createProfileForm = document.querySelector("#create-profile-form");
const nameInput = document.querySelector("#player-name");
const profileMessage = document.querySelector("#profile-message");
const profilesList = document.querySelector("#profiles-list");
const syncMessage = document.querySelector("#sync-message");
const jsonbinConfigForm = document.querySelector("#jsonbin-config-form");
const jsonbinKeyInput = document.querySelector("#jsonbin-access-key");
const syncButton = document.querySelector("#sync-btn");
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
const roundAchievementProgress = document.querySelector("#round-achievement-progress");
const achievementModal = document.querySelector("#achievement-modal");
const achievementModalTitle = document.querySelector("#achievement-modal-title");
const achievementModalContent = document.querySelector("#achievement-modal-content");
const achievementCloseButton = document.querySelector(".achievement-close-btn");

function createProfile(name) {
  return {
    id: globalThis.crypto?.randomUUID?.() || `profile-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    streak: 0,
    lastPlayedDate: "",
    totalRounds: 0,
    perfectRounds: 0,
    bestRound: 0,
    lastResult: 0,
    totalScore: 0,
    questionCounts: {}
  };
}

function readLocalProfiles() {
  try {
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || "[]");
    if (Array.isArray(profiles) && profiles.length > 0) return profiles;
  } catch (error) {
    // Try the previous single-profile format below.
  }

  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_PROFILE_KEY) || "null");
    if (!legacy?.name) return [];
    return [{ ...createProfile(legacy.name), ...legacy }];
  } catch (error) {
    return [];
  }
}

function getAccessKey() {
  return localStorage.getItem(JSONBIN_ACCESS_KEY_STORAGE) || "";
}

function setSyncMessage(message, isError = false) {
  syncMessage.textContent = message;
  syncMessage.classList.toggle("sync-error", isError);
}

async function jsonBinRequest(url, options = {}) {
  const accessKey = getAccessKey();
  if (!accessKey) throw new Error("Bitte trage zuerst deinen JSONbin Access Key ein.");

  const response = await fetch(url, {
    ...options,
    headers: {
      "X-Access-Key": accessKey,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    let detail = "";
    try {
      const body = await response.json();
      detail = body.message || body.error || "";
    } catch (error) {
      // The service may return a non-JSON error response.
    }
    throw new Error(detail || `JSONbin antwortet mit HTTP ${response.status}.`);
  }
  return response.json();
}

async function fetchRemoteProfiles() {
  const response = await jsonBinRequest(`${JSONBIN_API_URL}/latest`);
  const profiles = response?.record?.profiles;
  if (!Array.isArray(profiles)) {
    throw new Error("Der Bin hat ein unerwartetes Format. Erwartet wird { profiles: [] }.");
  }
  return profiles;
}

async function saveRemoteProfiles(profiles) {
  await jsonBinRequest(JSONBIN_API_URL, {
    method: "PUT",
    body: JSON.stringify({ profiles })
  });
}

function cacheProfiles(profiles) {
  profilesCache = profiles;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  renderProfiles();
}

async function initializeCloud() {
  const accessKey = getAccessKey();
  if (!accessKey) {
    syncReady = false;
    syncButton.disabled = true;
    createProfileForm.querySelector("button[type='submit']").disabled = true;
    setSyncMessage("JSONbin-Key fehlt. Gib den Key ein und drücke Verbinden.");
    renderProfiles();
    return;
  }

  syncReady = false;
  syncButton.disabled = true;
  createProfileForm.querySelector("button[type='submit']").disabled = true;
  setSyncMessage("Profile werden geladen …");

  try {
    let profiles = await fetchRemoteProfiles();
    if (profiles.length === 0) {
      const localProfiles = readLocalProfiles();
      if (localProfiles.length > 0) {
        await saveRemoteProfiles(localProfiles);
        profiles = localProfiles;
        setSyncMessage("Lokale Profile wurden in den gemeinsamen Bin übernommen.");
      }
    }

    cacheProfiles(profiles);
    syncReady = true;
    syncButton.disabled = false;
    createProfileForm.querySelector("button[type='submit']").disabled = false;
    if (!syncMessage.textContent.startsWith("Lokale Profile")) {
      setSyncMessage("Mit JSONbin synchronisiert.");
    }
    renderProfiles();
  } catch (error) {
    syncReady = false;
    syncButton.disabled = false;
    createProfileForm.querySelector("button[type='submit']").disabled = true;
    setSyncMessage(`Synchronisierung fehlgeschlagen: ${error.message}`, true);
    renderProfiles();
  }
}

async function changeProfiles(transform) {
  const operation = syncQueue.then(async () => {
    if (!syncReady) throw new Error("Bitte verbinde zuerst JSONbin.");
    const latestProfiles = await fetchRemoteProfiles();
    const nextProfiles = transform(latestProfiles);
    await saveRemoteProfiles(nextProfiles);
    cacheProfiles(nextProfiles);
    setSyncMessage("Änderungen wurden synchronisiert.");
    return nextProfiles;
  });
  syncQueue = operation.catch(() => {});
  return operation;
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

function getAchievementState(profile, achievement) {
  const value = achievement.valueGetter(profile);
  const tiers = achievement.tiers;
  let reachedIndex = -1;

  for (let index = 0; index < tiers.length; index += 1) {
    if (value >= tiers[index].threshold) reachedIndex = index;
  }

  const currentTier = reachedIndex >= 0 ? tiers[reachedIndex] : null;
  const nextTier = reachedIndex < tiers.length - 1 ? tiers[reachedIndex + 1] : null;
  const progress = nextTier ? Math.min(100, Math.max(0, (value / nextTier.threshold) * 100)) : 100;

  return {
    ...achievement,
    value,
    currentTierName: currentTier ? currentTier.name : "Noch kein",
    currentThreshold: currentTier ? currentTier.threshold : 0,
    nextTier,
    progress,
    nextTarget: nextTier ? nextTier.threshold : null,
    reached: currentTier !== null,
    labelText: nextTier ? `${currentTier ? currentTier.name : "Noch kein"} → ${nextTier.name}` : `${currentTier ? currentTier.name : "Noch kein"} erreicht`
  };
}

function renderAchievementCard(state) {
  const card = document.createElement("div");
  card.className = "achievement-card";

  const header = document.createElement("div");
  header.className = "achievement-card-header";

  const title = document.createElement("strong");
  title.textContent = state.label;

  const badge = document.createElement("span");
  badge.className = "achievement-badge";
  badge.textContent = state.currentTierName === "Noch kein" ? "Start" : state.currentTierName;

  header.append(title, badge);

  const status = document.createElement("p");
  status.className = "achievement-status";
  status.textContent = state.nextTier ? `${state.value} / ${state.nextTier.threshold} Punkte` : `${state.value} erreicht`;

  const bar = document.createElement("div");
  bar.className = "achievement-progress-track";
  const fill = document.createElement("div");
  fill.className = "achievement-progress-fill";
  fill.style.width = `${state.progress}%`;
  bar.append(fill);

  const note = document.createElement("small");
  note.className = "achievement-note";
  note.textContent = state.nextTier ? `Noch ${Math.max(0, state.nextTier.threshold - state.value)} bis ${state.nextTier.name}` : "Maximal erreicht";

  card.append(header, status, bar, note);
  return card;
}

function getAchievementSummary(profile, limit = 3) {
  return ACHIEVEMENT_DEFINITIONS
    .map((achievement) => getAchievementState(profile, achievement))
    .sort((left, right) => {
      const leftGap = left.nextTier ? Math.max(0, left.nextTier.threshold - left.value) : Number.MAX_SAFE_INTEGER;
      const rightGap = right.nextTier ? Math.max(0, right.nextTier.threshold - right.value) : Number.MAX_SAFE_INTEGER;
      if (leftGap !== rightGap) return leftGap - rightGap;
      return right.value - left.value;
    })
    .slice(0, limit);
}

function openAchievementModal(profile) {
  if (!profile) return;
  achievementModalTitle.textContent = `Erfolge von ${profile.name}`;
  achievementModalContent.replaceChildren(
    ...ACHIEVEMENT_DEFINITIONS.map((achievement) => renderAchievementCard(getAchievementState(profile, achievement)))
  );
  achievementModal.classList.remove("hidden");
  achievementModal.setAttribute("aria-hidden", "false");
}

function closeAchievementModal() {
  achievementModal.classList.add("hidden");
  achievementModal.setAttribute("aria-hidden", "true");
}

async function updateProfile(profileId, updater) {
  return changeProfiles((profiles) => profiles.map((profile) =>
    profile.id === profileId ? updater(profile) : profile
  ));
}

function renderProfiles() {
  profilesList.replaceChildren();

  if (profilesCache.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-profiles";
    empty.textContent = syncReady ? "Noch keine Profile angelegt." : "Profile erscheinen nach der Verbindung mit JSONbin.";
    profilesList.append(empty);
    return;
  }

  profilesCache.forEach((profile) => {
    const card = document.createElement("article");
    card.className = "profile-card";
    const title = document.createElement("h2");
    title.className = "profile-card-title";
    title.textContent = profile.name;

    const stats = document.createElement("div");
    stats.className = "profile-grid";
    stats.append(
      makeStat("Gespielte Runden", String(profile.totalRounds || 0)),
      makeStat("Perfekte Runden", String(profile.perfectRounds || 0)),
      makeStat("Gesamtergebnis", `${profile.totalScore || 0}/${(profile.totalRounds || 0) * QUESTIONS_PER_ROUND}`)
    );

    const achievementsButton = document.createElement("button");
    achievementsButton.className = "secondary-button achievement-button";
    achievementsButton.type = "button";
    achievementsButton.textContent = "Erfolge";
    achievementsButton.addEventListener("click", () => openAchievementModal(profile));

    const start = document.createElement("button");
    start.className = "primary-button profile-start-button";
    start.type = "button";
    start.textContent = "Quiz starten";
    start.disabled = !syncReady;
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
    reset.disabled = !syncReady;
    reset.addEventListener("click", async () => {
      if (!window.confirm(`Möchtest du die Statistik von ${profile.name} zurücksetzen?`)) return;
      try {
        await updateProfile(profile.id, (current) => ({
          ...current,
          streak: 0,
          lastPlayedDate: "",
          totalRounds: 0,
          perfectRounds: 0,
          bestRound: 0,
          lastResult: 0,
          totalScore: 0,
          questionCounts: {}
        }));
      } catch (error) {
        setSyncMessage(`Änderung fehlgeschlagen: ${error.message}`, true);
      }
    });

    const remove = document.createElement("button");
    remove.className = "secondary-button delete-profile-button";
    remove.type = "button";
    remove.textContent = "Profil löschen";
    remove.disabled = !syncReady;
    remove.addEventListener("click", async () => {
      if (!window.confirm(`Möchtest du das Profil ${profile.name} wirklich löschen?`)) return;
      try {
        await changeProfiles((profiles) => profiles.filter((current) => current.id !== profile.id));
        if (activeProfileId === profile.id) activeProfileId = null;
      } catch (error) {
        setSyncMessage(`Löschen fehlgeschlagen: ${error.message}`, true);
      }
    });

    actions.append(reset, remove);
    card.append(title, stats, achievementsButton, start, actions);
    profilesList.append(card);
  });
}

async function handleCreateProfile(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name) {
    profileMessage.textContent = "Bitte gib zuerst einen Namen ein.";
    nameInput.focus();
    return;
  }

  try {
    let duplicate = false;
    await changeProfiles((profiles) => {
      duplicate = profiles.some((profile) => profile.name.toLocaleLowerCase() === name.toLocaleLowerCase());
      return duplicate ? profiles : [...profiles, createProfile(name)];
    });
    if (duplicate) {
      profileMessage.textContent = "Dieses Profil gibt es bereits.";
      return;
    }
    nameInput.value = "";
    profileMessage.textContent = `Profil „${name}“ wurde angelegt.`;
  } catch (error) {
    profileMessage.textContent = `Profil konnte nicht gespeichert werden: ${error.message}`;
  }
}

function shuffle(items) {
  const cloned = [...items];
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[swap]] = [cloned[swap], cloned[index]];
  }
  return cloned;
}

function selectWeightedQuestions(pool, questionCounts, amount) {
  const remaining = [...pool];
  const selected = [];

  while (selected.length < amount && remaining.length > 0) {
    const weights = remaining.map((question) => {
      const count = Math.max(0, Number(questionCounts?.[question.question]) || 0);
      return 1 / (count + 1);
    });
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let choice = Math.random() * totalWeight;
    let selectedIndex = weights.length - 1;

    for (let index = 0; index < weights.length; index += 1) {
      choice -= weights[index];
      if (choice < 0) {
        selectedIndex = index;
        break;
      }
    }

    selected.push(remaining.splice(selectedIndex, 1)[0]);
  }

  return selected;
}

async function startNewRound() {
  if (!activeProfileId || isStartingRound) return;
  isStartingRound = true;

  try {
    const profile = profilesCache.find((current) => current.id === activeProfileId);
    if (!profile) throw new Error("Das Profil konnte nicht gefunden werden.");

    const existingCounts = profile.questionCounts || {};
    roundQuestions = selectWeightedQuestions(questionPool, existingCounts, QUESTIONS_PER_ROUND);
    const questionsThisRound = roundQuestions.map((question) => question.question);

    await updateProfile(activeProfileId, (current) => {
      const questionCounts = { ...(current.questionCounts || {}) };
      questionsThisRound.forEach((questionId) => {
        questionCounts[questionId] = (Number(questionCounts[questionId]) || 0) + 1;
      });
      return { ...current, questionCounts };
    });

    questionIndex = 0;
    score = 0;
    showScreen(quizScreen);
    renderQuestion();
    questionElement.focus();
    setSyncMessage("Fragen dieser Runde wurden gespeichert.");
  } catch (error) {
    setSyncMessage(`Runde konnte nicht gestartet werden: ${error.message}`, true);
  } finally {
    isStartingRound = false;
  }
}

function renderQuestion() {
  const item = roundQuestions[questionIndex];
  selectedAnswer = null;
  answered = false;
  displayedAnswers = shuffle(item.answers.map((answer, originalIndex) => ({ answer, originalIndex })));
  categoryElement.textContent = item.category;
  progressElement.textContent = `Frage ${questionIndex + 1} von ${QUESTIONS_PER_ROUND}`;
  progressFill.style.width = `${((questionIndex + 1) / QUESTIONS_PER_ROUND) * 100}%`;
  questionElement.textContent = item.question;
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent = "Antwort prüfen";
  answersElement.replaceChildren();

  displayedAnswers.forEach(({ answer }, index) => {
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
  const correctIndex = displayedAnswers.findIndex(({ originalIndex }) => originalIndex === roundQuestions[questionIndex].correct);
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

async function recordRoundResult() {
  const today = new Date().toISOString().slice(0, 10);
  await updateProfile(activeProfileId, (profile) => {
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

    const perfectRounds = (profile.perfectRounds || 0) + (score === QUESTIONS_PER_ROUND ? 1 : 0);
    const bestRound = Math.max(profile.bestRound || 0, score);

    return {
      ...profile,
      streak,
      lastPlayedDate: today,
      totalRounds: (profile.totalRounds || 0) + 1,
      perfectRounds,
      bestRound,
      lastResult: score,
      totalScore: (profile.totalScore || 0) + score
    };
  });
}

function renderRoundAchievements(profile) {
  if (!profile || !roundAchievementProgress) return;
  const achievements = getAchievementSummary(profile, 3);
  roundAchievementProgress.replaceChildren();

  if (achievements.length === 0) {
    const empty = document.createElement("p");
    empty.className = "achievement-empty";
    empty.textContent = "Noch keine Erfolge erreicht.";
    roundAchievementProgress.append(empty);
    return;
  }

  const title = document.createElement("h3");
  title.className = "achievement-panel-title";
  title.textContent = "Erfolge kurz vorm Ziel";
  roundAchievementProgress.append(title);

  achievements.forEach((achievement) => {
    roundAchievementProgress.append(renderAchievementCard(achievement));
  });
}

async function showResult() {
  try {
    await recordRoundResult();
    setSyncMessage("Ergebnis wurde mit JSONbin synchronisiert.");
  } catch (error) {
    setSyncMessage(`Ergebnis konnte nicht synchronisiert werden: ${error.message}`, true);
  }

  const profile = profilesCache.find((current) => current.id === activeProfileId) || null;
  renderRoundAchievements(profile);

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

jsonbinConfigForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const accessKey = jsonbinKeyInput.value.trim();
  if (!accessKey) {
    setSyncMessage("Bitte trage einen JSONbin Access Key ein.", true);
    return;
  }
  localStorage.setItem(JSONBIN_ACCESS_KEY_STORAGE, accessKey);
  jsonbinKeyInput.value = "";
  await initializeCloud();
});

createProfileForm.addEventListener("submit", handleCreateProfile);
nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", startNewRound);
syncButton.addEventListener("click", initializeCloud);
document.querySelector("#home-btn").addEventListener("click", () => {
  activeProfileId = null;
  showScreen(welcomeScreen);
  document.querySelector("#create-profile-btn").focus();
});

achievementCloseButton.addEventListener("click", closeAchievementModal);
achievementModal.addEventListener("click", (event) => {
  if (event.target === achievementModal) closeAchievementModal();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !achievementModal.classList.contains("hidden")) closeAchievementModal();
});
window.addEventListener("focus", () => {
  if (syncReady) initializeCloud();
});

profilesCache = readLocalProfiles();
renderProfiles();
showScreen(welcomeScreen);
if (getAccessKey()) {
  initializeCloud();
} else {
  jsonbinConfigForm.requestSubmit();
}

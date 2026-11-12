(() => {
  const questions = Array.isArray(window.examQuestionPool) ? window.examQuestionPool : [];
  const launchButton = document.querySelector("#exam-quiz-start");
  const availability = document.querySelector("#exam-quiz-availability");
  const welcomeScreen = document.querySelector("#welcome-screen");
  const quizScreen = document.querySelector("#quiz-screen");
  const resultScreen = document.querySelector("#result-screen");
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
  const homeButton = document.querySelector("#home-btn");
  const achievementProgress = document.querySelector("#round-achievement-progress");

  const validQuestions = questions.filter((item) =>
    item && typeof item.category === "string" && typeof item.question === "string" &&
    Array.isArray(item.answers) && item.answers.length >= 2 &&
    Number.isInteger(item.correct) && item.correct >= 0 && item.correct < item.answers.length
  );
  let isExamQuiz = false;
  let examQuestions = [];
  let index = 0;
  let score = 0;
  let selectedAnswer = null;
  let displayedAnswers = [];
  let answered = false;

  function updateAvailability() {
    const count = validQuestions.length;
    launchButton.disabled = count < 10;
    availability.textContent = count < 10
      ? `Noch keine Runde möglich: In Pruefungsfragen.js sind ${count} von mindestens 10 gültigen Fragen eingetragen.`
      : `${count} Prüfungsfragen verfügbar. Deine Runde hat 10 Fragen.`;
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function show(screen) {
    [welcomeScreen, quizScreen, resultScreen].forEach((item) => {
      const active = item === screen;
      item.classList.toggle("active", active);
      item.classList.toggle("hidden", !active);
    });
  }

  function renderQuestion() {
    const question = examQuestions[index];
    selectedAnswer = null;
    answered = false;
    displayedAnswers = shuffle(question.answers.map((answer, originalIndex) => ({ answer, originalIndex })));
    categoryElement.textContent = question.category;
    progressElement.textContent = `Frage ${index + 1} von 10`;
    progressFill.style.width = `${((index + 1) / 10) * 100}%`;
    questionElement.textContent = question.question;
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    answersElement.replaceChildren();
    nextButton.disabled = true;
    nextButton.textContent = "Antwort prüfen";

    displayedAnswers.forEach(({ answer }, answerIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.setAttribute("aria-pressed", "false");
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = String.fromCharCode(65 + answerIndex);
      const text = document.createElement("span");
      text.textContent = answer;
      button.append(letter, text);
      button.addEventListener("click", () => {
        if (answered) return;
        selectedAnswer = answerIndex;
        answersElement.querySelectorAll(".answer-button").forEach((candidate, candidateIndex) => {
          candidate.classList.toggle("selected", candidateIndex === answerIndex);
          candidate.setAttribute("aria-pressed", String(candidateIndex === answerIndex));
        });
        nextButton.disabled = false;
      });
      answersElement.append(button);
    });
  }

  function startRound() {
    if (validQuestions.length < 10) return;
    isExamQuiz = true;
    examQuestions = shuffle(validQuestions).slice(0, 10);
    index = 0;
    score = 0;
    if (achievementProgress) achievementProgress.classList.add("hidden");
    show(quizScreen);
    renderQuestion();
    questionElement.focus();
  }

  function submitAnswer() {
    if (!answered) {
      if (selectedAnswer === null) return;
      answered = true;
      const correctIndex = displayedAnswers.findIndex(({ originalIndex }) => originalIndex === examQuestions[index].correct);
      answersElement.querySelectorAll(".answer-button").forEach((button, answerIndex) => {
        button.disabled = true;
        if (answerIndex === correctIndex) button.classList.add("correct");
        if (answerIndex === selectedAnswer && answerIndex !== correctIndex) button.classList.add("wrong");
      });
      if (selectedAnswer === correctIndex) {
        score += 1;
        feedbackElement.textContent = "Richtig! Sehr gut! 🎉";
        feedbackElement.classList.add("good");
      } else {
        feedbackElement.textContent = "Fast! Die grüne Antwort ist richtig. Weiter geht’s!";
        feedbackElement.classList.add("try-again");
      }
      nextButton.textContent = index === 9 ? "Ergebnis ansehen" : "Nächste Frage";
      return;
    }

    if (index < 9) {
      index += 1;
      renderQuestion();
      questionElement.focus();
    } else {
      showResult();
    }
  }

  function showResult() {
    isExamQuiz = true;
    if (achievementProgress) achievementProgress.classList.add("hidden");
    scoreText.textContent = `Du hast ${score} von 10 Punkten erreicht.`;
    resultTitle.textContent = score === 10 ? "Perfekt vorbereitet! 🌟" : score >= 7 ? "Richtig stark! 🎉" : score >= 3 ? "Gut geübt! 💪" : "Weiter üben! 🌱";
    resultMessage.textContent = "Diese Vorbereitungsrunde wird nicht in Statistiken oder Erfolgen gespeichert.";
    restartButton.textContent = "Vorbereitungsrunde wiederholen";
    show(resultScreen);
    restartButton.focus();
  }

  launchButton.addEventListener("click", startRound);
  document.addEventListener("click", (event) => {
    if (!isExamQuiz) return;
    if (event.target.closest("#next-btn")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      submitAnswer();
    } else if (event.target.closest("#restart-btn")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      startRound();
    } else if (event.target.closest("#home-btn")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      isExamQuiz = false;
      restartButton.textContent = "Noch einmal spielen";
      if (achievementProgress) achievementProgress.classList.remove("hidden");
      show(welcomeScreen);
      document.querySelector("#create-profile-btn").focus();
    }
  }, true);

  updateAvailability();
})();

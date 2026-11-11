(() => {
  const tierColors = {
    Bronze: "#b87333",
    Silber: "#9299a6",
    Gold: "#e0a800",
    Platin: "#5c91c8"
  };
  const trophySvg = '<svg class="achievement-trophy" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 3h3v3c0 3.2-2.1 5.2-5 5.7A6.2 6.2 0 0 1 13 14v2h4v3H7v-3h4v-2a6.2 6.2 0 0 1-3-2.3C5.1 11.2 3 9.2 3 6V3h3V1h12v2ZM6 5H5v1c0 1.8.8 2.9 2.1 3.5A8 8 0 0 1 6 6V5Zm13 0v1a8 8 0 0 1-1.1 3.5C19.2 8.9 20 7.8 20 6V5h-1Z"/></svg>';

  function renderRoundAchievements(profile) {
    const container = document.querySelector("#round-achievement-progress");
    if (!profile || !container || typeof getAchievementSummary !== "function") return;

    const achievements = getAchievementSummary(profile, 3);
    container.replaceChildren();

    achievements.forEach((achievement, index) => {
      const card = document.createElement("article");
      card.className = "achievement-card result-achievement-card";

      const heading = document.createElement("div");
      heading.className = "achievement-card-header";
      const label = document.createElement("strong");
      label.textContent = achievement.label;
      heading.append(label);

      const amount = document.createElement("p");
      amount.className = "achievement-status";
      amount.textContent = achievement.nextTier
        ? `${achievement.value} / ${achievement.nextTier.threshold}`
        : `${achievement.value} – Platin erreicht`;

      const progressRow = document.createElement("div");
      progressRow.className = "achievement-progress-row";
      const track = document.createElement("div");
      track.className = "achievement-progress-track";
      track.setAttribute("role", "progressbar");
      track.setAttribute("aria-label", `Fortschritt: ${achievement.label}`);
      track.setAttribute("aria-valuemin", "0");
      track.setAttribute("aria-valuemax", "100");
      track.setAttribute("aria-valuenow", String(Math.round(achievement.progress)));

      const fill = document.createElement("div");
      fill.className = "achievement-progress-fill result-achievement-fill";
      const percentage = Math.min(100, Math.max(0, achievement.progress));
      fill.style.width = "0%";
      track.append(fill);

      const nextTierName = achievement.nextTier?.name || achievement.currentTierName || "Bronze";
      const trophy = document.createElement("span");
      trophy.className = `achievement-trophy-wrap tier-${nextTierName.toLowerCase()}`;
      trophy.style.setProperty("--trophy-color", tierColors[nextTierName] || tierColors.Bronze);
      trophy.setAttribute("role", "img");
      trophy.setAttribute("aria-label", `${nextTierName}-Pokal`);
      trophy.innerHTML = trophySvg;
      progressRow.append(track, trophy);

      const next = document.createElement("small");
      next.className = "achievement-note";
      next.textContent = achievement.nextTier
        ? `Noch ${Math.max(0, achievement.nextTier.threshold - achievement.value)} bis ${achievement.nextTier.name}`
        : "Alle Stufen erreicht";

      card.append(heading, amount, progressRow, next);
      container.append(card);

      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          fill.style.width = `${percentage}%`;
        }, index * 80);
      });
    });
  }

  // This script loads after script.js, so this replaces its result-screen renderer.
  window.renderRoundAchievements = renderRoundAchievements;
})();

const ENTER_LABEL = "Полноэкранный режим";
const EXIT_LABEL = "Выйти из полноэкранного";

async function enterFullscreen() {
  await document.documentElement.requestFullscreen();
  await screen.orientation?.lock?.("landscape")?.catch(() => {});
}

export function attachFullscreenToggle(button) {
  if (!document.fullscreenEnabled) {
    button.hidden = true;
    return;
  }

  function renderLabel() {
    button.textContent = document.fullscreenElement ? EXIT_LABEL : ENTER_LABEL;
  }

  button.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      enterFullscreen();
    }
  });
  document.addEventListener("fullscreenchange", renderLabel);

  renderLabel();
}

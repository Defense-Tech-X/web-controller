export function attachModeToggle(button) {
  function setMode(mode) {
    button.dataset.mode = mode;
    button.setAttribute("aria-checked", String(mode === "acro"));
    button.dispatchEvent(new CustomEvent("mode-change", {
      bubbles: true,
      detail: { mode },
    }));
  }

  button.addEventListener("click", () => {
    setMode(button.dataset.mode === "angle" ? "acro" : "angle");
  });

  setMode(button.dataset.mode);
}

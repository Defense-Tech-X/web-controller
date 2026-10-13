export function attachModeToggle(button) {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode === "angle" ? "acro" : "angle";
    button.dataset.mode = mode;
    button.setAttribute("aria-checked", String(mode === "acro"));
    button.dispatchEvent(new CustomEvent("mode-change", {
      bubbles: true,
      detail: { mode },
    }));
  });
}

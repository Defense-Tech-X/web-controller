export function attachScreenInfo(screenTarget, viewportTarget) {
  function render() {
    screenTarget.textContent = `${screen.width} × ${screen.height}`;
    viewportTarget.textContent = `${window.innerWidth} × ${window.innerHeight}`;
  }

  render();
  window.addEventListener("resize", render);
}

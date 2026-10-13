function clampToUnitSquare(x, y) {
  const clamp = (value) => Math.min(1, Math.max(-1, value));
  return { x: clamp(x), y: clamp(y) };
}

export function attachStick(zone) {
  const knob = zone.querySelector(".stick__knob");
  const holdsY = zone.hasAttribute("data-hold-y");
  const position = { x: 0, y: Number(zone.dataset.initialY ?? 0) };
  let drag = null;

  function travelRadius() {
    return (zone.clientWidth - knob.offsetWidth) / 2;
  }

  function renderKnob() {
    const radius = travelRadius();
    knob.style.transform = `translate(${position.x * radius}px, ${-position.y * radius}px)`;
  }

  function updatePosition(next) {
    Object.assign(position, next);
    renderKnob();
    zone.dispatchEvent(new CustomEvent("stick-change", {
      bubbles: true,
      detail: { ...position },
    }));
  }

  function release(event) {
    if (event.pointerId !== drag?.pointerId) return;
    drag = null;
    zone.classList.remove("stick--active");
    updatePosition({ x: 0, y: holdsY ? position.y : 0 });
  }

  zone.addEventListener("pointerdown", (event) => {
    if (drag) return;
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: { ...position },
    };
    zone.setPointerCapture(event.pointerId);
    zone.classList.add("stick--active");
  });

  zone.addEventListener("pointermove", (event) => {
    if (event.pointerId !== drag?.pointerId) return;
    const radius = travelRadius();
    updatePosition(clampToUnitSquare(
      drag.origin.x + (event.clientX - drag.startX) / radius,
      drag.origin.y - (event.clientY - drag.startY) / radius,
    ));
  });

  zone.addEventListener("pointerup", release);
  zone.addEventListener("pointercancel", release);
  window.addEventListener("resize", renderKnob);

  renderKnob();
}

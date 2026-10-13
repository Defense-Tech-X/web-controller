import { FlightMode, VDC, toAxisValue } from "./protocol.js";

const STICK_AXES = Object.freeze({
  left: { x: "yaw", y: "throttle" },
  right: { x: "roll", y: "pitch" },
});

export function trackControllerState(root) {
  const state = {
    throttle: VDC.axisCenter,
    yaw: VDC.axisCenter,
    pitch: VDC.axisCenter,
    roll: VDC.axisCenter,
    flightMode: FlightMode.angle,
  };

  root.addEventListener("stick-change", (event) => {
    const axes = STICK_AXES[event.target.dataset.stick];
    state[axes.x] = toAxisValue(event.detail.x);
    state[axes.y] = toAxisValue(event.detail.y);
  });

  root.addEventListener("mode-change", (event) => {
    state.flightMode = FlightMode[event.detail.mode];
  });

  return state;
}

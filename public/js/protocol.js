// Mirror of driver/src/controller_protocol.h: keep both files in sync.

export const VDC = Object.freeze({
  feederReportId: 2,
  reportLength: 10,
  axisMin: 0,
  axisCenter: 16384,
  axisMax: 32767,
});

export const FlightMode = Object.freeze({ angle: 0, acro: 1 });

export function toAxisValue(normalized) {
  return Math.round(((normalized + 1) / 2) * (VDC.axisMax - VDC.axisMin) + VDC.axisMin);
}

export function encodeStateReport({ throttle, yaw, pitch, roll, flightMode }) {
  const report = new Uint8Array(VDC.reportLength);
  const view = new DataView(report.buffer);
  view.setUint8(0, VDC.feederReportId);
  view.setUint16(1, throttle, true);
  view.setUint16(3, yaw, true);
  view.setUint16(5, pitch, true);
  view.setUint16(7, roll, true);
  view.setUint8(9, flightMode);
  return report;
}

import mqtt from "https://cdn.jsdelivr.net/npm/mqtt@5.16.0/dist/mqtt.esm.js";
import { encodeStateReport } from "./protocol.js";

export function startReportPublisher({ url, topic, state }) {
  const client = mqtt.connect(url, { queueQoSZero: false });

  function publishFrame() {
    if (client.connected) {
      client.publish(topic, encodeStateReport(state));
    }
    requestAnimationFrame(publishFrame);
  }

  requestAnimationFrame(publishFrame);
  return client;
}

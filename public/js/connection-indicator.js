const STATUS_LABELS = Object.freeze({
  connecting: "Брокер: подключение…",
  online: "Брокер: на связи",
  offline: "Брокер: нет связи",
});

export function attachConnectionIndicator(element, client) {
  function setStatus(status) {
    element.dataset.status = status;
    element.textContent = STATUS_LABELS[status];
  }

  client.on("connect", () => setStatus("online"));
  client.on("reconnect", () => setStatus("connecting"));
  client.on("close", () => setStatus("offline"));

  setStatus(client.connected ? "online" : "connecting");
}

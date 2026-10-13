import { MQTT_TOPIC, MQTT_URL } from "./config.js";
import { trackControllerState } from "./controller-state.js";
import { startReportPublisher } from "./report-publisher.js";
import { attachConnectionIndicator } from "./connection-indicator.js";
import { attachStick } from "./stick.js";
import { attachModeToggle } from "./mode-toggle.js";
import { attachFullscreenToggle } from "./fullscreen-toggle.js";

const state = trackControllerState(document);

document.querySelectorAll(".stick").forEach(attachStick);
attachModeToggle(document.querySelector(".mode-toggle"));
attachFullscreenToggle(document.querySelector(".fullscreen-toggle"));

const client = startReportPublisher({ url: MQTT_URL, topic: MQTT_TOPIC, state });
attachConnectionIndicator(document.querySelector(".connection-indicator"), client);

document.addEventListener("contextmenu", (event) => event.preventDefault());

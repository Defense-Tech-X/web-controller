import { attachStick } from "./stick.js";
import { attachModeToggle } from "./mode-toggle.js";
import { attachFullscreenToggle } from "./fullscreen-toggle.js";
import { attachScreenInfo } from "./screen-info.js";

document.querySelectorAll(".stick").forEach(attachStick);
attachModeToggle(document.querySelector(".mode-toggle"));
attachFullscreenToggle(document.querySelector(".fullscreen-toggle"));
attachScreenInfo(
  document.getElementById("screen-resolution"),
  document.getElementById("viewport-size"),
);

document.addEventListener("contextmenu", (event) => event.preventDefault());

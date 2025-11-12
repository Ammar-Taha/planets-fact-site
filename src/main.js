import "./index.css";
import planetsData from "./data.js";

// Module imports
import { dom } from "./modules/dom.js";
import {
  setPlanetColor,
  updatePageTitle,
  setNavLinkColors,
} from "./modules/planetUtils.js";
import { renderPlanetView } from "./modules/planetView.js";
import {
  attachTabListeners,
  initNavigationHandlers,
  initMobileSidebar,
} from "./modules/eventHandlers.js";

// Deep clone the planets data to avoid mutations
const planets = structuredClone(planetsData);

// Set base URL for CSS background image
const BASE_URL = import.meta.env.BASE_URL;
document.documentElement.style.setProperty("--background-stars-url", `url("${BASE_URL}assets/background-stars.svg")`);

// Initialize: Load Earth view at page load
renderPlanetView(
  "overview",
  planets,
  attachTabListeners,
  setPlanetColor,
  updatePageTitle,
  dom
);
setNavLinkColors(planets);

// Initialize event handlers
initNavigationHandlers(
  planets,
  renderPlanetView,
  attachTabListeners,
  setPlanetColor,
  updatePageTitle
);
initMobileSidebar();

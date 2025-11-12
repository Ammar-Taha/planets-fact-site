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

import { planetColors } from "./constants.js";
import { dom } from "./dom.js";

/**
 * Get the currently active planet from the navigation
 * @param {Array} planets - Array of planet data
 * @returns {Object} Active planet data object
 */
export function getActivePlanet(planets) {
  // Find the active planet from header nav links
  const activePlanetLink = Array.from(dom.header.navLinks).find((link) =>
    link.classList.contains("active-planet")
  );

  // Get planet name from data attribute, default to "earth"
  const planetName = activePlanetLink
    ? activePlanetLink.getAttribute("data-planet")
    : "earth";

  // Find planet data from planets array (case-insensitive match)
  const planetData = planets.find(
    (planet) => planet.name.toLowerCase() === planetName.toLowerCase()
  );

  // If planet not found, default to Earth
  return planetData || planets.find((p) => p.name.toLowerCase() === "earth");
}

/**
 * Set the planet color CSS custom property
 * @param {string} planetName - Name of the planet
 */
export function setPlanetColor(planetName) {
  const color = planetColors[planetName] || planetColors.Earth;
  document.documentElement.style.setProperty("--planet-color", color);
}

/**
 * Update the page title with the current planet name
 * @param {string} planetName - Name of the planet
 */
export function updatePageTitle(planetName) {
  document.title = `Planets Fact Site | ${planetName}`;
}

/**
 * Set planet colors for navigation links
 * @param {Array} planets - Array of planet data
 */
export function setNavLinkColors(planets) {
  dom.header.navLinks.forEach((link) => {
    const planetNameAttr = link.getAttribute("data-planet");
    if (!planetNameAttr) return;

    // Find planet data to get the exact name (for case matching)
    const planetData = planets.find(
      (planet) => planet.name.toLowerCase() === planetNameAttr.toLowerCase()
    );

    if (planetData) {
      const planetColor = planetColors[planetData.name] || planetColors.Earth;
      link.style.setProperty("--nav-link-color", planetColor);
    }
  });
}


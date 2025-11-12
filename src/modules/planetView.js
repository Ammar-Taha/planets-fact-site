import { getActivePlanet } from "./planetUtils.js";
import { dom } from "./dom.js";

/**
 * Create HTML markup for planet view
 * @param {Object} planetData - Planet data object
 * @param {string} activeTab - Active tab name (overview, structure, geology)
 * @returns {string} HTML string
 */
export function createPlanetView(planetData, activeTab = "overview") {
  const content = planetData[activeTab];

  // Determine which image to use based on active tab
  const imageMap = {
    overview: planetData.images.planet,
    structure: planetData.images.internal,
    geology: planetData.images.planet, // Base image for geology
  };
  const imageSrc = imageMap[activeTab] || planetData.images.planet;

  // For geology tab, create composite with overlay
  const isGeology = activeTab === "geology";
  const geologyOverlay = isGeology
    ? `<img
        src="${planetData.images.geology}"
        alt="${planetData.name} geology"
        class="planet__img-geology"
      />`
    : "";

  return `
    <section class="planet container">
      <figure class="planet__figure ${
        isGeology ? "planet__figure--geology" : ""
      }">
        <img
          src="${imageSrc}"
          alt="${planetData.name}"
          class="planet__img"
        />
        ${geologyOverlay}
      </figure>
      <div class="planet__header">
        <h1 class="planet__title">${planetData.name}</h1>
        <p class="planet__description">
          ${content.content}
        </p>
        <p class="planet__source">
          Source :
          <a
            href="${content.source}"
            target="_blank"
            class="planet__source-link"
          >
            Wikipedia
            <img
              src="${import.meta.env.BASE_URL}assets/icon-source.svg"
              alt="source"
              class="planet__source-icon"
            />
          </a>
        </p>
      </div>
      <div class="planet__tabs">
        <button class="planet__tabs-button ${
          activeTab === "overview" ? "active" : ""
        }">
          <p>
            <span class="num-span">01</span
            ><span class="text-span">Overview</span>
          </p>
        </button>
        <button class="planet__tabs-button ${
          activeTab === "structure" ? "active" : ""
        }">
          <p>
            <span class="num-span">02</span
            ><span>Internal</span>&nbsp;Structure
          </p>
        </button>
        <button class="planet__tabs-button ${
          activeTab === "geology" ? "active" : ""
        }">
          <p>
            <span class="num-span">03</span>Surface&nbsp;<span>Geology</span>
          </p>
        </button>
      </div>
    </section>
    <section class="planet-stats container">
      <div class="planet-stats__item">
        <p class="planet-stats__item-title">Rotation Time</p>
        <p class="planet-stats__item-value">${planetData.rotation}</p>
      </div>
      <div class="planet-stats__item">
        <p class="planet-stats__item-title">Revolution Time</p>
        <p class="planet-stats__item-value">${planetData.revolution}</p>
      </div>
      <div class="planet-stats__item">
        <p class="planet-stats__item-title">Radius</p>
        <p class="planet-stats__item-value">${planetData.radius}</p>
      </div>
      <div class="planet-stats__item">
        <p class="planet-stats__item-title">Average Temp.</p>
        <p class="planet-stats__item-value">${planetData.temperature}</p>
      </div>
    </section>
  `;
}

/**
 * Update planet tab content without full re-render
 * @param {string} activeTab - Active tab name
 * @param {Array} planets - Array of planet data
 */
export function updatePlanetTab(activeTab, planets) {
  const selectedPlanet = getActivePlanet(planets);
  const content = selectedPlanet[activeTab];
  const figure = document.querySelector(".planet__figure");
  const planetImg = document.querySelector(".planet__img");

  // Update base image
  const imageMap = {
    overview: selectedPlanet.images.planet,
    structure: selectedPlanet.images.internal,
    geology: selectedPlanet.images.planet, // Base image for geology
  };

  if (planetImg) {
    planetImg.src = imageMap[activeTab] || selectedPlanet.images.planet;
  }

  // Handle geology overlay
  const isGeology = activeTab === "geology";
  let geologyImg = document.querySelector(".planet__img-geology");

  if (isGeology) {
    // Add geology class to figure if not present
    if (figure && !figure.classList.contains("planet__figure--geology")) {
      figure.classList.add("planet__figure--geology");
    }

    // Create geology overlay if it doesn't exist
    if (!geologyImg && figure) {
      geologyImg = document.createElement("img");
      geologyImg.src = selectedPlanet.images.geology;
      geologyImg.alt = `${selectedPlanet.name} geology`;
      geologyImg.className = "planet__img-geology";
      figure.appendChild(geologyImg);
    } else if (geologyImg) {
      geologyImg.src = selectedPlanet.images.geology;
    }
  } else {
    // Remove geology overlay and class
    if (geologyImg) {
      geologyImg.remove();
    }
    if (figure) {
      figure.classList.remove("planet__figure--geology");
    }
  }

  // Update description
  const description = document.querySelector(".planet__description");
  if (description) {
    description.textContent = content.content;
  }

  // Update source link
  const sourceLink = document.querySelector(".planet__source-link");
  if (sourceLink) {
    sourceLink.href = content.source;
  }
}

/**
 * Render the complete planet view
 * @param {string} activeTab - Active tab name
 * @param {Array} planets - Array of planet data
 * @param {Function} attachTabListeners - Function to attach tab listeners
 * @param {Function} setPlanetColor - Function to set planet color
 * @param {Function} updatePageTitle - Function to update page title
 * @param {Object} dom - DOM element references
 */
export function renderPlanetView(
  activeTab,
  planets,
  attachTabListeners,
  setPlanetColor,
  updatePageTitle,
  dom
) {
  const selectedPlanet = getActivePlanet(planets);

  // Set planet color CSS custom property
  setPlanetColor(selectedPlanet.name);

  // Update page title
  updatePageTitle(selectedPlanet.name);

  // Generate HTML and render to DOM
  const planetView = createPlanetView(selectedPlanet, activeTab);
  dom.app.innerHTML = planetView;

  // Re-attach event listener to the new tabs container
  attachTabListeners(planets);
}


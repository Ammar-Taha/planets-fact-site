import { dom } from "./dom.js";
import { tabMap } from "./constants.js";
import { updatePlanetTab } from "./planetView.js";

// Store the handler function to allow removal
let tabClickHandler = null;

/**
 * Attach event listeners to planet tab buttons
 * @param {Array} planets - Array of planet data
 */
export function attachTabListeners(planets) {
  const tabsContainer = document.querySelector(".planet__tabs");
  if (!tabsContainer) return;

  // Remove existing listener if it exists
  if (tabClickHandler) {
    tabsContainer.removeEventListener("click", tabClickHandler);
  }

  // Create new handler
  tabClickHandler = (e) => {
    const tabButton = e.target.closest(".planet__tabs-button");
    if (!tabButton) return;

    // Get the tab number from the num-span
    const numSpan = tabButton.querySelector(".num-span");
    if (!numSpan) return;

    const tabNumber = numSpan.textContent.trim();
    const activeTab = tabMap[tabNumber];
    if (!activeTab) return;

    // Remove active class from all buttons
    const allButtons = document.querySelectorAll(".planet__tabs-button");
    allButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    tabButton.classList.add("active");

    // Update only the content, image, and source link (no full re-render)
    updatePlanetTab(activeTab, planets);
  };

  // Add the new listener
  tabsContainer.addEventListener("click", tabClickHandler);
}

// Store the navigation handler function to allow removal
let navClickHandler = null;

/**
 * Initialize navigation event handlers
 * @param {Array} planets - Array of planet data
 * @param {Function} renderPlanetView - Function to render planet view
 * @param {Function} attachTabListeners - Function to attach tab listeners
 * @param {Function} setPlanetColor - Function to set planet color
 * @param {Function} updatePageTitle - Function to update page title
 */
export function initNavigationHandlers(
  planets,
  renderPlanetView,
  attachTabListeners,
  setPlanetColor,
  updatePageTitle
) {
  // Remove existing listener if it exists
  if (navClickHandler && dom.header.navList) {
    dom.header.navList.removeEventListener("click", navClickHandler);
  }

  // Event delegation for navigation links
  navClickHandler = (e) => {
    const navLink = e.target.closest(".header__nav-link");
    if (!navLink) return;

    e.preventDefault();

    // Get planet name from text content
    const planetName = navLink.textContent.trim();

    // Find planet data from planets array (case-insensitive match)
    const planetData = planets.find(
      (planet) => planet.name.toLowerCase() === planetName.toLowerCase()
    );

    if (!planetData) return;

    // Remove active class from all nav links
    dom.header.navLinks.forEach((link) =>
      link.classList.remove("active-planet")
    );

    // Add active class to clicked nav link
    navLink.classList.add("active-planet");

    // Close mobile sidebar if open
    const header = document.querySelector(".header");
    if (dom.header.nav && dom.header.nav.classList.contains("is-open")) {
      dom.header.nav.classList.remove("is-open");
      if (header) {
        header.classList.remove("sidebar-open");
      }
    }

    // Render the planet view (defaults to overview tab)
    renderPlanetView(
      "overview",
      planets,
      attachTabListeners,
      setPlanetColor,
      updatePageTitle,
      dom
    );
  };

  // Add the new listener
  if (dom.header.navList) {
    dom.header.navList.addEventListener("click", navClickHandler);
  }
}

/**
 * Toggle mobile sidebar with fixed positioning
 */
export function toggleMobileSidebar() {
  const header = document.querySelector(".header");
  const logo = document.querySelector(".header__logo");
  const hamburger = document.querySelector(".header__hamburger");

  if (dom.header.nav) {
    const isOpening = !dom.header.nav.classList.contains("is-open");

    if (isOpening) {
      // Get current positions BEFORE toggling the class
      if (logo) {
        const logoRect = logo.getBoundingClientRect();
        logo.style.setProperty("--logo-top", `${logoRect.top}px`);
        logo.style.setProperty("--logo-left", `${logoRect.left}px`);
      }
      if (hamburger) {
        const hamburgerRect = hamburger.getBoundingClientRect();
        hamburger.style.setProperty(
          "--hamburger-top",
          `${hamburgerRect.top}px`
        );
        hamburger.style.setProperty(
          "--hamburger-right",
          `${window.innerWidth - hamburgerRect.right}px`
        );
      }
    } else {
      // Remove custom properties when closing
      if (logo) {
        logo.style.removeProperty("--logo-top");
        logo.style.removeProperty("--logo-left");
      }
      if (hamburger) {
        hamburger.style.removeProperty("--hamburger-top");
        hamburger.style.removeProperty("--hamburger-right");
      }
    }

    // Now toggle the class after setting properties
    dom.header.nav.classList.toggle("is-open");

    // Toggle header class for border
    if (header) {
      if (isOpening) {
        header.classList.add("sidebar-open");
      } else {
        header.classList.remove("sidebar-open");
      }
    }
  }
}

/**
 * Initialize mobile sidebar toggle handler
 */
export function initMobileSidebar() {
  if (dom.header.hamburger) {
    dom.header.hamburger.addEventListener("click", toggleMobileSidebar);
  }
}

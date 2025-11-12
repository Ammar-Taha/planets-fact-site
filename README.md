# Planets Fact Site

A modern, interactive web application showcasing detailed information about the planets in our solar system. Built with vanilla JavaScript, CSS, and Vite for optimal performance and developer experience.

![Planets Fact Site Preview](./assets/preview.jpg)

## 🌐 Live Preview

[View Live Site](https://ammar-taha.github.io/planets-fact-site/)

## ✨ Features

- **Interactive Planet Navigation**: Browse through all 8 planets with smooth transitions
- **Three Information Views**: 
  - Overview - General planet information
  - Internal Structure - Detailed internal composition
  - Surface Geology - Surface features and geology
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Dynamic Theming**: Planet-specific color schemes that adapt based on the selected planet
- **Mobile-Friendly Navigation**: Slide-out drawer menu for mobile devices
- **Smooth Animations**: CSS transitions and transforms for enhanced user experience

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: 
  - CSS Grid & Flexbox for layouts
  - CSS Custom Properties (variables) for theming
  - CSS Layers for organized styling
  - Media queries for responsive design
  - Modern CSS features (clamp, custom properties)
- **JavaScript (ES6+)**:
  - ES6 Modules
  - Event Delegation
  - Dynamic DOM manipulation
  - Template literals for HTML generation
- **Vite**: Build tool and development server
- **Modern CSS Reset**: Custom reset for consistent styling

## 📁 Project Structure

```
├── assets/                 # Static assets (images, icons)
├── public/                 # Public assets served by Vite
│   └── assets/            # Production assets
├── src/
│   ├── modules/           # ES6 modules
│   │   ├── constants.js  # Constants and configuration
│   │   ├── dom.js        # DOM element references
│   │   ├── eventHandlers.js  # Event handling logic
│   │   ├── planetUtils.js    # Planet utility functions
│   │   └── planetView.js     # Planet view rendering
│   ├── styles/           # CSS files
│   │   ├── base.css      # Base styles
│   │   ├── tablet.css    # Tablet media queries
│   │   ├── mobile.css    # Mobile media queries
│   │   └── modern-css-reset.css  # CSS reset
│   ├── data.js           # Planet data (ES6 module)
│   ├── index.css         # Main CSS entry point
│   └── main.js           # Application entry point
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages deployment
├── index.html            # Main HTML file
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ammar-taha/planets-fact-site.git
cd planets-fact-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 Responsive Breakpoints

- **Desktop**: Default (1024px and above)
- **Tablet**: 1024px and below
- **Mobile**: 686px and below

## 🎨 Design Features

- **BEM Methodology**: Block Element Modifier naming convention
- **CSS Custom Properties**: Dynamic theming based on active planet
- **Layered CSS Architecture**: Organized styles using CSS layers
- **Fluid Typography**: Using `clamp()` for responsive font sizes
- **Modern UI**: Clean, minimalist design with smooth interactions

## 🌍 Planets Included

1. Mercury
2. Venus
3. Earth
4. Mars
5. Jupiter
6. Saturn
7. Uranus
8. Neptune

Each planet includes:
- Rotation time
- Revolution time
- Radius
- Average temperature
- Three detailed information views

## 🔧 Configuration

### Vite Configuration

The project is configured for GitHub Pages deployment with the base path `/planets-fact-site/`. To change this, update `vite.config.js`:

```javascript
export default defineConfig({
  base: "/your-repo-name/",
});
```

### Asset Paths

All assets are located in the `public/assets/` folder and are automatically handled by Vite. The application uses `import.meta.env.BASE_URL` to correctly resolve asset paths in both development and production.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🚢 Deployment

The project is configured for automatic deployment to GitHub Pages via GitHub Actions. The workflow:

1. Builds the project on push to `main` branch
2. Configures GitHub Pages
3. Deploys to GitHub Pages

Make sure GitHub Pages is enabled in your repository settings (Settings → Pages → Source: GitHub Actions).

## 📄 License

This project is open source and available for learning purposes.

## 🙏 Acknowledgments

- Design inspiration from [Frontend Mentor](https://www.frontendmentor.io/)
- Planet data and images from various space resources
- Built as a practice project for modern web development



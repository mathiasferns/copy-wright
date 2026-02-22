# Copy Capture (`copy-wright`)

A modern, animated landing page for a professional copywriting service. Built with React, Vite, Tailwind CSS, and GSAP, Copy Capture showcases persuasion-focused copywriting services with smooth scroll animations and interactive UI components.

> **Note:** The repository is named `copy-wright` while the application brand is **Copy Capture**. Both names refer to this same project.

## 🚀 Features

- **Animated Hero Section** — Full-screen hero with GSAP entrance animations and a smooth scroll CTA.
- **Interactive Feature Cards** — Three animated cards demonstrating the service's core capabilities:
  - **Buyer Resonance** — Shuffling card stack highlighting buyer psychology principles.
  - **Industry Dominance** — Live typewriter feed simulating copy analysis.
  - **Continuous Optimization** — Animated cursor and calendar for showing ongoing copy updates.
- **Philosophy Section** — Bold statement section with parallax-style imagery.
- **Protocol Section** — Sticky-scroll, three-phase process walkthrough (Discovery, Architecture, Conversion).
- **Email CTA** — Lead capture form integrated with [FormSubmit](https://formsubmit.co/).
- **Responsive Design** — Mobile-first layout using Tailwind CSS.
- **Noise Overlay** — Subtle SVG grain texture for a premium aesthetic.
- **Smart Navbar** — Transparent navbar that transitions to a frosted-glass style on scroll.

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [GSAP + ScrollTrigger](https://gsap.com/) | Scroll-driven animations |
| [Lucide React](https://lucide.dev/) | Icon library |
| [FormSubmit](https://formsubmit.co/) | No-backend email form submission |

### Fonts (via Google Fonts)

- **Plus Jakarta Sans** — Primary sans-serif
- **Outfit** — Body / supporting text
- **Cormorant Garamond** — Decorative / drama headings
- **IBM Plex Mono** — Monospaced UI labels

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/mathiasferns/copy-wright.git
cd copy-wright

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
copy-wright/
├── index.html          # HTML entry point
├── package.json
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind theme (colors, fonts)
├── postcss.config.js   # PostCSS configuration
└── src/
    ├── main.jsx        # React entry point
    ├── index.css       # Global styles & Tailwind directives
    └── App.jsx         # All page sections and components
```

## 🎨 Design Tokens

Defined in `tailwind.config.js`:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2E4036` | Dark green — headings, buttons |
| `accent` | `#CC5833` | Burnt orange — CTAs, highlights |
| `background` | `#F2F0E9` | Off-white — page background |
| `dark` | `#1A1A1A` | Near-black — footer, dark sections |

## 📝 License

This project is private. All rights reserved © Copy Capture.

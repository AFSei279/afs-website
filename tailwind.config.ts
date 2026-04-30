import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // AFS Brand-Farben — orientiert am Logo (dunkles Blau mit Gold-Akzent).
        // Falls die exakten Hex-Werte aus dem Logo abweichen, hier zentral anpassen.
        brand: {
          DEFAULT: "#0F2A44",
          dark: "#081929",
          accent: "#C8A24A",
          "accent-dark": "#A78636",
          ink: "#0B0B0B",
          paper: "#FAFAFA",
          muted: "#5A6573",
          line: "#E5E7EB",
        },
        // Ampel-Farben für den Hardware-Rechner.
        signal: {
          green: "#15803D",
          "green-bg": "#DCFCE7",
          yellow: "#A16207",
          "yellow-bg": "#FEF3C7",
          red: "#B91C1C",
          "red-bg": "#FEE2E2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;

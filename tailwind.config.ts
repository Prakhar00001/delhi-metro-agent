import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        metro: {
          canvas: "#FBFBFA",       // Soft, warm Apple/Claude-style off-white canvas
          card: "#FFFFFF",         // Crisp white panel background layer
          border: "#EAE9E4",       // Extremely soft warm gray border rule
          muted: "#706E6B",        // Accessible descriptive text shade
          dark: "#1A1917",         // True deep gray for optimal crisp text reading
          accent: "#D97706",       // Premium amber accent light marker
        },
      },
      boxShadow: {
        premium: "0 2px 8px -2px rgba(26, 25, 23, 0.04), 0 12px 24px -4px rgba(26, 25, 23, 0.04)",
        focusRing: "0 0 0 3px rgba(217, 119, 6, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
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
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        metro: {
          canvas: "#070A13",       // True deep spatial background
          card: "#111827",         // Elegant dark card plate
          border: "#1F2937",       // Clean layout bounding stroke
          muted: "#9CA3AF",        // Gray text utility asset
          accent: "#10B981",       // Dynamic emerald action color token
          textMain: "#F9FAFB",     // Near-white text contrast
        },
      },
    },
  },
  plugins: [],
};
export default config;
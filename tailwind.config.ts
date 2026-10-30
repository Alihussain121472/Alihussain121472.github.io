// Configures Tailwind CSS theme tokens, fonts, and class-based dark mode.
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#111111",
          light: "#fafafa",
        },
        surface: {
          DEFAULT: "#181818",
          light: "#ffffff",
        },
        accent: {
          DEFAULT: "#00e5ff",
          muted: "#0891b2",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        museum: {
          950: "#090a0f",
          900: "#0f1118",
          850: "#151822",
          800: "#1d212f",
          750: "#24293a",
          700: "#2d3448",
          600: "#414a66",
          500: "#606b8c",
          400: "#8e98b5",
          300: "#bcc3d6",
          200: "#e0e3ed",
          100: "#f3f4f8",
        },
        category: {
          music: "#8b5cf6",
          movie: "#ec4899",
          place: "#10b981",
          purchase: "#f59e0b",
          photo: "#06b6d4",
          message: "#3b82f6",
          search: "#6366f1",
          event: "#f43f5e",
          note: "#eab308",
        },
        gold: {
          DEFAULT: "#e2b170",
          light: "#fae2b8",
          dark: "#a67838",
        }
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

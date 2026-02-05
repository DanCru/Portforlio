/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        valorant: {
          black: "#0f1923",
          dark: "#1f2b38",
          red: "#ff4655",
          white: "#ece8e1",
          gray: "#c7c2bc",
          "blue-gray": "#eef2f5",
        },
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Oswald", "sans-serif"], // Industrial/Gamer headers
        mono: ["JetBrains Mono", "monospace"], // Tech details
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)",
        "dots-pattern": "radial-gradient(#ffffff10 1px, transparent 1px)",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out",
        glitch: "glitch 1s linear infinite",
      },
      keyframes: {
        glitch: {
          "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          500: "#0ea5e9",
          600: "#0284c7",
          900: "#0c4a6e",
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "grid-flow": "gridFlow 20s linear infinite",
      },
    },
  },
  plugins: [],
};

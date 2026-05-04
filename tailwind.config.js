/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f6ff",
          100: "#daeaf8",
          200: "#b8d5f1",
          500: "#0055b3",
          600: "#00498d",
          700: "#003d78",
          800: "#002d5a",
        },
        surface: {
          light: "#f7f8fa",
          white: "#ffffff",
          muted: "#f2f4f7",
        },
        text: {
          primary: "#0d1117",
          secondary: "#5a6474",
          muted: "#9ba5b4",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
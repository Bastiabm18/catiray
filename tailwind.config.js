// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui'],
        mono: ['Geist Mono', 'ui-monospace'],
        alfa: ['"Alfa Slab One"', 'serif'],
        bangers: ['Bangers', 'cursive'],
        bruno: ['"Bruno Ace SC"', 'cursive'],
        caveat: ['Caveat', 'cursive'],
        goldman: ['Goldman', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
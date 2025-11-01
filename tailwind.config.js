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
    fontSize: {
      'xs': '0.75rem',   // 12px
      'sm': '0.875rem',  // 14px
      'base': '1rem',    // 16px (default)
    }
  },
  },
  plugins: [],
};
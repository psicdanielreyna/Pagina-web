/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <- clave
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./public/admin/**/*.html",
  ],
  safelist: [
    "text-center",
  ],
  theme: {
    extend: {
      colors: {
        almond: "#F6E9D9",
        evergreen: "#043222",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

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
      evergreen: "#043222",
      almond: "#F4EDE2",
    },
  },
},
  plugins: [require("@tailwindcss/typography")],
};

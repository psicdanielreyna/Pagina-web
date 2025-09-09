/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",            // <- importante para clases dentro del contenido
    "./public/admin/**/*.html",
  ],
  safelist: [
    "text-center",                         // <- nos aseguramos de que exista en producción
  ],
  theme: {
    extend: {
      colors: {
        almond: "#F6E9D9",
        evergreen: "#043222",
      },
      // … lo demás que ya tengas
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

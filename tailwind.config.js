/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            img: { borderRadius: "0.75rem" }, // redondea imágenes dentro del post
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",     // por si renderizas MD/MDX
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            img: {
              borderRadius: theme("borderRadius.xl"),
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.6"),
            },
            a: { textDecoration: "none" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
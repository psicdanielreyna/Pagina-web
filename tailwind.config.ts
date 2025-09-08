/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        almond: "#F6E9D9",
        evergreen: "#043222",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#043222",
            a: { color: "#043222", "&:hover": { color: "#065f46" } },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

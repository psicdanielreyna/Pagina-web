// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}", "./lib/**/*.{ts,tsx,js,jsx}"],
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

// tailwind.config.ts o .js
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,js,jsx,mdx}", "./components/**/*.{ts,tsx,js,jsx,mdx}", "./lib/**/*.{ts,tsx,js,jsx,mdx}"],
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
            a: { textDecoration: "underline" },
            "h1,h2,h3,h4": { color: "#043222" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
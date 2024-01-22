/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        publicaSans: ["Publica Sans", "publica-sans"],
      },
      colors: {
        "brand-grey-1": "#dadce0",
        "brand-grey-2": "#f8f9fa",
        "brand-grey-3": "#80868b",
        "brand-blue-1": "#068AA7",
        "brand-green-1": "#012F41",
        "brand-white-1": "#E0EAEF",
      },
      boxShadow: {
        blue: "0 0 3px 3px #4285f4",
      },
      gradientColorStops: {
        "brand-gradient": [
          "#068AA7",
          "#05668B",
          "#04416F",
          "#03275B",
          "#02023E",
        ],
      },
      backgroundImage: (theme) => ({
        "brand-gradient": `linear-gradient(180deg, ${theme(
          "gradientColorStops.brand-gradient"
        )})`,
      }),
    },
  },
  variants: {
    extend: {
      margin: ["first"],
    },
  },
  plugins: [require("flowbite/plugin")],
};

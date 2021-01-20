const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        ink: "url('/ink.jpg')",
      }),
      backgroundPosition: {
        "jf-tl": "40% 17%",
      },
      colors: {
        gray: colors.trueGray,
        grey: {
          400: "lightGray",
          500: "#676767",
          600: "#525252",
          700: "#484848",
        },
        bloo: {
          500: "#d3edfc",
        },
      },
      borderWidth: {
        6: "6px",
      },
      fontFamily: {
        sans: ["Dosis", ...defaultTheme.fontFamily.sans],
      },
      backgroundSize: {
        "50%": "50%",
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      textColor: ["disabled"],
      position: ["group-hover", "group-focus"],
      outline: ["focus-visible"],
      ringWidth: ["focus-visible"],
      ringColor: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOpacity: ["focus-visible"],
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { color: theme("textColor.grey.600") },
      });
    }),
  ],
};

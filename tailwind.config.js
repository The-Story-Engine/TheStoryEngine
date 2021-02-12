const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const tseFontSizes = {
  h1: defaultTheme.fontSize["4xl"], // ~36px
  h2: defaultTheme.fontSize["2xl"], // ~24px
  h3: defaultTheme.fontSize["2xl"], // ~24px
  b1: defaultTheme.fontSize["2xl"], // ~24px
  h4: defaultTheme.fontSize.xl, // ~20px
  story: defaultTheme.fontSize.xl, // ~20px
  b2: defaultTheme.fontSize.base, // ~16px
  body: defaultTheme.fontSize.base, // ~16px
  chat: defaultTheme.fontSize.sm, // ~14px
  caption: "0.625rem", // ~10px
};

const tseShades = {
  malibu: {
    DEFAULT: "#92DDF7",
    300: "#F1FBFE",
    400: "#C2ECFA",
    500: "#92DDF7",
    600: "#62CEF4",
    700: "#33BFF0",
    800: "#10AAE0",
    900: "#0D86B0",
  },
  mandy: {
    DEFAULT: "#EA4B5F",
    200: "#FAD4D9",
    300: "#F5A6B0",
    400: "#EF7988",
    500: "#EA4B5F",
    600: "#E51D36",
    700: "#B9162A",
    800: "#8C1020",
    900: "#5E0B15",
  },
  "lavender-purple": {
    DEFAULT: "#A17DB7",
    200: "#E8DFEE",
    300: "#D0BFDB",
    400: "#B99EC9",
    500: "#A17DB7",
    600: "#895CA5",
    700: "#6E4985",
    800: "#533764",
    900: "#382543",
  },
  "sweet-corn": {
    DEFAULT: "#FADD83",
    300: "#FEF8E5",
    400: "#FCEAB4",
    500: "#FADD83",
    600: "#F8D052",
    700: "#F6C221",
    800: "#DBA809",
    900: "#AA8207",
  },
  foam: {
    DEFAULT: "#D7F3FD",
    300: "#F4FCFE",
    400: "#E6F7FE",
    500: "#D7F3FD",
    600: "#C8EFFC",
    700: "#BAEAFC",
    800: "#ABE6FB",
    900: "#9DE2FA",
  },
  cupid: {
    DEFAULT: "#F9BCD5",
    400: "#FDEBF2",
    500: "#F9BCD5",
    600: "#F58DB8",
    700: "#F15E9A",
    800: "#EC307D",
    900: "#D61363",
  },
  "dodger-blue": {
    DEFAULT: "#4356FF",
    200: "#DCE0FF",
    300: "#A9B2FF",
    400: "#7684FF",
    500: "#4356FF",
    600: "#1028FF",
    700: "#0016DC",
    800: "#0011A9",
    900: "#000C76",
  },
  malachite: {
    DEFAULT: "#0CC23C",
    50: "#B9FBCA",
    100: "#A1F9B8",
    200: "#71F694",
    300: "#41F370",
    400: "#11F04C",
    500: "#0CC23C",
    600: "#09922D",
    700: "#06621E",
    800: "#03320F",
    900: "#000201",
  },
  emperor: {
    DEFAULT: "#525252",
    50: "#C5C5C5",
    100: "#B8B8B8",
    200: "#9F9F9F",
    300: "#858585",
    400: "#6C6C6C",
    500: "#525252",
    600: "#393939",
    700: "#1F1F1F",
    800: "#050505",
  },
  "silver-chalice": {
    DEFAULT: "#9D9D9D",
    50: "#F9F9F9",
    100: "#EFEFEF",
    200: "#DADADA",
    300: "#C6C6C6",
    400: "#B1B1B1",
    500: "#9D9D9D",
    600: "#898989",
    700: "#747474",
    800: "#606060",
    900: "#4B4B4B",
  },
  "wild-sand": {
    DEFAULT: "#F5F5F5",
    400: "#FDFDFD",
    500: "#F5F5F5",
    600: "#EDEDED",
    700: "#E6E6E6",
    800: "#DEDEDE",
    900: "#D6D6D6",
  },
};

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        4.5: "1.125rem",
      },
      backgroundImage: {
        ink: "url('/ink.jpg')",
        "ink-large": "url('/ink_large.jpg')",
        "ink-pink": "url('/ink_pink.jpg')",
      },
      backgroundPosition: {
        "jf-tl": "40% 17%",
        "speech-tl": "50% 50%",
      },
      fontSize: tseFontSizes,
      colors: {
        tse: {
          malibu: "#92DDF7",
          mandy: "#EA4B5F",
          "lavender-purple": "#A17DB7",
          "sweet-corn": "#FADD83",
          foam: "#D7F3FD",
          cupid: "#F9BCD5",
          "dodger-blue": "#4356FF",
          malachite: "#0CC23C",
          emperor: "#525252",
          "silver-chalice": "#9D9D9D",
          "wild-sand": "#F5F5F5",
        },
        ...tseShades,
      },
      borderWidth: {
        3: "3px",
      },
      fontFamily: {
        sans: ["Dosis", ...defaultTheme.fontFamily.sans],
      },
      backgroundSize: {
        "50%": "50%",
      },
      height: {
        screen: "calc(var(--vh) * 100)",
      },
      minHeight: {
        screen: "calc(var(--vh) * 100)",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      maxWidth: {
        "52rem": "52rem",
      },
      width: {
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      textColor: ["disabled"],
      backgroundColor: ["disabled"],
      position: ["group-hover", "group-focus"],
      outline: ["focus-visible"],
      ringWidth: ["focus-visible"],
      ringColor: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOpacity: ["focus-visible"],
      textDecoration: ["focus-visible"],
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { color: theme("textColor.grey.600") },
      });
    }),
    require("tailwind-scrollbar"),
  ],
};

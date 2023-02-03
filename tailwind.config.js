function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) return `rgba(var(${variableName}), ${opacityValue})`;
    else return `rgb(var(${variableName}))`;
  };
}
let path = require("path");
function resolvePackages(...packages) {
  return packages.map((pkg) => path.join(__dirname, "../../packages", pkg, "/**/*.{js,ts,jsx,tsx}"));
}
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/layouts/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#2F7BEC",
          tints: {
            50: "#FFFFFF",
            100: "#EAF2FD",
            200: "#D5E5FB",
            300: "#C1D7F9",
            400: "#ACCAF7  ",
            500: "#97BDF5",
            600: "#82B0F4",
            700: "#6DA3F2",
            800: "#5995F0",
            900: "#4488EE",
          },
          shades: {
            50: "#156BE9",
            100: "#135FCF",
            200: "#1153B6",
            300: "#0E479C",
            400: "#0C3B82  ",
            500: "#092F68",
            600: "#07244E",
            700: "#051834",
            800: "#020C1A",
            900: "#000000",
          },
        },
        secondary: {
          500: "#71ECF2",
          tints: {
            50: "#FFFFFF",
            100: "#F1FDFE",
            200: "#E3FBFC",
            300: "#D4F9FB",
            400: "#C6F7FA",
            500: "#B8F5F9",
            600: "#AAF4F7",
            700: "#9CF2F6",
            800: "#8DF0F5",
            900: "#7FEEF3",
          },
          shades: {
            50: "#50E8EF",
            100: "#30E3EC",
            200: "#15DAE4",
            300: "#12BBC3",
            400: "#0F9CA3",
            500: "#0C7D82",
            600: "#095D62",
            700: "#063E41",
            800: "#031F21",
            900: "#000000",
          },
        },
        gray: {
          500: "#A3AFBF",
          tints: {
            50: "#FFFFFF",
            100: "#F6F7F9",
            200: "#EDEFF2",
            300: "#E4E7EB",
            400: "#DBDFE4",
            500: "#D2D7DE",
            600: "#C9CFD8",
            700: "#C0C7D1",
            800: "#B7BFCB",
            900: "#AEB7C4",
          },
          shades: {
            50: "#8E9DB0",
            100: "#798BA2",
            200: "#667992",
            300: "#57677D",
            400: "#495668",
            500: "#495668",
            600: "#2C343F",
            700: "#1D222A",
            800: "#0F1115",
            900: "#000000",
          },
        },
        "bg-1": withOpacity("--color-bg-1"),
        "bg-2": withOpacity("--color-bg-2"),
        "modal-bg": "#212628",
        error: "#F06163",
        success: "#23C7A4",
        warning: "#FFC155",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2400px",
      },
      bgGradientDeg: {
        270: "270deg",
      },
      borderColor: {
        DEFAULT: withOpacity("--default-border"),
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 1.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

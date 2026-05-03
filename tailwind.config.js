/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["Poppins", "sans-serif"],
        titleFont: ["Poppins", "sans-serif"],
      },
      colors: {
        /** Purple-forward brand (maps legacy `navy` / `brandOrange` class names site-wide) */
        navy: {
          DEFAULT: "#5b21b6",
          deep: "#4c1d95",
        },
        brandOrange: {
          DEFAULT: "#8b5cf6",
          dark: "#7c3aed",
        },
        primeColor: "#262626",
        lightText: "#6D6D6D",
        softBlue: "#6366f1",
        indigo: "#4f46e5",
        pastel: {
          blue: "#e0e7ff",
          purple: "#f3e8ff",
          pink: "#fce7f3",
        },
        accent: {
          amber: "#f59e0b",
          sky: "#0ea5e9",
        }
      },
      boxShadow: {
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

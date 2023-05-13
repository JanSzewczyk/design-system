const screens = {
  sm: "640px",
  // => @media (min-width: 640px) { ... }

  md: "768px",
  // => @media (min-width: 768px) { ... }

  lg: "1024px",
  // => @media (min-width: 1024px) { ... }

  xl: "1280px",
  // => @media (min-width: 1280px) { ... }

  "2xl": "1536px"
  // => @media (min-width: 1536px) { ... }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    colors: {
      black: "rgb(var(--black) / <alpha-value>)",
      error: {
        100: "rgb(var(--error-100) / <alpha-value>)",
        200: "rgb(var(--error-200) / <alpha-value>)",
        300: "rgb(var(--error-300) / <alpha-value>)",
        400: "rgb(var(--error-400) / <alpha-value>)",
        500: "rgb(var(--error-500) / <alpha-value>)",
        600: "rgb(var(--error-600) / <alpha-value>)",
        700: "rgb(var(--error-700) / <alpha-value>)",
        800: "rgb(var(--error-800) / <alpha-value>)",
        900: "rgb(var(--error-900) / <alpha-value>)"
      },
      gray: {
        100: "rgb(var(--gray-100) / <alpha-value>)",
        200: "rgb(var(--gray-200) / <alpha-value>)",
        300: "rgb(var(--gray-300) / <alpha-value>)",
        400: "rgb(var(--gray-400) / <alpha-value>)",
        500: "rgb(var(--gray-500) / <alpha-value>)",
        600: "rgb(var(--gray-600) / <alpha-value>)",
        700: "rgb(var(--gray-700) / <alpha-value>)",
        800: "rgb(var(--gray-800) / <alpha-value>)",
        900: "rgb(var(--gray-900) / <alpha-value>)"
      },
      primary: {
        100: "rgb(var(--primary-100) / <alpha-value>)",
        200: "rgb(var(--primary-200) / <alpha-value>)",
        300: "rgb(var(--primary-300) / <alpha-value>)",
        400: "rgb(var(--primary-400) / <alpha-value>)",
        500: "rgb(var(--primary-500) / <alpha-value>)",
        600: "rgb(var(--primary-600) / <alpha-value>)",
        700: "rgb(var(--primary-700) / <alpha-value>)",
        800: "rgb(var(--primary-800) / <alpha-value>)",
        900: "rgb(var(--primary-900) / <alpha-value>)"
      },
      success: {
        100: "rgb(var(--success-100) / <alpha-value>)",
        200: "rgb(var(--success-200) / <alpha-value>)",
        300: "rgb(var(--success-300) / <alpha-value>)",
        400: "rgb(var(--success-400) / <alpha-value>)",
        500: "rgb(var(--success-500) / <alpha-value>)",
        600: "rgb(var(--success-600) / <alpha-value>)",
        700: "rgb(var(--success-700) / <alpha-value>)",
        800: "rgb(var(--success-800) / <alpha-value>)",
        900: "rgb(var(--success-900) / <alpha-value>)"
      },
      transparent: "transparent",
      typography: {
        DEFAULT: "rgb(var(--text-color) / <alpha-value>)",
        primary: "rgb(var(--text-color) / 1)",
        secondary: "rgb(var(--text-color) / 0.60)",
        disabled: "rgb(var(--text-color) / 0.43)"
      },
      warning: {
        100: "rgb(var(--warning-100) / <alpha-value>)",
        200: "rgb(var(--warning-200) / <alpha-value>)",
        300: "rgb(var(--warning-300) / <alpha-value>)",
        400: "rgb(var(--warning-400) / <alpha-value>)",
        500: "rgb(var(--warning-500) / <alpha-value>)",
        600: "rgb(var(--warning-600) / <alpha-value>)",
        700: "rgb(var(--warning-700) / <alpha-value>)",
        800: "rgb(var(--warning-800) / <alpha-value>)",
        900: "rgb(var(--warning-900) / <alpha-value>)"
      },
      white: "rgb(var(--white) / <alpha-value>)"
    },
    fontFamily: {
      poppins: ["'Poppins', sans-serif"],
      code: ["'JetBrains Mono', monospace"]
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2.125rem",
      "4xl": "3rem",
      "5xl": "3.75rem",
      "6xl": "6rem"
    },
    screens,
    extend: {
      borderRadius: {
        "1/2": "50%"
      },
      letterSpacing: {
        1: "0.25rem",
        2: "0.5rem",
        8: "2.0rem"
      },
      width: {
        128: "32.0rem",
        300: "75.0rem"
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" }
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" }
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" }
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" }
        }
      },
      animation: {
        slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade: "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar"),
    require("./plugins/utilities/scroll"),
    require("./plugins/utilities/typography")
  ]
};

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        350: "rgb(var(--gray-350) / <alpha-value>)",
        400: "rgb(var(--gray-400) / <alpha-value>)"
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
      warning: {
        50: "rgb(var(--warning-50) / <alpha-value>)",
        100: "rgb(var(--warning-100) / <alpha-value>)",
        200: "rgb(var(--warning-200) / <alpha-value>)",
        300: "rgb(var(--warning-300) / <alpha-value>)",
        400: "rgb(var(--warning-400) / <alpha-value>)",
        500: "rgb(var(--warning-500) / <alpha-value>)",
        600: "rgb(var(--warning-600) / <alpha-value>)",
        700: "rgb(var(--warning-700) / <alpha-value>)",
        800: "rgb(var(--warning-800) / <alpha-value>)",
        900: "rgb(var(--warning-900) / <alpha-value>)",
        950: "rgb(var(--warning-950) / <alpha-value>)"
      },
      white: "rgb(var(--white) / <alpha-value>)"
    },
    extend: {
      backgroundColor: {
        "app-primary": "rgb(var(--background-primary))",
        "app-secondary": "rgb(var(--background-secondary))"
      }
    }
  }
};

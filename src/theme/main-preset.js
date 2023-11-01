/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px"
      }
    },
    fontFamily: {
      poppins: ["'Poppins', sans-serif"],
      code: ["'JetBrains Mono', monospace"]
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2.125rem",
      "4xl": "3rem",
      "5xl": "3.75rem",
      "6xl": "6rem"
    },
    extend: {
      borderRadius: {
        "1/2": "50%"
      },
      letterSpacing: {
        1: "0.25rem",
        2: "0.5rem",
        8: "2.0rem"
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem"
      },
      width: {
        128: "32.0rem",
        300: "75.0rem"
      },
      minHeight: {
        10: "2.5rem"
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
  presets: [require("./presets/colors")],
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
    require("./plugins/utilities/scroll"),
    require("./plugins/utilities/typography")
  ]
};

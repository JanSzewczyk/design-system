/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("./tailwindcss/main-preset")],
  theme: {
    extend: {}
  },
  plugins: []
};

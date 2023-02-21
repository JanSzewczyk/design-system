/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  presets: [require("./src/theme/main-preset")],
  theme: {
    extend: {}
  },
  plugins: []
};

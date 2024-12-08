import { type Config } from "tailwindcss";
import colorsPreset from "./src/theme/tailwind-preset";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  presets: [colorsPreset],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;

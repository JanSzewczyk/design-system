import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  presets: [require("./src/theme/main-preset")],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;

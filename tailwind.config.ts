import { type Config } from "tailwindcss";

import preset from "./src/theme/main-preset";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  presets: [preset],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;

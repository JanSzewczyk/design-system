import { create } from "storybook/theming";

export default create({
  base: "light",

  // Typography
  fontBase: "'Poppins', sans-serif",
  fontCode: "'JetBrains Mono', monospace",

  brandTitle: "Szum-Tech Design System",

  // --primary: oklch(0.488 0.243 264.376) ≈ blue-700
  // --chart-3: oklch(0.546 0.245 262.881) ≈ blue-600
  colorPrimary: "#1d4ed8",
  colorSecondary: "#2563eb",

  // --background: oklch(1 0 0)
  appBg: "#ffffff",
  // --muted: oklch(0.97 0.001 106.424)
  appContentBg: "#f6f5ef",
  // --radius: 0.25rem = 4px
  appBorderRadius: 4,
  // --border: oklch(0.923 0.003 48.717)
  appBorderColor: "#eceae6",

  // --background: oklch(1 0 0)
  barBg: "#ffffff",
  // --muted-foreground: oklch(0.553 0.013 58.071)
  barTextColor: "#736d62",
  // --primary
  barSelectedColor: "#1d4ed8",

  // --foreground: oklch(0.147 0.004 49.25)
  textColor: "#201c15"
});

import { create } from "storybook/theming";

export default create({
  // --background: oklch(1 0 0)
  appBg: "#ffffff",
  // --border: oklch(0.922 0 0)
  appBorderColor: "#e5e5e5",
  // --radius: 0.25rem = 4px
  appBorderRadius: 4,
  // --muted: oklch(0.97 0 0)
  appContentBg: "#f5f5f5",

  // --background: oklch(1 0 0)
  barBg: "#ffffff",
  // --primary
  barSelectedColor: "#1d4ed8",
  // --muted-foreground: oklch(0.556 0 0)
  barTextColor: "#737373",
  base: "light",

  brandTitle: "Szum-Tech Design System",

  // --primary: oklch(0.488 0.243 264.376) ≈ blue-700
  // --chart-3: oklch(0.546 0.245 262.881) ≈ blue-600
  colorPrimary: "#1d4ed8",
  colorSecondary: "#2563eb",

  // Typography
  fontBase: "'Poppins', sans-serif",
  fontCode: "'JetBrains Mono', monospace",

  // --foreground: oklch(0.145 0 0)
  textColor: "#0a0a0a"
});

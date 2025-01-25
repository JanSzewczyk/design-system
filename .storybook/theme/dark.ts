import { create } from "@storybook/theming";

export default create({
  base: "dark",

  // Typography
  fontBase: "'Poppins', sans-serif",
  fontCode: "'JetBrains Mono', monospace",

  brandTitle: "Szum-Tech Design System",

  //
  colorPrimary: "#168FFF",
  colorSecondary: "#42A4FF",

  appBg: "#111111",
  appContentBg: "#1C1C1C",
  appBorderRadius: 0,
  appBorderColor: "#2e2e2e",

  barBg: "#111111",
  barTextColor: "#c0c0c0",
  barSelectedColor: "#168FFF",

  textColor: "#eaeaea"
});

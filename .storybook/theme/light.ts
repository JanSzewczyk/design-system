import { create } from "@storybook/theming";

export default create({
  base: "light",

  // Typography
  fontBase: "'Poppins', sans-serif",
  fontCode: "'JetBrains Mono', monospace",

  brandTitle: "Szum-Tech Design System",

  //
  colorPrimary: "#0085FF",
  colorSecondary: "#339CFF",

  appBg: "#ffffff",
  appContentBg: "#f7f7f7",
  appBorderRadius: 0,
  appBorderColor: "#EBEBEB",

  barBg: "#ffffff",
  barTextColor: "#585757",
  barSelectedColor: "#0085FF",

  textColor: "#1C1C1C"
});

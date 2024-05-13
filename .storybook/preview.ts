import darkTheme from "./theme/dark";
import lightTheme from "./theme/light";

import "../src/theme/global.css";

import { DocsContainer } from "./components/DocsContainer";

export const parameters = {
  darkMode: {
    current: "light",
    classTarget: "html",
    stylePreview: true,
    // Override the default dark theme
    dark: darkTheme,
    // Override the default light theme
    light: lightTheme
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  docs: {
    controls: {
      sort: "requiredFirst"
    },
    container: DocsContainer
  },
  layout: "centered"
};

export const decorators = [];

import darkTheme from "./theme/dark";
import lightTheme from "./theme/light";
import { type Preview } from "@storybook/react";
import "../src/theme/global.css";

import { DocsContainer } from "./components/DocsContainer";

export default {
  parameters: {
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
    container: DocsContainer,
    docs: {
      controls: {
        sort: "requiredFirst"
      }
    }
  },
  decorators: [],
  tags: ["autodocs"]
} satisfies Preview;

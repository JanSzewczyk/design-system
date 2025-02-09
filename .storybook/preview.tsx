import { type Preview } from "@storybook/react";

import { DocsContainer } from "./components/docs-container";
import darkTheme from "./theme/dark";
import lightTheme from "./theme/light";

import "../src/tailwind/global.css";

export default {
  parameters: {
    options: {
      storySort: {
        order: ["Getting Started", ["Introduction"], "Components"]
      }
    },
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
      container: DocsContainer,
      controls: {
        sort: "requiredFirst"
      }
    }
  },
  decorators: [],
  tags: ["autodocs"]
} satisfies Preview;

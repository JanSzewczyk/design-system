import "../src/theme/global.css";
import { type Preview } from "@storybook/react";
import darkTheme from "./theme/dark";
import lightTheme from "./theme/light";
import { DocsContainer } from "./components/DocsContainer";

const preview: Preview = {
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
};

export default preview;

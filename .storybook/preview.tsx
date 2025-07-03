import { type Preview } from "@storybook/react-vite";

import darkTheme from "./theme/dark";

import "../src/tailwind/global.css";

export default {
  parameters: {
    options: {
      storySort: {
        order: ["Getting Started", ["Introduction"], "Components"]
      }
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
      theme: darkTheme
    }
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" }
        ],
        showName: true,
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      // Apply theme class to html
      document.documentElement.setAttribute("class", theme);
      // Also wrap the story with theme context if needed
      return (
        <div className={theme}>
          <Story />
        </div>
      );
    }
  ],
  tags: ["autodocs"]
} satisfies Preview;

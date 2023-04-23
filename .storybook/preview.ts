import { Preview } from "@storybook/react";

import customDarkTheme from "./theme/dark";

import "../src/styles/default.css";

export default {
  decorators: [],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme: customDarkTheme,
      controls: {
        sort: "requiredFirst"
      }
    },
    layout: "centered",
    themes: {
      default: "Dark",
      list: [
        { name: "Light", class: "" },
        { name: "Dark", class: "dark" }
      ]
    }
  }
} satisfies Preview;

import "../src/styles/default.css";

import customDarkTheme from "./theme/dark";
import { Preview } from "@storybook/react";

export default {
  decorators: [],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    themes: {
      default: "Dark",
      list: [
        { name: "Light", class: "" },
        { name: "Dark", class: "dark" }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme: customDarkTheme
    },
    layout: "centered"
  }
} satisfies Preview;

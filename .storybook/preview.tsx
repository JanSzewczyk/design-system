import * as React from "react";

import { addons } from "@storybook/addons";
import { Preview } from "@storybook/react";

import { DocsContainer } from "./components/DocsContainer";
import darkTheme from "./theme/dark";
import lightTheme from "./theme/light";

import "../src/theme/global.css";

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel();

// switch body class for story along with interface theme
channel.on("DARK_MODE", (isDark) => {
  if (isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

export default {
  decorators: [],
  parameters: {
    darkMode: {
      current: "light",
      classTarget: "body",
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
  }
} satisfies Preview;
import "../src/styles/default.css";

import React from "react";
import { themes } from "@storybook/theming";
// @ts-ignore
import { version } from "../package.json";

export const parameters = {
  docs: {
    theme: themes.dark
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  themes: {
    default: "Dark",
    list: [
      { name: "Light", class: "" },
      { name: "Dark", class: "dark" }
    ]
  }
};

export const decorators = [];

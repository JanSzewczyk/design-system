import "../src/styles/default.css";
import { useDarkMode } from "storybook-dark-mode";
import { ThemeProvider, useTheme } from "../src";
import React from "react";
import { themes } from "@storybook/theming";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  darkMode: {
    // Override the default dark theme
    dark: {
      ...themes.dark,
      brandTitle: "My custom storybook dark theme",
      brandUrl: "https://example.com",
      brandImage: "https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png",
      brandTarget: "_self"
    },
    // Override the default light theme
    light: themes.light
  }
};

export const decorators = [
  (Story) => {
    const mode = useDarkMode() ? "dark" : "light";

    const { setTheme } = useTheme();

    React.useLayoutEffect(() => {
      setTheme(mode);
    }, [mode]);

    return (
      <div>
        <Story />
      </div>
    );
  },
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  )
];

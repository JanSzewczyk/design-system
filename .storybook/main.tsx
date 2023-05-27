import { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
    "storybook-dark-mode"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true
  },
  docs: {
    autodocs: true
  }
} satisfies StorybookConfig;

import { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    "@storybook/addon-themes",
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
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tsConfigPaths()]
    });
  }
} satisfies StorybookConfig;

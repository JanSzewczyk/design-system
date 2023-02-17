import type { StorybookConfig } from "@storybook/core-common";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "storybook-addon-themes",
    "storybook-addon-pseudo-states",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true
  },
  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  features: {
    storyStoreV7: true
  },
  // @ts-ignore
  docs: {
    autodocs: true
  }
};

module.exports = config;

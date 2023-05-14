import { StorybookConfig } from "@storybook/react-vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "storybook-addon-themes",
    "storybook-addon-pseudo-states",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true
  },
  features: {
    storyStoreV7: true
  },
  docs: {
    autodocs: true
  },
  async viteFinal(config) {
    config.plugins.push(viteTsConfigPaths());
    return config;
  }
} satisfies StorybookConfig;

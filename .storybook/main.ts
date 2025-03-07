import tsConfigPaths from "vite-tsconfig-paths";

import { type StorybookConfig } from "@storybook/react-vite";

process.env.STORYBOOK = "true";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "storybook-dark-mode",
    "@storybook/experimental-addon-test"
  ],
  framework: "@storybook/react-vite",
  core: {
    builder: "@storybook/builder-vite",
    enableCrashReports: true
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      plugins: [tsConfigPaths()],
      assetsInclude: ["**/*.md"]
    });
  }
} satisfies StorybookConfig;

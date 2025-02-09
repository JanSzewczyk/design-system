import tsConfigPaths from "vite-tsconfig-paths";

import { type StorybookConfig } from "@storybook/react-vite";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
    "storybook-dark-mode"
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
      assetsInclude: ["**/*.md"],
      optimizeDeps: {
        include: ["storybook-dark-mode"]
      }
    });
  }
} satisfies StorybookConfig;

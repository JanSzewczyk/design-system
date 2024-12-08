import { StorybookConfig } from "@storybook/react-vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
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
      optimizeDeps: {
        include: ["storybook-dark-mode"]
      }
    });
  }
} satisfies StorybookConfig;

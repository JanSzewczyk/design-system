import tsConfigPaths from "vite-tsconfig-paths";

import { type PresetValue, type TagsOptions } from "@storybook/core/types";
import { type StorybookConfig } from "@storybook/react-vite";

process.env.STORYBOOK = "true";

const tags: PresetValue<TagsOptions | undefined> = {
  "test-only": {
    excludeFromDocsStories: true,
    excludeFromSidebar: false
  }
};

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "storybook-dark-mode",
    "@storybook/experimental-addon-test",
    "storybook-addon-tag-badges"
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
  tags,

  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    const tailwindcss = (await import("@tailwindcss/vite")).default();

    return mergeConfig(config, {
      plugins: [tsConfigPaths(), tailwindcss],
      assetsInclude: ["**/*.md"]
    });
  }
} satisfies StorybookConfig;

import tsConfigPaths from "vite-tsconfig-paths";

import { defineMain } from "@storybook/react-vite/node";
import { type PresetValue, type TagsOptions } from "storybook/internal/types";

process.env.STORYBOOK = "true";

const tags: PresetValue<TagsOptions | undefined> = {
  "test-only": {
    excludeFromDocsStories: true,
    excludeFromSidebar: false
  }
};

export default defineMain({
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  features: {
    experimentalTestSyntax: true
  },
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
    "@storybook-community/storybook-dark-mode",
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
});

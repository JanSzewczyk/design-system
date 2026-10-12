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
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
    "@storybook-community/storybook-dark-mode",
    "storybook-addon-tag-badges"
  ],
  core: {
    builder: "@storybook/builder-vite",
    enableCrashReports: true
  },
  features: {
    experimentalTestSyntax: true
  },
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  tags,
  typescript: {
    check: true,
    reactDocgen: "react-docgen"
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    const tailwindcss = (await import("@tailwindcss/vite")).default();
    return mergeConfig(config, {
      assetsInclude: ["**/*.md"],
      plugins: [tailwindcss],
      resolve: {
        tsconfigPaths: true
      }
    });
  }
});

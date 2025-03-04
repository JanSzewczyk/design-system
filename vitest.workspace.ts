import tsConfigPaths from "vite-tsconfig-paths";

import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineConfig, defineWorkspace } from "vitest/config";

const reporters = process.env.CI ? ["dot", "github-actions"] : ["default"];

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
  defineConfig({
    plugins: [tsConfigPaths()],
    test: {
      coverage: {
        provider: "v8"
      },
      environment: "node",
      globals: true,
      name: "unit",
      reporters,
      setupFiles: ["./src/test/setup-test-env.ts"]
    }
  }),
  defineConfig({
    plugins: [storybookTest({ configDir: ".storybook" })],
    test: {
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }]
      },
      coverage: {
        provider: "v8"
      },
      name: "storybook",
      reporters,
      setupFiles: [".storybook/vitest.setup.ts"]
    }
  })
]);

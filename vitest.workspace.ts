import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      include: ["**\/*.{test,spec}.ts"],
      name: "unit",
      environment: "node",
      setupFiles: ["./src/test/setup.ts"]
    }
  },
  {
    extends: "vitest.config.ts",
    plugins: [storybookTest({ configDir: ".storybook" })],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium", headless: true }]
      },
      setupFiles: [".storybook/vitest.setup.ts"]
    }
  }
]);

import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      include: ["**\/*.{test,spec}.{ts,js}"],
      name: "unit",
      environment: "node",
      setupFiles: ["src/tests/unit/vitest.setup.ts"]
    }
  },
  {
    extends: "vitest.config.ts",
    plugins: [
      storybookTest({
        configDir: ".storybook",
        tags: {
          include: ["test"],
          exclude: ["experimental"],
          skip: ["skip-test"]
        }
      })
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium", headless: true }]
      },
      setupFiles: ["src/tests/integration/vitest.setup.ts"]
    }
  }
]);

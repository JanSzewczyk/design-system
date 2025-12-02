import tsconfigPaths from "vite-tsconfig-paths";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: process.env.CI ? ["dot", "github-actions"] : ["tree"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      reporter: ["text", "html", "json-summary", "json"],
      reportOnFailure: true
    },
    projects: [
      {
        plugins: [tsconfigPaths()],
        test: {
          name: "unit",
          globals: true,
          include: ["**\/*.{test,spec}.{ts,js,tsx,jsx}"],
          environment: "happy-dom",
          setupFiles: ["src/tests/unit/vitest.setup.ts"]
        }
      },
      {
        plugins: [storybookTest()],
        test: {
          name: "storybook",
          exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [
              {
                browser: "chromium",
                headless: true
              }
            ]
          },
          setupFiles: ["src/tests/integration/vitest.setup.ts"]
        }
      }
    ]
  }
});

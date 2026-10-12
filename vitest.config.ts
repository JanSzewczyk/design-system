import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      provider: "v8",
      reporter: ["text", "html", "json-summary", "json"],
      reportOnFailure: true
    },
    projects: [
      {
        plugins: [],
        resolve: {
          tsconfigPaths: true
        },
        test: {
          environment: "happy-dom",
          globals: true,
          include: ["**\/*.{test,spec}.{ts,js,tsx,jsx}"],
          name: "unit",
          setupFiles: ["src/tests/unit/vitest.setup.ts"]
        }
      },
      {
        plugins: [storybookTest()],
        resolve: {
          tsconfigPaths: true
        },
        test: {
          browser: {
            enabled: true,
            instances: [
              {
                browser: "chromium",
                headless: true
              }
            ],
            provider: playwright()
          },
          exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
          name: "storybook",
          setupFiles: ["src/tests/integration/vitest.setup.ts"]
        }
      }
    ],
    reporters: process.env.CI ? ["dot", "github-actions"] : ["tree"]
  }
});

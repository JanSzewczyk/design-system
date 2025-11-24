import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

const reporters = process.env.CI ? ["dot", "github-actions"] : ["default"];

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    reporters,
    coverage: {
      include: ["**"],
      exclude: [
        "coverage/**",
        "dist/**",
        "**\/[.]**",
        "packages/*\/test?(s)/**",
        "**\/*.d.ts",
        "**\/ virtual:*",
        "**\/__x00__*",
        "**\/\x00*",
        "cypress/**",
        "**\/test?(s)/**",
        "test?(-*).?(c|m)[jt]s?(x)",
        "**\/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)",
        "**\/__tests__/**",
        "**\/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,prettier,release,postcss,eslint}.config.*",
        "**\/vitest.{workspace,projects}.[jt]s?(on)",
        "**\/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
        "**\/*.{types,styles}.?(c|m)[jt]s?(x)"
      ],
      reporter: ["text", "html", "json-summary", "json"],
      reportOnFailure: true,
      provider: "v8"
    },
    projects: [
      {
        extends: "vitest.config.ts",
        test: {
          include: ["**\/*.{test,spec}.{ts,js,tsx,jsx}"],
          name: "unit",
          environment: "happy-dom",
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
            provider: playwright(),
            instances: [{ browser: "chromium", headless: true }]
          },
          setupFiles: ["src/tests/integration/vitest.setup.ts"]
        }
      }
    ]
  }
});

import tsconfigPaths from "vite-tsconfig-paths";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: process.env.CI ? ["dot", "github-actions"] : ["tree"],
    coverage: {
      provider: "v8",
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

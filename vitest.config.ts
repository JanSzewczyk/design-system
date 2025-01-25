import { defineConfig } from "vitest/config";

const reporters = process.env.CI ? ["dot", "github-actions"] : ["dot"];

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/test/setup-test-env.ts"],
    reporters,
    coverage: {
      provider: "v8"
    }
  }
});

import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

const reporters = process.env.CI ? ["dot", "github-actions"] : ["dot"];

export default defineConfig({
  plugins: [tsConfigPaths()],
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

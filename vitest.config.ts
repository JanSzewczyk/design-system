import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

import { defineConfig } from "vitest/config";

const reporters = process.env.CI ? ["dot", "github-actions"] : ["dot"];

export default defineConfig({
  plugins: [tsConfigPaths(), react()],
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

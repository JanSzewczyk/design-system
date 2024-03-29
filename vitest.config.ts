import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/test/setup-test-env.ts"],
    coverage: {
      include: ["src/components/**/*.{ts,tsx}"],
      provider: "v8"
    }
  }
});

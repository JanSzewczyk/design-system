import { defineConfig } from "tsup";

const env = process.env.NODE_ENV || "development";

export default defineConfig([
  {
    splitting: true,
    clean: env !== "production",
    dts: true,
    format: ["esm", "cjs"],
    minify: env === "production",
    bundle: env === "production",
    treeshake: true,
    skipNodeModulesBundle: true,
    target: "es2020",
    outDir: env === "production" ? "." : "dist",
    entry: [
      "./src/components/!(index.ts?(x))/index.ts?(x)",
      "./src/components/index.ts?(x)",
      "./src/contexts/!(index.ts?(x))/index.ts?(x)",
      "./src/contexts/index.ts?(x)",
      "./src/hooks/!(index.ts?(x))/index.ts?(x)",
      "./src/hooks/index.ts?(x)",
      "./src/index.ts?(x)"
    ],
    external: ["react", "react-dom", "class-variance-authority"]
  },
  {
    entry: ["./src/theme/main-preset.js"],
    minify: false,
    bundle: true,
    outDir: env === "production" ? "theme" : "dist/theme"
  }
]);

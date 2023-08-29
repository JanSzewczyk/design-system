import { defineConfig } from "tsup";

const env = process.env.NODE_ENV || "development";

export default defineConfig([
  {
    splitting: true,
    clean: env !== "production",
    dts: true,
    format: ["esm", "cjs"],
    minify: env === "production",
    bundle: true,
    treeshake: true,
    skipNodeModulesBundle: false,
    outDir: "dist",
    entry: ["./src/index.ts?(x)"],
    external: [
      "react",
      "react-dom",
      "class-variance-authority",
      "@radix-ui/*",
      "@tabler/icons-react"
    ]
  },
  {
    splitting: true,
    clean: env !== "production",
    dts: true,
    format: ["esm", "cjs"],
    minify: env === "production",
    bundle: true,
    treeshake: true,
    skipNodeModulesBundle: false,
    outDir: "icons",
    entry: ["./src/icons/index.tsx"],
    external: ["@tabler/icons-react"]
  },
  {
    entry: ["./src/theme/main-preset.js"],
    minify: false,
    bundle: true,
    outDir: env === "production" ? "theme" : "dist/theme"
  }
]);

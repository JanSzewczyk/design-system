import { defineConfig } from "tsup";

const env = process.env.NODE_ENV || "development";

// TODO refactor this

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
    external: ["react", "react-dom", "class-variance-authority", "@radix-ui/*", "react-hook-form", "tailwind-merge"]
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
    entry: ["./src/icons/index.tsx"]
  },
  {
    entry: ["./src/theme/main-preset.ts"],
    minify: false,
    bundle: true,
    dts: true,
    outDir: env === "production" ? "theme" : "dist/theme"
  }
]);

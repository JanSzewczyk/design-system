import { defineConfig } from "tsup";

export default defineConfig([
  {
    splitting: true,
    clean: true,
    dts: true,
    format: ["esm", "cjs"],
    minify: false,
    bundle: true,
    treeshake: true,
    outDir: "dist",
    entry: ["./src/index.ts?(x)"],
    external: ["react", "react-dom", "class-variance-authority", "@radix-ui", "react-hook-form", "tailwind-merge"]
  },
  {
    splitting: true,
    clean: true,
    dts: true,
    format: ["esm", "cjs"],
    minify: true,
    bundle: true,
    treeshake: true,
    skipNodeModulesBundle: false,
    outDir: "icons",
    entry: ["./src/icons/index.tsx"]
  }
]);

import { defineConfig } from "tsup";

const env = process.env.NODE_ENV || "development";

export default defineConfig([
  // {
  //   splitting: true,
  //   clean: env !== "production",
  //   dts: true,
  //   format: ["esm"],
  //   minify: env === "production",
  //   bundle: true,
  //   treeshake: true,
  //   skipNodeModulesBundle: false,
  //   outDir: "dist",
  //   entry: ["./src/index.ts?(x)"],
  //   external: ["react", "react-dom", "class-variance-authority", "@radix-ui/*", "react-hook-form", "tailwind-merge"]
  // },
  {
    entry: ["./src/icons/index.tsx"],
    outDir: "icons",
    clean: env !== "production",
    dts: true,
    format: "esm",
    minify: false,
    bundle: true,
    treeshake: false
  },
  {
    entry: ["./src/theme/**/*.{ts,tsx}"],
    outDir: env === "production" ? "theme" : "dist/theme",
    minify: false,
    bundle: false,
    clean: env !== "production",
    format: "esm",
    dts: true,
    treeshake: true,
    splitting: true,
    external: ["tailwindcss", "tailwindcss/types/config"]
  }
]);

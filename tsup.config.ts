import { defineConfig } from "tsup";

const dirNames = ["components", "contexts", "theme"];

export default defineConfig([
  {
    entry: ["./src/components/!(index.ts?(x))/index.ts?(x)"],
    dts: true,
    treeshake: true,
    minify: true,
    format: ["esm", "cjs"],
    external: ["react", "react-dom"],
    outDir: "components"
  },
  {
    entry: ["./src/components/index.ts?(x)"],
    dts: true,
    minify: true,
    format: ["esm", "cjs"],
    external: ["react", "react-dom"],
    outDir: "components",
    bundle: false
  },

  {
    entry: ["./src/contexts/theme/index.ts?(x)"],
    dts: true,
    treeshake: true,
    minify: true,
    format: ["esm", "cjs"],
    external: ["react", "react-dom"],
    outDir: "contexts/theme"
  },
  {
    entry: ["./src/contexts/index.ts?(x)"],
    dts: true,
    minify: true,
    format: ["esm", "cjs"],
    external: ["react", "react-dom"],
    outDir: "contexts",
    bundle: false
  },

  {
    entry: ["./src/hooks/useTheme/index.ts?(x)"],
    dts: true,
    treeshake: true,
    minify: true,
    format: ["esm", "cjs"],
    external: ["react", "react-dom"],
    outDir: "hooks/useTheme"
  },
  {
    entry: ["./src/hooks/index.ts?(x)"],
    dts: true,
    minify: true,
    format: ["esm", "cjs"],
    external: ["react", "react-dom"],
    outDir: "hooks",
    bundle: false
  },

  {
    entry: ["./src/index.ts?(x)"],
    dts: true,
    minify: true,
    format: ["esm", "cjs"],
    external: ["react", "react-dom"],
    outDir: ".",
    bundle: false
  },

  {
    entry: ["./src/theme/main-preset.js"],
    minify: false,
    bundle: true,
    outDir: "theme",
  }
]);

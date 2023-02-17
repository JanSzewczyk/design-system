import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  dts: true,
  treeshake: true,
  minify: true,
  format: ["esm", "cjs"],
  external: ["react", "react-dom"]
});

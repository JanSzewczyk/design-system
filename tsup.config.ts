import { defineConfig } from "tsup";

export default defineConfig({
  splitting: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  bundle: true,
  treeshake: true,
  outDir: "dist",
  entry: [
    "src/components/*/index.tsx",
    "src/components/index.tsx",
    "src/utils/index.ts",
    "src/hooks/index.tsx",
    "src/contexts/index.tsx",
    "src/icons/index.tsx"
  ],
  esbuildOptions(options) {
    // the directory structure will be the same as the source
    options.outbase = "./src";
  },
  external: [
    "react",
    "react-dom",
    "class-variance-authority",
    "radix-ui",
    "@radix-ui/react-slot",
    "react-hook-form",
    "tailwind-merge",
    "clx",
    "@radix-ui/react-icons"
  ]
});

import { defineConfig } from "tsup";

export default defineConfig([
  {
    splitting: true,
    clean: true,
    dts: true,
    format: ["esm", "cjs"],
    bundle: true,
    treeshake: true,
    outDir: "dist",
    entry: {
      index: "src/index.tsx",
      utils: "src/utils/index.ts",
      icons: "src/icons/index.tsx"
    },
    external: [
      "react",
      "react-dom",
      "class-variance-authority",
      "radix-ui",
      "@radix-ui/react-slot",
      "react-hook-form",
      "tailwind-merge",
      "clx"
    ]
  }
]);

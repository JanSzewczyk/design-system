import { defineConfig } from "tsup";

export default defineConfig({
  splitting: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  bundle: true,
  treeshake: true,
  minify: true,
  outDir: "dist",
  entry: [
    // Barrel entry — keeps `import { X } from "@szum-tech/design-system"` working.
    "src/components/index.tsx",
    // One entry per component — enables per-component tree-shaking and subpath imports
    // (`@szum-tech/design-system/components/button`). Shared code lands in split chunks.
    "src/components/*/index.tsx",
    "src/utils/index.ts",
    "src/hooks/index.tsx",
    "src/icons/index.tsx"
  ],
  external: [
    "react",
    "react-dom",
    "class-variance-authority",
    "radix-ui",
    "tailwind-merge",
    "clsx",
    "motion",
    "sonner",
    "lucide-react",
    "embla-carousel-react",
    "tailwindcss-animate",
    /^@radix-ui\/.*/,
    /^@dnd-kit\/.*/,
    /^@base-ui\/.*/
  ]
});

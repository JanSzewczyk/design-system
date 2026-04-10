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
    // "src/components/*/index.tsx",
    "src/components/index.tsx",
    "src/utils/index.ts",
    "src/hooks/index.tsx",
    "src/icons/index.tsx"
  ],
  external: [
    "react",
    "react-dom",
    "class-variance-authority",
    "radix-ui",
    "@radix-ui/react-slot",
    "tailwind-merge",
    "clsx",
    "motion",
    "sonner",
    "lucide-react",
    "@dnd-kit/core",
    "@dnd-kit/sortable",
    "@dnd-kit/utilities",
    "embla-carousel-react",
    "tailwindcss-animate"
  ]
});

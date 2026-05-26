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

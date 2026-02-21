# Project Context

This file contains project-specific configuration that agents and skills reference.

## Tech Stack

| Category | Technology | Version | Status |
|----------|------------|---------|--------|
| Framework | React | 19.2 | ✅ Installed |
| UI Library | Radix UI | 1.4 | ✅ Installed |
| Styling | Tailwind CSS | 4.2 (OKLCH color space) | ✅ Installed |
| Styling Utilities | class-variance-authority (CVA) | 0.7 | ✅ Installed |
| Icons | lucide-react | 0.563 | ✅ Installed |
| Animations | motion | 12.34 | ✅ Installed |
| Toast | sonner | 2.0 | ✅ Installed |
| Carousel | embla-carousel-react | 8.6 | ✅ Installed |
| Type Safety | TypeScript | 5.9 (strict mode) | ✅ Installed |
| Bundler | tsup | 8.5 | ✅ Installed |
| Documentation | Storybook | 10.2 | ✅ Installed |
| Testing (Unit) | Vitest 4.0 + happy-dom | - | ✅ Installed |
| Testing (Integration) | Vitest + Playwright 1.58 | - | ✅ Installed |

## Testing Stack

| Type | Tool | Location | Command |
|------|------|----------|---------|
| Unit | Vitest 4.0 (happy-dom) | `src/hooks/`, `src/utils/`, `src/scripts/` | `npm run test:unit` |
| Component | Storybook 10.2 + Vitest | `*.stories.tsx` | `npm run test:storybook` |
| All | Vitest | - | `npm run test` |

## Key Files

| Purpose | File |
|---------|------|
| Build config | `tsup.config.ts` |
| ESLint config | `eslint.config.ts` |
| Prettier config | `prettier.config.ts` |
| Dependencies | `package.json` |
| TypeScript | `tsconfig.json` |
| Tailwind CSS | `src/tailwind/` (global.css, palette.css, typography.css, etc.) |
| Storybook | `.storybook/` (main.ts, preview.tsx) |
| Vitest config | `vitest.config.ts` |
| Post-build script | `src/scripts/post-build.ts` |

## Import Conventions

```typescript
// Path alias (use ~/ for all internal imports)
import { cn } from "~/utils";
import { Button } from "~/components/button";

// External imports
import * as React from "react";
import { cva } from "class-variance-authority";
```

## Component Location

- **All components**: `src/components/[component-name]/`
- **Icons**: `src/icons/`
- **Hooks**: `src/hooks/`
- **Utils**: `src/utils/`
- **Stories**: Same directory as component (`[component-name].stories.tsx`)

## Component Structure

Each component follows a consistent pattern:

```
component-name/
├── index.tsx                    # Barrel export
├── component-name.tsx           # Main component implementation
├── component-name.types.ts      # TypeScript type definitions (optional)
├── component-name.styles.ts     # CVA variant definitions (optional)
└── component-name.stories.tsx   # Storybook stories
```

**IMPORTANT:** All file names use lowercase with hyphens (kebab-case), while exported component names use PascalCase.

## CVA (class-variance-authority) Pattern

```typescript
// In component-name.styles.ts
import { cva } from "class-variance-authority";

export const componentVariants = cva("base-classes", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  },
  defaultVariants: { variant: "primary", size: "md" }
});

// In component-name.types.ts
import { VariantProps } from "class-variance-authority";
import { componentVariants } from "./component-name.styles";

type ComponentCvaProps = VariantProps<typeof componentVariants>;
export type ComponentVariantType = NonNullable<ComponentCvaProps["variant"]>;
```

## Data Slot Attributes

Components use `data-slot` attributes for CSS targeting and testing:

```typescript
<button data-slot="button">...</button>
```

## Radix UI Slot Pattern

Components support `asChild` prop for polymorphic rendering:

```typescript
<Button asChild><a href="...">Link Button</a></Button>
```

## cn() Utility

Use for merging Tailwind classes safely (combines clsx + tailwind-merge):

```typescript
import { cn } from "~/utils";
className={cn("base-classes", className)}
```

## Color System (OKLCH)

Uses **OKLCH color space** for perceptually uniform colors:
- Light theme in `:root`, dark theme in `.dark` selector
- Defined in `src/tailwind/palette.css`
- CSS Custom Properties pattern:

```css
:root {
  --primary: oklch(...);
  --primary-foreground: oklch(...);
}
@theme inline {
  --color-primary: var(--primary);
}
```

## Module Exports

The library uses **conditional exports** for fine-grained imports:

```json
{
  ".": "./dist/components/index.js",           // All components
  "./components/*": "./dist/components/*/index.js", // Individual components
  "./icons": "./dist/icons/index.js",        // Icon collection
  "./utils": "./dist/utils/index.js",        // Utility functions
  "./hooks": "./dist/hooks/index.js",        // Custom hooks
  "./tailwind/*.css": "./tailwind/*.css"    // CSS files (root level)
}
```

## Build Process

1. **tsup** bundles components, utils, hooks, icons separately
2. CSS files copied from `src/tailwind/` to `tailwind/` (root level)
3. Post-build script adds `"use client"` directive to component entry files (Next.js compatibility)
4. Outputs: ESM (`.js`) + CJS (`.cjs`) + TypeScript declarations (`.d.ts`)

## Storybook

**Key Features:**
- Auto-generated documentation with `tags: ["autodocs"]`
- Dark mode support via `storybook-dark-mode` addon
- Tag-based organization (use "test", "experimental", "test-only" tags)
- Vitest integration for story-based testing

**Story Organization:**
- Prefix: "Components/", "Icons/", etc.
- Use `satisfies Meta<typeof Component>` for type safety

## Testing Patterns

### Vitest Globals

Tests use global `describe`, `test`, `it`, `expect` functions without imports:

```typescript
describe("cn function", () => {
  test("returns classes correctly", () => {
    expect(cn("class1", "class2")).toEqual("class1 class2");
  });
});
```

### Storybook Tags

- `autodocs` - Auto-generate documentation
- `test-only` - Exclude from docs stories, show in sidebar
- `experimental` - Mark as experimental (excluded from tests)
- `skip-test` - Skip in test runs

## Common Pitfalls

### File Naming

❌ **Don't:** Use PascalCase for file names
```typescript
// ❌ WRONG
Button.tsx
ButtonStyles.ts
```

✅ **Do:** Use kebab-case for file names
```typescript
// ✅ CORRECT
button.tsx
button.styles.ts
```

### Imports

❌ **Don't:** Use relative imports
```typescript
// ❌ WRONG
import { cn } from "../../../utils";
```

✅ **Do:** Use path aliases
```typescript
// ✅ CORRECT
import { cn } from "~/utils";
```

### CVA Variants

❌ **Don't:** Use strings directly without type safety
```typescript
// ❌ WRONG
const variant: string = "primary";
```

✅ **Do:** Extract variant type from CVA
```typescript
// ✅ CORRECT
type VariantType = NonNullable<VariantProps<typeof componentVariants>["variant"]>;
const variant: VariantType = "primary";
```

### data-slot Attributes

❌ **Don't:** Skip data-slot for testing
```typescript
// ❌ WRONG
<button className="...">...</button>
```

✅ **Do:** Always include data-slot
```typescript
// ✅ CORRECT
<button data-slot="button" className="...">...</button>
```

## Consumer Usage

**Installation:**
```bash
npm install tailwindcss @szum-tech/design-system
```

**CSS Setup (consumer's CSS file):**
```css
@import "tailwindcss";
@import "@szum-tech/design-system/tailwind/global.css";
@source "../node_modules/@szum-tech/design-system";
```

**Component Import:**
```typescript
import { Button } from "@szum-tech/design-system";
```

**Icon Import:**
```typescript
import { GoogleLogoIcon } from "@szum-tech/design-system/icons";
```

**Hooks Import:**
```typescript
import { useComposedRefs } from "@szum-tech/design-system/hooks";
```

**Utils Import:**
```typescript
import { cn } from "@szum-tech/design-system/utils";
```

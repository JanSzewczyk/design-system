# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**@szum-tech/design-system** is a React component library built on Tailwind CSS 4+ and Radix UI primitives. It provides
a comprehensive design system with light/dark theme support, type-safe components using CVA (class-variance-authority),
and modular exports for optimal tree-shaking.

**Key Technologies:**

- React 19+ with TypeScript (strict mode)
- Tailwind CSS 4+ with OKLCH color space
- Radix UI for accessible primitives
- CVA for type-safe variant styling
- Vitest + Playwright for testing
- Storybook for documentation
- tsup for bundling (ESM + CJS)

## Essential Commands

### Development

```bash
npm run storybook:dev    # Start Storybook on port 6006
npm run test:watch       # Run tests in watch mode
npm run test:ui          # Run tests with interactive UI
```

### Validation (run before committing)

```bash
npm run type-check       # TypeScript type checking
npm run lint             # ESLint checking
npm run prettier:check   # Code formatting check
npm run test             # All tests (unit + Storybook integration)
npm run build            # Build library (tsup + CSS copy + post-build)
```

### Testing

```bash
npm test                 # Run all tests
npm run test:unit        # Unit tests only (happy-dom)
npm run test:storybook   # Storybook integration tests (Playwright)
npm run test:coverage    # Generate coverage report
npx playwright install --with-deps  # Install Playwright browsers (required for integration tests)
```

### Fixes

```bash
npm run lint:fix         # Auto-fix ESLint issues
npm run prettier:write   # Auto-format code
```

## Architecture

### Component Structure

Each component follows a consistent pattern:

```
component-name/
├── index.tsx                    # Barrel export
├── ComponentName.tsx            # Main component implementation
├── ComponentName.types.ts       # TypeScript type definitions
├── ComponentName.styles.ts      # CVA variant definitions
└── ComponentName.stories.tsx    # Storybook stories
```

**Key Patterns:**

1. **CVA for Variants**: All component styling uses class-variance-authority for type-safe variants

   ```typescript
   // In ComponentName.styles.ts
   export const componentVariants = cva("base-classes", {
     variants: {
       variant: { primary: "...", secondary: "..." },
       size: { sm: "...", md: "...", lg: "..." }
     },
     defaultVariants: { variant: "primary", size: "md" }
   });

   // In ComponentName.types.ts
   type ComponentCvaProps = VariantProps<typeof componentVariants>;
   export type ComponentVariantType = NonNullable<ComponentCvaProps["variant"]>;
   ```

2. **Data Slot Attributes**: Components use `data-slot` attributes for CSS targeting and testing

   ```typescript
   <button data-slot="button">...</button>
   ```

3. **Radix UI Slot Pattern**: Components support `asChild` prop for polymorphic rendering

   ```typescript
   <Button asChild><a href="...">Link Button</a></Button>
   ```

4. **cn() Utility**: Use for merging Tailwind classes safely (combines clsx + tailwind-merge)
   ```typescript
   import { cn } from "~/utils";
   className={cn("base-classes", className)}
   ```

### Styling System

**Color System** (`src/tailwind/palette.css`):

- Uses **OKLCH color space** for perceptually uniform colors
- Light theme in `:root`, dark theme in `.dark` selector
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

**CSS Files** (`src/tailwind/`):

- `global.css` - Base styles, imports all other CSS files
- `palette.css` - Color variables (light/dark themes)
- `typography.css` - Typography tokens (Poppins, JetBrains Mono)
- `animation.css` - Custom animations
- `scroll.css` - Scrollbar customization

**Theme Architecture:**

- Two-theme system activated by `.dark` class on root element
- OKLCH provides better perceptual uniformity than RGB/HSL
- All colors defined as CSS Custom Properties for dynamic theming

### Module Exports

The library uses **conditional exports** for fine-grained imports:

```json
{
  ".": "./dist/components/index.js", // All components
  "./componnents/*": "./dist/components/*/index.js", // Individual components (NOTE: typo in package.json)
  "./icons": "./dist/icons/index.js", // Icon collection
  "./utils": "./dist/utils/index.js", // Utility functions
  "./hooks": "./dist/hooks/index.js", // Custom hooks
  "./contexts": "./dist/contexts/index.js", // Context providers
  "./tailwind/*.css": "./tailwind/*.css" // CSS files (root level)
}
```

### Testing Strategy

**Two Test Projects:**

1. **Unit Tests** (happy-dom environment)
   - Location: `**/*.{test,spec}.{ts,tsx}`
   - Fast, lightweight testing for logic
   - Setup: `src/tests/unit/vitest.setup.ts`

2. **Storybook Integration Tests** (Playwright browser)
   - Tests defined in `.stories.tsx` files
   - Real browser rendering for visual/interaction testing
   - Setup: `src/tests/integration/vitest.setup.ts`
   - Tag filters: include "test", exclude "experimental", skip "skip-test"

**Coverage:** v8 provider with text, html, json-summary, json reporters

## Component Development Guidelines

### Creating a New Component

1. **Create component directory** in `src/components/component-name/`

2. **Define types** (`ComponentName.types.ts`):

   ```typescript
   import { VariantProps } from "class-variance-authority";
   import { componentVariants } from "./ComponentName.styles";

   type ComponentCvaProps = VariantProps<typeof componentVariants>;
   export type ComponentVariantType = NonNullable<ComponentCvaProps["variant"]>;

   export interface ComponentProps {
     variant?: ComponentVariantType;
     // ... other props
   }
   ```

3. **Define styles** (`ComponentName.styles.ts`):

   ```typescript
   import { cva } from "class-variance-authority";

   export const componentVariants = cva("base-classes", {
     variants: {
       variant: {
         /* ... */
       },
       size: {
         /* ... */
       }
     },
     defaultVariants: {
       /* ... */
     }
   });
   ```

4. **Implement component** (`ComponentName.tsx`):

   ```typescript
   import { cn } from "~/utils";
   import { componentVariants } from "./ComponentName.styles";
   import type { ComponentProps } from "./ComponentName.types";

   export function ComponentName({ variant, className, ...props }: ComponentProps) {
     return (
       <div
         data-slot="component-name"
         className={cn(componentVariants({ variant }), className)}
         {...props}
       />
     );
   }
   ```

5. **Create stories** (`ComponentName.stories.tsx`):

   ```typescript
   import type { Meta, StoryObj } from "@storybook/react";
   import { ComponentName } from "./ComponentName";

   const meta = {
     title: "Components/ComponentName",
     component: ComponentName,
     tags: ["autodocs"],
     argTypes: {
       /* ... */
     }
   } satisfies Meta<typeof ComponentName>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {
       /* ... */
     }
   };
   ```

6. **Export from barrel** (`index.tsx`):

   ```typescript
   export * from "./ComponentName";
   export * from "./ComponentName.types";
   ```

7. **Add to main exports** (`src/components/index.tsx`):
   ```typescript
   export * from "./component-name";
   ```

### Form Components

Components that integrate with react-hook-form should:

- Accept a `name` prop for form registration
- Support validation through react-hook-form's validation context
- Use the `Form` component wrapper (wraps `FormProvider`)
- Display error states from form context

### Composite Components

For components with sub-components (like Field, Dialog, Sheet):

- Use compound component pattern
- Each sub-component should be independently importable
- Share context between parent and children when needed
- Use consistent `data-slot` attributes across sub-components

### Complex Stateful Components

For complex components with shared state (like Stepper):

- Use context providers to share state between sub-components
- Create separate context files (e.g., `stepper.context.tsx`, `stepper-item.context.tsx`, `stepper-focus.context.tsx`)
- Use a store pattern (`stepper.store.tsx`) for state management when needed
- Keep business logic in utility files (`stepper.utils.tsx`)
- Define constants in separate files (`stepper.constants.ts`)

## Build Process

**Build Pipeline:**

1. **tsup** bundles components, utils, hooks, contexts, icons separately
2. CSS files copied from `src/tailwind/` to `tailwind/` (root level)
3. Post-build script (`src/scripts/post-build.js`) adds `"use client"` directive to component entry files (Next.js
   compatibility)
4. Outputs: ESM (`.js`) + CJS (`.cjs`) + TypeScript declarations (`.d.ts`)

**Output Structure:**

```
dist/
├── components/        # Individual component bundles
│   ├── index.js       # Main ESM components entry (with "use client" directive)
│   ├── index.cjs      # Main CJS components entry (with "use client" directive)
│   └── */index.{js,cjs,d.ts}  # Individual component bundles
├── icons/
├── utils/
├── hooks/
└── contexts/
tailwind/              # CSS files (root level, not in dist/)
├── global.css
├── palette.css
├── typography.css
├── animation.css
└── scroll.css
```

## TypeScript Configuration

- **Target:** ES2020
- **Module:** ESNext with bundler resolution
- **JSX:** react-jsx (automatic React imports)
- **Path Alias:** `~/*` → `./src/*`
- **Strict Mode:** Enabled
- Generated declaration files with source maps

## Storybook

**Key Features:**

- Auto-generated documentation with `tags: ["autodocs"]`
- Dark mode support via `storybook-dark-mode` addon
- Tag-based organization (use "test", "experimental" tags)
- Vitest integration for story-based testing

**Story Organization:**

- Prefix: "Components/", "Icons/", etc.
- Use `satisfies Meta<typeof Component>` for type safety
- Export default meta and individual story objects

## CI/CD

**PR Checks** (`.github/workflows/pr-check.yml`):

- TypeScript type checking
- Prettier formatting validation
- ESLint with SARIF output
- Unit and Storybook tests with coverage (Vitest + Playwright)
- Storybook build validation
- Library build validation
- Dependency review

**Publishing:**

- Automated via semantic-release on main branch
- Version bumps based on conventional commits
- Generates changelog automatically

## Path Aliases

Use the `~/*` alias for internal imports:

```typescript
import { cn } from "~/utils";
import { Button } from "~/components/button";
```

## Color System Usage

When adding new colors to `src/tailwind/palette.css`:

1. Add to both `:root` (light theme) and `.dark` (dark theme)
2. Use OKLCH format for consistency: `oklch(L C H)` or `oklch(L C H / alpha%)`
3. Add corresponding entry in `@theme inline` block
4. Follow naming convention: `--color-name` and `--color-name-foreground`
5. Ensure sufficient contrast between color and foreground (WCAG AA minimum)

Example:

```css
:root {
  --new-color: oklch(0.5 0.15 250);
  --new-color-foreground: oklch(1 0 0);
}
.dark {
  --new-color: oklch(0.6 0.2 255);
  --new-color-foreground: oklch(0.1 0 0);
}
@theme inline {
  --color-new-color: var(--new-color);
  --color-new-color-foreground: var(--new-color-foreground);
}
```

## Documentation

- **Storybook Docs:** https://janszewczyk.github.io/design-system
- **Repository:** https://github.com/JanSzewczyk/design-system
- **NPM:** https://www.npmjs.com/package/@szum-tech/design-system

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

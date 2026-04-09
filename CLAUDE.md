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
- Storybook 10+ (CSF Next format) for documentation
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
├── component-name.tsx           # Main component + PropsType
├── component-name.types.ts      # CVA-derived types and const enums only
├── component-name.styles.ts     # CVA variant definitions (only if variants exist)
└── component-name.stories.tsx   # Storybook stories
```

For composite components with sub-parts, each sub-component that has CVA variants gets its own `.styles.ts`:

```
tabs/
├── index.tsx
├── tabs.tsx
├── tabs.types.ts               # Shared CVA-derived types and const enums
├── tabs-trigger.tsx
├── tabs-trigger.styles.ts      # Only TabsTrigger variants here
├── tabs-content.tsx
└── tabs.stories.tsx
```

For components with shared state, also create `component-name.context.tsx` (and optionally `.store.tsx`, `.utils.ts`, `.constants.ts`). Context hooks are exported by name from `index.tsx` — never via `export *` from context files.

**File naming:** kebab-case files, PascalCase exports.

### Key Implementation Patterns

**Component props type** — defined inline in the `.tsx` file, not in `.types.ts`:
```typescript
// component-name.tsx
export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  asChild?: boolean;
};
```

**`.types.ts`** — holds only CVA-derived variant types and const enums:
```typescript
import { type VariantProps } from "class-variance-authority";
import { type buttonVariants } from "./button.styles";

type ButtonCvaProps = VariantProps<typeof buttonVariants>;
export type ButtonVariantType = NonNullable<ButtonCvaProps["variant"]>;
export type ButtonSizeType = NonNullable<ButtonCvaProps["size"]>;
```

**CVA styles** — use array format for base classes:
```typescript
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded text-sm font-medium",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring"
  ],
  {
    variants: { variant: { default: "bg-primary text-primary-foreground" } },
    defaultVariants: { variant: "default" }
  }
);
```

**Component implementation:**
```typescript
import * as React from "react";           // always namespace import
import { cn } from "~/utils";             // always ~/utils not @/lib/utils

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"                  // always add data-slot
      data-variant={variant}              // expose props as data attributes
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

**`asChild` / Slot pattern** — use `Slot` from `@radix-ui/react-slot` when root element could be swapped:
```typescript
const Comp = asChild ? Slot : "button";
return <Comp data-slot="button" {...props} />;
```

**Context pattern** — context provides parent props to children (variant, size, spacing, orientation):
```typescript
// Export hook by name from index.tsx, never via export *
export { useToggleGroupContext } from "./toggle-group.context";
```

**Barrel `index.tsx`:**
```typescript
export * from "./component-name";
export * from "./component-name.types";
// named exports for context hooks:
export { useComponentContext } from "./component-name.context";
```

### Styling System

**Color tokens** (`src/tailwind/palette.css`) use OKLCH. Always use semantic CSS custom property tokens in Tailwind classes (e.g., `bg-primary`, `text-muted-foreground`) — never raw `oklch(...)` literals.

When adding new colors, add to both `:root` and `.dark`, then register in `@theme inline`:
```css
:root { --new-color: oklch(0.5 0.15 250); }
.dark { --new-color: oklch(0.6 0.2 255); }
@theme inline { --color-new-color: var(--new-color); }
```

**Data attribute selectors** in Tailwind — use `data-[state=on]:bg-accent`, `data-[orientation=vertical]:flex-col` (not `data-vertical:flex-col`). For group-based selectors use the named group pattern: `group/toggle-group` on root, `group-data-[orientation=horizontal]/toggle-group:` on items.

### Module Exports

```json
{
  ".": "./dist/components/index.js",
  "./components/*": "./dist/components/*/index.js",
  "./icons": "./dist/icons/index.js",
  "./utils": "./dist/utils/index.js",
  "./hooks": "./dist/hooks/index.js",
  "./tailwind/*.css": "./tailwind/*.css"
}
```

After creating a component, add it to `src/components/index.tsx`.

### Testing Strategy

**Two test projects:**

1. **Unit Tests** (`npm run test:unit`) — happy-dom, files matching `**/*.{test,spec}.{ts,tsx}`. Global functions available without imports.

2. **Storybook Integration Tests** (`npm run test:storybook`) — Playwright browser, tests defined inside `.stories.tsx` files via `.test()` method.

**Coverage:** v8 provider.

## Storybook Stories (CSF Next Format)

This project uses **Storybook 10+ with CSF Next** — `preview.meta()` / `meta.story()` factory functions. Do **not** use the CSF 3.0 pattern (`satisfies Meta<>`, `export default meta`, `type Story = StoryObj<>`).

**`tags: ["autodocs"]` is set globally** in `.storybook/preview.tsx` — do not repeat it per-component. Only add meta-level tags for classification: `"new"`, `"beta"`, `"experimental"`.

```typescript
import { expect } from "storybook/test";   // import expect here
import preview from "~/.storybook/preview";
import { MyComponent } from "./my-component";

const meta = preview.meta({
  title: "Components/My Component",        // space-separated, not CamelCase
  component: MyComponent,
  tags: ["new"],                           // optional: "new", "beta" only
  argTypes: { variant: { control: "select", options: ["default", "outline"] } }
});

// Visual story — use args + render(args) when props drive the content
export const OutlineVariant = meta.story({
  args: { type: "single", variant: "outline" },
  render(args) {
    return <MyComponent {...args}><Item value="a">A</Item></MyComponent>;
  }
});

// Interaction tests — attach via .test(), never create separate play stories
OutlineVariant.test("Renders with correct data-slot", async ({ canvas }) => {
  await expect(canvas.getByRole("group")).toHaveAttribute("data-slot", "my-component");
});

OutlineVariant.test("Clicking item selects it", async ({ canvas, userEvent, step }) => {
  const item = canvas.getByRole("radio", { name: /a/i });
  await step("Click item", async () => {
    await userEvent.click(item);
    await expect(item).toHaveAttribute("data-state", "on");
  });
});
```

**Critical rules:**
- `userEvent` — always destructure from test parameters, **never** import from `storybook/test`
- Story names — descriptive state names (`OutlineVariant`, `AllDisabled`), **not** `Default`, `Basic`, `Example`
- `step()` — only for dependent sequential flows; independent assertions go in separate `.test()` calls
- Per-story `tags` — **removed from this codebase**; use only meta-level tags
- `import * as React from "react"` — always use namespace import in stories that use `React.useState`

## Build Process

1. **tsup** bundles components, utils, hooks, contexts, icons separately
2. CSS files copied from `src/tailwind/` to `tailwind/` (root level)
3. Post-build script (`src/scripts/post-build.ts`) adds `"use client"` to component entry files
4. Outputs: ESM (`.js`) + CJS (`.cjs`) + TypeScript declarations (`.d.ts`)

## TypeScript Configuration

- **Path Alias:** `~/*` → `./src/*` — use for all cross-directory imports
- **JSX:** react-jsx automatic transform — no `import React` needed in `.tsx` files (except stories using `React.useState`)
- **Strict Mode:** enabled

## CI/CD

**PR Checks** (`.github/workflows/pr-check.yml`): type-check, prettier, ESLint, unit tests, Storybook tests, Storybook build, library build, dependency review.

**Publishing:** semantic-release on main branch, version bumps from conventional commits.

## Consumer Usage

```bash
npm install tailwindcss @szum-tech/design-system
```

```css
@import "tailwindcss";
@import "@szum-tech/design-system/tailwind/global.css";
@source "../node_modules/@szum-tech/design-system";
```

```typescript
import { Button } from "@szum-tech/design-system";
import { GoogleLogoIcon } from "@szum-tech/design-system/icons";
import { cn } from "@szum-tech/design-system/utils";
import { useComposedRefs } from "@szum-tech/design-system/hooks";
```

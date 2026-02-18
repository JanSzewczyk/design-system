---
description: Integrate a new component by copying and splitting source code from an external source
---

# Component Integration Workflow

This workflow ensures that components integrated from external sources (like GitHub or other libraries) maintain their
original logic while following the repository's file structure and conventions.

## 1. Analysis & Extraction (The "Copy-Split" Rule)

- **Do not rewrite**: Do not recreate the component from scratch. Copy the source code exactly as it is.
- **Preserve Logic**: Keep all state, hooks, and logic parity with the source.
- **Identify Blocks**: Scan the source code to identify:
  - Main component(s)
  - Sub-components
  - Context logic (Context, Provider, custom hooks)
  - Prop types and internal types
  - Tailwind classes/styles

## 2. Directory Setup

- Create a new folder: `src/components/[component-name]/`.

## 3. Structural Splitting (The File System)

Split the copied source code into these specific files:

1. **`[component-name].tsx`**: The main component implementation.
   - **MUST** include its own prop types (defined using `type`, not `interface`).
2. **`[sub-component].tsx`**: Every sub-component MUST be in its own separate file.
   - **MUST** include its own prop types (defined using `type`, not `interface`).
3. **`[component-name].context.tsx`**: All context-related code.
   - Includes `createContext`, `Provider` logic, and custom hooks like `use[Component]`.
   - **MUST** use `type` instead of `interface` for context props/types.
4. **`[component-name].styles.ts`**: All Tailwind classes and `cva()` definitions.
5. **`index.tsx`**: Barrel export file.
   - Export all components, sub-components, and the context (including hooks).

## 4. Local Integration

- **Imports**: Update all imports to use absolute paths (`~/utils`, `~/components`, etc.).
- **Utility**: Use the local `cn()` utility for merging classes.
- **Registration**: Export the new component folder from `src/components/index.tsx`.

## 5. Verification

Run the following commands to ensure everything is perfect:

```bash
npm run type-check; npm run lint; npm run build
```

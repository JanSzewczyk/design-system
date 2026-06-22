# design-sync NOTES — @szum-tech/design-system

Working notes for syncing this repo to claude.ai/design. Read before each re-sync.

## Setup facts

- Shape: **storybook** (`.storybook/main.ts`, `@storybook/react-vite`). 56 storied components, 696 stories.
- Package manager: **npm** (`package-lock.json`), Node >=24.
- Build: `npm run build` (tsup, needs `NODE_OPTIONS=--max-old-space-size=8192` for dts — see memory). Barrel entry →
  `dist/components/index.js` + `dist/components/index.d.ts`.
- Bundle entry passed to converter: `--entry dist/components/index.js`, `--node-modules node_modules` (DS's own source
  repo — no `node_modules/<pkg>`).
- globalName: `SzumTechDesignSystem` (auto-derived).
- Reference storybook: `.design-sync/sb-reference` (rebuild with
  `npx storybook build -c .storybook -o .design-sync/sb-reference` whenever DS source/stories change).
- Theme: dark-mode addon sets `.dark` on `<html>`, default `current: "dark"`. Preview decorator is just
  `<Story/> + <Toaster/>` (no provider needed for rendering).

## Discoveries / fixes

- `[GENERAL]` **package.json `main`/`module`/`types` pointed at nonexistent `./dist/index.*`** (tsup emits no root
  index; barrel is `dist/components/index.*`). The converter reads legacy `types` for the d.ts export surface → got 0
  exports → all 56 titles dropped (`[TITLE_UNMAPPED]`, `components: 0`). **Fix:** corrected those three fields to
  `./dist/components/index.*` in package.json (real packaging bug, also helps legacy consumers). Committed separately.
- `! preview decorator bundle failed: Could not resolve "tailwindcss"` — `.storybook/preview.tsx` imports
  `../src/tailwind/global.css` which `@import "tailwindcss"`; esbuild can't resolve it when bundling decorators. CSS
  ships anyway via `[CSS_FROM_STORYBOOK]` (scraped from sb-reference). The decorator only adds `<Toaster/>` (a sibling,
  not a provider), so components render fine without it.
- `[GENERAL]` **`Carousel` + `BadgeOverflow` missing from the main barrel** (`src/components/index.tsx`) but built +
  storied + publicly importable via subpath (`exports["./components/*"]`). Added via `cfg.extraEntries`
  (`./dist/components/{carousel,badge-overflow}/index.js`). Consider adding them to the barrel upstream. `Typography` is
  a docs page (`src/stories/Typography.stories.tsx`), not a component → `cfg.titleMap: {Typography: null}`.
- `[GENERAL]` **lucide-react preview explosion** — 19 stories `import { …Icon } from "lucide-react"` (v1.17, **1962 icon
  modules**, `sideEffects:false`). esbuild bundling a story preview parsed the entire barrel → esbuild child ballooned
  to ~2GB **per preview**, looking like a hang after "previews: N generated". Fix: add `lucide-react` to
  `cfg.extraEntries` so it's bundled **once** into the global and story lucide imports shim to
  `window.SzumTechDesignSystem`. Side effect: `[EXPORT_COLLISION]` on `Badge/Sheet/Sidebar/Table/Timeline` (lucide icon
  names vs DS components) — **harmless**: no story imports those bare names from lucide (verified), main package wins.
  Bundle grew to ~2.9 MB (under 5 MB cap).
- `[GENERAL]` **CSF Next `definePreview` crash** — repo MIXES CSF 3.0 (`export default meta`, e.g. Empty) and CSF Next
  (`const meta = preview.meta({…}); export const X = meta.story({…})`, e.g. Alert). CSF-Next stories import
  `~/.storybook/preview` → `preview.tsx` calls `definePreview` from `@storybook/react-vite`. The stock inert
  `@storybook/*` stub left `definePreview` undefined as a NAMED export (esbuild CJS→ESM interop only copies
  own-enumerable props), so every CSF-Next story crashed at module eval. **Fix: fork
  `.design-sync/overrides/story-imports.mjs`** (declared in `cfg.libOverrides`) adding a shallow CSF passthrough to the
  inert stub: `definePreview`/`__definePreview` → `{…cfg, meta(m)→{…m, story(s)→{…s, test:noop}}}`. compose() merges
  meta/story fields itself, so passthrough suffices; `.test()` (interaction-test API) gets a no-op. Took render-check
  2/55 → 48/55 clean.
- `[GENERAL]` **`.storybook/theme/{dark,light}.ts` + `@storybook-community/storybook-dark-mode` crash** — preview.tsx
  imports these for storybook's theme UI (irrelevant to component rendering); they call `create()` / read `themes.dark`
  from `storybook/theming` (stubbed → undefined). Fix: `cfg.storyImports.shim` includes `".storybook/theme/"` and
  `"@storybook-community/storybook-dark-mode"` (preview.tsx only needs `DARK_MODE_EVENT_NAME` from the latter, used in a
  docs container, never in story render).
- `[GENERAL]` **barrel shim** — `cfg.storyImports.shim` includes `"src/components/index"`: preview.tsx imports
  `../src/components` (the 55-component barrel). The built-in source-barrel shim only matches `src/index.*`, not
  `src/components/index.*`, so without this the barrel bundles a 2nd source copy (breaking React context identity). Shim
  routes it to the shipped global.

## Re-sync risks

- The DTS "hang" earlier was a red herring — it was the lucide explosion in `buildPreviews`, NOT ts-morph (probe proved
  loadDts runs in ~1.3s). The fork + extraEntries fixes are the real load-bearing pieces.
- `[EXPORT_COLLISION]` (lucide vs DS `Badge/Sheet/Sidebar/Table/Timeline`) is currently harmless ONLY because no story
  imports those bare names from lucide. If a future story does `import { Badge } from "lucide-react"` it'll silently get
  the DS component. Re-check on story changes.
- The `story-imports.mjs` fork is a shallow CSF passthrough — if Storybook changes the CSF Next factory contract
  (definePreview/meta/story shape) or stories start relying on real annotation merging (global decorators applied by
  preview, loaders), the passthrough may under-serve. Re-verify after Storybook major bumps.
- (theme light-vs-dark + remaining 7 component renders: to finalize at §4d)

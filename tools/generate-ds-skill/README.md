# generate-ds-skill

Generates a `@szum-tech/design-system` documentation snapshot for the Claude Code `import-claude-design` skill. Analyzes
**source files only**:

- `*.tsx` components → props table (TypeScript signature)
- `*.styles.ts` (CVA) → variants + defaultVariants
- `*.stories.tsx` (CSF Next) → usage examples + anti-patterns
- `palette.css` → semantic color tokens (light/dark)
- `typography.css` → text utility classes + font scale
- folder structure → category, public API

No runtime imports. No `@aiHint` convention — the generator feeds on what already has to exist in the DS repo.

## Installation (in the DS repo)

```bash
cp -r path/to/generate-ds-skill ./tools/
cd tools/generate-ds-skill
npm install
```

## Usage

```bash
# from the DS repo root:
npx tsx tools/generate-ds-skill/src/index.ts \
  --src ./src/components \
  --out ./ds-skill-snapshot \
  --pkg ./package.json \
  --css ./src/tailwind
```

Flags (all optional, defaults shown above): `--src` component root, `--out` snapshot dir, `--pkg` `package.json` (name +
version), `--css` Tailwind source dir (`palette.css` + `typography.css`).

Or add a script to the DS repo's `package.json`:

```json
{
  "scripts": {
    "ds:generate-skill": "tsx tools/generate-ds-skill/src/index.ts --src ./src/components --out ./ds-skill-snapshot --pkg ./package.json --css ./src/tailwind"
  }
}
```

## Output

```
ds-skill-snapshot/
├── SKILL.md                   # thin file with auto-generated version block + link to _index
├── VERSION                    # e.g. 3.21.0
├── references/
│   ├── _index.md              # list of all components per category
│   ├── tokens.md              # semantic color tokens (light/dark)
│   ├── typography.md          # text utility classes + font scale
│   └── components/
│       ├── button.md
│       ├── card.md
│       └── ...
```

Each component file contains:

- Category, Public, Stories count
- Import
- Props (TypeScript types)
- Variants (from CVA)
- Examples (from `.stories.tsx`, story name → title)
- Anti-patterns (stories prefixed with `AntiPattern_`)
- Notes (auto-generated — e.g. missing `href` in props)

`tokens.md` lists every semantic color token (grouped, with light/dark values, Tailwind built-in refs simplified to e.g.
`blue-600`) plus the `bg-`/`text-`/`border-`/`ring-` prefix convention. `typography.md` lists every `text-*` utility
class with its `@apply` body, plus the font-family / font-size / line-height / letter-spacing scale.

## Conventions the generator expects

| Element            | Convention                                                                |
| ------------------ | ------------------------------------------------------------------------- |
| Component location | `src/components/{category}/{name}/` or `src/components/{name}/`           |
| Component file     | `{name}.tsx` with a named export `Name` (PascalCase)                      |
| Styles file        | `{name}.styles.ts` with CVA variants export                               |
| Stories file       | `{name}.stories.tsx` in CSF Next (`preview.meta()` + `meta.story()`)      |
| Anti-pattern story | name starts with `AntiPattern_` (e.g. `AntiPattern_Navigation`)           |
| Public API         | exported from the `--src` dir's `index.ts(x)` barrel                      |
| Color tokens       | `palette.css` — `--color-*` in `@theme inline`, values in `:root`/`.dark` |
| Typography         | `typography.css` — `@utility text-*` / `.text-*` + `@theme` scale         |

A missing element means the section is skipped in the output — not an error.

## Flow (full loop)

```
[in the DS repo]
1. dev edits a component / adds a story
2. npm run ds:generate-skill
3. dev commits ds-skill-snapshot/ to the DS repo
4. dev creates a diff vs. the previous snapshot (git diff)
5. manual decision: which changes to propagate to the skill

[in the plugin repo with the import-claude-design skill]
6. cp -r ds-skill-snapshot/* path/to/plugin/.claude/skills/import-claude-design/
7. commit + publish the plugin
```

## Known limitations

- **Does not support inline CVA in `.tsx`.** Requires a separate `*.styles.ts` file. Reason: parsing inline CVA via AST
  is unreliable (variables, spreads).
- **Does not extract JSDoc prop descriptions.** The TypeScript signature is sufficient; descriptions are treated as a
  bonus to add manually in `SKILL.md`.
- **Color/typography parsing is regex-based, not a full CSS AST.** It targets the specific shape of `palette.css`
  (`@theme inline` + `:root`/`.dark`) and `typography.css` (`@theme` + `@utility`/`.text-*`). Heavily restructured CSS
  may need parser tweaks. Missing file → section skipped, not an error.
- **Shadcn → DS mapping in a separate manual file** (`docs/shadcn-mapping.md` in the DS repo, copied 1:1 into the
  snapshot).

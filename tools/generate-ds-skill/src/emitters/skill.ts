import { todayISO } from "../utils.ts";
import type { GeneratorConfig } from "../types.ts";

const AUTO_BEGIN = "<!-- AUTO-GENERATED BELOW — do not edit manually -->";
const AUTO_END = "<!-- END AUTO-GENERATED -->";

export function renderSkillMd(config: GeneratorConfig, componentCount: number): string {
  return `---
name: import-claude-design
argument-hint: <project-id | "Project Title"> [notes in quotes]
description: >
  Implement UI in any project that imports from ${config.packageName},
  especially when pasting output from Claude Design, porting a mockup,
  recreating a screenshot, or building a hero/landing/dashboard view. Use
  this skill BEFORE writing any JSX with components, classes, or design
  tokens — it enforces an inventory-first protocol that prevents the most
  common failure mode: reinventing components (Button, Card, Dialog, Input,
  etc.) that already exist in the DS, or using raw Tailwind utilities
  (text-gray-*, bg-white, hex colors) instead of semantic tokens. Accepts
  an argument of the form \`<project-id | "Project Title"> [optional notes]\`
  — e.g. \`abc123xyz "darker hero, swap CTA copy to PL"\` or
  \`"Marketing Hero Refresh"\`. Trigger phrases:
  "build this view", "implement this design", "from Claude Design",
  "create landing page", "port mockup", "recreate this UI", "zbuduj ten
  widok", "zaimplementuj design", "z Claude Design".
---

# import-claude-design

A protocol for implementing UI from external sources (Claude Design output,
mockups, screenshots, pasted JSX) without reinventing components that already
exist in \`${config.packageName}\`.

## Why this skill exists

When a model translates a design directly into code, the natural path is to
write raw HTML (\`<button>\`, \`<input>\`, \`<div className="rounded border ...">\`)
because that's what dominates its training data. The result is a working UI
that bypasses the design system, drifts from brand tokens, and creates
maintenance debt every time DS conventions change.

This skill fixes that by **forcing inventory + mapping BEFORE implementation**.
The model first lists what's in the design, then matches each primitive to a
DS component, and only then writes JSX. Three steps that take 30 seconds and
prevent hours of cleanup.

## Input contract

The skill expects a single argument string in the form:

\`\`\`
<identifier> [optional natural-language notes]
\`\`\`

### \`<identifier>\` (required) — one of three forms

| Form | Example | When to use |
|---|---|---|
| **Project ID** (bare slug) | \`abc123xyz\` | quickest; copy from URL |
| **Full URL** | \`https://claude.ai/design/abc123xyz\` | when pasting the address bar |
| **Project Title** in double quotes | \`"Marketing Hero Refresh"\` | when you remember the name but not the ID — the skill resolves it to a Project ID by listing recent projects in the Claude Design workspace |

When the identifier is a title, treat it case-insensitively but require an
exact word match. If multiple projects match, ask the user to disambiguate
by ID before proceeding.

### \`[optional notes]\` (optional) — quoted natural language

Free-text adjustments to apply on top of the fetched design: copy changes,
color swaps, sections to skip, target route, PL/EN strings, etc. Always
quote — notes contain spaces.

### If the argument is empty

Ask the user for a Project ID or title before doing anything else. Do not
guess — every Claude Design project is different and inventing one wastes
the user's time.

### Examples

\`\`\`
import-claude-design abc123xyz
import-claude-design https://claude.ai/design/abc123xyz
import-claude-design "Marketing Hero Refresh"
import-claude-design abc123xyz "darker hero, swap CTA copy to PL, skip testimonials"
import-claude-design "Pricing Page v2" "use 3-tier layout, hide enterprise tile on mobile"
\`\`\`

## Protocol

Follow these steps in order. Do not skip step 1 even if the design looks
simple — the inventory is what catches the silent reinvention bug.

### Step 0 — Acquire source

Parse the argument into \`{ identifier, notes }\`. Resolve the identifier to
a Project ID:

- bare slug (\`abc123xyz\`) → use as-is
- URL → extract the ID after \`/design/\`
- quoted title (\`"Marketing Hero Refresh"\`) → list recent projects in the
  Claude Design workspace and find an exact match; if multiple, ask the
  user to disambiguate by ID

Build the Claude Design project URL from the resolved ID and try
\`WebFetch\` to retrieve the source JSX/HTML.

If the fetch fails, returns nothing useful, or requires authentication you
don't have — **stop and ask the user to paste the source code directly**.
Never guess what the design contains. Better one extra turn than
hallucinated UI.

Hold \`notes\` aside; they apply as the final transform in step 4.

### Step 1 — Inventory

List every visual primitive in the fetched source. Output as a table:

| Primitive | Count | Notes |
|---|---|---|
| Button (primary CTA) | 2 | "Get started", "View pricing" |
| Card | 3 | feature cards in grid |
| Badge | 1 | "New" badge in nav |
| Input (email) | 1 | newsletter signup |
| Heading (display) | 1 | hero h1 |
| Heading (h2) | 3 | section titles |
| Body text | ~6 | paragraphs |
| Icon (arrow-right) | 2 | in CTA buttons |

Mark explicitly which rows the optional \`notes\` will alter (e.g. "CTA copy →
PL" next to the Button row).

### Step 2 — Map to DS

Read \`references/_index.md\`. For each primitive in step 1, name the
\`${config.packageName}\` component or utility that replaces it. Load
\`references/components/<name>.md\` ONLY for components you'll actually use —
don't preload the whole library.

Output the mapping as an extension of the inventory table:

| Primitive | DS component / utility | Variant / props |
|---|---|---|
| Button (primary CTA) | \`Button\` | \`variant="default" size="lg"\` |
| Card | \`Card\` | default |
| Badge | \`Badge\` | \`variant="default"\` |
| Heading (display) | \`text-display-xl\` utility on \`<h1>\` | font-poppins |

**If a primitive has NO match in DS**, flag it. In step 4 it will be
implemented as plain HTML, but isolated in a clearly-named local component
(e.g. \`RawCanvasChart\`) so the gap is auditable later — and ideally promoted
upstream to DS in a future PR.

### Step 3 — Verify version

Read the consumer's \`package.json\`. Compare its \`${config.packageName}\`
version against the snapshot version below.

- **Same minor (X.Y.\\*)** → proceed.
- **Newer minor or major** → warn the user; before using any component
  listed in \`_index.md\`, grep \`node_modules/${config.packageName}\` to
  confirm its props haven't changed shape.
- **Older** → proceed (snapshot is forward-compatible).
- **Not installed** → stop and ask whether DS will be installed first.

This step exists because a stale snapshot is worse than no snapshot: it
makes the model confidently wrong. The version check turns silent drift
into an explicit fork in the road.

### Step 4 — Implement

Only after steps 0–3. Apply the optional \`notes\` from step 0 as the final
transform on top of the mapped JSX.

**Never write:**

- raw \`<button>\`, \`<input>\`, \`<select>\`, \`<dialog>\`, \`<a className="badge">\`
- imports from \`shadcn/ui\`, \`@radix-ui/*\` directly (go through DS)
- hex colors, \`rgb()\`, or \`hsl()\`
- \`text-gray-*\`, \`bg-white\`, \`bg-black\`, \`text-black\`, \`text-white\` utilities

**Always use:**

- DS components from \`${config.packageName}\`
- semantic color tokens: \`text-foreground\`, \`bg-card\`, \`text-muted-foreground\`,
  \`border-border\`, \`bg-primary\`, \`text-primary-foreground\`, etc.
- typography utilities: \`text-display-xl\`, \`text-heading-h1\`,
  \`text-heading-h2\`, \`text-body-default\`, \`text-body-sm\`, \`text-lead\`,
  \`text-mute\`, etc.
- \`cn()\` from \`${config.packageName}/utils\` for class merging
- \`asChild\` for polymorphic rendering when wrapping \`<Link>\` or \`<a>\`

See \`references/tokens.md\` and \`references/typography.md\` **if present in
this snapshot** for the full vocabulary (these files are maintained manually
in the DS repo and copied here on demand — they may be absent in early
snapshots).

## Pitfalls (common silent failures)

These are mistakes the model tends to make even after the protocol. Read
them once before step 4.

- **Putting icons in \`children\`** — DS Button uses \`startIcon\` / \`endIcon\`
  props, not \`children\`. Wrong: \`<Button><Icon /> Save</Button>\`. Right:
  \`<Button startIcon={<Icon />}>Save</Button>\`.
- **Using \`<a>\` for navigation when you have \`asChild\`** — wrap with the
  framework Link via \`asChild\` instead, so styling and accessibility stay
  intact. Right: \`<Button asChild><Link href="/x">Go</Link></Button>\`.
- **Building a Card from scratch** — if DS exports \`Card\`, \`CardHeader\`,
  \`CardContent\`, use them. Don't write \`<div className="rounded border p-4">\`.
- **Assuming shadcn variant names** — Claude Design output uses shadcn
  variants that DON'T all exist in DS. The Button has \`default, outline,
  secondary, ghost, error, link\` — there is no \`primary\` and no
  \`destructive\`. Translate shadcn \`variant="destructive"\` → DS
  \`variant="error"\`; shadcn \`variant="default"\` stays \`variant="default"\`.
  Variant names differ per component (e.g. \`Badge\` and \`Status\` DO have a
  \`primary\` variant) — always confirm against that component's
  \`references/components/<name>.md\` before assuming. See
  \`references/shadcn-mapping.md\` if present.
- **Inventing a typography size** — don't use \`text-4xl font-bold\` for a
  hero. Use \`text-display-xl\` (it bundles size + weight + line height +
  responsive scaling).

## When this skill should NOT trigger

- Refactoring existing code that already uses DS correctly (no fresh design
  source) → use direct edits.
- Pure backend / data-layer changes → no UI surface.
- Modifying a single existing component's internal behavior without
  changing its visual surface → direct edit, no protocol needed.
- Projects that don't import \`${config.packageName}\` → the protocol's
  output won't apply; let the model use whatever DS that project has.

${AUTO_BEGIN}
## Snapshot version

\`${config.packageName}\` **${config.packageVersion}** — generated ${todayISO()}.
${componentCount} components indexed.
${AUTO_END}

## References

Files under \`references/\` are loaded on demand — do not preload them all.

- [\`references/_index.md\`](references/_index.md) — components inventory
  with category grouping. **Always read first in step 2.**
- \`references/components/<name>.md\` — per-component docs (props, variants,
  examples, anti-patterns). Load only for components you'll use.
- \`references/tokens.md\` — semantic color tokens (light + dark). Optional,
  maintained manually in DS repo.
- \`references/typography.md\` — text utility classes. Optional.
- \`references/shadcn-mapping.md\` — 1:1 mapping from shadcn/ui component
  names to DS equivalents. Optional but highly useful for Claude Design
  output. Maintained manually.
`;
}

export function rewriteAutoBlock(existing: string, config: GeneratorConfig, componentCount: number): string {
  const replacement = renderSkillMd(config, componentCount).split(AUTO_BEGIN)[1]?.split(AUTO_END)[0] ?? "";

  const beginIdx = existing.indexOf(AUTO_BEGIN);
  const endIdx = existing.indexOf(AUTO_END);
  if (beginIdx === -1 || endIdx === -1) {
    return renderSkillMd(config, componentCount);
  }

  return existing.slice(0, beginIdx) + AUTO_BEGIN + replacement + AUTO_END + existing.slice(endIdx + AUTO_END.length);
}

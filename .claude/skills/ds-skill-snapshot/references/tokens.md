# Color tokens — @szum-tech/design-system 3.21.4

Semantic OKLCH tokens. **Never use raw `oklch(...)` literals or hex colors** — always use the
semantic token via a Tailwind utility prefix:

- `bg-<token>` — background
- `text-<token>` — text color
- `border-<token>` — border color
- `ring-<token>` — focus ring

Tokens come in pairs: a surface token (e.g. `primary`, `card`) and its `*-foreground`
counterpart for readable content on that surface — e.g. `bg-primary text-primary-foreground`.

Values shown as `name` (e.g. `blue-600`) are Tailwind built-in palette references.

## Palette colors

| Token | Light | Dark |
|---|---|---|
| `background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `primary` | `blue-600` | `blue-600` |
| `primary-foreground` | `blue-50` | `blue-50` |
| `secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `accent` | `oklch(0.97 0 0)` | `oklch(0.371 0 0)` |
| `accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `error` | `red-600` | `red-700` |
| `error-foreground` | `red-50` | `red-50` |
| `warning` | `yellow-600` | `yellow-700` |
| `warning-foreground` | `yellow-50` | `yellow-50` |
| `success` | `green-600` | `green-700` |
| `success-foreground` | `green-50` | `green-50` |

## Chart colors

| Token | Light | Dark |
|---|---|---|
| `chart-1` | `blue-300` | `blue-300` |
| `chart-2` | `blue-500` | `blue-500` |
| `chart-3` | `blue-600` | `blue-600` |
| `chart-4` | `blue-700` | `blue-700` |
| `chart-5` | `blue-800` | `blue-800` |

## Components colors

| Token | Light | Dark |
|---|---|---|
| `sidebar` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `sidebar-primary` | `blue-600` | `blue-500` |
| `sidebar-primary-foreground` | `blue-50` | `blue-50` |
| `sidebar-accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `sidebar-accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `sidebar-border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `sidebar-ring` | `oklch(0.708 0 0)` | `oklch(0.439 0 0)` |
| `card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `popover` | `oklch(1 0 0)` | `oklch(0.269 0 0)` |
| `popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` |
| `ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |

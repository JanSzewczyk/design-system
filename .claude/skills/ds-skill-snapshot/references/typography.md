# Typography — @szum-tech/design-system 3.21.4

Use these utility classes for text styling instead of ad-hoc `text-*`/`font-*` combinations.
Each class bundles font-size, line-height, weight and tracking — including responsive scaling.

## Text utilities

| Class | Applies |
|---|---|
| `text-display-xl` | `text-(length:--font-size-display-md) leading-(--line-height-tight) font-extrabold tracking-(--letter-spacing-tighter) md:text-(length:--font-size-display-xl)` |
| `text-display-lg` | `text-[2.5rem] leading-(--line-height-tight) font-extrabold tracking-(--letter-spacing-tighter) md:text-(length:--font-size-display-lg)` |
| `text-display-md` | `text-[2rem] leading-[1.15] font-bold tracking-(--letter-spacing-tighter) md:text-(length:--font-size-display-md)` |
| `text-display-sm` | `text-[1.75rem] leading-(--line-height-snug) font-bold tracking-(--letter-spacing-tight) md:text-(length:--font-size-display-sm)` |
| `text-heading-h1` | `text-[1.75rem] leading-[1.25] font-bold tracking-(--letter-spacing-tight) md:text-(length:--font-size-heading-h1)` |
| `text-heading-h2` | `text-[1.375rem] leading-[1.3] font-semibold tracking-(--letter-spacing-tight) md:text-(length:--font-size-heading-h2)` |
| `text-heading-h3` | `text-[1.125rem] leading-(--line-height-normal) font-semibold tracking-[-0.005em] md:text-(length:--font-size-heading-h3)` |
| `text-heading-h4` | `text-[1rem] leading-(--line-height-normal) font-semibold tracking-(--letter-spacing-normal) md:text-(length:--font-size-heading-h4)` |
| `text-body-xl` | `text-(length:--font-size-body-xl) leading-(--line-height-relaxed) font-normal` |
| `text-body-lg` | `text-(length:--font-size-body-lg) leading-(--line-height-relaxed) font-normal` |
| `text-body-default` | `text-(length:--font-size-body-default) leading-(--line-height-relaxed) font-normal` |
| `text-body-sm` | `text-(length:--font-size-body-sm) leading-[1.5] font-normal` |
| `text-body-xs` | `text-(length:--font-size-body-xs) leading-[1.5] font-normal` |
| `text-lead` | `text-muted-foreground text-(length:--font-size-body-xl) leading-(--line-height-loose) font-normal` |
| `text-mute` | `text-muted-foreground text-(length:--font-size-body-sm) leading-[1.5] font-normal` |
| `text-small` | `text-muted-foreground text-(length:--font-size-body-xs) leading-[1.4] font-normal` |
| `text-code` | `font-code bg-muted text-foreground rounded px-1.5 py-0.5 text-[0.875em] leading-[1.5] font-medium` |
| `text-blockquote` | `text-muted-foreground border-border border-l-2 pl-4 text-[1rem] leading-(--line-height-relaxed)` |

## Font families

- `font-poppins` — "Poppins", sans-serif
- `font-code` — "JetBrains Mono", monospace

## Font sizes

- `font-size-display-xl` — 4.5rem (72px)
- `font-size-display-lg` — 3.75rem (60px)
- `font-size-display-md` — 3rem (48px)
- `font-size-display-sm` — 2.25rem (36px)
- `font-size-heading-h1` — 2rem (32px)
- `font-size-heading-h2` — 1.5rem (24px)
- `font-size-heading-h3` — 1.25rem (20px)
- `font-size-heading-h4` — 1.125rem (18px)
- `font-size-body-xl` — 1.25rem (20px)
- `font-size-body-lg` — 1.125rem (18px)
- `font-size-body-default` — 1rem (16px)
- `font-size-body-sm` — 0.875rem (14px)
- `font-size-body-xs` — 0.75rem (12px)

## Line heights

- `line-height-tight` — 1.1
- `line-height-snug` — 1.2
- `line-height-normal` — 1.4
- `line-height-relaxed` — 1.6
- `line-height-loose` — 1.7

## Letter spacing

- `letter-spacing-tighter` — -0.02em
- `letter-spacing-tight` — -0.01em
- `letter-spacing-normal` — 0
- `letter-spacing-wide` — 0.05em

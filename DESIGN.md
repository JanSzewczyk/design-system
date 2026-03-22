# Design System Specification: Editorial Precision

## 1. Overview & Creative North Star

This design system is anchored by the **"The Digital Curator"** North Star. We are moving beyond the standard SaaS
"box-on-box" layout to create an experience that feels curated, high-end, and intentionally spacious.

While inspired by the functional minimalism of shadcn/ui, our execution leans into **Editorial Sophistication**. This
means prioritizing extreme legibility, high-contrast semantic signaling, and a layout philosophy where whitespace is not
"empty" but is a structural element. We reject the rigid grid in favor of intentional asymmetry—allowing content to
breathe and primary actions to command the eye through scale and tonal depth rather than clutter.

**Technology Foundation:** React 19+, Tailwind CSS 4+ with OKLCH color space, Radix UI accessible primitives, CVA
(class-variance-authority) for type-safe variant styling.

---

## 2. Colors & Surface Philosophy

The palette utilizes the **OKLCH color space** for perceptually uniform colors. The primary blue (`--color-blue-600`,
approx. `#2563eb`) serves as the gravitational center, supported by a sophisticated range of achromatic neutral surfaces
defined in OKLCH.

### Light Theme (`:root`)

| Token                  | OKLCH Value        | Approx. Hex | Role                                                     |
| ---------------------- | ------------------ | ----------- | -------------------------------------------------------- |
| `background`           | `oklch(1 0 0)`     | `#ffffff`   | Page-level canvas. Pure white base layer.                |
| `foreground`           | `oklch(0.145 0 0)` | `#1c1917`   | Primary text. Near-black with tonal warmth.              |
| `primary`              | `blue-600`         | `#2563eb`   | Primary actions, links, active states. The brand anchor. |
| `primary-foreground`   | `blue-50`          | `#eff6ff`   | Text on primary backgrounds.                             |
| `secondary`            | `oklch(0.97 0 0)`  | `#f5f5f5`   | Low-emphasis backgrounds for secondary actions.          |
| `secondary-foreground` | `oklch(0.205 0 0)` | `#292524`   | Text on secondary surfaces.                              |
| `muted`                | `oklch(0.97 0 0)`  | `#f5f5f5`   | Subdued backgrounds for de-emphasized areas.             |
| `muted-foreground`     | `oklch(0.556 0 0)` | `#78716c`   | Secondary text, captions, placeholders.                  |
| `accent`               | `oklch(0.97 0 0)`  | `#f5f5f5`   | Hover highlights and interactive surface shifts.         |
| `accent-foreground`    | `oklch(0.205 0 0)` | `#292524`   | Text on accent surfaces.                                 |
| `card`                 | `oklch(1 0 0)`     | `#ffffff`   | Card surfaces. Same as background for seamless nesting.  |
| `card-foreground`      | `oklch(0.145 0 0)` | `#1c1917`   | Text on cards.                                           |
| `popover`              | `oklch(1 0 0)`     | `#ffffff`   | Floating menus, dropdowns, tooltips.                     |
| `popover-foreground`   | `oklch(0.145 0 0)` | `#1c1917`   | Text in popovers.                                        |
| `sidebar`              | `oklch(0.985 0 0)` | `#fafafa`   | Navigation sidebar background. Barely off-white.         |
| `sidebar-foreground`   | `oklch(0.145 0 0)` | `#1c1917`   | Text in sidebar.                                         |
| `border`               | `oklch(0.922 0 0)` | `#e7e5e4`   | Subtle dividers and container borders.                   |
| `input`                | `oklch(0.922 0 0)` | `#e7e5e4`   | Input field borders.                                     |
| `ring`                 | `oklch(0.708 0 0)` | `#a8a29e`   | Focus ring indicator.                                    |
| `success`              | `green-600`        | `#16a34a`   | Positive states, confirmations.                          |
| `warning`              | `yellow-600`       | `#ca8a04`   | Caution states, alerts.                                  |
| `error`                | `red-600`          | `#dc2626`   | Destructive actions, validation errors.                  |

### Dark Theme (`.dark` class)

| Token              | OKLCH Value          | Approx. Hex          | Role                                           |
| ------------------ | -------------------- | -------------------- | ---------------------------------------------- |
| `background`       | `oklch(0.145 0 0)`   | `#1c1917`            | Deep, warm dark canvas.                        |
| `foreground`       | `oklch(0.985 0 0)`   | `#fafafa`            | Primary text on dark. Near-white.              |
| `secondary`        | `oklch(0.269 0 0)`   | `#3a3633`            | Low-emphasis dark surface.                     |
| `muted`            | `oklch(0.269 0 0)`   | `#3a3633`            | Subdued dark surface.                          |
| `muted-foreground` | `oklch(0.708 0 0)`   | `#a8a29e`            | Secondary text on dark.                        |
| `accent`           | `oklch(0.371 0 0)`   | `#524e4b`            | Hover highlights on dark.                      |
| `card`             | `oklch(0.205 0 0)`   | `#292524`            | Card surfaces on dark. Lifted from background. |
| `popover`          | `oklch(0.269 0 0)`   | `#3a3633`            | Floating surfaces on dark.                     |
| `sidebar`          | `oklch(0.205 0 0)`   | `#292524`            | Sidebar on dark.                               |
| `border`           | `oklch(1 0 0 / 10%)` | White at 10% opacity | Translucent dark borders.                      |
| `input`            | `oklch(1 0 0 / 15%)` | White at 15% opacity | Input borders on dark. Slightly more visible.  |
| `ring`             | `oklch(0.556 0 0)`   | `#78716c`            | Focus ring on dark.                            |
| `error`            | `red-700`            | `#b91c1c`            | Deeper red for dark backgrounds.               |
| `success`          | `green-700`          | `#15803d`            | Deeper green for dark backgrounds.             |
| `warning`          | `yellow-700`         | `#a16207`            | Deeper amber for dark backgrounds.             |

### Chart Colors (Data Visualization Palette)

| Token     | Reference  | Role                                 |
| --------- | ---------- | ------------------------------------ |
| `chart-1` | `blue-300` | Lightest data series.                |
| `chart-2` | `blue-500` | Medium data series.                  |
| `chart-3` | `blue-600` | Primary data series (matches brand). |
| `chart-4` | `blue-700` | Darker data series.                  |
| `chart-5` | `blue-800` | Deepest data series.                 |

### The "No-Line" Rule

Sectioning should be achieved through **Background Color Shifts** rather than 1px solid borders. For example, a main
content area using `background` transitions into a sidebar using `sidebar` (barely off-white). The OKLCH value change
provides a cleaner, more premium separation than a mechanical line.

- **Base Level:** `background` — pure white canvas
- **Sectioning:** `sidebar` / `secondary` — barely-there warmth shift for layout blocks
- **Interactive Elements:** `card` — same as background in light mode, lifted in dark mode
- **De-emphasis:** `muted` — for backgrounds behind secondary content

### The "Glass & Blur" Rule

For floating elements (menus, toasts, popovers), use `popover` at 80% opacity with a `24px` backdrop-blur for a
glassmorphism effect. This adds "soul" to the minimalist aesthetic without visual clutter.

---

## 3. Typography

We use **Poppins** for its geometric, architectural quality and friendly roundness, paired with **JetBrains Mono** for
code and data-heavy strings to provide a "technical-luxury" feel.

### Display Sizes (Hero & Landing Moments)

| Level      | Desktop Size     | Mobile Size      | Weight          | Line Height | Letter Spacing |
| ---------- | ---------------- | ---------------- | --------------- | ----------- | -------------- |
| Display XL | `4.5rem` (72px)  | `2rem` (32px)    | 800 (Extrabold) | 1.1 (Tight) | -0.02em        |
| Display LG | `3.75rem` (60px) | `2.5rem` (40px)  | 800 (Extrabold) | 1.1 (Tight) | -0.02em        |
| Display MD | `3rem` (48px)    | `2rem` (32px)    | 700 (Bold)      | 1.15        | -0.02em        |
| Display SM | `2.25rem` (36px) | `1.75rem` (28px) | 700 (Bold)      | 1.2 (Snug)  | -0.01em        |

### Heading Sizes (Page & Section Titles)

| Level | Desktop Size      | Mobile Size       | Weight         | Line Height | Letter Spacing |
| ----- | ----------------- | ----------------- | -------------- | ----------- | -------------- |
| H1    | `2rem` (32px)     | `1.75rem` (28px)  | 700 (Bold)     | 1.25        | -0.01em        |
| H2    | `1.5rem` (24px)   | `1.375rem` (22px) | 600 (Semibold) | 1.3         | -0.01em        |
| H3    | `1.25rem` (20px)  | `1.125rem` (18px) | 600 (Semibold) | 1.4         | -0.005em       |
| H4    | `1.125rem` (18px) | `1rem` (16px)     | 600 (Semibold) | 1.4         | 0              |

### Body Sizes (Reading & Interface Text)

| Level        | Size              | Line Height   | Weight | Usage                                         |
| ------------ | ----------------- | ------------- | ------ | --------------------------------------------- |
| Body XL      | `1.25rem` (20px)  | 1.6 (Relaxed) | 400    | Lead paragraphs, featured text.               |
| Body LG      | `1.125rem` (18px) | 1.6 (Relaxed) | 400    | Emphasized body text.                         |
| Body Default | `1rem` (16px)     | 1.6 (Relaxed) | 400    | Standard paragraph text. Maximum readability. |
| Body SM      | `0.875rem` (14px) | 1.5           | 400    | Compact UI text, table cells.                 |
| Body XS      | `0.75rem` (12px)  | 1.5           | 400    | Captions, fine print, timestamps.             |

### Special Text Roles

- **Lead:** Body XL size in `muted-foreground` color, line-height 1.7. For introductory paragraphs.
- **Mute:** Body SM in `muted-foreground`. For de-emphasized helper text.
- **Small:** Body XS in `muted-foreground`, line-height 1.4. For timestamps and metadata.
- **Code:** JetBrains Mono at `0.875em`, weight 500, `muted` background with small inline padding (`0.125rem 0.375rem`).
- **Blockquote:** Italic, `muted-foreground`, 2px left border, `1rem` left padding, line-height 1.6.

### Typography Personality

The typographic hierarchy is the primary driver of the brand's "Trustworthy" personality. Large, extrabold Display text
conveys authority and confidence, while ample leading in body text conveys transparency and ease. Poppins' geometric
roundness softens the editorial precision without sacrificing professionalism.

---

## 4. Elevation & Depth

We eschew heavy drop shadows in favor of **Tonal Layering** and **Ambient Light**.

### The Layering Principle

Place a `card` surface on a `secondary`/`muted` section. The subtle shift in OKLCH lightness creates elevation without
visual noise. In dark mode, this is more pronounced: `card` at `oklch(0.205)` lifts naturally from `background` at
`oklch(0.145)`.

### Shadow Scale

| Level       | Usage                   | Description                                         |
| ----------- | ----------------------- | --------------------------------------------------- |
| `shadow-xs` | Outline-style buttons   | Barely visible. Structural hint only.               |
| `shadow-sm` | Badges, color swatches  | Gentle ambient lift.                                |
| `shadow-lg` | Dialogs, sheets, modals | Wide ambient shadow. Mimics natural diffused light. |

### Corner Radii

- **Global radius:** `0.25rem` (4px) — the system default (`--radius`). Used for buttons, inputs, badges, alerts.
- **Rounded full:** `9999px` — Used for status indicators and pills.
- **No radius:** Sharp corners are avoided. Even subtle rounding communicates approachability.

### The "Ghost Border" Fallback

When a border is needed (e.g., outline button variants, input fields), use the `border` token (`oklch(0.922 0 0)` in
light, `oklch(1 0 0 / 10%)` in dark). In dark mode, translucent white borders maintain depth without appearing harsh.
High-contrast, opaque black borders are strictly forbidden.

---

## 5. Components

### Buttons

Six variants, three sizes, three icon-only sizes.

| Variant               | Background                  | Text                   | Hover                        | Usage                                               |
| --------------------- | --------------------------- | ---------------------- | ---------------------------- | --------------------------------------------------- |
| **Default (Primary)** | `primary`                   | `primary-foreground`   | `primary` at 90% opacity     | Main CTAs. Bold weight.                             |
| **Error**             | `error`                     | White                  | `error` at 90% opacity       | Destructive actions (delete, remove).               |
| **Outline**           | `background` + ghost border | `foreground`           | `accent` background shift    | Secondary actions. `shadow-xs` for structural hint. |
| **Secondary**         | `secondary`                 | `secondary-foreground` | `secondary` at 80% opacity   | Low-emphasis actions.                               |
| **Ghost**             | Transparent                 | `foreground`           | `accent` background on hover | Toolbar actions, inline triggers.                   |
| **Link**              | None                        | `primary`              | Underline on hover           | Inline navigation. No background.                   |

**Sizes:** Default (`h-9`, `px-4`), Small (`h-8`, `px-3`), Large (`h-10`, `px-6`). Icon-only: `size-9`, `size-8`,
`size-10`.

**States:** Disabled at 50% opacity with `pointer-events-none`. Focus: `ring` color ring with `border-ring` border.
Invalid: `error` ring glow.

### Badges

| Variant       | Background  | Text                   | Border         |
| ------------- | ----------- | ---------------------- | -------------- |
| **Primary**   | `primary`   | `primary-foreground`   | Transparent    |
| **Secondary** | `secondary` | `secondary-foreground` | Transparent    |
| **Outline**   | Transparent | `foreground`           | `border` color |
| **Success**   | `success`   | `success-foreground`   | Transparent    |
| **Warning**   | `warning`   | `warning-foreground`   | Transparent    |
| **Error**     | `error`     | `error-foreground`     | Transparent    |

Badges use `rounded` corners (0.25rem), `px-2 py-0.5`, `text-xs`, `font-medium`.

### Status Indicators

Pill-shaped (`rounded-full`) with soft, translucent semantic coloring:

| Variant     | Background               | Text               | Border                   |
| ----------- | ------------------------ | ------------------ | ------------------------ |
| **Default** | `muted`                  | `muted-foreground` | Transparent              |
| **Success** | `success` at 10% opacity | `success`          | `success` at 20% opacity |
| **Error**   | `error` at 10% opacity   | `error`            | `error` at 20% opacity   |
| **Warning** | `warning` at 10% opacity | `warning`          | `warning` at 20% opacity |
| **Primary** | `primary` at 10% opacity | `primary`          | `primary` at 20% opacity |

Status indicators use `rounded-full`, `px-2.5 py-1`, `text-xs`, `font-medium`, and include a small dot indicator.

### Cards & Items

- **Cards:** Use `card` background color. In light mode, cards blend with the page; in dark mode, they lift
  (`oklch(0.205)` on `oklch(0.145)`).
- **Item Lists:** Three variants: `default` (transparent), `outline` (ghost border), `muted` (muted background at 50%
  opacity). Two sizes: `default` (`gap-4 p-4`), `sm` (`gap-2.5 px-4 py-3`).
- **Rule:** Prefer generous spacing (`gap-4` to `gap-6`) between list items over divider lines.

### Alerts

| Variant         | Background | Text              |
| --------------- | ---------- | ----------------- |
| **Default**     | `card`     | `card-foreground` |
| **Destructive** | `card`     | `error`           |

Alerts use `rounded-lg`, `border`, `px-4 py-3`, `text-sm`. Grid layout with optional icon column.

### Input Fields

- Background: Inherits from parent (typically `background`).
- Border: `border` token (ghost border approach).
- Focus: `ring` color ring with `border-ring` border and `ring/50` outer glow.
- Invalid: `error` ring glow with `border-error`.
- Size: `h-9` default with `px-3 py-1` padding, `text-sm`.

### Dialogs & Modals

- Fixed centered positioning with `z-50`.
- `background` surface, `border` ghost border, `shadow-lg` ambient shadow.
- `rounded` corners, `p-6` padding, `gap-4` internal spacing.
- Width scale: `xs` through `6xl` and `full`.
- Enter: fade-in + zoom-in (95% → 100%). Exit: fade-out + zoom-out (100% → 95%).

### Sheets (Side Panels)

- Slide from any edge (top, right, bottom, left). Default: right.
- `background` surface, `shadow-lg`, `p-6` padding.
- Right/left: `h-full`, `w-3/4` with `sm:max-w-sm`.
- Top/bottom: full width, `max-h-[90vh]`.
- Animation: 200ms ease-in-out slide + fade.

### Switch / Toggle

- **Unchecked:** `input` background (light gray).
- **Checked:** `primary` background.
- Sizes: Default (`h-[18.4px] w-8`) and Small (`h-3.5 w-6`).
- Rounded full. Smooth `transition-all`.
- Thumb: White circle with translate-x animation.

---

## 6. Animations & Transitions

### Standard Transitions

- **Duration:** `200ms` for most interactions. `400ms` for tooltip slides.
- **Easing:** Default CSS easing for buttons/hovers. `cubic-bezier(0.16, 1, 0.3, 1)` for tooltip slide-and-fade.

### Named Animations

| Animation          | Duration        | Description                                    |
| ------------------ | --------------- | ---------------------------------------------- |
| Slide Down & Fade  | 400ms           | Tooltip entering from above. Y: -2px → 0.      |
| Slide Up & Fade    | 400ms           | Tooltip entering from below. Y: +2px → 0.      |
| Slide Left & Fade  | 400ms           | Tooltip entering from right. X: +2px → 0.      |
| Slide Right & Fade | 400ms           | Tooltip entering from left. X: -2px → 0.       |
| Accordion Down     | 200ms ease-out  | Content expanding from 0 height. With fade-in. |
| Accordion Up       | 200ms ease-out  | Content collapsing to 0 height. With fade-out. |
| Marquee            | Infinite linear | Horizontal content scroll.                     |

---

## 7. Layout & Spacing

### Container

- Max width: `80rem` (1280px).
- Horizontal padding: `1rem` (16px) on mobile, `2rem` (32px) on `sm+` breakpoints.
- Centered with `mx-auto`.

### Spacing Scale

Standard Tailwind 4px-increment scale. Common component spacing:

| Token         | Value      | Usage                                                   |
| ------------- | ---------- | ------------------------------------------------------- |
| `gap-1`       | 4px        | Tight icon-text pairs.                                  |
| `gap-1.5`     | 6px        | Status indicator icon-text.                             |
| `gap-2`       | 8px        | Button icon-text, badge icon-text.                      |
| `gap-3`       | 12px       | Field label-input spacing.                              |
| `gap-4`       | 16px       | Card internal spacing, item list gaps, dialog sections. |
| `gap-6`       | 24px       | Section spacing, timeline vertical gaps.                |
| `gap-8`       | 32px       | Major section divisions, timeline horizontal gaps.      |
| `p-4`         | 16px       | Standard card/item padding.                             |
| `p-6`         | 24px       | Dialog/sheet padding. Premium breathing room.           |
| `px-2.5 py-1` | 10px / 4px | Status indicator padding.                               |
| `px-4 py-2`   | 16px / 8px | Default button padding.                                 |

### Whitespace Philosophy

Whitespace is a structural element, not empty space. When a layout feels crowded, increase spacing tokens rather than
adding borders or dividers. The hierarchy of spacing itself communicates relationships:

- Tight spacing (4-8px) = closely related elements (icon + label)
- Medium spacing (12-16px) = grouped elements (fields in a form)
- Generous spacing (24-32px) = distinct sections

---

## 8. Scrollbar Styling

Custom scrollbar theming for consistency:

- Track: `background` color (matches page canvas).
- Thumb: `border` color with rounded corners.
- Thumb hover: `border` at 80% opacity.
- Width/height: `8px` (`0.5rem`).
- Scrollbar buttons: hidden.
- Corner: `background` color.

---

## 9. Do's and Don'ts

### Do

- **Do** prioritize whitespace. If a layout feels crowded, increase spacing tokens rather than adding borders.
- **Do** use `muted-foreground` for secondary text to maintain a sophisticated hierarchy.
- **Do** use JetBrains Mono for all pricing, code snippets, and numerical data — it signals precision and technical
  credibility.
- **Do** use OKLCH color shifts between surfaces to create depth without shadows.
- **Do** use `data-slot` attributes on all component root elements for testing and CSS targeting.
- **Do** use `rounded` (0.25rem) consistently. Use `rounded-full` only for pills and status indicators.
- **Do** support both light and dark themes. Every color decision must work in both contexts.
- **Do** use translucent borders in dark mode (`oklch(1 0 0 / 10%)`) for sophisticated depth.
- **Do** leverage the `cn()` utility (clsx + tailwind-merge) for safe class merging.

### Don't

- **Don't** use pure black (`#000000`) for text. Always use `foreground` (`oklch(0.145 0 0)`) to maintain tonal warmth.
- **Don't** use heavy drop shadows. If an element needs to pop, use a background color shift or the `shadow-lg` ambient
  shadow.
- **Don't** use 1px solid dividers between list items. Use spacing.
- **Don't** stack more than three levels of surface containers (e.g., Card on Section on Background is the limit).
- **Don't** use arbitrary hex colors. All colors must come from the semantic token system.
- **Don't** mix font families. Poppins for UI, JetBrains Mono for code/data. No exceptions.
- **Don't** use font weights below 400 (Regular) or above 800 (Extrabold). The system is calibrated within this range.
- **Don't** override the global `--radius` (0.25rem) with arbitrary values. Use the token scale.
- **Don't** use `z-index` values outside the established hierarchy (`z-50` for overlays).

# ColorSwatch

**Category:** Misc · **Public:** yes · **Stories:** 11

## Import
```ts
import { ColorSwatch } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `size` | `ColorSwatchSize` | no | — |
| `color` | `string` | no | — |
| `asChild` | `boolean` | no | — |
| `disabled` | `boolean` | no | — |
| `withoutTransparency` | `boolean` | no | — |

## Variants
- **size**: **default** (default), sm, lg

## Examples
### Default
```tsx
{
    color: "#3b82f6"
  }
```

### Sizes
```tsx
<div className="flex items-center gap-4">
  <ColorSwatch size="sm" color="#3b82f6" />
  <ColorSwatch size="default" color="#3b82f6" />
  <ColorSwatch size="lg" color="#3b82f6" />
</div>
```

### Color Formats
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-4">
    <ColorSwatch color="#ff5733" />
    <span className="text-muted-foreground text-sm">Hex: #ff5733</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="rgb(59, 130, 246)" />
    <span className="text-muted-foreground text-sm">RGB: rgb(59, 130, 246)</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="hsl(220, 90%, 56%)" />
    <span className="text-muted-foreground text-sm">HSL: hsl(220, 90%, 56%)</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="oklch(0.637 0.237 25.331)" />
    <span className="text-muted-foreground text-sm">OKLCH: oklch(0.637 0.237 25.331)</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="rebeccapurple" />
    <span className="text-muted-foreground text-sm">Named: rebeccapurple</span>
  </div>
</div>
```

### Transparent Colors
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-4">
    <ColorSwatch color="rgba(59, 130, 246, 0.5)" />
    <span className="text-muted-foreground text-sm">RGBA with 50% alpha (checkerboard visible)</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="hsla(220, 90%, 56%, 0.3)" />
    <span className="text-muted-foreground text-sm">HSLA with 30% alpha (checkerboard visible)</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="#3b82f680" />
    <span className="text-muted-foreground text-sm">Hex with alpha (checkerboard visible)</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="oklch(0.637 0.237 250 / 50%)" />
    <span className="text-muted-foreground text-sm">OKLCH with alpha (checkerboard visible)</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="transparent" />
    <span className="text-muted-foreground text-sm">Transparent</span>
  </div>
</div>
```

### Without Transparency Pattern
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-4">
    <ColorSwatch color="rgba(59, 130, 246, 0.5)" />
    <span className="text-muted-foreground text-sm">With transparency pattern (default)</span>
  </div>
  <div className="flex items-center gap-4">
    <ColorSwatch color="rgba(59, 130, 246, 0.5)" withoutTransparency />
    <span className="text-muted-foreground text-sm">Without transparency pattern</span>
  </div>
</div>
```

### No Color
```tsx
<div className="flex items-center gap-4">
  <ColorSwatch />
  <span className="text-muted-foreground text-sm">No color (shows diagonal line)</span>
</div>
```

### Invalid Color
```tsx
<div className="flex items-center gap-4">
  <ColorSwatch color="not-a-color" />
  <span className="text-muted-foreground text-sm">Invalid color (transparent background)</span>
</div>
```

### Disabled
```tsx
<div className="flex items-center gap-4">
  <ColorSwatch color="#3b82f6" />
  <ColorSwatch color="#3b82f6" disabled />
</div>
```

### As Child
```tsx
<ColorSwatch color="#3b82f6" asChild>
  <button type="button" onClick={() => alert("Clicked!")}>
    Click me
  </button>
</ColorSwatch>
```

### Accessibility
```tsx
<div className="flex items-center gap-4">
  <ColorSwatch data-testid="swatch-with-color" color="#3b82f6" />
  <ColorSwatch data-testid="swatch-no-color" />
  <ColorSwatch data-testid="swatch-disabled" color="#3b82f6" disabled />
</div>
```

### Color Validation
```tsx
<div className="flex items-center gap-4">
  <ColorSwatch data-testid="hex-color" color="#ff5733" />
  <ColorSwatch data-testid="rgb-color" color="rgb(59, 130, 246)" />
  <ColorSwatch data-testid="rgba-color" color="rgba(59, 130, 246, 0.5)" />
  <ColorSwatch data-testid="named-color" color="rebeccapurple" />
  <ColorSwatch data-testid="invalid-color" color="not-a-valid-color" />
  <ColorSwatch data-testid="empty-color" color="" />
  <ColorSwatch data-testid="whitespace-color" color="   " />
</div>
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).

# ToggleGroup

**Category:** Misc · **Public:** yes · **Stories:** 8

## Import
```ts
import { ToggleGroup } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `variant` | `ToggleVariant` | no | — |
| `size` | `ToggleSize` | no | — |
| `spacing` | `number` | no | — |

## Examples
### Formatting Toolbar
```tsx
<ToggleGroup {...args}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <ItalicIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <UnderlineIcon />
  </ToggleGroupItem>
</ToggleGroup>
```

### Outline
```tsx
<ToggleGroup {...args}>
  <ToggleGroupItem value="all">All</ToggleGroupItem>
  <ToggleGroupItem value="missed">Missed</ToggleGroupItem>
</ToggleGroup>
```

### Sizes
```tsx
<div className="flex flex-col gap-4">
  <ToggleGroup type="single" variant="outline" size="sm">
    <ToggleGroupItem value="top">Top</ToggleGroupItem>
    <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroup>
  <ToggleGroup type="single" variant="outline" size="default">
    <ToggleGroupItem value="top">Top</ToggleGroupItem>
    <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroup>
</div>
```

### Spacing
```tsx
<ToggleGroup {...args}>
  <ToggleGroupItem value="top">Top</ToggleGroupItem>
  <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
```

### Vertical
```tsx
<ToggleGroup {...args}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <ItalicIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <UnderlineIcon />
  </ToggleGroupItem>
</ToggleGroup>
```

### All Disabled
```tsx
<ToggleGroup {...args}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <ItalicIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <UnderlineIcon />
  </ToggleGroupItem>
</ToggleGroup>
```

### Custom
```tsx
<div className="flex flex-col items-center gap-4">
  <ToggleGroup
    type="single"
    variant="outline"
    spacing={2}
    size="lg"
    value={fontWeight}
    onValueChange={(value) => {
      if (value) setFontWeight(value);
    }}
  >
    <ToggleGroupItem value="light" aria-label="Font weight light" className="h-auto flex-col px-4 py-2">
      <span className="text-2xl font-light">Aa</span>
      <span className="text-xs">Light</span>
    </ToggleGroupItem>
    <ToggleGroupItem value="normal" aria-label="Font weight normal" className="h-auto flex-col px-4 py-2">
      <span className="text-2xl font-normal">Aa</span>
      <span className="text-xs">Normal</span>
    </ToggleGroupItem>
    <ToggleGroupItem value="medium" aria-label="Font weight medium" className="h-auto flex-col px-4 py-2">
      <span className="text-2xl font-medium">Aa</span>
      <span className="text-xs">Medium</span>
    </ToggleGroupItem>
    <ToggleGroupItem value="bold" aria-label="Font weight bold" className="h-auto flex-col px-4 py-2">
      <span className="text-2xl font-bold">Aa</span>
      <span className="text-xs">Bold</span>
    </ToggleGroupItem>
  </ToggleGroup>
  <p className="text-muted-foreground text-sm">Selected: {fontWeight}</p>
</div>
```

### Multiple Preselected
```tsx
<ToggleGroup {...args}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <ItalicIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <UnderlineIcon />
  </ToggleGroupItem>
</ToggleGroup>
```

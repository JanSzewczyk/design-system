# Toggle

**Category:** Misc · **Public:** yes · **Stories:** 6

## Import
```ts
import { Toggle } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `variant` | `ToggleVariant` | no | — |
| `size` | `ToggleSize` | no | — |

## Variants
- **variant**: **default** (default), outline
- **size**: sm, **default** (default), lg

## Examples
### Toggle Story
```tsx
<Toggle {...args}>
  <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
  Bookmark
</Toggle>
```

### Outline
```tsx
<Toggle {...args}>
  <BoldIcon />
  Bold
</Toggle>
```

### With Text
```tsx
<Toggle {...args}>
  <ItalicIcon />
  Italic
</Toggle>
```

### Sizes
```tsx
<div className="flex items-center gap-4">
  <Toggle variant="outline" size="sm" aria-label="Toggle small">
    <ItalicIcon />
    Small
  </Toggle>
  <Toggle variant="outline" size="default" aria-label="Toggle default">
    <ItalicIcon />
    Default
  </Toggle>
  <Toggle variant="outline" size="lg" aria-label="Toggle large">
    <ItalicIcon />
    Large
  </Toggle>
</div>
```

### Disabled
```tsx
<div className="flex items-center gap-4">
  <Toggle disabled aria-label="Toggle default disabled">
    Default
  </Toggle>
  <Toggle variant="outline" disabled aria-label="Toggle outline disabled">
    Outline
  </Toggle>
</div>
```

### Default Pressed
```tsx
<Toggle {...args}>
  <ItalicIcon />
  Italic
</Toggle>
```

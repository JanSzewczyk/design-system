# Badge

**Category:** Misc · **Public:** yes · **Stories:** 10

## Import
```ts
import { Badge } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `variant` | `BadgeVariant` | no | — |
| `asChild` | `boolean` | no | — |

## Variants
- **variant**: **primary** (default), secondary, outline, success, warning, error

## Examples
### Example
```tsx
<div className="flex flex-col items-center gap-2">
  <div className="flex w-full flex-wrap gap-2">
    <Badge>Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Destructive</Badge>
  </div>
  <div className="flex w-full flex-wrap gap-2">
    <Badge variant="secondary" className="bg-success text-success-foreground">
      <BadgeCheckIcon />
      Verified
    </Badge>
    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="error">
      99
    </Badge>
    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
      20+
    </Badge>
  </div>
</div>
```

### Variants
```tsx
<div className="flex flex-col items-start gap-2 sm:flex-row">
  <Badge>Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Destructive</Badge>
</div>
```

### With Icons
```tsx
<div className="flex flex-wrap gap-4">
  <Badge>
    <BadgeCheckIcon />
    Verified
  </Badge>
  <Badge variant="secondary">
    <StarIcon />
    Featured
  </Badge>
  <Badge variant="error">
    <XIcon />
    Error
  </Badge>
  <Badge variant="outline">
    <ShieldCheckIcon />
    Protected
  </Badge>
</div>
```

### With Dot
```tsx
<div className="flex flex-wrap gap-4">
  <Badge>
    <BadgeDot />
    Primary
  </Badge>
  <Badge variant="secondary">
    <BadgeDot />
    Secondary
  </Badge>
  <Badge variant="outline">
    <BadgeDot />
    Outline
  </Badge>
  <Badge variant="success">
    <BadgeDot />
    Success
  </Badge>
  <Badge variant="warning">
    <BadgeDot />
    Warning
  </Badge>
  <Badge variant="error">
    <BadgeDot /> Destructive
  </Badge>
</div>
```

### Remove Button
```tsx
<div className="flex flex-wrap gap-4">
  <Badge>
    Primary
    <BadgeButton>
      <XIcon />
    </BadgeButton>
  </Badge>
  <Badge variant="secondary">
    Secondary
    <BadgeButton>
      <XIcon />
    </BadgeButton>
  </Badge>
  <Badge variant="outline">
    Outline
    <BadgeButton>
      <XIcon />
    </BadgeButton>
  </Badge>
  <Badge variant="success">
    Success
    <BadgeButton>
      <XIcon />
    </BadgeButton>
  </Badge>
  <Badge variant="warning">
    Warning
    <BadgeButton>
      <XIcon />
    </BadgeButton>
  </Badge>
  <Badge variant="error">
    Error
    <BadgeButton>
      <XIcon />
    </BadgeButton>
  </Badge>
</div>
```

### Custom Styles
```tsx
<div className="flex flex-wrap gap-4">
  <Badge variant="secondary" className="bg-success text-success-foreground">
    <BadgeCheckIcon />
    Custom Success
  </Badge>
  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="error">
    99
  </Badge>
  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
    20+
  </Badge>
  <Badge className="rounded-sm tracking-wider uppercase" variant="outline">
    New
  </Badge>
</div>
```

### Notification Badges
```tsx
<div className="flex flex-wrap items-center gap-8">
  <div className="relative">
    <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2">Messages</button>
    <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">3</Badge>
  </div>
  <div className="relative">
    <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2">Notifications</button>
    <Badge
      variant="error"
      className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
    >
      99+
    </Badge>
  </div>
  <div className="relative">
    <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2">Updates</button>
    <Badge className="border-background absolute -top-1 -right-1 size-2 rounded-full border-2 p-0" />
  </div>
</div>
```

### As Link
```tsx
<div className="flex flex-wrap gap-4">
  <Badge asChild>
    <a href="#default">Clickable Default</a>
  </Badge>
  <Badge variant="secondary" asChild>
    <a href="#secondary">Clickable Secondary</a>
  </Badge>
  <Badge variant="outline" asChild>
    <a href="#outline">Clickable Outline</a>
  </Badge>
  <Badge variant="error" asChild>
    <a href="#error">Clickable Error</a>
  </Badge>
</div>
```

### Data Attributes
```tsx
<div className="flex flex-wrap gap-4">
  <Badge>Check data-slot</Badge>
</div>
```

### Interaction Test
```tsx
<div className="flex flex-wrap gap-4">
  <Badge>Primary Badge</Badge>
  <Badge variant="secondary">Secondary Badge</Badge>
  <Badge variant="error">Error Badge</Badge>
  <Badge variant="outline">Outline Badge</Badge>
  <Badge asChild>
    <button type="button">Clickable Badge</button>
  </Badge>
</div>
```

## Notes
- Supports `asChild` (polymorphic via Radix `Slot`).

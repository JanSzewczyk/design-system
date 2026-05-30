# Progress

**Category:** Misc · **Public:** yes · **Stories:** 3

## Import
```ts
import { Progress } from "@szum-tech/design-system";
```

## Examples
### Example
```tsx
{
    value: 50
  }
```

### Data Attributes
```tsx
<div className="space-y-4">
  <Progress value={60} />
</div>
```

### Accessibility Test
```tsx
<div className="space-y-4">
  <Progress value={33} max={100} />
  <Progress value={50} max={200} />
</div>
```

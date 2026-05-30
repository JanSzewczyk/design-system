# Skeleton

**Category:** Misc · **Public:** yes · **Stories:** 4

## Import
```ts
import { Skeleton } from "@szum-tech/design-system";
```

## Examples
### Default
```tsx
{
    className: "h-4 w-48"
  }
```

### Text Lines
```tsx
<div className="flex flex-col gap-2">
  <Skeleton className="h-4 w-64" />
  <Skeleton className="h-4 w-56" />
  <Skeleton className="h-4 w-48" />
</div>
```

### Card
```tsx
<div className="flex w-64 flex-col gap-3 rounded-lg border p-4">
  <Skeleton className="h-32 w-full rounded" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
  <div className="flex gap-2 pt-1">
    <Skeleton className="h-8 w-20 rounded" />
    <Skeleton className="h-8 w-20 rounded" />
  </div>
</div>
```

### Avatar
```tsx
<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>
```

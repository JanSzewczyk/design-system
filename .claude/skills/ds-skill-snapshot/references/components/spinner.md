# Spinner

**Category:** Misc · **Public:** yes · **Stories:** 7

## Import
```ts
import { Spinner } from "@szum-tech/design-system";
```

## Examples
### Default
```tsx
<Spinner />
```

### Sizes
```tsx
<div className="flex items-center gap-8">
  <div className="flex flex-col items-center gap-2">
    <Spinner className="size-4" />
    <span className="text-xs text-gray-300">Small (16px)</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Spinner className="size-6" />
    <span className="text-xs text-gray-300">Medium (24px)</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Spinner className="size-8" />
    <span className="text-xs text-gray-300">Large (32px)</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Spinner className="size-12" />
    <span className="text-xs text-gray-300">Extra Large (48px)</span>
  </div>
</div>
```

### Colors
```tsx
<div className="flex items-center gap-8">
  <div className="flex flex-col items-center gap-2">
    <Spinner className="size-8 text-gray-100" />
    <span className="text-xs text-gray-100">Default</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Spinner className="text-primary-500 size-8" />
    <span className="text-xs text-gray-100">Primary</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Spinner className="text-success-500 size-8" />
    <span className="text-xs text-gray-100">Success</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Spinner className="text-warning-500 size-8" />
    <span className="text-xs text-gray-100">Warning</span>
  </div>
  <div className="flex flex-col items-center gap-2">
    <Spinner className="text-error-500 size-8" />
    <span className="text-xs text-gray-100">Error</span>
  </div>
</div>
```

### With Custom Class Name
```tsx
<Spinner className="size-16 text-blue-500" data-testid="custom-spinner" />
```

### With Custom Props
```tsx
<Spinner strokeWidth={3} data-testid="custom-props-spinner" />
```

### In Button
```tsx
<button
  type="button"
  className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-4 py-2"
  disabled
>
  <Spinner className="size-4" />
  Loading...
</button>
```

### Centered In Card
```tsx
<div className="bg-app-foreground flex h-48 w-64 items-center justify-center rounded-lg border border-gray-800 p-6 shadow-sm">
  <Spinner className="size-8" />
</div>
```

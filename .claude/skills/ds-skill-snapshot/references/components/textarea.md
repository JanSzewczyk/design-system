# Textarea

**Category:** Misc · **Public:** yes · **Stories:** 10

## Import
```ts
import { Textarea } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `invalid` | `boolean` | no | — |

## Examples
### Default
```tsx
<Textarea />
```

### Base
```tsx
<div className="w-full max-w-sm space-y-4">
  <Textarea {...args} />
  <Textarea placeholder="With Placeholder" {...args} />
  <Textarea defaultValue="With default value" {...args} />
</div>
```

### Disabled
```tsx
<div className="w-full max-w-sm space-y-4">
  <Textarea {...args} />
  <Textarea placeholder="With Placeholder" {...args} />
  <Textarea defaultValue="With default value" {...args} />
</div>
```

### Invalid
```tsx
<div className="w-full max-w-sm space-y-4">
  <Textarea {...args} />
  <Textarea placeholder="With Placeholder" {...args} />
  <Textarea defaultValue="With default value" {...args} />
</div>
```

### Read Only
```tsx
{
    readOnly: true,
    defaultValue: "This is read-only content"
  }
```

### User Interaction
```tsx
{
    placeholder: "Type something here..."
  }
```

### Focus And Blur
```tsx
{
    placeholder: "Focus and blur test"
  }
```

### Keyboard Navigation
```tsx
<div className="space-y-4">
  <input placeholder="Previous element" />
  <Textarea placeholder="Textarea for keyboard test" />
  <button>Next element</button>
</div>
```

### Max Length
```tsx
{
    maxLength: 10,
    placeholder: "Max 10 characters"
  }
```

### Required
```tsx
{
    required: true,
    placeholder: "This field is required"
  }
```

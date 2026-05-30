# Input

**Category:** Misc · **Public:** yes · **Stories:** 4

## Import
```ts
import { Input } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `invalid` | `boolean` | no | — |

## Examples
### Example
```tsx
{
    type: "email",
    placeholder: "Email"
  }
```

### File
```tsx
{
    type: "file"
  }
```

### Disabled
```tsx
{
    type: "email",
    placeholder: "Email",
    disabled: true
  }
```

### Invalid
```tsx
{
    type: "email",
    placeholder: "Email",
    invalid: true,
    defaultValue: "incorrect@email.com"
  }
```

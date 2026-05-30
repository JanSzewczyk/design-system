# Select

**Category:** Misc · **Public:** yes · **Stories:** 5

## Import
```ts
import { Select } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `size` | `"sm" \| "default"` | no | — |
| `invalid` | `boolean` | no | — |
| `placeholder` | `React.ReactNode` | no | — |

## Examples
### Example
```tsx
<Select placeholder="Select a fruit">
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Default Value
```tsx
<Select defaultValue="apple" placeholder="Select a fruit">
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Disabled
```tsx
<Select disabled defaultValue="apple" placeholder="Select a fruit">
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Invalid
```tsx
<Select invalid defaultValue="apple" placeholder="Select a fruit">
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Sizes
```tsx
<div className="flex flex-col items-start gap-8 sm:flex-row">
  <Select size="sm" placeholder="Small"></Select>
  <Select size="default" placeholder="Default"></Select>
</div>
```

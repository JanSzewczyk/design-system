# Switch

**Category:** Misc · **Public:** yes · **Stories:** 8

## Import
```ts
import { Switch } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `size` | `SwitchSizeType` | no | — |

## Variants
- **size**: **default** (default), sm

## Examples
### Switch Story
```tsx
<div className="flex items-center gap-2">
  <Switch id="default-switch" />
  <label htmlFor="default-switch" className="cursor-pointer text-sm">
    Toggle option
  </label>
</div>
```

### Disabled
```tsx
<FieldGroup className="w-full max-w-40">
  <Field orientation="horizontal" data-disabled>
    <Switch id="switch-disabled-unchecked" disabled />
    <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
  </Field>
  <Field orientation="horizontal" data-disabled>
    <Switch id="switch-disabled-checked" disabled defaultChecked />
    <FieldLabel htmlFor="switch-disabled-checked">Disabled checked</FieldLabel>
  </Field>
</FieldGroup>
```

### Invalid
```tsx
<Field orientation="horizontal" className="max-w-sm" data-invalid>
  <FieldContent>
    <FieldLabel htmlFor="switch-terms">Accept terms and conditions</FieldLabel>
    <FieldDescription>You must accept the terms and conditions to continue.</FieldDescription>
  </FieldContent>
  <Switch id="switch-terms" aria-invalid />
</Field>
```

### Controlled Switch
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <Switch id="controlled-switch" checked={checked} onCheckedChange={setChecked} />
    <label htmlFor="controlled-switch" className="cursor-pointer text-sm">
      Controlled switch
    </label>
  </div>
  <p className="text-muted-foreground text-xs">
    State: <span className="font-medium">{checked ? "On" : "Off"}</span>
  </p>
</div>
```

### Sizes
```tsx
<FieldGroup className="w-full max-w-40">
  <Field orientation="horizontal">
    <Switch id="switch-size-sm" size="sm" />
    <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
  </Field>
  <Field orientation="horizontal">
    <Switch id="switch-size-default" size="default" />
    <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
  </Field>
</FieldGroup>
```

### Keyboard Navigation
```tsx
<div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <Switch id="keyboard-1" />
    <label htmlFor="keyboard-1" className="cursor-pointer text-sm">
      Option 1
    </label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="keyboard-2" />
    <label htmlFor="keyboard-2" className="cursor-pointer text-sm">
      Option 2
    </label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="keyboard-3" />
    <label htmlFor="keyboard-3" className="cursor-pointer text-sm">
      Option 3
    </label>
  </div>
</div>
```

### Description
```tsx
<Field orientation="horizontal" className="max-w-sm">
  <FieldContent>
    <FieldLabel htmlFor="switch-focus-mode">Share across devices</FieldLabel>
    <FieldDescription>Focus is shared across devices, and turns off when you leave the app.</FieldDescription>
  </FieldContent>
  <Switch id="switch-focus-mode" />
</Field>
```

### Choice Card
```tsx
<FieldGroup className="w-full max-w-sm">
  <FieldLabel htmlFor="switch-share">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Share across devices</FieldTitle>
        <FieldDescription>Focus is shared across devices, and turns off when you leave the app.</FieldDescription>
      </FieldContent>
      <Switch id="switch-share" />
    </Field>
  </FieldLabel>
  <FieldLabel htmlFor="switch-notifications">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>Enable notifications</FieldTitle>
        <FieldDescription>Receive notifications when focus mode is enabled or disabled.</FieldDescription>
      </FieldContent>
      <Switch id="switch-notifications" defaultChecked />
    </Field>
  </FieldLabel>
</FieldGroup>
```

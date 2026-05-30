# Collapsible

**Category:** Misc · **Public:** yes · **Stories:** 2

## Import
```ts
import { Collapsible } from "@szum-tech/design-system";
```

## Examples
### Default
```tsx
<Collapsible {...args} className="w-64">
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      Toggle content
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2 rounded border p-4 text-sm">
    This content can be toggled open and closed.
  </CollapsibleContent>
</Collapsible>
```

### Default Open
```tsx
<Collapsible {...args} className="w-64">
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      Toggle content
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2 rounded border p-4 text-sm">
    This content is open by default.
  </CollapsibleContent>
</Collapsible>
```

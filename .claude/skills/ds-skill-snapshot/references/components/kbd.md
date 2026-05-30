# Kbd

**Category:** Misc · **Public:** yes · **Stories:** 5

## Import
```ts
import { Kbd } from "@szum-tech/design-system";
```

## Examples
### Kbd Story
```tsx
<div className="flex flex-col items-center gap-4">
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>⇧</Kbd>
    <Kbd>⌥</Kbd>
    <Kbd>⌃</Kbd>
  </KbdGroup>
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <span>+</span>
    <Kbd>B</Kbd>
  </KbdGroup>
</div>
```

### Group
```tsx
<div className="flex flex-col items-center gap-4">
  <p className="text-small">
    Use{" "}
    <KbdGroup>
      <Kbd>Ctrl + B</Kbd>
      <Kbd>Ctrl + K</Kbd>
    </KbdGroup>{" "}
    to open the command palette
  </p>
</div>
```

### Button Story
```tsx
<Button variant="outline">
  Accept{" "}
  <Kbd data-icon="inline-end" className="translate-x-0.5">
    ⏎
  </Kbd>
</Button>
```

### Tooltip Story
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Save</Button>
  </TooltipTrigger>
  <TooltipContent>
    Save Changes <Kbd>S</Kbd>
  </TooltipContent>
</Tooltip>
```

### Input Group Story
```tsx
<div className="flex w-full max-w-xs flex-col gap-6">
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </InputGroupAddon>
  </InputGroup>
</div>
```

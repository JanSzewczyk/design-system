# Tooltip

**Category:** Misc · **Public:** yes · **Stories:** 6

## Import
```ts
import { Tooltip } from "@szum-tech/design-system";
```

## Examples
### Example
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>
```

### Positions
```tsx
<div className="flex flex-wrap items-center gap-4">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Top</Button>
    </TooltipTrigger>
    <TooltipContent side="top">Tooltip on top</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Bottom</Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Left</Button>
    </TooltipTrigger>
    <TooltipContent side="left">Tooltip on left</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Right</Button>
    </TooltipTrigger>
    <TooltipContent side="right">Tooltip on right</TooltipContent>
  </Tooltip>
</div>
```

### With Delay
```tsx
<Tooltip delayDuration={500}>
  <TooltipTrigger asChild>
    <Button variant="outline">Delayed (500ms)</Button>
  </TooltipTrigger>
  <TooltipContent>This tooltip has a 500ms delay</TooltipContent>
</Tooltip>
```

### Controlled
```tsx
<div className="flex items-center gap-4">
  <Button variant="outline" onClick={() => setOpen(!open)}>
    Toggle: {open ? "Open" : "Closed"}
  </Button>
  <Tooltip open={open} onOpenChange={setOpen}>
    <TooltipTrigger asChild>
      <Button>Controlled trigger</Button>
    </TooltipTrigger>
    <TooltipContent>Controlled tooltip</TooltipContent>
  </Tooltip>
</div>
```

### Interaction Test
```tsx
<Tooltip defaultOpen>
  <TooltipTrigger asChild>
    <Button data-testid="tooltip-trigger">Trigger</Button>
  </TooltipTrigger>
  <TooltipContent data-testid="tooltip-content">Tooltip content</TooltipContent>
</Tooltip>
```

### Hover Interaction Test
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button data-testid="hover-trigger">Hover trigger</Button>
  </TooltipTrigger>
  <TooltipContent data-testid="hover-content">Hover tooltip</TooltipContent>
</Tooltip>
```

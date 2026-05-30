# Popover

**Category:** Misc · **Public:** yes · **Stories:** 6

## Import
```ts
import { Popover } from "@szum-tech/design-system";
```

## Examples
### Example
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>This is the popover content. It can contain any elements.</p>
  </PopoverContent>
</Popover>
```

### With Header
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open with Header</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Popover Title</PopoverTitle>
      <PopoverDescription>This is a helpful description of the popover content.</PopoverDescription>
    </PopoverHeader>
    <p className="text-sm">Additional content can follow the header.</p>
  </PopoverContent>
</Popover>
```

### Positions
```tsx
<div className="flex flex-wrap items-center justify-center gap-4 p-16">
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Top</Button>
    </PopoverTrigger>
    <PopoverContent side="top">
      <p className="text-sm">Appears above the trigger.</p>
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Right</Button>
    </PopoverTrigger>
    <PopoverContent side="right">
      <p className="text-sm">Appears to the right of the trigger.</p>
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Bottom</Button>
    </PopoverTrigger>
    <PopoverContent side="bottom">
      <p className="text-sm">Appears below the trigger.</p>
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Left</Button>
    </PopoverTrigger>
    <PopoverContent side="left">
      <p className="text-sm">Appears to the left of the trigger.</p>
    </PopoverContent>
  </Popover>
</div>
```

### Alignments
```tsx
<div className="flex flex-wrap items-center justify-center gap-4 p-8">
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Align Start</Button>
    </PopoverTrigger>
    <PopoverContent align="start">
      <p className="text-sm">Content aligned to the start of the trigger.</p>
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Align Center</Button>
    </PopoverTrigger>
    <PopoverContent align="center">
      <p className="text-sm">Content centered on the trigger (default).</p>
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Align End</Button>
    </PopoverTrigger>
    <PopoverContent align="end">
      <p className="text-sm">Content aligned to the end of the trigger.</p>
    </PopoverContent>
  </Popover>
</div>
```

### Controlled
```tsx
<div className="flex items-center gap-4">
  <Button variant="outline" onClick={() => setOpen((prev) => !prev)}>
    Toggle: {open ? "Open" : "Closed"}
  </Button>
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverAnchor asChild>
      <Button>Anchor</Button>
    </PopoverAnchor>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Controlled Popover</PopoverTitle>
        <PopoverDescription>This popover is controlled by external state.</PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
</div>
```

### With Custom Content
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Settings</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <PopoverHeader>
      <PopoverTitle>Notification Settings</PopoverTitle>
      <PopoverDescription>Configure how you receive notifications.</PopoverDescription>
    </PopoverHeader>
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between rounded-md border p-2">
        <span className="text-sm font-medium">Email notifications</span>
        <input type="checkbox" defaultChecked aria-label="Toggle email notifications" />
      </div>
      <div className="flex items-center justify-between rounded-md border p-2">
        <span className="text-sm font-medium">Push notifications</span>
        <input type="checkbox" aria-label="Toggle push notifications" />
      </div>
      <div className="flex items-center justify-between rounded-md border p-2">
        <span className="text-sm font-medium">SMS notifications</span>
        <input type="checkbox" aria-label="Toggle SMS notifications" />
      </div>
    </div>
  </PopoverContent>
</Popover>
```

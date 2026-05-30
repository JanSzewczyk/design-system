# Sheet

**Category:** Misc · **Public:** yes · **Stories:** 4

## Import
```ts
import { Sheet } from "@szum-tech/design-system";
```

## Examples
### Sheet Story
```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <BasicSheetContent />
</Sheet>
```

### Sheet Without Close Button
```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet without X Button</Button>
  </SheetTrigger>
  <SheetContent showCloseButton={false}>
    <SheetHeader>
      <SheetTitle>No X Button Sheet</SheetTitle>
      <SheetDescription>This sheet does not have a close button in top-right corner.</SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <p>You can close this sheet using:</p>
      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
        <li>The Cancel button below</li>
        <li>The Escape key</li>
        <li>Clicking outside sheet</li>
      </ul>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button color="neutral">Cancel</Button>
      </SheetClose>
      <Button>Confirm</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Sheet Controlled
```tsx
<div>
  <Button onClick={() => setOpen(true)}>Open Controlled Sheet</Button>
  <Button color="neutral" onClick={() => setOpen(false)}>
    Close Controlled Sheet
  </Button>
  <Sheet open={open} onOpenChange={setOpen}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Controlled Sheet</SheetTitle>
        <SheetDescription>This sheet is controlled by external state.</SheetDescription>
      </SheetHeader>
      <div className="py-4">
        <p>Sheet is {open ? "open" : "closed"}</p>
      </div>
      <SheetFooter>
        <Button color="neutral" onClick={() => setOpen(false)}>
          Close Programmatically
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</div>
```

### Sheet Side Variants
```tsx
<div className="grid grid-cols-2 gap-2">
  {SHEET_SIDES.map((side) => (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <Button color="neutral">{side}</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">Some content</div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ))}
</div>
```

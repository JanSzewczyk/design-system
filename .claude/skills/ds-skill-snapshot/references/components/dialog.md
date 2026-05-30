# Dialog

**Category:** Misc · **Public:** yes · **Stories:** 15

## Import
```ts
import { Dialog } from "@szum-tech/design-system";
```

## Examples
### Default
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <BasicDialogContent />
</Dialog>
```

### Without Close Button
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog without X Button</Button>
  </DialogTrigger>
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>No X Button Dialog</DialogTitle>
      <DialogDescription>This dialog does not have a close button in the top-right corner.</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>You can close this dialog using:</p>
      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
        <li>The Cancel button below</li>
        <li>The Escape key</li>
        <li>Clicking outside the dialog</li>
      </ul>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button color="neutral">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### With Close Button
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog with Close Button</Button>
  </DialogTrigger>
  <DialogContent showCloseButton>
    <DialogHeader>
      <DialogTitle>Dialog with Close Button</DialogTitle>
      <DialogDescription>
        This dialog displays a close button (X) in the top-right corner for additional closing control.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>You can close this dialog using:</p>
      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
        <li>The X button in the top-right corner</li>
        <li>The Cancel button below</li>
        <li>The Escape key</li>
        <li>Clicking outside the dialog</li>
      </ul>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button color="neutral">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Width
```tsx
<div className="grid grid-cols-4 gap-2">
  {DIALOG_WIDTHS.map((width) => (
    <Dialog key={width}>
      <DialogTrigger asChild>
        <Button color="neutral">{width}</Button>
      </DialogTrigger>
      <DialogContent width={width}>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a description of what this dialog is for.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>This is the main content of the dialog.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button color="neutral">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ))}
</div>
```

### Open Dialog
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <BasicDialogContent />
</Dialog>
```

### Dialog With Footer Buttons
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <BasicDialogContent />
</Dialog>
```

### Close Dialog With Cancel Button
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <BasicDialogContent />
</Dialog>
```

### Close Dialog With Overlay Click
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Click Outside Test</DialogTitle>
      <DialogDescription>Click outside the dialog to close it</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>This dialog can be closed by clicking the overlay.</p>
    </div>
    <DialogFooter>
      <Button>OK</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Close Dialog With Escape Key
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <BasicDialogContent />
</Dialog>
```

### Dialog Focus Management
```tsx
<div className="space-y-4">
  <Input placeholder="Input before dialog" />
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Focus Test Dialog</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <Input placeholder="First input in dialog" />
        <Input placeholder="Second input in dialog" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" color="neutral">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  <Input placeholder="Input after dialog" />
</div>
```

### Controlled Dialog
```tsx
<div>
  <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Controlled Dialog</DialogTitle>
        <DialogDescription>This dialog is controlled by external state.</DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p>Dialog is {open ? "open" : "closed"}</p>
      </div>
      <DialogFooter>
        <Button color="neutral" onClick={() => setOpen(false)}>
          Close Programmatically
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>
```

### Dialog With Form
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Form Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>User Information</DialogTitle>
      <DialogDescription>Please fill out the form below.</DialogDescription>
    </DialogHeader>
    <form className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    </form>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" color="neutral">
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit">Submit</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Data Slot Attributes
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent showCloseButton>
    <DialogHeader>
      <DialogTitle>Data Slot Test</DialogTitle>
      <DialogDescription>Testing data-slot attributes</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>All dialog components should have appropriate data-slot attributes.</p>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button>Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Accessibility Test
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Accessible Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Accessibility Test</DialogTitle>
      <DialogDescription>Testing dialog accessibility features.</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>This dialog should be properly accessible.</p>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Nested Dialogs
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Parent Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Parent Dialog</DialogTitle>
      <DialogDescription>This is the parent dialog.</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Child Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Child Dialog</DialogTitle>
            <DialogDescription>This is a nested dialog.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Nested dialog content.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Close Child</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button">Close Parent</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

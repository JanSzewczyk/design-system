# Checkbox

**Category:** Misc · **Public:** yes · **Stories:** 9

## Import
```ts
import { Checkbox } from "@szum-tech/design-system";
```

## Examples
### Default
```tsx
<div className="flex items-center gap-2">
  <Checkbox name="asd asd as dasd" required />
  <label htmlFor="terms" className="cursor-pointer text-sm">
    Accept terms and conditions
  </label>
</div>
```

### Checked
```tsx
<div className="flex items-center gap-2">
  <Checkbox id="checked" defaultChecked />
  <label htmlFor="checked" className="cursor-pointer text-sm">
    Already checked
  </label>
</div>
```

### Disabled
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <Checkbox id="disabled-unchecked" disabled />
    <label htmlFor="disabled-unchecked" className="cursor-not-allowed text-sm opacity-50">
      Disabled (unchecked)
    </label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="disabled-checked" disabled defaultChecked />
    <label htmlFor="disabled-checked" className="cursor-not-allowed text-sm opacity-50">
      Disabled (checked)
    </label>
  </div>
</div>
```

### Invalid
```tsx
<div className="flex items-center gap-2">
  <Checkbox id="invalid" aria-invalid />
  <label htmlFor="invalid" className="cursor-pointer text-sm">
    This field is required
  </label>
</div>
```

### Controlled
```tsx
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <Checkbox id="controlled" checked={checked} onCheckedChange={(value) => setChecked(!!value)} />
    <label htmlFor="controlled" className="cursor-pointer text-sm">
      Controlled checkbox
    </label>
  </div>
  <p className="text-muted-foreground text-xs">
    State: <span className="font-medium">{checked ? "Checked" : "Unchecked"}</span>
  </p>
</div>
```

### With Form
```tsx
<form className="flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <Checkbox id="newsletter" name="newsletter" value="subscribed" />
    <label htmlFor="newsletter" className="cursor-pointer text-sm">
      Subscribe to newsletter
    </label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="terms-form" name="terms" required />
    <label htmlFor="terms-form" className="cursor-pointer text-sm">
      I agree to terms and conditions <span className="text-error">*</span>
    </label>
  </div>
  <Button fullWidth type="submit">
    Submit
  </Button>
</form>
```

### Multiple Checkboxes
```tsx
<div className="flex flex-col gap-3">
  <p className="text-sm font-medium">Select your interests:</p>
  <div className="flex flex-col gap-2">
    {["Technology", "Design", "Science", "Sports", "Music"].map((interest) => (
      <div key={interest} className="flex items-center gap-2">
        <Checkbox id={interest.toLowerCase()} name="interests" value={interest.toLowerCase()} />
        <label htmlFor={interest.toLowerCase()} className="cursor-pointer text-sm">
          {interest}
        </label>
      </div>
    ))}
  </div>
</div>
```

### Indeterminate
```tsx
<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2 border-b pb-2">
    <Checkbox
      id="select-all"
      checked={isIndeterminate ? "indeterminate" : allChecked}
      onCheckedChange={handleSelectAll}
    />
    <label htmlFor="select-all" className="cursor-pointer text-sm font-medium">
      Select All
    </label>
  </div>
  <div className="flex flex-col gap-2 pl-6">
    {allItems.map((item) => (
      <div key={item} className="flex items-center gap-2">
        <Checkbox
          id={item}
          checked={selectedItems.includes(item)}
          onCheckedChange={(checked) => handleSelectItem(item, checked === true || checked === "indeterminate")}
        />
        <label htmlFor={item} className="cursor-pointer text-sm">
          {item.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </label>
      </div>
    ))}
  </div>
</div>
```

### Keyboard Navigation
```tsx
<div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <Checkbox id="keyboard-1" />
    <label htmlFor="keyboard-1" className="cursor-pointer text-sm">
      Option 1
    </label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="keyboard-2" />
    <label htmlFor="keyboard-2" className="cursor-pointer text-sm">
      Option 2
    </label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="keyboard-3" />
    <label htmlFor="keyboard-3" className="cursor-pointer text-sm">
      Option 3
    </label>
  </div>
</div>
```

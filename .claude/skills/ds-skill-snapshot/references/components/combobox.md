# Combobox

**Category:** Misc · **Public:** yes · **Stories:** 9

## Import
```ts
import { Combobox } from "@szum-tech/design-system";
```

## Examples
### Single Select
```tsx
<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select a framework" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

### Multiple Select
```tsx
<div className="w-full max-w-xs">
  <Combobox items={languages} multiple value={value} onValueChange={setValue}>
    <ComboboxChips ref={anchor}>
      <ComboboxValue>
        {value.map((item) => (
          <ComboboxChip key={item}>{item}</ComboboxChip>
        ))}
      </ComboboxValue>
      <ComboboxChipsInput placeholder="Add language" />
    </ComboboxChips>
    <ComboboxContent anchor={anchor}>
      <ComboboxEmpty>No items found.</ComboboxEmpty>
      <ComboboxList>
        {(item) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>
```

### Groups
```tsx
<Combobox items={timezones}>
  <ComboboxInput placeholder="Select a timezone" />
  <ComboboxContent>
    <ComboboxEmpty>No timezones found.</ComboboxEmpty>
    <ComboboxList>
      {(group, index) => (
        <ComboboxGroup key={group.value} items={group.items}>
          <ComboboxLabel>{group.value}</ComboboxLabel>
          <ComboboxCollection>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxCollection>
          {index < timezones.length - 1 && <ComboboxSeparator />}
        </ComboboxGroup>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

### With Clear
```tsx
<Combobox items={frameworks} defaultValue={frameworks[0]}>
  <ComboboxInput placeholder="Select a framework" showClear />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

### Disabled Combobox
```tsx
<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select a framework" disabled />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

### With Input Addon
```tsx
<Combobox items={timezones}>
  <ComboboxInput placeholder="Select a timezone">
    <InputGroupAddon>
      <GlobeIcon />
    </InputGroupAddon>
  </ComboboxInput>
  <ComboboxContent alignOffset={-28} className="w-60">
    <ComboboxEmpty>No timezones found.</ComboboxEmpty>
    <ComboboxList>
      {(group) => (
        <ComboboxGroup key={group.value} items={group.items}>
          <ComboboxLabel>{group.value}</ComboboxLabel>
          <ComboboxCollection>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxCollection>
        </ComboboxGroup>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

### Invalid Combobox
```tsx
<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select a framework" aria-invalid="true" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

### Auto Highlight
```tsx
<Combobox items={frameworks} autoHighlight>
  <ComboboxInput placeholder="Select a framework" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

### Empty State
```tsx
<Combobox items={filtered}>
  <ComboboxInput placeholder="Search frameworks" onChange={(e) => setSearch(e.currentTarget.value)} />
  <ComboboxContent>
    <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

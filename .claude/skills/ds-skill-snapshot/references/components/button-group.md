# ButtonGroup

**Category:** Misc · **Public:** yes · **Stories:** 12

## Import
```ts
import { ButtonGroup } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `orientation` | `ButtonGroupOrientationType` | no | — |

## Variants
- **orientation**: **horizontal** (default), vertical

## Examples
### Email Actions
```tsx
<ButtonGroup>
  <ButtonGroup className="hidden sm:flex">
    <Button variant="outline" size="icon" aria-label="Go Back">
      <ArrowLeftIcon />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Archive</Button>
    <Button variant="outline">Report</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Snooze</Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="More Options">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MailCheckIcon />
            Mark as Read
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ClockIcon />
            Snooze
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CalendarPlusIcon />
            Add to Calendar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ListFilterIcon />
            Add to List
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TagIcon />
              Label As...
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={label} onValueChange={setLabel}>
                <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Trash2Icon />
            Trash
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</ButtonGroup>
```

### Vertical Orientation
```tsx
<ButtonGroup {...args} aria-label="Media controls" className="h-fit">
  <Button variant="outline" size="icon" aria-label="Increase">
    <PlusIcon />
  </Button>
  <Button variant="outline" size="icon" aria-label="Decrease">
    <MinusIcon />
  </Button>
</ButtonGroup>
```

### Sizes
```tsx
<div className="flex flex-col items-start gap-8">
  <ButtonGroup aria-label="Small buttons">
    <Button variant="outline" size="sm">
      Small
    </Button>
    <Button variant="outline" size="sm">
      Button
    </Button>
    <Button variant="outline" size="sm">
      Group
    </Button>
    <Button variant="outline" size="icon-sm" aria-label="Add small">
      <PlusIcon />
    </Button>
  </ButtonGroup>
  <ButtonGroup aria-label="Default buttons">
    <Button variant="outline">Default</Button>
    <Button variant="outline">Button</Button>
    <Button variant="outline">Group</Button>
    <Button variant="outline" size="icon" aria-label="Add default">
      <PlusIcon />
    </Button>
  </ButtonGroup>
  <ButtonGroup aria-label="Large buttons">
    <Button variant="outline" size="lg">
      Large
    </Button>
    <Button variant="outline" size="lg">
      Button
    </Button>
    <Button variant="outline" size="lg">
      Group
    </Button>
    <Button variant="outline" size="icon-lg" aria-label="Add large">
      <PlusIcon />
    </Button>
  </ButtonGroup>
</div>
```

### Separator
```tsx
<ButtonGroup>
  <Button variant="secondary" size="sm">
    Copy
  </Button>
  <ButtonGroupSeparator />
  <Button variant="secondary" size="sm">
    Paste
  </Button>
</ButtonGroup>
```

### Split Button
```tsx
<ButtonGroup>
  <Button variant="secondary">Button</Button>
  <ButtonGroupSeparator />
  <Button size="icon" variant="secondary" aria-label="Add item">
    <PlusIcon />
  </Button>
</ButtonGroup>
```

### Input
```tsx
<ButtonGroup>
  <InputField placeholder="Search..." />
  <Button variant="outline" aria-label="Search">
    <SearchIcon />
  </Button>
</ButtonGroup>
```

### Nested
```tsx
<ButtonGroup>
  <ButtonGroup>
    <Button variant="outline" size="icon" aria-label="Add">
      <PlusIcon />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <InputGroupRoot>
      <InputGroupInput placeholder="Send a message..." />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <InputGroupButton size="xs" aria-label="Voice mode">
              <AudioLinesIcon />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent>Voice Mode</TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroupRoot>
  </ButtonGroup>
</ButtonGroup>
```

### Text
```tsx
<ButtonGroup>
  <ButtonGroupText>https://</ButtonGroupText>
  <InputField placeholder="example.com" />
</ButtonGroup>
```

### Dropdown
```tsx
<ButtonGroup>
  <Button variant="outline">Follow</Button>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="pl-2!" aria-label="More follow options">
        <ChevronDownIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-44">
      <DropdownMenuGroup>
        <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
        <DropdownMenuItem>Mark as Read</DropdownMenuItem>
        <DropdownMenuItem>Report Conversation</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>Delete Conversation</DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</ButtonGroup>
```

### Select
```tsx
<ButtonGroup>
  <ButtonGroup>
    <SelectField value={currency} onValueChange={setCurrency} placeholder={currency}>
      <SelectContent className="min-w-24">
        <SelectGroup>
          {CURRENCIES.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectField>
    <InputField placeholder="10.00" pattern="[0-9]*" />
  </ButtonGroup>
  <ButtonGroup>
    <Button aria-label="Send" size="icon" variant="outline">
      <ArrowRightIcon />
    </Button>
  </ButtonGroup>
</ButtonGroup>
```

### Input Group
```tsx
<ButtonGroup>
  <ButtonGroup>
    <Button variant="outline" size="icon" aria-label="Attach">
      <PlusIcon />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <InputGroupRoot>
      <InputGroupInput
        placeholder={voiceEnabled ? "Record and send audio..." : "Send a message..."}
        disabled={voiceEnabled}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          size="xs"
          data-active={voiceEnabled}
          aria-pressed={voiceEnabled}
          aria-label="Toggle voice mode"
        >
          <AudioLinesIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroupRoot>
  </ButtonGroup>
</ButtonGroup>
```

### Popover
```tsx
<ButtonGroup>
  <Button variant="outline">
    <BotIcon />
    Copilot
  </Button>
  <PopoverRoot>
    <PopoverTrigger asChild>
      <Button variant="outline" size="icon" aria-label="Open Copilot options">
        <ChevronDownIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" className="rounded-xl text-sm">
      <PopoverHeader>
        <PopoverTitle>Start a new task with Copilot</PopoverTitle>
        <PopoverDescription>Describe your task in natural language.</PopoverDescription>
      </PopoverHeader>
      <Field>
        <FieldLabel htmlFor="copilot-task" className="sr-only">
          Task Description
        </FieldLabel>
        <Textarea id="copilot-task" placeholder="I need to..." className="resize-none" />
        <FieldDescription>Copilot will open a pull request for review.</FieldDescription>
      </Field>
    </PopoverContent>
  </PopoverRoot>
</ButtonGroup>
```

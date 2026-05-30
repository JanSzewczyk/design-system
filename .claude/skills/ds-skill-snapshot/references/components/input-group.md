# InputGroup

**Category:** Misc · **Public:** yes · **Stories:** 14

## Import
```ts
import { InputGroup } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `invalid` | `boolean` | no | — |

## Examples
### Input Group Story
```tsx
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
</InputGroup>
```

### Align Inline Start
```tsx
<Field>
  <FieldLabel htmlFor="ig-inline-start">Search</FieldLabel>
  <InputGroup>
    <InputGroupInput id="ig-inline-start" placeholder="Search..." />
    <InputGroupAddon align="inline-start">
      <SearchIcon className="text-muted-foreground" />
    </InputGroupAddon>
  </InputGroup>
  <FieldDescription>Icon positioned at the start.</FieldDescription>
</Field>
```

### Align Inline End
```tsx
<Field>
  <FieldLabel htmlFor="ig-inline-end">Password</FieldLabel>
  <InputGroup>
    <InputGroupInput id="ig-inline-end" type="password" placeholder="Enter password" />
    <InputGroupAddon align="inline-end">
      <EyeOffIcon />
    </InputGroupAddon>
  </InputGroup>
  <FieldDescription>Icon positioned at the end.</FieldDescription>
</Field>
```

### Align Block Start
```tsx
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="ig-block-start-input">Input</FieldLabel>
    <InputGroup className="h-auto">
      <InputGroupInput id="ig-block-start-input" placeholder="Enter your name" />
      <InputGroupAddon align="block-start">
        <InputGroupText>Full Name</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
    <FieldDescription>Header positioned above the input.</FieldDescription>
  </Field>
  <Field>
    <FieldLabel htmlFor="ig-block-start-textarea">Textarea</FieldLabel>
    <InputGroup>
      <InputGroupTextarea
        id="ig-block-start-textarea"
        placeholder="console.log('Hello, world!');"
        className="font-mono text-sm"
      />
      <InputGroupAddon align="block-start">
        <InputGroupText className="font-mono">script.js</InputGroupText>
        <InputGroupButton size="icon-xs" className="ml-auto" aria-label="Copy">
          <CopyIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <FieldDescription>Header positioned above the textarea.</FieldDescription>
  </Field>
</FieldGroup>
```

### Align Block End
```tsx
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="ig-block-end-input">Amount</FieldLabel>
    <InputGroup className="h-auto">
      <InputGroupInput id="ig-block-end-input" placeholder="Enter amount" />
      <InputGroupAddon align="block-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
    <FieldDescription>Footer positioned below the input.</FieldDescription>
  </Field>
  <Field>
    <FieldLabel htmlFor="ig-block-end-textarea">Comment</FieldLabel>
    <InputGroup>
      <InputGroupTextarea id="ig-block-end-textarea" placeholder="Write a comment..." />
      <InputGroupAddon align="block-end">
        <InputGroupText>0/280</InputGroupText>
        <InputGroupButton variant="default" size="sm" className="ml-auto">
          Post
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <FieldDescription>Footer positioned below the textarea.</FieldDescription>
  </Field>
</FieldGroup>
```

### Icon Story
```tsx
<div className="grid gap-6">
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput type="email" placeholder="Enter your email" />
    <InputGroupAddon>
      <MailIcon />
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Card number" />
    <InputGroupAddon>
      <CreditCardIcon />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <CheckIcon />
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Username" />
    <InputGroupAddon align="inline-end">
      <StarIcon />
      <InfoIcon />
    </InputGroupAddon>
  </InputGroup>
</div>
```

### Text
```tsx
<div className="grid gap-6">
  <InputGroup>
    <InputGroupAddon>
      <InputGroupText>$</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="0.00" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>USD</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupAddon>
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="example.com" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>.com</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Enter your username" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>@company.com</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupTextarea placeholder="Enter your message" />
    <InputGroupAddon align="block-end">
      <InputGroupText className="text-muted-foreground text-xs">120 characters left</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
</div>
```

### Button Story
```tsx
<div className="grid gap-6">
  <InputGroup>
    <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
    <InputGroupAddon align="inline-end">
      <InputGroupButton size="icon-xs" aria-label="Copy" onClick={handleCopy}>
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <Popover>
      <PopoverTrigger asChild>
        <InputGroupAddon>
          <InputGroupButton variant="secondary" size="icon-xs" aria-label="Info">
            <InfoIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-1 text-sm">
        <p className="font-medium">Your connection is not secure.</p>
        <p>You should not enter any sensitive information on this site.</p>
      </PopoverContent>
    </Popover>
    <InputGroupInput placeholder="https://" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton size="icon-xs" aria-label="Toggle favorite" onClick={() => setIsFavorite(!isFavorite)}>
        <StarIcon
          data-active={isFavorite}
          className="data-[active=true]:fill-blue-600 data-[active=true]:stroke-blue-600"
        />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Type to search..." />
    <InputGroupAddon align="inline-end">
      <InputGroupButton variant="secondary">Search</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</div>
```

### Kbd Story
```tsx
<InputGroup className="max-w-sm">
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon className="text-muted-foreground" />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>
```

### Dropdown Story
```tsx
<div className="grid gap-4">
  <InputGroup>
    <InputGroupInput placeholder="Enter file name" />
    <InputGroupAddon align="inline-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <InputGroupButton variant="ghost" size="icon-xs" aria-label="More">
            <MoreHorizontalIcon />
          </InputGroupButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Copy path</DropdownMenuItem>
            <DropdownMenuItem>Open location</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Enter search query" />
    <InputGroupAddon align="inline-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
            Search In... <ChevronDownIcon className="size-3" />
          </InputGroupButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Blog Posts</DropdownMenuItem>
            <DropdownMenuItem>Changelog</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </InputGroupAddon>
  </InputGroup>
</div>
```

### Spinner Story
```tsx
<div className="grid gap-4">
  <InputGroup>
    <InputGroupInput placeholder="Searching..." />
    <InputGroupAddon align="inline-end">
      <Spinner />
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Processing..." />
    <InputGroupAddon>
      <Spinner />
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Saving changes..." />
    <InputGroupAddon align="inline-end">
      <InputGroupText>Saving...</InputGroupText>
      <Spinner />
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Refreshing data..." />
    <InputGroupAddon>
      <LoaderIcon className="animate-spin" />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <InputGroupText className="text-muted-foreground">Please wait...</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
</div>
```

### Code Editor Textarea
```tsx
<InputGroup>
  <InputGroupTextarea placeholder="console.log('Hello, world!');" className="min-h-50" />
  <InputGroupAddon align="block-end" className="border-t">
    <InputGroupText>Line 1, Column 1</InputGroupText>
    <InputGroupButton size="sm" className="ml-auto" variant="default" aria-label="Run">
      Run <PlayIcon />
    </InputGroupButton>
  </InputGroupAddon>
  <InputGroupAddon align="block-start" className="border-b">
    <InputGroupText className="font-mono font-medium">script.js</InputGroupText>
    <InputGroupButton className="ml-auto" size="icon-xs" aria-label="Refresh">
      <RefreshCwIcon />
    </InputGroupButton>
    <InputGroupButton variant="ghost" size="icon-xs" aria-label="Copy">
      <CopyIcon />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### Disabled
```tsx
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>
      <UserIcon />
    </InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Username" disabled />
</InputGroup>
```

### Invalid
```tsx
<InputGroup invalid>
  <InputGroupInput placeholder="Email" aria-invalid="true" />
</InputGroup>
```

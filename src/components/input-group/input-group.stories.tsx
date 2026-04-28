import * as React from "react";

import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  CreditCardIcon,
  EyeOffIcon,
  InfoIcon,
  LoaderIcon,
  MailIcon,
  MoreHorizontalIcon,
  PlayIcon,
  RefreshCwIcon,
  SearchIcon,
  StarIcon,
  UserIcon
} from "lucide-react";

import { expect, screen, waitFor } from "storybook/test";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Kbd,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner
} from "~/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/dropdown-menu";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Input Group",
  component: InputGroup,
  decorators: [(Story) => <div className="w-full max-w-sm">{Story()}</div>]
});

// Helper: find the InputGroup element (data-slot="input-group") among all role="group" elements.
// Field also renders role="group", so we must disambiguate by data-slot.
function getInputGroup(canvas: { getAllByRole: (role: string) => HTMLElement[] }) {
  const groups = canvas.getAllByRole("group");
  const found = groups.find((g) => g.getAttribute("data-slot") === "input-group");
  return found ?? groups[0];
}

export const InputGroupStory = meta.story({
  name: "Input Group",
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
});

InputGroupStory.test("renders with correct data-slot attribute", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  await expect(group).toHaveAttribute("data-slot", "input-group");
});

InputGroupStory.test("renders input and both addons", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  const input = canvas.getByRole("textbox");
  await expect(input).toBeVisible();
  const addons = group.querySelectorAll('[data-slot="input-group-addon"]');
  await expect(addons).toHaveLength(2);
});

export const AlignInlineStart = meta.story({
  name: "Align: inline-start",
  render: () => (
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
  )
});

AlignInlineStart.test("addon has data-align inline-start", async ({ canvas }) => {
  const inputGroup = getInputGroup(canvas);
  const addon = inputGroup.querySelector('[data-slot="input-group-addon"]');
  await expect(addon).toHaveAttribute("data-align", "inline-start");
});

export const AlignInlineEnd = meta.story({
  name: "Align: inline-end",
  render: () => (
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
  )
});

AlignInlineEnd.test("addon has data-align inline-end", async ({ canvas }) => {
  const inputGroup = getInputGroup(canvas);
  const addon = inputGroup.querySelector('[data-slot="input-group-addon"]');
  await expect(addon).toHaveAttribute("data-align", "inline-end");
});

export const AlignBlockStart = meta.story({
  name: "Align: block-start",
  render: () => (
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
  )
});

AlignBlockStart.test("block-start addons have correct data-align", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  const inputGroups = groups.filter((g) => g.getAttribute("data-slot") === "input-group");
  await expect(inputGroups.length).toBeGreaterThanOrEqual(2);
  for (const group of inputGroups) {
    const addon = group.querySelector('[data-slot="input-group-addon"]');
    if (addon) await expect(addon).toHaveAttribute("data-align", "block-start");
  }
});

AlignBlockStart.test("copy button in block-start addon has correct data-slot", async ({ canvas }) => {
  const btn = canvas.getByRole("button", { name: /copy/i });
  await expect(btn).toHaveAttribute("data-slot", "button");
});

export const AlignBlockEnd = meta.story({
  name: "Align: block-end",
  render: () => (
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
  )
});

AlignBlockEnd.test("block-end addons have correct data-align", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  const inputGroups = groups.filter((g) => g.getAttribute("data-slot") === "input-group");
  await expect(inputGroups.length).toBeGreaterThanOrEqual(2);
  for (const group of inputGroups) {
    const addon = group.querySelector('[data-slot="input-group-addon"]');
    if (addon) await expect(addon).toHaveAttribute("data-align", "block-end");
  }
});

AlignBlockEnd.test("post button in block-end addon is visible", async ({ canvas }) => {
  const btn = canvas.getByRole("button", { name: /post/i });
  await expect(btn).toBeVisible();
});

export const IconStory = meta.story({
  name: "Icon",
  decorators: [(Story) => <div className="w-full max-w-sm">{Story()}</div>],
  render: () => (
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
  )
});

IconStory.test("all groups render with correct data-slot", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  await expect(groups.length).toBeGreaterThanOrEqual(4);
  for (const g of groups) await expect(g).toHaveAttribute("data-slot", "input-group");
});

IconStory.test("renders inputs for all input groups", async ({ canvas }) => {
  const inputs = canvas.getAllByRole("textbox");
  await expect(inputs.length).toBeGreaterThanOrEqual(4);
  for (const input of inputs) await expect(input).toBeVisible();
});

export const Text = meta.story({
  name: "Text",
  render: () => (
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
  )
});

Text.test("text addons in first group render with correct data-slot", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  const firstGroup = groups[0];
  const texts = firstGroup.querySelectorAll('[data-slot="input-group-text"]');
  await expect(texts).toHaveLength(2);
});

Text.test("text addon content is visible", async ({ canvas }) => {
  await expect(canvas.getByText("$")).toBeVisible();
  await expect(canvas.getByText("USD")).toBeVisible();
  await expect(canvas.getByText("https://")).toBeVisible();
});

export const ButtonStory = meta.story({
  name: "Button",
  render: function ButtonExamplesRender() {
    const [isCopied, setIsCopied] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleCopy = () => {
      void navigator.clipboard.writeText("https://x.com/shadcn").then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    };

    return (
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
    );
  }
});

ButtonStory.test("copy button renders with correct data-slot", async ({ canvas }) => {
  const btn = canvas.getByRole("button", { name: /copy/i });
  await expect(btn).toHaveAttribute("data-slot", "button");
});

ButtonStory.test("search button renders with correct data-slot", async ({ canvas }) => {
  const btn = canvas.getByRole("button", { name: /^search$/i });
  await expect(btn).toHaveAttribute("data-slot", "button");
});

ButtonStory.test("clicking toggle favorite button toggles active state on icon", async ({ canvas, userEvent }) => {
  const favoriteBtn = canvas.getByRole("button", { name: /toggle favorite/i });
  await expect(favoriteBtn).toBeVisible();
  await userEvent.click(favoriteBtn);
  const starIcon = favoriteBtn.querySelector("svg");
  await expect(starIcon).toHaveAttribute("data-active", "true");
});

export const KbdStory = meta.story({
  name: "Kbd",
  render() {
    return (
      <InputGroup className="max-w-sm">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    );
  }
});

KbdStory.test("renders input group with correct data-slot", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  await expect(group).toHaveAttribute("data-slot", "input-group");
});

KbdStory.test("renders kbd shortcut in addon", async ({ canvas }) => {
  const kbd = canvas.getByText("⌘K");
  await expect(kbd).toBeVisible();
});

export const DropdownStory = meta.story({
  name: "Dropdown",
  render: () => (
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
  )
});

DropdownStory.test("dropdown trigger buttons render with correct data-slot", async ({ canvas }) => {
  const btns = canvas.getAllByRole("button");
  for (const btn of btns) await expect(btn).toHaveAttribute("data-slot", "dropdown-menu-trigger");
});

DropdownStory.test("clicking more button opens dropdown with items", async ({ canvas, userEvent }) => {
  const moreBtn = canvas.getByRole("button", { name: /more/i });
  await userEvent.click(moreBtn);
  await waitFor(async () => {
    const settingsItem = await screen.findByRole("menuitem", { name: /settings/i });
    await expect(settingsItem).toBeVisible();
  });
});

export const SpinnerStory = meta.story({
  name: "Spinner",
  render: () => (
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
  )
});

SpinnerStory.test("all input groups render with correct data-slot", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  await expect(groups.length).toBeGreaterThanOrEqual(4);
  for (const g of groups) await expect(g).toHaveAttribute("data-slot", "input-group");
});

SpinnerStory.test("all inputs are visible", async ({ canvas }) => {
  const inputs = canvas.getAllByRole("textbox");
  await expect(inputs.length).toBeGreaterThanOrEqual(4);
  for (const input of inputs) await expect(input).toBeVisible();
});

export const CodeEditorTextarea = meta.story({
  name: "Textarea",
  decorators: [(Story) => <div className="w-full max-w-md">{Story()}</div>],
  render: () => (
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
  )
});

CodeEditorTextarea.test("block-start and block-end addons both render", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  const addons = group.querySelectorAll('[data-slot="input-group-addon"]');
  await expect(addons).toHaveLength(2);
});

CodeEditorTextarea.test("run button renders with correct data-slot", async ({ canvas }) => {
  const btn = canvas.getByRole("button", { name: /run/i });
  await expect(btn).toHaveAttribute("data-slot", "button");
});

CodeEditorTextarea.test("block-start addon has script.js label and action buttons", async ({ canvas, step }) => {
  await step("Script filename is visible", async () => {
    await expect(canvas.getByText("script.js")).toBeVisible();
  });
  await step("Refresh and Copy buttons are visible", async () => {
    await expect(canvas.getByRole("button", { name: /refresh/i })).toBeVisible();
    await expect(canvas.getByRole("button", { name: /copy/i })).toBeVisible();
  });
});

export const Disabled = meta.story({
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <UserIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Username" disabled />
    </InputGroup>
  )
});

Disabled.test("renders with correct data-slot attribute", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  await expect(group).toHaveAttribute("data-slot", "input-group");
});

Disabled.test("input is disabled", async ({ canvas }) => {
  const input = canvas.getByRole("textbox");
  await expect(input).toBeDisabled();
});

export const Invalid = meta.story({
  render: () => (
    <InputGroup invalid>
      <InputGroupInput placeholder="Email" aria-invalid="true" />
    </InputGroup>
  )
});

Invalid.test("input-group renders data-invalid attribute", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  await expect(group).toHaveAttribute("data-invalid");
});

Invalid.test("invalid input carries aria-invalid attribute", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText("Email");
  await expect(input).toHaveAttribute("aria-invalid", "true");
});

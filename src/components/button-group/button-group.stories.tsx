import * as React from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  AudioLinesIcon,
  BotIcon,
  CalendarPlusIcon,
  ChevronDownIcon,
  ClockIcon,
  ListFilterIcon,
  MailCheckIcon,
  MinusIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  TagIcon,
  Trash2Icon
} from "lucide-react";

import { expect, screen, waitFor } from "storybook/test";
import { Button } from "~/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "~/components/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "~/components/field";
import { Input as InputField } from "~/components/input";
import {
  InputGroup as InputGroupRoot,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/components/input-group";
import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "~/components/popover";
import { Select as SelectField, SelectContent, SelectGroup, SelectItem } from "~/components/select";
import { Textarea } from "~/components/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/tooltip";

import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Button Group",
  component: ButtonGroup,
  subcomponents: { ButtonGroupText, ButtonGroupSeparator },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    }
  }
});

// ─── Main Demo ────────────────────────────────────────────────────────────────

export const EmailActions = meta.story({
  render() {
    const [label, setLabel] = React.useState("personal");

    return (
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
    );
  }
});

EmailActions.test("Renders outer button group with correct data-slot", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  await expect(groups[0]).toHaveAttribute("data-slot", "button-group");
});

EmailActions.test("Archive and Report buttons are visible", async ({ canvas }) => {
  await expect(canvas.getByRole("button", { name: /archive/i })).toBeVisible();
  await expect(canvas.getByRole("button", { name: /report/i })).toBeVisible();
});

EmailActions.test("Clicking More Options opens dropdown", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /more options/i });
  await userEvent.click(trigger);
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });
  await expect(screen.getByText("Mark as Read")).toBeVisible();
});

// ─── Orientation ──────────────────────────────────────────────────────────────

export const VerticalOrientation = meta.story({
  args: { orientation: "vertical" },
  render(args) {
    return (
      <ButtonGroup {...args} aria-label="Media controls" className="h-fit">
        <Button variant="outline" size="icon" aria-label="Increase">
          <PlusIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Decrease">
          <MinusIcon />
        </Button>
      </ButtonGroup>
    );
  }
});

VerticalOrientation.test("Group has data-orientation set to vertical", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  await expect(group).toHaveAttribute("data-orientation", "vertical");
});

VerticalOrientation.test("Both buttons are rendered", async ({ canvas }) => {
  await expect(canvas.getByRole("button", { name: /increase/i })).toBeVisible();
  await expect(canvas.getByRole("button", { name: /decrease/i })).toBeVisible();
});

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes = meta.story({
  render() {
    return (
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
    );
  }
});

Sizes.test("Renders three button groups", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  await expect(groups).toHaveLength(3);
});

Sizes.test("Small buttons have data-size sm", async ({ canvas }) => {
  const smGroup = canvas.getByRole("group", { name: /small buttons/i });
  const buttons = smGroup.querySelectorAll("[data-slot='button']");
  for (const btn of buttons) {
    const size = btn.getAttribute("data-size") ?? "";
    await expect(["sm", "icon-sm"]).toContain(size);
  }
});

// ─── Separator ────────────────────────────────────────────────────────────────

export const Separator = meta.story({
  render() {
    return (
      <ButtonGroup>
        <Button variant="secondary" size="sm">
          Copy
        </Button>
        <ButtonGroupSeparator />
        <Button variant="secondary" size="sm">
          Paste
        </Button>
      </ButtonGroup>
    );
  }
});

Separator.test("Separator has correct data-slot", async ({ canvas }) => {
  const separator = canvas.getByRole("separator");
  await expect(separator).toHaveAttribute("data-slot", "button-group-separator");
});

Separator.test("Copy and Paste buttons are visible", async ({ canvas }) => {
  await expect(canvas.getByRole("button", { name: /copy/i })).toBeVisible();
  await expect(canvas.getByRole("button", { name: /paste/i })).toBeVisible();
});

// ─── Split Button ─────────────────────────────────────────────────────────────

export const SplitButton = meta.story({
  render() {
    return (
      <ButtonGroup>
        <Button variant="secondary">Button</Button>
        <ButtonGroupSeparator />
        <Button size="icon" variant="secondary" aria-label="Add item">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    );
  }
});

SplitButton.test("Separator visually divides the split button", async ({ canvas }) => {
  await expect(canvas.getByRole("separator")).toHaveAttribute("data-slot", "button-group-separator");
});

SplitButton.test("Both action buttons are present", async ({ canvas }) => {
  const buttons = canvas.getAllByRole("button");
  await expect(buttons).toHaveLength(2);
});

// ─── Input ────────────────────────────────────────────────────────────────────

export const Input = meta.story({
  render() {
    return (
      <ButtonGroup>
        <InputField placeholder="Search..." />
        <Button variant="outline" aria-label="Search">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    );
  }
});

Input.test("Input and search button are rendered", async ({ canvas }) => {
  await expect(canvas.getByPlaceholderText(/search/i)).toBeVisible();
  await expect(canvas.getByRole("button", { name: /search/i })).toBeVisible();
});

Input.test("Input is part of the button group", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  await expect(group).toContainElement(canvas.getByPlaceholderText(/search/i));
});

// ─── Nested Groups ────────────────────────────────────────────────────────────

export const Nested = meta.story({
  render() {
    return (
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
    );
  }
});

Nested.test("Renders multiple nested groups", async ({ canvas }) => {
  const groups = canvas.getAllByRole("group");
  await expect(groups.length).toBeGreaterThanOrEqual(2);
});

Nested.test("Input and add button are visible", async ({ canvas }) => {
  await expect(canvas.getByPlaceholderText(/send a message/i)).toBeVisible();
  await expect(canvas.getByRole("button", { name: /add/i })).toBeVisible();
});

// ─── Text ─────────────────────────────────────────────────────────────────────

export const Text = meta.story({
  render() {
    return (
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <InputField placeholder="example.com" />
      </ButtonGroup>
    );
  }
});

Text.test("Text element has correct data-slot", async ({ canvas }) => {
  const group = canvas.getByRole("group");
  const textEl = group.querySelector("[data-slot='button-group-text']");
  await expect(textEl).toBeInTheDocument();
});

Text.test("Text content and input are visible", async ({ canvas }) => {
  await expect(canvas.getByText("https://")).toBeVisible();
  await expect(canvas.getByPlaceholderText(/example.com/i)).toBeVisible();
});

// ─── Dropdown ─────────────────────────────────────────────────────────────────

export const Dropdown = meta.story({
  render() {
    return (
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
    );
  }
});

Dropdown.test("Follow button and dropdown trigger are visible", async ({ canvas }) => {
  await expect(canvas.getByRole("button", { name: /^follow$/i })).toBeVisible();
  await expect(canvas.getByRole("button", { name: /more follow options/i })).toBeVisible();
});

Dropdown.test("Clicking dropdown trigger reveals menu items", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /more follow options/i });
  await userEvent.click(trigger);
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible();
  });
  await expect(screen.getByText("Mute Conversation")).toBeVisible();
  await expect(screen.getByText("Delete Conversation")).toBeVisible();
});

// ─── Select ───────────────────────────────────────────────────────────────────

const CURRENCIES = [
  { value: "$", label: "US Dollar" },
  { value: "€", label: "Euro" },
  { value: "£", label: "British Pound" }
];

export const Select = meta.story({
  render() {
    const [currency, setCurrency] = React.useState("$");

    return (
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
    );
  }
});

Select.test("Currency select and amount input are rendered", async ({ canvas }) => {
  await expect(canvas.getByPlaceholderText("10.00")).toBeVisible();
  await expect(canvas.getByRole("button", { name: /send/i })).toBeVisible();
});

// ─── InputGroup ───────────────────────────────────────────────────────────────

export const InputGroup = meta.story({
  render() {
    const [voiceEnabled, setVoiceEnabled] = React.useState(false);

    return (
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
    );
  }
});

InputGroup.test("Input and voice button are visible on mount", async ({ canvas }) => {
  await expect(canvas.getByPlaceholderText(/send a message/i)).toBeVisible();
  await expect(canvas.getByRole("button", { name: /toggle voice mode/i })).toBeVisible();
});

InputGroup.test("Toggling voice mode updates placeholder and pressed state", async ({ canvas, userEvent, step }) => {
  const voiceButton = canvas.getByRole("button", { name: /toggle voice mode/i });
  const input = canvas.getByPlaceholderText(/send a message/i);

  await step("Initially not pressed", async () => {
    await expect(voiceButton).toHaveAttribute("aria-pressed", "false");
    await expect(input).not.toBeDisabled();
  });

  await step("After click, voice mode is active", async () => {
    await userEvent.click(voiceButton);
    await expect(voiceButton).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByPlaceholderText(/record and send audio/i)).toBeDisabled();
  });
});

// ─── Popover ──────────────────────────────────────────────────────────────────

export const Popover = meta.story({
  render() {
    return (
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
    );
  }
});

Popover.test("Copilot button and options trigger are visible", async ({ canvas }) => {
  await expect(canvas.getByRole("button", { name: /^copilot$/i })).toBeVisible();
  await expect(canvas.getByRole("button", { name: /open copilot options/i })).toBeVisible();
});

Popover.test("Clicking trigger opens popover with task textarea", async ({ canvas, userEvent }) => {
  const trigger = canvas.getByRole("button", { name: /open copilot options/i });
  await userEvent.click(trigger);
  await waitFor(async () => {
    await expect(document.querySelector('[data-slot="popover-content"]')).toBeVisible();
  });
  await expect(screen.getByPlaceholderText(/i need to/i)).toBeVisible();
});

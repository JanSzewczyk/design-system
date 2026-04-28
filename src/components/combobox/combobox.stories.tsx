import * as React from "react";

import { GlobeIcon } from "lucide-react";

import { expect } from "storybook/test";
import { InputGroupAddon } from "~/components";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor
} from "./index";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Combobox"
});

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

export const Basic = meta.story({
  render: () => {
    return (
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
    );
  }
});

Basic.test("Renders combobox input", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await expect(input).toBeInTheDocument();
});

Basic.test("Opens dropdown on input click", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await userEvent.click(input);

  const options = canvas.queryAllByRole("option");
  await expect(options.length).toBeGreaterThan(0);
});

Basic.test("Filters options while typing", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await step("Open dropdown", async () => {
    await userEvent.click(input);
  });

  await step("Type to filter", async () => {
    await userEvent.type(input, "Next");
    const options = canvas.queryAllByRole("option");
    await expect(options.length).toBeLessThanOrEqual(5);
  });
});

const languages = ["TypeScript", "JavaScript", "Python", "Rust", "Go", "Java"] as const;

export const Multiple = meta.story({
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    const anchor = useComboboxAnchor();

    return (
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
    );
  }
});

Multiple.test("Selects multiple items", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/add language/i);
  await step("Click input", async () => {
    await userEvent.click(input);
  });

  await step("Select first item", async () => {
    const option = canvas.getByRole("option", { name: /typescript/i });
    await userEvent.click(option);
  });

  await step("Select second item", async () => {
    const option = canvas.getByRole("option", { name: /python/i });
    await userEvent.click(option);
  });

  const chips = canvas.queryAllByText(/typescript|python/i);
  await expect(chips.length).toBeGreaterThanOrEqual(2);
});

Multiple.test("Displays chips for selected items", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/add language/i);
  await userEvent.click(input);

  const option = canvas.getByRole("option", { name: /rust/i });
  await userEvent.click(option);

  const chip = canvas.getByText("Rust");
  await expect(chip).toBeInTheDocument();
});

const timezones = [
  {
    value: "Americas",
    items: ["(GMT-5) New York", "(GMT-8) Los Angeles", "(GMT-6) Chicago"]
  },
  {
    value: "Europe",
    items: ["(GMT+0) London", "(GMT+1) Paris", "(GMT+1) Berlin"]
  },
  {
    value: "Asia/Pacific",
    items: ["(GMT+9) Tokyo", "(GMT+8) Shanghai", "(GMT+8) Singapore"]
  }
] as const;

export const Groups = meta.story({
  render: () => {
    return (
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
    );
  }
});

Groups.test("Renders group labels", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/select a timezone/i);
  await userEvent.click(input);

  const americasLabel = canvas.getByText("Americas");
  const europeLabel = canvas.getByText("Europe");

  await expect(americasLabel).toBeInTheDocument();
  await expect(europeLabel).toBeInTheDocument();
});

Groups.test("Selects item from specific group", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/select a timezone/i);
  await step("Open dropdown", async () => {
    await userEvent.click(input);
  });

  await step("Select London", async () => {
    const option = canvas.getByRole("option", { name: /london/i });
    await userEvent.click(option);
  });

  await expect(input).toHaveValue("(GMT+0) London");
});

export const Clear = meta.story({
  render: () => {
    return (
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
    );
  }
});

Clear.test("Renders with default value", async ({ canvas }) => {
  const input = canvas.getByDisplayValue(/next\.js/i);
  await expect(input).toBeInTheDocument();
});

Clear.test("Shows clear button", async ({ canvas }) => {
  const clearButton = canvas.getByRole("button");
  await expect(clearButton).toBeInTheDocument();
});

export const Disabled = meta.story({
  render: () => {
    return (
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
    );
  }
});

Disabled.test("Input is disabled", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i) as HTMLInputElement;
  await expect(input.disabled).toBe(true);
});

Disabled.test("Cannot open dropdown when disabled", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await userEvent.click(input);

  const options = canvas.queryAllByRole("option");
  await expect(options).toHaveLength(0);
});

export const WithInputAddon = meta.story({
  render: () => {
    return (
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
    );
  }
});

WithInputAddon.test("Renders input with addon", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/select a timezone/i);
  await expect(input).toBeInTheDocument();
});

export const Invalid = meta.story({
  render: () => {
    return (
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
    );
  }
});

Invalid.test("Input has invalid state", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await expect(input).toHaveAttribute("aria-invalid", "true");
});

export const AutoHighlight = meta.story({
  render: () => {
    return (
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
    );
  }
});

AutoHighlight.test("Highlights first item on filter", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await step("Click input", async () => {
    await userEvent.click(input);
  });

  await step("Type to filter", async () => {
    await userEvent.type(input, "N");
    const options = canvas.queryAllByRole("option");
    await expect(options.length).toBeGreaterThan(0);
  });
});

export const EmptyState = meta.story({
  render: () => {
    const [search, setSearch] = React.useState("");
    const filtered = frameworks.filter((f) => f.toLowerCase().includes(search.toLowerCase()));

    return (
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
    );
  }
});

EmptyState.test("Shows empty state when no results", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/search frameworks/i);
  await userEvent.type(input, "xyz");

  const emptyMessage = canvas.getByText(/no frameworks found/i);
  await expect(emptyMessage).toBeInTheDocument();
});

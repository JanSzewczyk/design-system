import * as React from "react";

import { GlobeIcon } from "lucide-react";

import { expect, screen, waitFor } from "storybook/test";
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

export const SingleSelect = meta.story({
  name: "Single Select",
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

SingleSelect.test("renders combobox input with placeholder", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await expect(input).toBeVisible();
});

SingleSelect.test("opens dropdown on input click and shows all options", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await userEvent.click(input);

  await waitFor(async () => {
    const options = screen.queryAllByRole("option");
    await expect(options.length).toBe(frameworks.length);
  });
});

SingleSelect.test("filters options while typing", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);

  await step("Open dropdown", async () => {
    await userEvent.click(input);
  });

  await step("Type to filter", async () => {
    await userEvent.type(input, "Next");
    await waitFor(async () => {
      const options = screen.queryAllByRole("option");
      await expect(options).toHaveLength(1);
      await expect(options[0]).toHaveTextContent("Next.js");
    });
  });
});

SingleSelect.test("selects an option on click and updates input value", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);

  await step("Open dropdown", async () => {
    await userEvent.click(input);
  });

  await step("Click Remix option", async () => {
    const option = await screen.findByRole("option", { name: /remix/i });
    await userEvent.click(option);
  });

  await step("Verify input shows selected value", async () => {
    await expect(input).toHaveValue("Remix");
  });
});

const languages = ["TypeScript", "JavaScript", "Python", "Rust", "Go", "Java"] as const;

export const MultipleSelect = meta.story({
  name: "Multiple Select",
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

MultipleSelect.test("renders chips input with placeholder", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/add language/i);
  await expect(input).toBeVisible();
});

MultipleSelect.test("selects multiple items and renders chips", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/add language/i);

  await step("Click input to open dropdown", async () => {
    await userEvent.click(input);
  });

  await step("Select TypeScript", async () => {
    await waitFor(() => expect(screen.getByRole("option", { name: /typescript/i })).toBeInTheDocument());
    await userEvent.click(screen.getByRole("option", { name: /typescript/i }));
  });

  await step("Select Python", async () => {
    await waitFor(() => expect(screen.getByRole("option", { name: /python/i })).toBeInTheDocument());
    await userEvent.click(screen.getByRole("option", { name: /python/i }));
  });

  await step("Verify chips are rendered", async () => {
    await expect(canvas.getByText("TypeScript")).toBeVisible();
    await expect(canvas.getByText("Python")).toBeVisible();
  });
});

MultipleSelect.test("chip has remove button", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/add language/i);

  await step("Select Rust", async () => {
    await userEvent.click(input);
    await waitFor(() => expect(screen.getByRole("option", { name: /rust/i })).toBeInTheDocument());
    await userEvent.click(screen.getByRole("option", { name: /rust/i }));
  });

  await step("Chip and its remove button are visible", async () => {
    const chip = canvas.getByText("Rust");
    await expect(chip).toBeVisible();
    const chipContainer = chip.closest('[data-slot="combobox-chip"]');
    const removeBtn = chipContainer?.querySelector('[data-slot="combobox-chip-remove"]');
    await expect(removeBtn).not.toBeNull();
  });
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

Groups.test("opens dropdown and renders group labels", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/select a timezone/i);
  await userEvent.click(input);

  await waitFor(async () => {
    await expect(screen.getByText("Americas")).toBeVisible();
    await expect(screen.getByText("Europe")).toBeVisible();
    await expect(screen.getByText("Asia/Pacific")).toBeVisible();
  });
});

Groups.test("selects item from specific group and updates input value", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/select a timezone/i);

  await step("Open dropdown", async () => {
    await userEvent.click(input);
  });

  await step("Select London from Europe group", async () => {
    await waitFor(() => expect(screen.getByRole("option", { name: /london/i })).toBeInTheDocument());
    await userEvent.click(screen.getByRole("option", { name: /london/i }));
  });

  await step("Verify input displays selected value", async () => {
    await expect(input).toHaveValue("(GMT+0) London");
  });
});

export const WithClear = meta.story({
  name: "With Clear",
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

WithClear.test("renders with default value pre-filled", async ({ canvas }) => {
  const input = canvas.getAllByDisplayValue("Next.js").find((element) => element.checkVisibility());
  await expect(input).toBeVisible();
});

WithClear.test("renders clear button with correct data-slot", async ({ canvas }) => {
  const buttons = canvas.getAllByRole("button");
  const clearButton = buttons.find((btn) => btn.getAttribute("data-slot") === "combobox-clear");
  await expect(clearButton).toBeDefined();
  await expect(clearButton!).toBeVisible();
});

WithClear.test("clicking clear button removes the selected value", async ({ canvas, userEvent }) => {
  const buttons = canvas.getAllByRole("button");
  const clearButton = buttons.find((btn) => btn.getAttribute("data-slot") === "combobox-clear");
  await expect(clearButton).toBeDefined();
  await userEvent.click(clearButton!);
  const input = canvas.getByRole("combobox");
  await expect(input).toHaveValue("");
});

export const DisabledCombobox = meta.story({
  name: "Disabled",
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

DisabledCombobox.test("input is disabled", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await expect(input).toBeDisabled();
});

export const WithInputAddon = meta.story({
  name: "With Input Addon",
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

WithInputAddon.test("renders input group with globe icon addon", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/select a timezone/i);
  await expect(input).toBeVisible();
  const group = canvas.getByRole("group");
  const addon = group.querySelector('[data-slot="input-group-addon"]');
  await expect(addon).not.toBeNull();
});

WithInputAddon.test("opens dropdown with grouped timezone options", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/select a timezone/i);
  await userEvent.click(input);
  await waitFor(async () => {
    const options = screen.queryAllByRole("option");
    await expect(options.length).toBeGreaterThan(0);
  });
});

export const InvalidCombobox = meta.story({
  name: "Invalid",
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

InvalidCombobox.test("input has aria-invalid attribute", async ({ canvas }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await expect(input).toHaveAttribute("aria-invalid", "true");
});

InvalidCombobox.test("combobox still opens when invalid", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await userEvent.click(input);
  await waitFor(async () => {
    const options = screen.queryAllByRole("option");
    await expect(options.length).toBeGreaterThan(0);
  });
});

export const AutoHighlight = meta.story({
  name: "Auto Highlight",
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

AutoHighlight.test("opens dropdown and shows all options", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);
  await userEvent.click(input);
  await waitFor(async () => {
    const options = screen.queryAllByRole("option");
    await expect(options.length).toBe(frameworks.length);
  });
});

AutoHighlight.test("auto-highlights first matching item when typing", async ({ canvas, userEvent, step }) => {
  const input = canvas.getByPlaceholderText(/select a framework/i);

  await step("Open dropdown and type", async () => {
    await userEvent.click(input);
    await userEvent.type(input, "N");
  });

  await step("First matching option is highlighted", async () => {
    await waitFor(async () => {
      const highlighted = screen.queryAllByRole("option").find((opt) => opt.hasAttribute("data-highlighted"));
      await expect(highlighted).not.toBeUndefined();
    });
  });
});

export const EmptyState = meta.story({
  name: "Empty State",
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

EmptyState.test("shows empty state message when search yields no results", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/search frameworks/i);
  await userEvent.type(input, "xyz");

  await waitFor(() => expect(screen.getByText(/no frameworks found/i)).toBeInTheDocument());
});

EmptyState.test("shows matching options when search has results", async ({ canvas, userEvent }) => {
  const input = canvas.getByPlaceholderText(/search frameworks/i);
  await userEvent.type(input, "Next");

  await waitFor(async () => {
    const options = screen.queryAllByRole("option");
    await expect(options).toHaveLength(1);
    await expect(options[0]).toHaveTextContent("Next.js");
  });
});

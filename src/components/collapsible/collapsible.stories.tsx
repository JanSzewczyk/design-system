import { expect, userEvent, within } from "storybook/test";
import { Button } from "~/components/button";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Collapsible",
  component: Collapsible,
  subcomponents: { CollapsibleTrigger, CollapsibleContent },
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle: "An interactive component which expands/collapses a panel."
    }
  }
});

export const Default = meta.story({
  args: {
    defaultOpen: false
  },
  render: (args) => (
    <Collapsible {...args} className="w-64">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Toggle content
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded border p-4 text-sm">
        This content can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  )
});

Default.test("renders collapsible with data-slot attribute", async ({ canvasElement }) => {
  const collapsible = canvasElement.querySelector('[data-slot="collapsible"]');
  await expect(collapsible).toBeTruthy();
});

Default.test("renders trigger with data-slot attribute", async ({ canvasElement }) => {
  const trigger = canvasElement.querySelector('[data-slot="collapsible-trigger"]');
  await expect(trigger).toBeTruthy();
});

Default.test("content is hidden by default", async ({ canvasElement }) => {
  const content = canvasElement.querySelector('[data-slot="collapsible-content"]');
  await expect(content).toBeTruthy();
  await expect(content?.getAttribute("data-state")).toBe("closed");
});

Default.test("opens content on trigger click", async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: "Toggle content" });
  await userEvent.click(trigger);
  const content = canvasElement.querySelector('[data-slot="collapsible-content"]');
  await expect(content?.getAttribute("data-state")).toBe("open");
});

export const DefaultOpen = meta.story({
  name: "Default Open",
  args: {
    defaultOpen: true
  },
  render: (args) => (
    <Collapsible {...args} className="w-64">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Toggle content
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded border p-4 text-sm">
        This content is open by default.
      </CollapsibleContent>
    </Collapsible>
  )
});

DefaultOpen.test("content is visible when defaultOpen is true", async ({ canvasElement }) => {
  const content = canvasElement.querySelector('[data-slot="collapsible-content"]');
  await expect(content?.getAttribute("data-state")).toBe("open");
});

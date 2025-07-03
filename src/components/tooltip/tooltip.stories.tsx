import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { userEvent, expect, fn, within } from "storybook/test";

import { Button } from "../button";

import { Tooltip, TooltipProvider } from ".";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  args: {
    onOpenChange: fn()
  },
  tags: ["experimental"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Add to library"
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement?.parentElement as HTMLElement);
    const trigger = canvas.getByRole("button", { name: /hover me/i });

    // Test that trigger is visible
    await expect(trigger).toBeVisible();

    // Test hover interaction
    await userEvent.hover(trigger);

    // Wait for tooltip to appear and verify content
    const tooltip = canvas.getByRole("tooltip");
    await expect(tooltip).toBeInTheDocument();
    await expect(tooltip).toHaveTextContent("Add to library");

    // Test unhover
    await userEvent.unhover(trigger);

    // Tooltip should disappear (with a small delay)
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
};

export const WithLongContent: Story = {
  args: {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet erat turpis, ut lacinia lacus tincidunt sed. In non lorem est. Nunc auctor iaculis rhoncus."
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Long content tooltip</Button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);

    const tooltip = await canvas.findByRole("tooltip");
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent(/Lorem ipsum dolor sit amet/);
  }
};

// export const DifferentSides: Story = {
//   render: () => (
//     <div className="grid grid-cols-2 gap-8">
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline">Top</Button>
//         </TooltipTrigger>
//         <TooltipContent side="top">
//           <p>Tooltip on top</p>
//         </TooltipContent>
//       </Tooltip>
//
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline">Right</Button>
//         </TooltipTrigger>
//         <TooltipContent side="right">
//           <p>Tooltip on right</p>
//         </TooltipContent>
//       </Tooltip>
//
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline">Bottom</Button>
//         </TooltipTrigger>
//         <TooltipContent side="bottom">
//           <p>Tooltip on bottom</p>
//         </TooltipContent>
//       </Tooltip>
//
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline">Left</Button>
//         </TooltipTrigger>
//         <TooltipContent side="left">
//           <p>Tooltip on left</p>
//         </TooltipContent>
//       </Tooltip>
//     </div>
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     // Test each side
//     const sides = ["Top", "Right", "Bottom", "Left"];
//
//     for (const side of sides) {
//       const button = canvas.getByRole("button", { name: side });
//       await userEvent.hover(button);
//
//       const tooltip = await canvas.findByRole("tooltip");
//       await expect(tooltip).toBeVisible();
//       await expect(tooltip).toHaveTextContent(`Tooltip on ${side.toLowerCase()}`);
//
//       await userEvent.unhover(button);
//       await new Promise((resolve) => setTimeout(resolve, 200));
//     }
//   }
// };
//
// export const KeyboardNavigation: Story = {
//   render: () => (
//     <div className="flex gap-4">
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline">First</Button>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>First tooltip</p>
//         </TooltipContent>
//       </Tooltip>
//
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline">Second</Button>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Second tooltip</p>
//         </TooltipContent>
//       </Tooltip>
//     </div>
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     // Focus first button using tab
//     await userEvent.tab();
//     const firstButton = canvas.getByRole("button", { name: "First" });
//     await expect(firstButton).toHaveFocus();
//
//     // Tooltip should appear on focus
//     const firstTooltip = await canvas.findByRole("tooltip");
//     await expect(firstTooltip).toBeVisible();
//     await expect(firstTooltip).toHaveTextContent("First tooltip");
//
//     // Tab to second button
//     await userEvent.tab();
//     const secondButton = canvas.getByRole("button", { name: "Second" });
//     await expect(secondButton).toHaveFocus();
//
//     // Second tooltip should appear
//     await new Promise((resolve) => setTimeout(resolve, 100));
//     const secondTooltip = await canvas.findByRole("tooltip");
//     await expect(secondTooltip).toHaveTextContent("Second tooltip");
//
//     // Press Escape to close tooltip
//     await userEvent.keyboard("{Escape}");
//     await new Promise((resolve) => setTimeout(resolve, 200));
//   }
// };
//
// export const CustomStyling: Story = {
//   render: () => (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button variant="outline">Custom styled tooltip</Button>
//       </TooltipTrigger>
//       <TooltipContent className="border-red-600 bg-red-500 text-white" side="top">
//         <p>Custom red tooltip</p>
//       </TooltipContent>
//     </Tooltip>
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const trigger = canvas.getByRole("button");
//
//     await userEvent.hover(trigger);
//
//     const tooltip = await canvas.findByRole("tooltip");
//     await expect(tooltip).toBeVisible();
//     await expect(tooltip).toHaveClass("bg-red-500", "text-white", "border-red-600");
//   }
// };
//
// export const WithDelay: Story = {
//   render: () => (
//     <Tooltip delayDuration={1000}>
//       <TooltipTrigger asChild>
//         <Button variant="outline">Delayed tooltip (1s)</Button>
//       </TooltipTrigger>
//       <TooltipContent>
//         <p>This tooltip appears after 1 second</p>
//       </TooltipContent>
//     </Tooltip>
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const trigger = canvas.getByRole("button");
//
//     await userEvent.hover(trigger);
//
//     // Tooltip should not be visible immediately
//     expect(canvas.queryByRole("tooltip")).not.toBeInTheDocument();
//
//     // Wait for delay and check tooltip appears
//     const tooltip = await canvas.findByRole("tooltip", {}, { timeout: 2000 });
//     await expect(tooltip).toBeVisible();
//     await expect(tooltip).toHaveTextContent("This tooltip appears after 1 second");
//   }
// };
//
// export const DisabledTrigger: Story = {
//   render: () => (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button variant="outline" disabled>
//           Disabled button
//         </Button>
//       </TooltipTrigger>
//       <TooltipContent>
//         <p>This tooltip shows even when button is disabled</p>
//       </TooltipContent>
//     </Tooltip>
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const trigger = canvas.getByRole("button");
//
//     // Verify button is disabled
//     await expect(trigger).toBeDisabled();
//
//     // Hover should still show tooltip (depending on implementation)
//     await userEvent.hover(trigger);
//
//     // Note: Behavior may vary based on implementation
//     // Some implementations show tooltips on disabled elements, others don't
//   }
// };
//
// export const MultipleTooltips: Story = {
//   render: () => (
//     <div className="flex gap-4">
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline" size="sm">
//             Save
//           </Button>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Save your work</p>
//         </TooltipContent>
//       </Tooltip>
//
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline" size="sm">
//             Edit
//           </Button>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Edit this item</p>
//         </TooltipContent>
//       </Tooltip>
//
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="destructive" size="sm">
//             Delete
//           </Button>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Delete this item permanently</p>
//         </TooltipContent>
//       </Tooltip>
//     </div>
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     const saveButton = canvas.getByRole("button", { name: "Save" });
//     const editButton = canvas.getByRole("button", { name: "Edit" });
//     const deleteButton = canvas.getByRole("button", { name: "Delete" });
//
//     // Test each tooltip independently
//     await userEvent.hover(saveButton);
//     let tooltip = await canvas.findByRole("tooltip");
//     await expect(tooltip).toHaveTextContent("Save your work");
//     await userEvent.unhover(saveButton);
//
//     await userEvent.hover(editButton);
//     tooltip = await canvas.findByRole("tooltip");
//     await expect(tooltip).toHaveTextContent("Edit this item");
//     await userEvent.unhover(editButton);
//
//     await userEvent.hover(deleteButton);
//     tooltip = await canvas.findByRole("tooltip");
//     await expect(tooltip).toHaveTextContent("Delete this item permanently");
//   }
// };
//
// export const InteractiveContent: Story = {
//   render: () => (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button variant="outline">Tooltip with button</Button>
//       </TooltipTrigger>
//       <TooltipContent className="w-64">
//         <div className="space-y-2">
//           <p className="font-medium">Interactive tooltip</p>
//           <p className="text-muted-foreground text-sm">This tooltip contains interactive content</p>
//           <Button size="sm" className="w-full">
//             Click me
//           </Button>
//         </div>
//       </TooltipContent>
//     </Tooltip>
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const trigger = canvas.getByRole("button", { name: /tooltip with button/i });
//
//     await userEvent.hover(trigger);
//
//     const tooltip = await canvas.findByRole("tooltip");
//     await expect(tooltip).toBeVisible();
//
//     // Find the button inside the tooltip
//     const innerButton = within(tooltip).getByRole("button", { name: "Click me" });
//     await expect(innerButton).toBeVisible();
//
//     // Test clicking the button inside tooltip
//     await userEvent.click(innerButton);
//     await expect(innerButton).toHaveBeenClicked;
//   }
// };

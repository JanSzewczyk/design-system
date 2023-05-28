import * as React from "react";

import { Meta, StoryObj } from "@storybook/react";

import Tooltip from "./Tooltip";
import { TooltipProvider } from "./Tooltip.provider";

import Button from "../button";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
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
  render: (args) => (
    <Tooltip {...args}>
      <Button>Click</Button>
    </Tooltip>
  ),
  args: {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet erat turpis, ut lacinia lacus tincidunt sed." +
      " In non lorem est. Nunc auctor iaculis rhoncus. Vivamus blandit tempus tellus sed luctus. In porta arcu erat, at " +
      "laoreet ante scelerisque sed. Fusce egestas felis non nulla porttitor, eu mollis nunc porta. Maecenas maximus sem " +
      "at malesuada convallis.",
    side: "bottom"
  }
};

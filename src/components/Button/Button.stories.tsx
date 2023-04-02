import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "./Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Button",
  component: Button
} as ComponentMeta<typeof Button>;

const SizesTemplate: ComponentStory<typeof Button> = (args) => (
  <div className="flex flex-row items-center gap-x-4">
    <Button size="sm" {...args}>
      SMALL
    </Button>
    <Button {...args}>MEDIUM</Button>
    <Button size="lg" {...args}>
      LARGE
    </Button>
  </div>
);

export const Sizes = SizesTemplate.bind({});
Sizes.argTypes = {
  color: { control: "select", options: ["neutral", "primary", "success", "warning", "error"] },
  variant: { control: "select", options: ["text", "outlined", "contained"] }
};
Sizes.args = {
  disabled: false
};

import * as React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Separator } from "./separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"]
} satisfies Meta<typeof Separator>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <h1 className="typography-heading-5">Lorem ipsum</h1>
      <p className="mt-1 text-gray-200 typography-body-1">
        Maecenas in velit ac elit vulputate sollicitudin vel eget dui
      </p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4">
        <div className="typography-button">Blog</div>
        <Separator orientation="vertical" />
        <div className="typography-button">Docs</div>
        <Separator orientation="vertical" />
        <div className="typography-button">Source</div>
      </div>
    </div>
  )
};

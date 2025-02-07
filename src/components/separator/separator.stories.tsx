import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

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
      <h1 className="text-heading-5">Lorem ipsum</h1>
      <p className="text-body-1 mt-1 text-gray-200">Maecenas in velit ac elit vulputate sollicitudin vel eget dui</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4">
        <div className="text-button">Blog</div>
        <Separator orientation="vertical" />
        <div className="text-button">Docs</div>
        <Separator orientation="vertical" />
        <div className="text-button">Source</div>
      </div>
    </div>
  )
};

import React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "./index";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"]
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Image: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
      <AvatarFallback>ML</AvatarFallback>
    </Avatar>
  )
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>ML</AvatarFallback>
    </Avatar>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="mb-4 flex flex-row items-center gap-x-4">
      <Avatar size="sm">
        <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
    </div>
  )
};

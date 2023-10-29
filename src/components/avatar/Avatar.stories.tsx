import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

import { LightningBoltIcon } from "../../icons";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    bg: {
      control: "text"
    },
    children: {
      description: "Defines avatar children, eg. 'JS', icon or image",
      control: "text",
      table: {
        type: {
          summary: "ReactNode"
        }
      }
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ children, ...args }) => <Avatar {...args}>{children}</Avatar>
};

export const ImageAvatar: Story = {
  args: {
    alt: "User Avatar",
    src: "https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
  }
};

export const LetterAvatar: Story = {
  args: {
    children: "ST",
    bg: "bg-primary-500"
  }
};

export const Sizes: Story = {
  render: () => (
    <div>
      <div className="mb-4 flex flex-row items-center gap-x-4">
        <Avatar
          alt="User Avatar"
          size="sm"
          src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
        />
        <Avatar
          alt="User Avatar"
          src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
        />
        <Avatar
          alt="User Avatar"
          size="lg"
          src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
        />
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <Avatar size="sm">JS</Avatar>
        <Avatar>JS</Avatar>
        <Avatar size="lg">JS</Avatar>
      </div>
    </div>
  )
};

export const IconAvatar: Story = {
  args: {
    children: <LightningBoltIcon className="h-8 w-8" />
  }
};

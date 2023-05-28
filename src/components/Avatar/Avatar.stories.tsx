import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import AvatarComponent from "./Avatar.component";

import { IconBolt } from "../../icons";

const meta = {
  title: "Components/Avatar",
  component: AvatarComponent,
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
} satisfies Meta<typeof AvatarComponent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ children, ...args }) => <AvatarComponent {...args}>{children}</AvatarComponent>
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
        <AvatarComponent
          alt="User Avatar"
          size="sm"
          src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
        />
        <AvatarComponent
          alt="User Avatar"
          src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
        />
        <AvatarComponent
          alt="User Avatar"
          size="lg"
          src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
        />
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <AvatarComponent size="sm">JS</AvatarComponent>
        <AvatarComponent>JS</AvatarComponent>
        <AvatarComponent size="lg">JS</AvatarComponent>
      </div>
    </div>
  )
};

export const IconAvatar: Story = {
  args: {
    children: <IconBolt className="h-8 w-8" />
  }
};

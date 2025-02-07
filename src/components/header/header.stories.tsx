import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

import { Header } from ".";

const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"]
} satisfies Meta<typeof Header>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Header>
      <div className="flex w-full justify-between">
        <h1 className="text-heading-4">LOGO</h1>
        <div className="ml-16 flex flex-row items-center">
          <div className="mr-8 flex flex-row items-center gap-4">
            <div className="text-button">Docs</div>
            <div className="text-button">Source</div>
          </div>

          <Avatar>
            <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
            <AvatarFallback>ML</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Header>
  )
};

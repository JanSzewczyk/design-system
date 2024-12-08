import * as React from "react";

import { Header } from ".";
import { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

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
      <h1 className="typography-heading-4">LOGO</h1>
      <div className="ml-auto flex flex-row items-center">
        <div className="mr-8 flex flex-row items-center gap-4">
          <div className="typography-button">Docs</div>
          <div className="typography-button">Source</div>
        </div>

        <Avatar>
          <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
      </div>
    </Header>
  )
};

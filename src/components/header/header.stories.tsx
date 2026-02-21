import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

import { Header } from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"]
});

export const Default = meta.story({
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
            <AvatarImage
              alt="User avatar"
              src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
            />
            <AvatarFallback>ML</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Header>
  )
});

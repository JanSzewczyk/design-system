import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./index";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs", "beta"]
});

export const Image = meta.story({
  render: () => (
    <Avatar>
      <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
      <AvatarFallback>ML</AvatarFallback>
    </Avatar>
  )
});

export const Fallback = meta.story({
  render: () => (
    <Avatar>
      <AvatarFallback>ML</AvatarFallback>
    </Avatar>
  )
});

export const Sizes = meta.story({
  render: () => (
    <div className="mb-4 flex flex-row items-center gap-x-4">
      <Avatar className="size-4">
        <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarImage src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
    </div>
  )
});

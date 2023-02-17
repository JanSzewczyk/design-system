import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Avatar from "./Avatar";
import { BeakerIcon } from "@heroicons/react/20/solid";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Avatar",
  component: Avatar
} as ComponentMeta<typeof Avatar>;

const ImageAvatarTemplate: ComponentStory<typeof Avatar> = (args) => (
  <div>
    <Avatar
      alt="User Avatar"
      src="https://bi.im-g.pl/im/d9/00/13/z19924697AMP,-Mona-Lisa---Leonardo-da-Vinci.jpg"
    />
  </div>
);
export const ImageAvatar = ImageAvatarTemplate.bind({});

const LetterAvatarTemplate: ComponentStory<typeof Avatar> = (args) => (
  <div className="flex flex-row items-center gap-x-4">
    <Avatar>ST</Avatar>
    <Avatar bg="bg-primary-500">JS</Avatar>
    <Avatar bg="bg-error-500">KD</Avatar>
  </div>
);
export const LetterAvatar = LetterAvatarTemplate.bind({});

const SizesTemplate: ComponentStory<typeof Avatar> = (args) => (
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
);
export const Sizes = SizesTemplate.bind({});

const IconAvatarTemplate: ComponentStory<typeof Avatar> = (args) => (
  <div>
    <Avatar>
      <BeakerIcon className="h-8 w-8" />
    </Avatar>
  </div>
);
export const IconAvatar = IconAvatarTemplate.bind({});

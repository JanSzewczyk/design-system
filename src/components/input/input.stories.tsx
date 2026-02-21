import * as React from "react";

import { Input } from "./input";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Input",
  component: Input,
  tags: ["autodocs", "new"],
  decorators: [(story) => <div className="max-w-lg">{story()}</div>]
});

export const Example = meta.story({
  args: {
    type: "email",
    placeholder: "Email"
  }
});

export const File = meta.story({
  args: {
    type: "file"
  }
});

export const Disabled = meta.story({
  args: {
    type: "email",
    placeholder: "Email",
    disabled: true
  }
});

export const Invalid = meta.story({
  args: {
    type: "email",
    placeholder: "Email",
    invalid: true,
    defaultValue: "incorrect@email.com"
  }
});

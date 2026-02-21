import * as React from "react";

import { Checkbox } from "~/components/checkbox";

import { Label } from ".";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/Label",
  component: Label,
  tags: ["autodocs", "beta"]
});

export const Example = meta.story({
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
});

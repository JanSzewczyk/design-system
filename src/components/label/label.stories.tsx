import preview from "~/.storybook/preview";
import { Checkbox } from "~/components/checkbox";
import { Label } from ".";

const meta = preview.meta({
  component: Label,
  tags: ["autodocs", "beta"],
  title: "Components/Label"
});

export const Example = meta.story({
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
});

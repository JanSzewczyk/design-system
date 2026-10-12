import preview from "~/.storybook/preview";
import { Input } from "./input";

const meta = preview.meta({
  component: Input,
  decorators: [(story) => <div className="max-w-lg">{story()}</div>],
  tags: ["autodocs", "new"],
  title: "Components/Input"
});

export const Example = meta.story({
  args: {
    placeholder: "Email",
    type: "email"
  }
});

export const File = meta.story({
  args: {
    type: "file"
  }
});

export const Disabled = meta.story({
  args: {
    disabled: true,
    placeholder: "Email",
    type: "email"
  }
});

export const Invalid = meta.story({
  args: {
    defaultValue: "incorrect@email.com",
    invalid: true,
    placeholder: "Email",
    type: "email"
  }
});

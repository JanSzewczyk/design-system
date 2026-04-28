import {
  Kbd,
  KbdGroup,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  InputGroup,
  InputGroupInput,
  InputGroupAddon
} from "~/components";

import preview from "~/.storybook/preview";
import { SearchIcon } from "lucide-react";

const meta = preview.meta({
  title: "Components/Kbd",
  component: Kbd,
  decorators: [(Story) => <div className="w-full max-w-sm">{Story()}</div>]
});

export const KbdStory = meta.story({
  name: "Kbd",
  render() {
    return (
      <div className="flex flex-col items-center gap-4">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⌃</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>B</Kbd>
        </KbdGroup>
      </div>
    );
  }
});

export const Group = meta.story({
  render() {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-small">
          Use{" "}
          <KbdGroup>
            <Kbd>Ctrl + B</Kbd>
            <Kbd>Ctrl + K</Kbd>
          </KbdGroup>{" "}
          to open the command palette
        </p>
      </div>
    );
  }
});

export const ButtonStory = meta.story({
  name: "Button with Kbd",
  render() {
    return (
      <Button variant="outline">
        Accept{" "}
        <Kbd data-icon="inline-end" className="translate-x-0.5">
          ⏎
        </Kbd>
      </Button>
    );
  }
});

export const TooltipStory = meta.story({
  name: "Tooltip",
  render() {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Save</Button>
        </TooltipTrigger>
        <TooltipContent>
          Save Changes <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    );
  }
});

export const InputGroupStory = meta.story({
  name: "Input Group",
  render() {
    return (
      <div className="flex w-full max-w-xs flex-col gap-6">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
});

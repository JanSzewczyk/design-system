import { ArrowDownSquare, ArrowUpRightIcon } from "lucide-react";
import preview from "~/.storybook/preview";
import { Button } from "./button";

const meta = preview.meta({
  argTypes: {
    children: {
      control: "text"
    }
  },
  component: Button,
  tags: ["autodocs", "beta"],
  title: "Components/Button"
});

export const Variants = meta.story({
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="error">Error</Button>
    </div>
  )
});

export const Disabled = meta.story({
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <Button disabled variant="default">
        Default
      </Button>
      <Button disabled variant="secondary">
        Secondary
      </Button>
      <Button disabled variant="outline">
        Outline
      </Button>
      <Button disabled variant="ghost">
        Ghost
      </Button>
      <Button disabled variant="link">
        Link
      </Button>
      <Button disabled variant="error">
        Error
      </Button>
    </div>
  )
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="xs" variant="outline">
          XSmall
        </Button>
        <Button aria-label="Submit" size="icon-xs" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button aria-label="Submit" size="icon-sm" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button aria-label="Submit" size="icon" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button aria-label="Submit" size="icon-lg" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
});

export const FullWidth = meta.story({
  render: () => (
    <div className="w-52">
      <Button fullWidth>FULL WIDTH</Button>
    </div>
  )
});

export const WithIcon = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button startIcon={<ArrowDownSquare />}>LEFT ICON</Button>
      <Button endIcon={<ArrowDownSquare />}>RIGHT ICON</Button>
    </div>
  )
});

export const Loading = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading variant="outline">
        LEFT LOADING
      </Button>
      <Button loading loadingPosition="end">
        RIGHT LOADING
      </Button>
      <Button loading size="icon">
        <ArrowUpRightIcon />
      </Button>
    </div>
  )
});

export const AsLink = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="">Icon button</a>
      </Button>
      <Button asChild disabled>
        <a href="">Icon button - disabled</a>
      </Button>
      <Button asChild size="icon">
        <a href="">
          <ArrowUpRightIcon />
        </a>
      </Button>
      <Button asChild disabled size="icon">
        <a href="">
          <ArrowUpRightIcon />
        </a>
      </Button>
    </div>
  )
});

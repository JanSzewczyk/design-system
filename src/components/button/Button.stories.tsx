import * as React from "react";

import { ArrowDownSquare, ArrowUpRightIcon } from "lucide-react";

import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    children: {
      control: "text"
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <Button variant="default" disabled>
        Default
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="link" disabled>
        Link
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="icon-sm" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button size="icon" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button size="icon-lg" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-52">
      <Button fullWidth>FULL WIDTH</Button>
    </div>
  )
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button startIcon={<ArrowDownSquare />}>LEFT ICON</Button>
      <Button endIcon={<ArrowDownSquare />}>RIGHT ICON</Button>
    </div>
  )
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" loading>
        LEFT LOADING
      </Button>
      <Button loading loadingPosition="end">
        RIGHT LOADING
      </Button>
      <Button size="icon" loading>
        <ArrowUpRightIcon />
      </Button>
    </div>
  )
};

export const AsLink: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="">Icon button</a>
      </Button>
      <Button asChild disabled>
        <a href="">Icon button - disabled</a>
      </Button>
      <Button size="icon" asChild>
        <a href="">
          <ArrowUpRightIcon />
        </a>
      </Button>
      <Button size="icon" asChild disabled>
        <a href="">
          <ArrowUpRightIcon />
        </a>
      </Button>
    </div>
  )
};

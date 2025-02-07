import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react";
import { type ButtonVariantType } from "~/components";

import { ArrowBottomLeftIcon, GitHubLogoIcon } from "../../icons";

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

export const Default: Story = {
  render: ({ children, ...args }) => <Button {...args}>{children}</Button>,
  args: {
    children: "Label"
  },
  parameters: { pseudo: { hover: true } }
};

export const Basic: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button variant="text" {...args}>
        TEXT
      </Button>
      <Button variant="contained" {...args}>
        CONTAINED
      </Button>
      <Button variant="outlined" {...args}>
        OUTLINED
      </Button>
    </div>
  )
};

export const Text: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args}>PRIMARY</Button>
      <Button {...args} disabled>
        DISABLED
      </Button>
      <Button asChild {...args}>
        <a href="">LINK</a>
      </Button>
      <Button asChild disabled {...args}>
        <a href="">LINK DISABLED</a>
      </Button>
    </div>
  ),
  args: {}
};

export const Outlined: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args}>PRIMARY</Button>
      <Button {...args} disabled>
        DISABLED
      </Button>
      <Button asChild {...args}>
        <a href="">LINK</a>
      </Button>
      <Button asChild disabled {...args}>
        <a href="">LINK DISABLED</a>
      </Button>
    </div>
  ),
  args: {
    variant: "outlined"
  }
};

export const Contained: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args}>PRIMARY</Button>
      <Button {...args} disabled>
        DISABLED
      </Button>
      <Button asChild {...args}>
        <a href="">LINK</a>
      </Button>
      <Button asChild disabled {...args}>
        <a href="">LINK DISABLED</a>
      </Button>
    </div>
  ),
  args: {
    variant: "contained"
  }
};

export const Color: Story = {
  render: () => (
    <div className="space-y-4">
      {["text", "outlined", "contained"].map((variant) => (
        <div key={variant} className="flex flex-wrap gap-4">
          <Button color="neutral" variant={variant as ButtonVariantType}>
            NEUTRAL
          </Button>
          <Button color="primary" variant={variant as ButtonVariantType}>
            PRIMARY
          </Button>
          <Button color="success" variant={variant as ButtonVariantType}>
            SUCCESS
          </Button>
          <Button color="warning" variant={variant as ButtonVariantType}>
            WARNING
          </Button>
          <Button color="error" variant={variant as ButtonVariantType}>
            ERROR
          </Button>
        </div>
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="flex flex-row items-center gap-x-4">
        <Button variant="text" size="sm" {...args}>
          SMALL
        </Button>
        <Button variant="text">MEDIUM</Button>
        <Button size="lg" {...args}>
          LARGE
        </Button>
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <Button size="sm" variant="outlined">
          SMALL
        </Button>
        <Button variant="outlined">MEDIUM</Button>
        <Button size="lg" variant="outlined">
          LARGE
        </Button>
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <Button size="sm" variant="contained">
          SMALL
        </Button>
        <Button variant="contained">MEDIUM</Button>
        <Button size="lg" variant="contained">
          LARGE
        </Button>
      </div>
    </div>
  )
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-52">
      <Button fullWidth variant="contained">
        FULL WIDTH
      </Button>
    </div>
  )
};

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button color="error" variant="contained" startIcon={<ArrowBottomLeftIcon />}>
          LEFT ICON
        </Button>
        <Button color="primary" endIcon={<GitHubLogoIcon />}>
          RIGHT ICON
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button color="error" variant="contained" startIcon={<ArrowBottomLeftIcon />} asChild>
          <a href="">LEFT ICON link</a>
        </Button>
        <Button color="primary" endIcon={<GitHubLogoIcon />} asChild>
          <a href="">RIGHT ICON link</a>
        </Button>
      </div>
    </div>
  )
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="error" variant="contained" loading>
        LEFT LOADING
      </Button>
      <Button color="primary" loading loadingPosition="end">
        RIGHT LOADING
      </Button>
    </div>
  )
};

import * as React from "react";

import { Meta, StoryObj } from "@storybook/react";

import ButtonComponent from "./Button";
import { ButtonVariantType } from "./Button.types";

import { IconBolt, IconCurrencyDollar } from "../../icons";

const meta = {
  title: "Components/Button",
  component: ButtonComponent,
  argTypes: {
    as: {
      control: "text"
    },
    children: {
      control: "text"
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ButtonComponent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ children, ...args }) => <ButtonComponent {...args}>{children}</ButtonComponent>,
  args: {
    children: "Label"
  },
  parameters: { pseudo: { hover: true } }
};

export const Basic: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <ButtonComponent variant="text" {...args}>
        TEXT
      </ButtonComponent>
      <ButtonComponent variant="contained" {...args}>
        CONTAINED
      </ButtonComponent>
      <ButtonComponent variant="outlined" {...args}>
        OUTLINED
      </ButtonComponent>
    </div>
  )
};

export const Text: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <ButtonComponent {...args}>PRIMARY</ButtonComponent>
      <ButtonComponent {...args} disabled>
        DISABLED
      </ButtonComponent>
      <ButtonComponent as="a" href="" {...args}>
        LINK
      </ButtonComponent>
      <ButtonComponent as="a" href="" disabled {...args}>
        LINK DISABLED
      </ButtonComponent>
    </div>
  ),
  args: {}
};

export const Outlined: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <ButtonComponent {...args}>PRIMARY</ButtonComponent>
      <ButtonComponent {...args} disabled>
        DISABLED
      </ButtonComponent>
      <ButtonComponent as="a" href="" {...args}>
        LINK
      </ButtonComponent>
      <ButtonComponent as="a" href="" disabled {...args}>
        LINK DISABLED
      </ButtonComponent>
    </div>
  ),
  args: {
    variant: "outlined"
  }
};

export const Contained: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <ButtonComponent {...args}>PRIMARY</ButtonComponent>
      <ButtonComponent {...args} disabled>
        DISABLED
      </ButtonComponent>
      <ButtonComponent as="a" href="" {...args}>
        LINK
      </ButtonComponent>
      <ButtonComponent as="a" href="" disabled {...args}>
        LINK DISABLED
      </ButtonComponent>
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
          <ButtonComponent color="neutral" variant={variant as ButtonVariantType}>
            NEUTRAL
          </ButtonComponent>
          <ButtonComponent color="primary" variant={variant as ButtonVariantType}>
            PRIMARY
          </ButtonComponent>
          <ButtonComponent color="success" variant={variant as ButtonVariantType}>
            SUCCESS
          </ButtonComponent>
          <ButtonComponent color="warning" variant={variant as ButtonVariantType}>
            WARNING
          </ButtonComponent>
          <ButtonComponent color="error" variant={variant as ButtonVariantType}>
            ERROR
          </ButtonComponent>
        </div>
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="flex flex-row items-center gap-x-4">
        <ButtonComponent variant="text" size="sm" {...args}>
          SMALL
        </ButtonComponent>
        <ButtonComponent variant="text">MEDIUM</ButtonComponent>
        <ButtonComponent size="lg" {...args}>
          LARGE
        </ButtonComponent>
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <ButtonComponent size="sm" variant="outlined">
          SMALL
        </ButtonComponent>
        <ButtonComponent variant="outlined">MEDIUM</ButtonComponent>
        <ButtonComponent size="lg" variant="outlined">
          LARGE
        </ButtonComponent>
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <ButtonComponent size="sm" variant="contained">
          SMALL
        </ButtonComponent>
        <ButtonComponent variant="contained">MEDIUM</ButtonComponent>
        <ButtonComponent size="lg" variant="contained">
          LARGE
        </ButtonComponent>
      </div>
    </div>
  )
};

export const Block: Story = {
  render: () => (
    <div className="w-52">
      <ButtonComponent block variant="contained">
        BLOCK
      </ButtonComponent>
    </div>
  )
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonComponent color="error" variant="contained" startIcon={<IconBolt />}>
        LEFT ICON
      </ButtonComponent>
      <ButtonComponent color="primary" endIcon={<IconCurrencyDollar />}>
        RIGHT ICON
      </ButtonComponent>
    </div>
  )
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonComponent color="error" variant="contained" loading>
        LEFT LOADING
      </ButtonComponent>
      <ButtonComponent color="primary" loading loadingPosition="end">
        RIGHT LOADING
      </ButtonComponent>
    </div>
  )
};

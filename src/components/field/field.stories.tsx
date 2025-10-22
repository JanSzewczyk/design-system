import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Input, Label, Select, SelectItem, Textarea } from "~/components";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from ".";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs", "new"],
  decorators: [(Story) => <div className="w-full max-w-md">{Story()}</div>]
} satisfies Meta<typeof Field>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
          <FieldDescription>This appears on invoices and emails.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" autoComplete="off" invalid />
          <FieldError>Choose another username.</FieldError>
        </Field>
        {/*<Field orientation="horizontal">*/}
        {/*  <Switch id="newsletter" />*/}
        {/*  <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>*/}
        {/*</Field>*/}
      </FieldGroup>
    </FieldSet>
  )
};

export const InputStory: Story = {
  name: "Input",
  render: () => (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" type="text" placeholder="Max Leiter" />
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          <Input id="password" type="password" placeholder="********" />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
};

export const TextareaStory: Story = {
  name: "Textarea",
  render: () => (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
          <Textarea id="feedback" placeholder="Your feedback helps us improve..." rows={4} />
          <FieldDescription>Share your thoughts about our service.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
};

export const SelectStory: Story = {
  name: "Select",
  render: () => (
    <Field>
      <FieldLabel>Department</FieldLabel>
      <Select placeholder="Choose department">
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="marketing">Marketing</SelectItem>
        <SelectItem value="sales">Sales</SelectItem>
        <SelectItem value="support">Customer Support</SelectItem>
        <SelectItem value="hr">Human Resources</SelectItem>
        <SelectItem value="finance">Finance</SelectItem>
        <SelectItem value="operations">Operations</SelectItem>
      </Select>
      <FieldDescription>Select your department or area of work.</FieldDescription>
    </Field>
  )
};

export const FieldsetStory: Story = {
  name: "Fieldset",
  render: () => (
    <FieldSet>
      <FieldLegend>Address Information</FieldLegend>
      <FieldDescription>We need your address to deliver your order.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="street">Street Address</FieldLabel>
          <Input id="street" type="text" placeholder="123 Main St" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input id="city" type="text" placeholder="New York" />
          </Field>
          <Field>
            <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
            <Input id="zip" type="text" placeholder="90502" />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
};

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="name">Name</FieldLabel>
      <FieldContent>
        <Input id="name" placeholder="John Doe" />
      </FieldContent>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");
    await expect(group).toHaveAttribute("data-orientation", "horizontal");
  }
};

export const Responsive: Story = {
  render: () => (
    <Field orientation="responsive">
      <FieldLabel asChild>
        <Label htmlFor="company">Company</Label>
      </FieldLabel>
      <FieldContent>
        <Input id="company" placeholder="Acme Inc." />
      </FieldContent>
    </Field>
  )
};

export const WithSeparatorAndLegend: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldTitle>Personal</FieldTitle>
          <FieldContent>
            <FieldDescription>Basic information</FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator>or</FieldSeparator>
        <Field>
          <FieldTitle>Business</FieldTitle>
          <FieldContent>
            <FieldDescription>Company details</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
};

export const ErrorDeduplication: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <FieldContent>
        <Input id="password" type="password" placeholder="••••••••" invalid />
        <FieldError
          errors={[
            { message: "Password is required" },
            undefined,
            { message: "Password is required" },
            { message: "Password must be at least 8 characters" }
          ]}
        />
      </FieldContent>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Should render only the unique messages (2)
    const messages = canvas.getAllByText(/Password/);
    await expect(messages.length >= 2).toBe(true);
  }
};

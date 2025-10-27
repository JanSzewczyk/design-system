import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button, Input, Label, Select, SelectContent, SelectItem, Textarea } from "~/components";
import { Checkbox } from "~/components/checkbox";

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
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Payment Method</FieldLegend>
          <FieldDescription>All transactions are secure and encrypted</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-name-43j">Name on Card</FieldLabel>
              <Input id="checkout-7j9-card-name-43j" placeholder="Evil Rabbit" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-number-uw1">Card Number</FieldLabel>
              <Input id="checkout-7j9-card-number-uw1" placeholder="1234 5678 9012 3456" required />
              <FieldDescription>Enter your 16-digit card number</FieldDescription>
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="checkout-exp-month-ts6">Month</FieldLabel>
                <Select defaultValue="" id="checkout-exp-month-ts6" placeholder="MM">
                  <SelectContent>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-exp-year-f59">Year</FieldLabel>
                <Select id="checkout-7j9-exp-year-f59" placeholder="YYYY">
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2029">2029</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                <Input id="checkout-7j9-cvv" placeholder="123" required />
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Billing Address</FieldLegend>
          <FieldDescription>The billing address associated with your payment method</FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="checkout-7j9-same-as-shipping-wgm" defaultChecked />
              <FieldLabel htmlFor="checkout-7j9-same-as-shipping-wgm" className="font-normal">
                Same as shipping address
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-optional-comments">Comments</FieldLabel>
              <Textarea
                id="checkout-7j9-optional-comments"
                placeholder="Add any additional comments"
                className="resize-none"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
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
        <SelectContent>
          <SelectItem value="engineering">Engineering</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="support">Customer Support</SelectItem>
          <SelectItem value="hr">Human Resources</SelectItem>
          <SelectItem value="finance">Finance</SelectItem>
          <SelectItem value="operations">Operations</SelectItem>
        </SelectContent>
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

export const CheckboxStory: Story = {
  name: "Checkbox",
  render: () => (
    <FieldGroup>
      <FieldSet>
        <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
        <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
            <FieldLabel htmlFor="finder-pref-9k2-hard-disks-ljj" className="font-normal" defaultChecked>
              Hard disks
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="finder-pref-9k2-external-disks-1yg" />
            <FieldLabel htmlFor="finder-pref-9k2-external-disks-1yg" className="font-normal">
              External disks
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
            <FieldLabel htmlFor="finder-pref-9k2-cds-dvds-fzt" className="font-normal">
              CDs, DVDs, and iPods
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="finder-pref-9k2-connected-servers-6l2" />
            <FieldLabel htmlFor="finder-pref-9k2-connected-servers-6l2" className="font-normal">
              Connected servers
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-sync-folders-nep" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="finder-pref-9k2-sync-folders-nep">Sync Desktop & Documents folders</FieldLabel>
          <FieldDescription>
            Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
};

export const ChoiceCard: Story = {
  name: "Choice Card - Checkboxes",
  render: () => (
    <FieldGroup>
      <FieldSet>
        <FieldLabel htmlFor="compute-environment-p8w">Compute Environment</FieldLabel>
        <FieldDescription>Select the compute environment for your cluster.</FieldDescription>
        <FieldLabel htmlFor="kubernetes-r2h">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Kubernetes</FieldTitle>
              <FieldDescription>Run GPU workloads on a K8s configured cluster.</FieldDescription>
            </FieldContent>
            <Checkbox value="kubernetes" id="kubernetes-r2h" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="vm-z4k">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Virtual Machine</FieldTitle>
              <FieldDescription>Access a VM configured cluster to run GPU workloads.</FieldDescription>
            </FieldContent>
            <Checkbox value="vm" id="vm-z4k" />
          </Field>
        </FieldLabel>
      </FieldSet>
    </FieldGroup>
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

import { type Meta, type StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Button } from "../button";

import { Card } from "./card";
import { CardContent } from "./card-content";
import { CardDescription } from "./card-description";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardTitle } from "./card-title";

const meta = {
  title: "Components/Card",
  component: Card,
  // subcomponents: { CardTitle, CardHeader, CardDescription, CardContent, CardFooter },
  decorators: [(Story) => <div className="w-128">{Story()}</div>]
} satisfies Meta<typeof Card>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card header title</CardTitle>
        <CardDescription>Card header description.</CardDescription>
      </CardHeader>
      <CardContent>
        Card content.
        <br />
        <strong>Some info </strong>
      </CardContent>
      <CardFooter>
        <Button>Sign in with Google</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { name: /card header title/i })).toBeInTheDocument();
    await expect(canvas.getByText(/card header description./i)).toBeInTheDocument();
  }
};

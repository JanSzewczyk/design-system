import * as React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Card } from "./card";
import { CardContent } from "./card-content";
import { CardDescription } from "./card-description";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardTitle } from "./card-title";

import { Button } from "../button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [(story) => <div className="w-128">{story()}</div>]
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
  )
};

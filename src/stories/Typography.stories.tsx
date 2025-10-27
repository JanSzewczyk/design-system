import React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { cn } from "~/utils";

const HeadingText = "Lorem ipsum dolor sit amet.";
const SampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function TypographyStories({ classes, text = SampleText }: { classes: Array<string>; text?: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4">
      {classes.map((className) => (
        <React.Fragment key={className}>
          <div className="flex items-center">
            <div>
              <div className="typography-large">Class Name:</div>
              <code className="font-code typography-inline-code text-muted-foreground whitespace-nowrap">
                {className}
              </code>
            </div>
          </div>
          <div className={cn("inline-flex", className)}>{text}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: "Getting Started/Typography"
};

export default meta;
type Story = StoryObj;

const headingClassNames = [
  "typography-heading-1",
  "typography-heading-2",
  "typography-heading-3",
  "typography-heading-4"
];
export const Heading: Story = {
  render: () => <TypographyStories classes={headingClassNames} text={HeadingText} />
};

const bodyClassNames = ["typography-paragraph", "typography-blockquote", "typography-inline-code", "typography-lead"];
export const Body: Story = {
  render: () => <TypographyStories classes={bodyClassNames} />
};

const otherClassNames = ["typography-large", "typography-small", "typography-muted"];
export const Other: Story = {
  render: () => <TypographyStories classes={otherClassNames} />
};

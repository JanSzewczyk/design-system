import React from "react";

import { type Meta, type StoryObj } from "@storybook/react";

const HeadingText = "Lorem ipsum dolor sit amet.";
const SampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function TypographyStories({ classes, text = SampleText }: { classes: Array<string>; text?: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4">
      {classes.map((className) => (
        <React.Fragment key={className}>
          <div className="flex items-center">
            <div>
              <div className="text-subtitle-1 text-gray-200">Class Name:</div>
              <code className="font-code text-body-1 whitespace-nowrap">{className}</code>
            </div>
          </div>
          <div className={className}>{text}</div>
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
  "text-heading-1",
  "text-heading-2",
  "text-heading-3",
  "text-heading-4",
  "text-heading-5",
  "text-heading-6",
  "text-subtitle-1",
  "text-subtitle-2"
];
export const Heading: Story = {
  render: () => <TypographyStories classes={headingClassNames} text={HeadingText} />
};

const bodyClassNames = ["text-body-1", "text-body-2"];
export const Body: Story = {
  render: () => <TypographyStories classes={bodyClassNames} />
};

const otherClassNames = ["text-button", "text-caption", "text-overline"];
export const Other: Story = {
  render: () => <TypographyStories classes={otherClassNames} />
};

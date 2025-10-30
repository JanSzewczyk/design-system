import React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";

const HeadingText = "Lorem ipsum dolor sit amet.";
const SampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function TypographyStories({ classes, text = SampleText }: { classes: Array<string>; text?: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4">
      {classes.map((className) => (
        <React.Fragment key={className}>
          <div className="flex items-center">
            <div>
              <div className="text-body-lg font-semibold">Class Name:</div>
              <code className="text-code whitespace-nowrap">{className}</code>
            </div>
          </div>
          <div className="flex items-start justify-start">
            <div className={className}>{text}</div>
          </div>
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

const displayClassNames = ["text-display-xl", "text-display-lg", "text-display-md", "text-display-sm"];
export const Display: Story = {
  render: () => <TypographyStories classes={displayClassNames} text={HeadingText} />
};

const headingClassNames = ["text-heading-h1", "text-heading-h2", "text-heading-h3", "text-heading-h4"];
export const Heading: Story = {
  render: () => <TypographyStories classes={headingClassNames} text={HeadingText} />
};

const bodyClassNames = ["text-body-xl", "text-body-lg", "text-body-default", "text-body-sm", "text-body-xs"];
export const Body: Story = {
  render: () => <TypographyStories classes={bodyClassNames} />
};

const specialClassNames = ["text-lead", "text-mute", "text-small", "text-code", "text-blockquote"];
export const Special: Story = {
  render: () => <TypographyStories classes={specialClassNames} />
};

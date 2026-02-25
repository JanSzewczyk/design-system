import * as React from "react";

import { expect } from "storybook/test";

import preview from "~/.storybook/preview";

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

const meta = preview.meta({
  title: "Getting Started/Typography"
});

const displayClassNames = ["text-display-xl", "text-display-lg", "text-display-md", "text-display-sm"];
export const Display = meta.story({
  render: () => <TypographyStories classes={displayClassNames} text={HeadingText} />
});

Display.test("Renders all display text elements", async ({ canvas }) => {
  const textElements = canvas.getAllByText(HeadingText);
  await expect(textElements).toHaveLength(displayClassNames.length);
});

Display.test("Each display text element has correct class applied", async ({ canvas }) => {
  const textElements = canvas.getAllByText(HeadingText);
  for (const element of textElements) {
    const hasDisplayClass = displayClassNames.some((className) => element.classList.contains(className));
    await expect(hasDisplayClass).toBe(true);
  }
});

Display.test("Displays class names in code elements", async ({ canvas }) => {
  for (const className of displayClassNames) {
    const codeElement = canvas.getByText(className);
    await expect(codeElement).toBeVisible();
  }
});

const headingClassNames = ["text-heading-h1", "text-heading-h2", "text-heading-h3", "text-heading-h4"];
export const Heading = meta.story({
  render: () => <TypographyStories classes={headingClassNames} text={HeadingText} />
});

Heading.test("Renders all heading text elements", async ({ canvas }) => {
  const textElements = canvas.getAllByText(HeadingText);
  await expect(textElements).toHaveLength(headingClassNames.length);
});

Heading.test("Each heading text element has correct class applied", async ({ canvas }) => {
  const textElements = canvas.getAllByText(HeadingText);
  for (const element of textElements) {
    const hasHeadingClass = headingClassNames.some((className) => element.classList.contains(className));
    await expect(hasHeadingClass).toBe(true);
  }
});

Heading.test("Displays class names in code elements", async ({ canvas }) => {
  for (const className of headingClassNames) {
    const codeElement = canvas.getByText(className);
    await expect(codeElement).toBeVisible();
  }
});

const bodyClassNames = ["text-body-xl", "text-body-lg", "text-body-default", "text-body-sm", "text-body-xs"];
export const Body = meta.story({
  render: () => <TypographyStories classes={bodyClassNames} />
});

Body.test("Renders all body text elements", async ({ canvas }) => {
  const textElements = canvas.getAllByText(SampleText);
  await expect(textElements).toHaveLength(bodyClassNames.length);
});

Body.test("Each body text element has correct class applied", async ({ canvas }) => {
  const textElements = canvas.getAllByText(SampleText);
  for (const element of textElements) {
    const hasBodyClass = bodyClassNames.some((className) => element.classList.contains(className));
    await expect(hasBodyClass).toBe(true);
  }
});

Body.test("Displays class names in code elements", async ({ canvas }) => {
  for (const className of bodyClassNames) {
    const codeElement = canvas.getByText(className);
    await expect(codeElement).toBeVisible();
  }
});

const specialClassNames = ["text-lead", "text-mute", "text-small", "text-code", "text-blockquote"];
export const Special = meta.story({
  render: () => <TypographyStories classes={specialClassNames} />
});

Special.test("Renders all special text elements", async ({ canvas }) => {
  const textElements = canvas.getAllByText(SampleText);
  await expect(textElements).toHaveLength(specialClassNames.length);
});

Special.test("Each special text element has correct class applied", async ({ canvas }) => {
  const textElements = canvas.getAllByText(SampleText);
  for (const element of textElements) {
    const hasSpecialClass = specialClassNames.some((className) => element.classList.contains(className));
    await expect(hasSpecialClass).toBe(true);
  }
});

Special.test("Displays class names in code elements", async ({ canvas }) => {
  for (const className of specialClassNames) {
    const codeElement = canvas.getByText(className);
    await expect(codeElement).toBeVisible();
  }
});

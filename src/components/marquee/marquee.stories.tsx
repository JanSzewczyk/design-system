import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Marquee } from "~/components/marquee";

const meta = {
  title: "Components/Marquee",
  component: Marquee,
  tags: ["autodocs"],
  argTypes: {
    reverse: {
      control: "boolean",
      description: "Whether to reverse the animation direction",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    pauseOnHover: {
      control: "boolean",
      description: "Whether to pause the animation on hover",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    vertical: {
      control: "boolean",
      description: "Whether to animate vertically instead of horizontally",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    repeat: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of times to repeat the content",
      table: {
        defaultValue: { summary: "4" }
      }
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility"
    },
    ariaLive: {
      control: "select",
      options: ["off", "polite", "assertive"],
      description: "ARIA live region politeness",
      table: {
        defaultValue: { summary: "off" }
      }
    },
    ariaRole: {
      control: "text",
      description: "ARIA role",
      table: {
        defaultValue: { summary: "marquee" }
      }
    }
  },
  parameters: {
    layout: "padded"
  }
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof Marquee>;

const ReviewCard = ({ img, name, username, body }: { img: string; name: string; username: string; body: string }) => {
  return (
    <figure className="bg-app-foreground relative w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-800 p-4">
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-gray-100">{name}</figcaption>
          <p className="text-xs font-medium text-gray-400">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-300">{body}</blockquote>
    </figure>
  );
};

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack"
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill"
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john"
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane"
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny"
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james"
  }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export const Default: Story = {
  tags: ["test"],
  render: () => (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  ),
  play: async ({ canvas }) => {
    const marquee = canvas.getByRole("marquee");
    await expect(marquee).toBeVisible();
    await expect(marquee).toHaveAttribute("data-slot", "marquee");
  }
};

export const WithTwoRows: Story = {
  render: () => (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  ),
  play: async ({ canvas }) => {
    const marquees = canvas.getAllByRole("marquee");
    await expect(marquees).toHaveLength(2);

    for (const marquee of marquees) {
      await expect(marquee).toBeVisible();
    }
  }
};

export const Vertical: Story = {
  render: () => (
    <div className="relative flex h-100 w-full flex-row items-center justify-center gap-4 overflow-hidden">
      <Marquee vertical pauseOnHover className="[--duration:15s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee vertical reverse pauseOnHover className="[--duration:15s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  ),
  play: async ({ canvas }) => {
    const marquees = canvas.getAllByRole("marquee");
    await expect(marquees).toHaveLength(2);

    for (const marquee of marquees) {
      await expect(marquee).toBeVisible();
      await expect(marquee).toHaveClass("flex-col");
    }
  }
};

export const Reversed: Story = {
  render: () => (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  ),
  play: async ({ canvas }) => {
    const marquee = canvas.getByRole("marquee");
    await expect(marquee).toBeVisible();
  }
};

export const SimpleText: Story = {
  render: () => (
    <Marquee className="text-xl font-semibold text-gray-100 [--duration:30s] [--gap:2rem]">
      <span>Welcome to our design system</span>
      <span className="text-primary">Built with React & Tailwind</span>
      <span>Beautiful components</span>
      <span className="text-success">Easy to customize</span>
    </Marquee>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText("Welcome to our design system").length).toBeGreaterThan(0);
    await expect(canvas.getAllByText("Built with React & Tailwind").length).toBeGreaterThan(0);
  }
};

export const LogoCloud: Story = {
  render: () => {
    const logos = [
      { name: "React", color: "text-cyan-400" },
      { name: "TypeScript", color: "text-blue-500" },
      { name: "Tailwind", color: "text-teal-400" },
      { name: "Vite", color: "text-purple-400" },
      { name: "Storybook", color: "text-pink-400" },
      { name: "Vitest", color: "text-green-400" }
    ];

    return (
      <div className="bg-app rounded-lg border border-gray-800 py-8">
        <Marquee pauseOnHover className="[--duration:25s]">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3"
            >
              <span className={`text-lg font-bold ${logo.color}`}>{logo.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText("React").length).toBeGreaterThan(0);
    await expect(canvas.getAllByText("TypeScript").length).toBeGreaterThan(0);
  }
};

export const CustomSpeed: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm text-gray-400">Fast (10s)</p>
        <Marquee className="[--duration:10s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-400">Normal (20s)</p>
        <Marquee className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-400">Slow (40s)</p>
        <Marquee className="[--duration:40s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Fast (10s)")).toBeVisible();
    await expect(canvas.getByText("Normal (20s)")).toBeVisible();
    await expect(canvas.getByText("Slow (40s)")).toBeVisible();
  }
};

export const CustomGap: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm text-gray-400">Small gap (0.5rem)</p>
        <Marquee className="[--duration:20s] [--gap:0.5rem]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-400">Large gap (3rem)</p>
        <Marquee className="[--duration:20s] [--gap:3rem]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Small gap (0.5rem)")).toBeVisible();
    await expect(canvas.getByText("Large gap (3rem)")).toBeVisible();
  }
};

export const RepeatCount: Story = {
  args: {
    repeat: 2,
    className: "[--duration:15s]",
    children: (
      <>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 1</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 2</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 3</div>
      </>
    )
  },
  play: async ({ canvas }) => {
    // With repeat=2, each item should appear twice
    const items = canvas.getAllByText("Item 1");
    await expect(items).toHaveLength(2);
  }
};

export const PauseOnHover: Story = {
  render: () => (
    <div>
      <p className="mb-4 text-center text-sm text-gray-400">Hover over the marquee to pause</p>
      <Marquee pauseOnHover className="[--duration:15s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const marquee = canvas.getByRole("marquee");

    await expect(marquee).toBeVisible();

    // Hover over the marquee
    await userEvent.hover(marquee);

    // Check that the inner animated divs have the pause class
    const animatedDivs = Array.from(marquee.querySelectorAll('[class*="animate-marquee"]'));
    await expect(animatedDivs.length).toBeGreaterThan(0);

    for (const div of animatedDivs) {
      await expect(div).toHaveClass("group-hover:paused");
    }
  }
};

export const Accessibility: Story = {
  args: {
    ariaLabel: "Customer testimonials carousel",
    ariaLive: "polite",
    ariaRole: "marquee",
    className: "[--duration:20s]",
    children: (
      <>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 1</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 2</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 3</div>
      </>
    )
  },
  play: async ({ canvas }) => {
    const marquee = canvas.getByRole("marquee");

    await expect(marquee).toHaveAttribute("aria-label", "Customer testimonials carousel");
    await expect(marquee).toHaveAttribute("aria-live", "polite");
    await expect(marquee).toHaveAttribute("tabindex", "0");
  }
};

export const DataSlotAttribute: Story = {
  tags: ["test"],
  args: {
    className: "[--duration:20s]",
    children: <span>Test content</span>
  },
  play: async ({ canvas }) => {
    const marquee = canvas.getByRole("marquee");
    await expect(marquee).toHaveAttribute("data-slot", "marquee");
  }
};

export const ThreeDEffect: Story = {
  render: () => (
    <div className="relative flex h-125 w-full flex-row items-center justify-center gap-4 overflow-hidden perspective-near">
      <div className="flex transform-[rotateX(10deg)] flex-row gap-4">
        <Marquee vertical className="[--duration:20s]" pauseOnHover>
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee vertical reverse className="[--duration:20s]" pauseOnHover>
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee vertical className="[--duration:20s]" pauseOnHover>
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-gray-950" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-gray-950" />
    </div>
  ),
  play: async ({ canvas }) => {
    const marquees = canvas.getAllByRole("marquee");
    await expect(marquees).toHaveLength(3);
  }
};

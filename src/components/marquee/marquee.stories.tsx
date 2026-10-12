import { expect } from "storybook/test";
import preview from "~/.storybook/preview";
import { Marquee } from "~/components/marquee";

const meta = preview.meta({
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility"
    },
    ariaLive: {
      control: "select",
      description: "ARIA live region politeness",
      options: ["off", "polite", "assertive"],
      table: {
        defaultValue: { summary: "off" }
      }
    },
    ariaRole: {
      control: "text",
      description: "ARIA role",
      table: {
        defaultValue: { summary: "region" }
      }
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    },
    pauseOnHover: {
      control: "boolean",
      description: "Whether to pause animation on hover",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    repeat: {
      control: { max: 10, min: 1, type: "number" },
      description: "Number of times to repeat content",
      table: {
        defaultValue: { summary: "4" }
      }
    },
    reverse: {
      control: "boolean",
      description: "Whether to reverse animation direction",
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
    }
  },
  component: Marquee,
  parameters: {
    layout: "padded"
  },
  tags: ["autodocs"],
  title: "Components/Marquee"
});

const ReviewCard = ({ img, name, username, body }: { img: string; name: string; username: string; body: string }) => {
  return (
    <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-800 bg-app-foreground p-4">
      <div className="flex flex-row items-center gap-2">
        <img alt={name} className="rounded-full" height="32" src={img} width="32" />
        <div className="flex flex-col">
          <figcaption className="font-medium text-gray-100 text-sm">{name}</figcaption>
          <p className="font-medium text-gray-400 text-xs">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-gray-300 text-sm">{body}</blockquote>
    </figure>
  );
};

const reviews = [
  {
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
    name: "Jack",
    username: "@jack"
  },
  {
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
    name: "Jill",
    username: "@jill"
  },
  {
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
    name: "John",
    username: "@john"
  },
  {
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
    name: "Jane",
    username: "@jane"
  },
  {
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
    name: "Jenny",
    username: "@jenny"
  },
  {
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
    name: "James",
    username: "@james"
  }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export const Default = meta.story({
  play: async ({ canvasElement }) => {
    const marquee = canvasElement.querySelector('[data-slot="marquee"]')!;
    await expect(marquee).toBeVisible();
    await expect(marquee).toHaveAttribute("data-slot", "marquee");
  },
  render: () => (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]" pauseOnHover>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  )
});

export const WithTwoRows = meta.story({
  play: async ({ canvasElement }) => {
    const marquees = canvasElement.querySelectorAll('[data-slot="marquee"]');
    await expect(marquees).toHaveLength(2);

    for (const marquee of Array.from(marquees)) {
      await expect(marquee).toBeVisible();
    }
  },
  render: () => (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]" pauseOnHover>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee className="[--duration:20s]" pauseOnHover reverse>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  )
});

export const Vertical = meta.story({
  play: async ({ canvasElement }) => {
    const marquees = canvasElement.querySelectorAll('[data-slot="marquee"]');
    await expect(marquees).toHaveLength(2);

    for (const marquee of Array.from(marquees)) {
      await expect(marquee).toBeVisible();
      await expect(marquee).toHaveClass("flex-col");
    }
  },
  render: () => (
    <div className="relative flex h-100 w-full flex-row items-center justify-center gap-4 overflow-hidden">
      <Marquee className="[--duration:15s]" pauseOnHover vertical>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee className="[--duration:15s]" pauseOnHover reverse vertical>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  )
});

export const Reversed = meta.story({
  play: async ({ canvasElement }) => {
    const marquee = canvasElement.querySelector('[data-slot="marquee"]')!;
    await expect(marquee).toBeVisible();
  },
  render: () => (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]" pauseOnHover reverse>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  )
});

export const SimpleText = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText("Welcome to our design system").length).toBeGreaterThan(0);
    await expect(canvas.getAllByText("Built with React & Tailwind").length).toBeGreaterThan(0);
  },
  render: () => (
    <Marquee className="font-semibold text-gray-100 text-xl [--duration:30s] [--gap:2rem]">
      <span>Welcome to our design system</span>
      <span className="text-primary">Built with React & Tailwind</span>
      <span>Beautiful components</span>
      <span className="text-success">Easy to customize</span>
    </Marquee>
  )
});

const logos = [
  { color: "text-cyan-400", name: "React" },
  { color: "text-blue-500", name: "TypeScript" },
  { color: "text-teal-400", name: "Tailwind" },
  { color: "text-purple-400", name: "Vite" },
  { color: "text-pink-400", name: "Storybook" },
  { color: "text-green-400", name: "Vitest" }
];

export const LogoCloud = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText("React").length).toBeGreaterThan(0);
    await expect(canvas.getAllByText("TypeScript").length).toBeGreaterThan(0);
  },
  render: () => (
    <div className="rounded-lg border border-gray-800 bg-app py-8">
      <Marquee className="[--duration:25s]" pauseOnHover>
        {logos.map((logo) => (
          <div
            className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3"
            key={logo.name}
          >
            <span className={`font-bold text-lg ${logo.color}`}>{logo.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  )
});

export const CustomSpeed = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Fast (10s)")).toBeVisible();
    await expect(canvas.getByText("Normal (20s)")).toBeVisible();
    await expect(canvas.getByText("Slow (40s)")).toBeVisible();
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-gray-400 text-sm">Fast (10s)</p>
        <Marquee className="[--duration:10s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-gray-400 text-sm">Normal (20s)</p>
        <Marquee className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-gray-400 text-sm">Slow (40s)</p>
        <Marquee className="[--duration:40s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  )
});

export const CustomGap = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Small gap (0.5rem)")).toBeVisible();
    await expect(canvas.getByText("Large gap (3rem)")).toBeVisible();
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-gray-400 text-sm">Small gap (0.5rem)</p>
        <Marquee className="[--duration:20s] [--gap:0.5rem]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div>
        <p className="mb-2 text-gray-400 text-sm">Large gap (3rem)</p>
        <Marquee className="[--duration:20s] [--gap:3rem]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  )
});

export const RepeatCount = meta.story({
  args: {
    children: (
      <>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 1</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 2</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Item 3</div>
      </>
    ),
    className: "[--duration:15s]",
    repeat: 2
  },
  play: async ({ canvas }) => {
    // With repeat=2, each item should appear twice
    const items = canvas.getAllByText("Item 1");
    await expect(items).toHaveLength(2);
  }
});

export const PauseOnHover = meta.story({
  play: async ({ canvasElement }) => {
    const { userEvent } = await import("storybook/test");
    const marquee = canvasElement.querySelector('[data-slot="marquee"]') as HTMLElement;

    await expect(marquee).toBeVisible();

    // Hover over the marquee
    await userEvent.hover(marquee);

    // Check that the inner animated divs have the pause class
    const animatedDivs = Array.from(marquee.querySelectorAll('[class*="animate-marquee"]'));
    await expect(animatedDivs.length).toBeGreaterThan(0);

    for (const div of animatedDivs) {
      await expect(div).toHaveClass("group-hover:paused");
    }
  },
  render: () => (
    <div>
      <p className="mb-4 text-center text-gray-400 text-sm">Hover over to marquee to pause</p>
      <Marquee className="[--duration:15s]" pauseOnHover>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  )
});

export const Accessibility = meta.story({
  args: {
    ariaLabel: "Customer testimonials carousel",
    ariaLive: "polite",
    ariaRole: "region",
    children: (
      <>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 1</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 2</div>
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2">Testimonial 3</div>
      </>
    ),
    className: "[--duration:20s]"
  },
  play: async ({ canvasElement }) => {
    const marquee = canvasElement.querySelector('[data-slot="marquee"]')!;

    await expect(marquee).toHaveAttribute("aria-label", "Customer testimonials carousel");
    await expect(marquee).toHaveAttribute("aria-live", "polite");
    await expect(marquee).toHaveAttribute("tabindex", "0");
  }
});

export const DataSlotAttribute = meta.story({
  args: {
    children: <span>Test content</span>,
    className: "[--duration:20s]"
  },
  play: async ({ canvasElement }) => {
    const marquee = canvasElement.querySelector('[data-slot="marquee"]')!;
    await expect(marquee).toBeInTheDocument();
    await expect(marquee).toHaveAttribute("data-slot", "marquee");
  }
});

export const ThreeDEffect = meta.story({
  play: async ({ canvasElement }) => {
    const marquees = canvasElement.querySelectorAll('[data-slot="marquee"]');
    await expect(marquees).toHaveLength(3);
  },
  render: () => (
    <div className="perspective-near relative flex h-125 w-full flex-row items-center justify-center gap-4 overflow-hidden">
      <div className="transform-[rotateX(10deg)] flex flex-row gap-4">
        <Marquee className="[--duration:20s]" pauseOnHover vertical>
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee className="[--duration:20s]" pauseOnHover reverse vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee className="[--duration:20s]" pauseOnHover vertical>
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-gray-950" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-gray-950" />
    </div>
  )
});

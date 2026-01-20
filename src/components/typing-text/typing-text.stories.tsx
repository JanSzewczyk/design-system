import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";

import { TypingText } from "./typing-text";

const meta = {
  title: "Components/Typing Text",
  component: TypingText,
  tags: ["autodocs"],
  argTypes: {
    animation: {
      control: "select",
      options: [
        "fadeIn",
        "blurIn",
        "blurInUp",
        "blurInDown",
        "slideUp",
        "slideDown",
        "slideLeft",
        "slideRight",
        "scaleUp",
        "scaleDown"
      ],
      description: "The animation preset to use",
      table: {
        defaultValue: { summary: "fadeIn" }
      }
    },
    text: {
      control: "text",
      description: "Text to animate"
    },
    texts: {
      control: "object",
      description: "Array of texts to cycle through"
    },
    speed: {
      control: { type: "number", min: 10, max: 500 },
      description: "Typing speed in milliseconds",
      table: {
        defaultValue: { summary: "100" }
      }
    },
    delay: {
      control: { type: "number", min: 0, max: 5000 },
      description: "Delay before starting animation",
      table: {
        defaultValue: { summary: "0" }
      }
    },
    showCursor: {
      control: "boolean",
      description: "Whether to show cursor",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    cursor: {
      control: "text",
      description: "Cursor character",
      table: {
        defaultValue: { summary: "|" }
      }
    },
    cursorClassName: {
      control: "text",
      description: "Cursor className"
    },
    loop: {
      control: "boolean",
      description: "Whether to loop through texts",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    pauseDuration: {
      control: { type: "number", min: 0, max: 10000 },
      description: "Pause duration between loops",
      table: {
        defaultValue: { summary: "2000" }
      }
    },
    startOnView: {
      control: "boolean",
      description: "Whether to start animation when component enters viewport",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    once: {
      control: "boolean",
      description: "Whether to animate only once",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    onComplete: {
      action: "onComplete",
      description: "Callback when typing completes"
    }
  }
} satisfies Meta<typeof TypingText>;

export default meta;
type Story = StoryObj<typeof TypingText>;

export const Default: Story = {
  args: {
    text: "Hello, World!",
    startOnView: false
  },
  play: async ({ canvas }) => {
    const typingText = canvas.getByText("", { selector: '[data-slot="typing-text"]' });
    await expect(typingText).toBeVisible();
    await expect(typingText).toHaveAttribute("data-slot", "typing-text");

    // Wait for typing to complete
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Hello/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  }
};

export const CustomSpeed: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Fast (50ms)</p>
        <TypingText text="This types really fast!" speed={50} startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Normal (100ms)</p>
        <TypingText text="This types at normal speed." speed={100} startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Slow (200ms)</p>
        <TypingText text="This types slowly..." speed={200} startOnView={false} />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/fast/)).toBeVisible();
      },
      { timeout: 5000 }
    );
  }
};

export const WithDelay: Story = {
  args: {
    text: "This text appears after a 1 second delay.",
    delay: 1000,
    startOnView: false
  },
  play: async ({ canvas }) => {
    // Initially element exists but text is empty
    const typingText = canvas.getByText("", { selector: '[data-slot="typing-text"]' });
    await expect(typingText).toBeInTheDocument();

    // Wait for delay + typing
    await waitFor(
      async () => {
        await expect(canvas.getByText(/This text/)).toBeVisible();
      },
      { timeout: 5000 }
    );
  }
};

export const WithoutCursor: Story = {
  args: {
    text: "No cursor is shown here.",
    showCursor: false,
    startOnView: false
  },
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/No cursor/)).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Verify no cursor element exists
    const cursorElement = canvas.queryByText("|");
    await expect(cursorElement).not.toBeInTheDocument();
  }
};

export const CustomCursor: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Block cursor</p>
        <TypingText text="Block cursor style" cursor="█" startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Underscore cursor</p>
        <TypingText text="Underscore cursor style" cursor="_" startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Custom emoji cursor</p>
        <TypingText text="Fun cursor" cursor="👆" startOnView={false} />
      </div>
    </div>
  )
};

export const StyledCursor: Story = {
  args: {
    text: "Custom styled cursor.",
    cursorClassName: "text-primary text-xl",
    startOnView: false
  }
};

export const MultipleTexts: Story = {
  args: {
    texts: ["First message", "Second message", "Third message"],
    loop: true,
    pauseDuration: 1500,
    startOnView: false
  },
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/First/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  }
};

export const LoopingText: Story = {
  render: () => (
    <div className="text-2xl font-bold">
      <span>I am a </span>
      <TypingText
        texts={["Developer", "Designer", "Creator", "Problem Solver"]}
        loop
        pauseDuration={2000}
        speed={80}
        startOnView={false}
        className="text-primary"
      />
    </div>
  ),
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Developer|Designer|Creator|Problem/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  }
};

export const OnCompleteCallback: Story = {
  args: {
    text: "Watch the console!",
    onComplete: fn(),
    startOnView: false
  },
  play: async ({ canvas, args }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Watch/)).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Wait for complete typing
    await waitFor(
      async () => {
        await expect(args.onComplete).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );
  }
};

export const HeroSection: Story = {
  render: () => (
    <div className="bg-app-background flex min-h-64 flex-col items-center justify-center rounded-lg p-8">
      <h1 className="mb-4 text-4xl font-bold">
        <TypingText text="Build something amazing" speed={80} startOnView={false} />
      </h1>
      <p className="text-muted-foreground text-lg">
        <TypingText
          text="The modern way to create beautiful user interfaces."
          delay={2500}
          speed={40}
          startOnView={false}
        />
      </p>
    </div>
  )
};

export const TerminalStyle: Story = {
  render: () => (
    <div className="rounded-lg bg-gray-950 p-4 font-mono">
      <div className="mb-2 flex gap-2">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
      </div>
      <div className="text-green-400">
        <span className="text-gray-500">$ </span>
        <TypingText text="npm install @szum-tech/design-system" speed={50} cursor="_" startOnView={false} />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/npm install/)).toBeVisible();
      },
      { timeout: 5000 }
    );
  }
};

export const CodeExample: Story = {
  render: () => (
    <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm">
      <TypingText
        texts={['const greeting = "Hello, World!";', "console.log(greeting);", "// Output: Hello, World!"]}
        loop
        pauseDuration={2000}
        speed={60}
        startOnView={false}
        className="text-green-400"
      />
    </div>
  )
};

export const ChatMessage: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div className="rounded-lg bg-gray-800 p-3">
        <p className="text-muted-foreground mb-1 text-xs">AI Assistant</p>
        <TypingText
          text="Hello! How can I help you today? I am here to assist you with any questions you might have."
          speed={30}
          startOnView={false}
          showCursor={false}
        />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Hello/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  }
};

export const DataSlotAttribute: Story = {
  tags: ["test"],
  args: {
    text: "Testing data-slot attribute",
    startOnView: false
  },
  play: async ({ canvas }) => {
    const typingText = canvas.getByText("", { selector: '[data-slot="typing-text"]' });
    await expect(typingText).toHaveAttribute("data-slot", "typing-text");
  }
};

export const LongText: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    speed: 20,
    startOnView: false,
    className: "max-w-lg"
  }
};

export const AnimationVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-muted-foreground mb-6 text-sm font-medium tracking-wider uppercase">
          Available Animation Variants
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">fadeIn (default)</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText text="Fade in animation" animation="fadeIn" startOnView={false} speed={60} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">blurIn</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText text="Blur in animation" animation="blurIn" startOnView={false} speed={60} delay={500} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">blurInUp</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText text="Blur in up animation" animation="blurInUp" startOnView={false} speed={60} delay={1000} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">blurInDown</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText
              text="Blur in down animation"
              animation="blurInDown"
              startOnView={false}
              speed={60}
              delay={1500}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">slideUp</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText text="Slide up animation" animation="slideUp" startOnView={false} speed={60} delay={2000} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">slideDown</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText text="Slide down animation" animation="slideDown" startOnView={false} speed={60} delay={2500} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">slideLeft</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText text="Slide left animation" animation="slideLeft" startOnView={false} speed={60} delay={3000} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">slideRight</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText
              text="Slide right animation"
              animation="slideRight"
              startOnView={false}
              speed={1000}
              delay={3500}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">scaleUp</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText text="Scale up animation" animation="scaleUp" startOnView={false} speed={1000} delay={4000} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">scaleDown</p>
          <div className="bg-app-background rounded-lg p-4">
            <TypingText text="Scale down animation" animation="scaleDown" startOnView={false} speed={60} delay={4500} />
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    // Wait for first animation to start
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Fade in/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  }
};

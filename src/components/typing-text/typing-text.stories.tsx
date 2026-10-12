import { expect, fn, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { TypingText } from "~/components";

const meta = preview.meta({
  argTypes: {
    animation: {
      control: "select",
      description: "The animation preset to use",
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
      table: {
        defaultValue: { summary: "fadeIn" }
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
    delay: {
      control: { max: 5000, min: 0, type: "number" },
      description: "Delay before starting animation",
      table: {
        defaultValue: { summary: "0" }
      }
    },
    loop: {
      control: "boolean",
      description: "Whether to loop through texts",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    onComplete: {
      action: "onComplete",
      description: "Callback when typing completes"
    },
    once: {
      control: "boolean",
      description: "Whether to animate only once",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    pauseDuration: {
      control: { max: 10000, min: 0, type: "number" },
      description: "Pause duration between loops",
      table: {
        defaultValue: { summary: "2000" }
      }
    },
    showCursor: {
      control: "boolean",
      description: "Whether to show cursor",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    speed: {
      control: { max: 500, min: 10, type: "number" },
      description: "Typing speed in milliseconds",
      table: {
        defaultValue: { summary: "100" }
      }
    },
    startOnView: {
      control: "boolean",
      description: "Whether to start animation when component enters viewport",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    text: {
      control: "text",
      description: "Text to animate"
    },
    texts: {
      control: "object",
      description: "Array of texts to cycle through"
    }
  },
  component: TypingText,
  tags: ["autodocs"],
  title: "Components/Typing Text"
});

export const Default = meta.story({
  args: {
    startOnView: false,
    text: "Hello, World!"
  }
});

export const CustomSpeed = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/fast/)).toBeVisible();
      },
      { timeout: 5000 }
    );
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Fast (50ms)</p>
        <TypingText speed={50} startOnView={false} text="This types really fast!" />
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Normal (100ms)</p>
        <TypingText speed={100} startOnView={false} text="This types at normal speed." />
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Slow (200ms)</p>
        <TypingText speed={200} startOnView={false} text="This types slowly..." />
      </div>
    </div>
  )
});

export const WithDelay = meta.story({
  args: {
    delay: 1000,
    startOnView: false,
    text: "This text appears after a 1 second delay."
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
});

export const WithoutCursor = meta.story({
  args: {
    showCursor: false,
    startOnView: false,
    text: "No cursor is shown here."
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
});

export const CustomCursor = meta.story({
  args: {
    cursorClassName: "text-primary text-xl",
    startOnView: false,
    text: "Custom styled cursor."
  }
});

export const MultipleTexts = meta.story({
  args: {
    loop: true,
    pauseDuration: 1500,
    startOnView: false,
    texts: ["First message", "Second message", "Third message"]
  },
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/First/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  }
});

export const LoopingText = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Developer|Designer|Creator|Problem/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <div className="font-bold text-2xl">
      <span>I am a </span>
      <TypingText
        className="text-primary"
        loop
        pauseDuration={2000}
        speed={80}
        startOnView={false}
        texts={["Developer", "Designer", "Creator", "Problem Solver"]}
      />
    </div>
  )
});

export const OnCompleteCallback = meta.story({
  args: {
    onComplete: fn(),
    startOnView: false,
    text: "Watch our console!"
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
});

export const HeroSection = meta.story({
  render: () => (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg bg-app-background p-8">
      <h1 className="mb-4 font-bold text-4xl">
        <TypingText speed={80} startOnView={false} text="Build something amazing" />
      </h1>
      <p className="text-lg text-muted-foreground">
        <TypingText
          delay={2500}
          speed={40}
          startOnView={false}
          text="The modern way to create beautiful user interfaces."
        />
      </p>
    </div>
  )
});

export const TerminalStyle = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/npm install/)).toBeVisible();
      },
      { timeout: 5000 }
    );
  },
  render: () => (
    <div className="rounded-lg bg-gray-950 p-4 font-mono">
      <div className="mb-2 flex gap-2">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
      </div>
      <div className="text-green-400">
        <span className="text-gray-500">$ </span>
        <TypingText cursor="_" speed={50} startOnView={false} text="npm install @szum-tech/design-system" />
      </div>
    </div>
  )
});

export const CodeExample = meta.story({
  render: () => (
    <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm">
      <TypingText
        className="text-green-400"
        loop
        pauseDuration={2000}
        speed={60}
        startOnView={false}
        texts={['const greeting = "Hello, World!";', "console.log(greeting);", "// Output: Hello, World!"]}
      />
    </div>
  )
});

export const ChatMessage = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Hello/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <div className="max-w-md space-y-4">
      <div className="rounded-lg bg-gray-800 p-3">
        <p className="mb-1 text-muted-foreground text-xs">AI Assistant</p>
        <TypingText
          showCursor={false}
          speed={30}
          startOnView={false}
          text="Hello! How can I help you today? I am here to assist you with any questions you might have."
        />
      </div>
    </div>
  )
});

export const DataSlotAttribute = meta.story({
  args: {
    startOnView: false,
    text: "Testing data-slot attribute"
  },
  play: async ({ canvas }) => {
    const typingText = canvas.getByText("", { selector: '[data-slot="typing-text"]' });
    await expect(typingText).toHaveAttribute("data-slot", "typing-text");
  }
});

export const LongText = meta.story({
  args: {
    className: "max-w-lg",
    speed: 20,
    startOnView: false,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  }
});

export const AnimationVariants = meta.story({
  play: async ({ canvas }) => {
    // Wait for first animation to start
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Fade in/)).toBeVisible();
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="mb-6 font-medium text-muted-foreground text-sm uppercase tracking-wider">
          Available Animation Variants
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">fadeIn (default)</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText animation="fadeIn" speed={60} startOnView={false} text="Fade in animation" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">blurIn</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText animation="blurIn" delay={500} speed={60} startOnView={false} text="Blur in animation" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">blurInUp</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText animation="blurInUp" delay={1000} speed={60} startOnView={false} text="Blur in up animation" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">blurInDown</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText
              animation="blurInDown"
              delay={1500}
              speed={60}
              startOnView={false}
              text="Blur in down animation"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">slideUp</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText animation="slideUp" delay={2000} speed={60} startOnView={false} text="Slide up animation" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">slideDown</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText animation="slideDown" delay={2500} speed={60} startOnView={false} text="Slide down animation" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">slideLeft</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText animation="slideLeft" delay={3000} speed={60} startOnView={false} text="Slide left animation" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">slideRight</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText
              animation="slideRight"
              delay={3500}
              speed={60}
              startOnView={false}
              text="Slide right animation"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">scaleUp</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText animation="scaleUp" delay={4000} speed={60} startOnView={false} text="Scale up animation" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm">scaleDown</p>
          <div className="rounded-lg bg-app-background p-4">
            <TypingText animation="scaleDown" delay={4500} speed={60} startOnView={false} text="Scale down animation" />
          </div>
        </div>
      </div>
    </div>
  )
});

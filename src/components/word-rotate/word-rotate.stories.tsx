import { expect, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { WordRotate } from "~/components";

const meta = preview.meta({
  argTypes: {
    animationStyle: {
      control: "select",
      description: "Animation style for word transitions",
      options: ["fade", "slide-up", "slide-down", "scale", "flip"],
      table: {
        defaultValue: { summary: "fade" }
      }
    },
    className: {
      control: "text",
      description: "Custom className for word"
    },
    containerClassName: {
      control: "text",
      description: "Custom className for container"
    },
    duration: {
      control: { max: 5000, min: 500, type: "number" },
      description: "Duration in ms each word is visible",
      table: {
        defaultValue: { summary: "1500" }
      }
    },
    loop: {
      control: "boolean",
      description: "Whether to loop through words",
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
    pauseDuration: {
      control: { max: 2000, min: 0, type: "number" },
      description: "Duration in ms between word transitions",
      table: {
        defaultValue: { summary: "300" }
      }
    },
    startOnView: {
      control: "boolean",
      description: "Whether to start animation when component enters viewport",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    words: {
      control: "object",
      description: "Array of words to rotate through"
    }
  },
  component: WordRotate,
  tags: ["autodocs", "new"],
  title: "Components/WordRotate"
});

export const Default = meta.story({
  args: {
    startOnView: false,
    words: ["Hello", "World", "React", "TypeScript"]
  },
  play: async ({ canvas }) => {
    const wordRotate = canvas.getByText("Hello", { selector: '[data-slot="word-rotate"] span' });
    await expect(wordRotate).toBeInTheDocument();
  }
});

export const AnimationStyles = meta.story({
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Fade (default)</p>
        <WordRotate animationStyle="fade" startOnView={false} words={["Fade", "Animation", "Style"]} />
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Slide Up</p>
        <WordRotate animationStyle="slide-up" startOnView={false} words={["Slide", "Up", "Animation"]} />
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Slide Down</p>
        <WordRotate animationStyle="slide-down" startOnView={false} words={["Slide", "Down", "Animation"]} />
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Scale</p>
        <WordRotate animationStyle="scale" startOnView={false} words={["Scale", "Animation", "Effect"]} />
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Flip</p>
        <WordRotate animationStyle="flip" startOnView={false} words={["Flip", "Animation", "3D"]} />
      </div>
    </div>
  )
});

export const CustomDuration = meta.story({
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Fast (500ms)</p>
        <WordRotate duration={500} pauseDuration={100} startOnView={false} words={["Fast", "Quick", "Rapid"]} />
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Normal (1500ms)</p>
        <WordRotate duration={1500} startOnView={false} words={["Normal", "Standard", "Default"]} />
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Slow (3000ms)</p>
        <WordRotate duration={3000} startOnView={false} words={["Slow", "Relaxed", "Calm"]} />
      </div>
    </div>
  )
});

export const NoLoop = meta.story({
  args: {
    duration: 1000,
    loop: false,
    startOnView: false,
    words: ["First", "Second", "Third", "Final"]
  }
});

export const HeroSection = meta.story({
  render: () => (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg bg-app-background p-8">
      <h1 className="font-bold text-4xl">
        <span>Build </span>
        <WordRotate
          animationStyle="slide-up"
          className="text-primary"
          startOnView={false}
          words={["amazing", "beautiful", "powerful", "modern"]}
        />
        <span> apps</span>
      </h1>
    </div>
  )
});

export const RoleRotator = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Developer|Designer|Creator|Problem/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <div className="font-bold text-2xl">
      <span>I am a </span>
      <WordRotate
        animationStyle="flip"
        className="text-primary"
        duration={2000}
        startOnView={false}
        words={["Developer", "Designer", "Creator", "Problem Solver"]}
      />
    </div>
  )
});

export const TechStack = meta.story({
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground text-sm">Built with</p>
      <div className="font-bold text-3xl">
        <WordRotate
          animationStyle="scale"
          duration={1500}
          startOnView={false}
          words={["React", "TypeScript", "Tailwind", "Radix UI"]}
        />
      </div>
    </div>
  )
});

export const GradientText = meta.story({
  render: () => (
    <div className="font-bold text-4xl">
      <WordRotate
        animationStyle="fade"
        className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        startOnView={false}
        words={["Innovative", "Creative", "Dynamic", "Inspiring"]}
      />
    </div>
  )
});

export const CallToAction = meta.story({
  render: () => (
    <div className="rounded-lg bg-app-background p-8 text-center">
      <h2 className="mb-4 font-bold text-3xl">
        <WordRotate animationStyle="slide-up" startOnView={false} words={["Start", "Create", "Build", "Launch"]} />
        <span> your project today</span>
      </h2>
      <p className="text-muted-foreground">Join thousands of developers building with our design system</p>
    </div>
  )
});

export const Features = meta.story({
  render: () => (
    <div className="space-y-2 text-lg">
      <div className="flex items-center gap-2">
        <span className="text-primary">*</span>
        <WordRotate animationStyle="fade" startOnView={false} words={["Fast", "Performant", "Optimized"]} />
        <span>performance</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-primary">*</span>
        <WordRotate animationStyle="fade" startOnView={false} words={["Beautiful", "Modern", "Clean"]} />
        <span>design</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-primary">*</span>
        <WordRotate animationStyle="fade" startOnView={false} words={["Accessible", "Inclusive", "Universal"]} />
        <span>components</span>
      </div>
    </div>
  )
});

export const SlideUpAnimation = meta.story({
  args: {
    animationStyle: "slide-up",
    startOnView: false,
    words: ["Slide", "Up", "Animation", "Demo"]
  }
});

export const FlipAnimation = meta.story({
  args: {
    animationStyle: "flip",
    startOnView: false,
    words: ["Flip", "3D", "Effect", "Cool"]
  }
});

export const DataSlotAttribute = meta.story({
  args: {
    startOnView: false,
    words: ["Testing", "Data", "Slot"]
  },
  play: async ({ canvas }) => {
    const wordRotate = canvas.getByText("Testing").closest('[data-slot="word-rotate"]');
    await expect(wordRotate).toHaveAttribute("data-slot", "word-rotate");
  }
});

export const CustomStyling = meta.story({
  args: {
    className: "font-mono text-2xl tracking-wider",
    containerClassName: "bg-gray-900 px-4 py-2 rounded-lg",
    startOnView: false,
    words: ["Custom", "Styled", "Words"]
  }
});

export const QuickTransitions = meta.story({
  args: {
    animationStyle: "slide-up",
    duration: 800,
    pauseDuration: 150,
    startOnView: false,
    words: ["Quick", "Fast", "Rapid", "Swift"]
  }
});

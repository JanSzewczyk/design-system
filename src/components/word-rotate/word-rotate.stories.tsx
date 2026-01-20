import * as React from "react";

import { type Meta, type StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { WordRotate } from "~/components";

const meta = {
  title: "Components/WordRotate",
  component: WordRotate,
  tags: ["autodocs", "new"],
  argTypes: {
    words: {
      control: "object",
      description: "Array of words to rotate through"
    },
    duration: {
      control: { type: "number", min: 500, max: 5000 },
      description: "Duration in ms each word is visible",
      table: {
        defaultValue: { summary: "1500" }
      }
    },
    animationStyle: {
      control: "select",
      options: ["fade", "slide-up", "slide-down", "scale", "flip"],
      description: "Animation style for word transitions",
      table: {
        defaultValue: { summary: "fade" }
      }
    },
    loop: {
      control: "boolean",
      description: "Whether to loop through words",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    pauseDuration: {
      control: { type: "number", min: 0, max: 2000 },
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
    once: {
      control: "boolean",
      description: "Whether to animate only once",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    className: {
      control: "text",
      description: "Custom className for the word"
    },
    containerClassName: {
      control: "text",
      description: "Custom className for the container"
    }
  }
} satisfies Meta<typeof WordRotate>;

export default meta;
type Story = StoryObj<typeof WordRotate>;

export const Default: Story = {
  tags: ["test"],
  args: {
    words: ["Hello", "World", "React", "TypeScript"],
    startOnView: false
  },
  play: async ({ canvas }) => {
    const wordRotate = canvas.getByText("Hello", { selector: '[data-slot="word-rotate"] span' });
    await expect(wordRotate).toBeInTheDocument();
  }
};

export const AnimationStyles: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Fade (default)</p>
        <WordRotate words={["Fade", "Animation", "Style"]} animationStyle="fade" startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Slide Up</p>
        <WordRotate words={["Slide", "Up", "Animation"]} animationStyle="slide-up" startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Slide Down</p>
        <WordRotate words={["Slide", "Down", "Animation"]} animationStyle="slide-down" startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Scale</p>
        <WordRotate words={["Scale", "Animation", "Effect"]} animationStyle="scale" startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Flip</p>
        <WordRotate words={["Flip", "Animation", "3D"]} animationStyle="flip" startOnView={false} />
      </div>
    </div>
  )
};

export const CustomDuration: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Fast (500ms)</p>
        <WordRotate words={["Fast", "Quick", "Rapid"]} duration={500} pauseDuration={100} startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Normal (1500ms)</p>
        <WordRotate words={["Normal", "Standard", "Default"]} duration={1500} startOnView={false} />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Slow (3000ms)</p>
        <WordRotate words={["Slow", "Relaxed", "Calm"]} duration={3000} startOnView={false} />
      </div>
    </div>
  )
};

export const NoLoop: Story = {
  args: {
    words: ["First", "Second", "Third", "Final"],
    loop: false,
    duration: 1000,
    startOnView: false
  }
};

export const HeroSection: Story = {
  render: () => (
    <div className="bg-app-background flex min-h-64 flex-col items-center justify-center rounded-lg p-8">
      <h1 className="text-4xl font-bold">
        <span>Build </span>
        <WordRotate
          words={["amazing", "beautiful", "powerful", "modern"]}
          animationStyle="slide-up"
          className="text-primary"
          startOnView={false}
        />
        <span> apps</span>
      </h1>
    </div>
  )
};

export const RoleRotator: Story = {
  tags: ["test"],
  render: () => (
    <div className="text-2xl font-bold">
      <span>I am a </span>
      <WordRotate
        words={["Developer", "Designer", "Creator", "Problem Solver"]}
        animationStyle="flip"
        className="text-primary"
        duration={2000}
        startOnView={false}
      />
    </div>
  ),
  play: async ({ canvas }) => {
    await waitFor(
      async () => {
        await expect(canvas.getByText(/Developer|Designer|Creator|Problem/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  }
};

export const TechStack: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground text-sm">Built with</p>
      <div className="text-3xl font-bold">
        <WordRotate
          words={["React", "TypeScript", "Tailwind", "Radix UI"]}
          animationStyle="scale"
          duration={1500}
          startOnView={false}
        />
      </div>
    </div>
  )
};

export const GradientText: Story = {
  render: () => (
    <div className="text-4xl font-bold">
      <WordRotate
        words={["Innovative", "Creative", "Dynamic", "Inspiring"]}
        animationStyle="fade"
        className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        startOnView={false}
      />
    </div>
  )
};

export const CallToAction: Story = {
  render: () => (
    <div className="bg-app-background rounded-lg p-8 text-center">
      <h2 className="mb-4 text-3xl font-bold">
        <WordRotate words={["Start", "Create", "Build", "Launch"]} animationStyle="slide-up" startOnView={false} />
        <span> your project today</span>
      </h2>
      <p className="text-muted-foreground">Join thousands of developers building with our design system</p>
    </div>
  )
};

export const Features: Story = {
  render: () => (
    <div className="space-y-2 text-lg">
      <div className="flex items-center gap-2">
        <span className="text-primary">*</span>
        <WordRotate words={["Fast", "Performant", "Optimized"]} animationStyle="fade" startOnView={false} />
        <span>performance</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-primary">*</span>
        <WordRotate words={["Beautiful", "Modern", "Clean"]} animationStyle="fade" startOnView={false} />
        <span>design</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-primary">*</span>
        <WordRotate words={["Accessible", "Inclusive", "Universal"]} animationStyle="fade" startOnView={false} />
        <span>components</span>
      </div>
    </div>
  )
};

export const SlideUpAnimation: Story = {
  args: {
    words: ["Slide", "Up", "Animation", "Demo"],
    animationStyle: "slide-up",
    startOnView: false
  }
};

export const FlipAnimation: Story = {
  args: {
    words: ["Flip", "3D", "Effect", "Cool"],
    animationStyle: "flip",
    startOnView: false
  }
};

export const DataSlotAttribute: Story = {
  tags: ["test"],
  args: {
    words: ["Testing", "Data", "Slot"],
    startOnView: false
  },
  play: async ({ canvas }) => {
    const wordRotate = canvas.getByText("Testing").closest('[data-slot="word-rotate"]');
    await expect(wordRotate).toHaveAttribute("data-slot", "word-rotate");
  }
};

export const CustomStyling: Story = {
  args: {
    words: ["Custom", "Styled", "Words"],
    className: "font-mono text-2xl tracking-wider",
    containerClassName: "bg-gray-900 px-4 py-2 rounded-lg",
    startOnView: false
  }
};

export const QuickTransitions: Story = {
  args: {
    words: ["Quick", "Fast", "Rapid", "Swift"],
    duration: 800,
    pauseDuration: 150,
    animationStyle: "slide-up",
    startOnView: false
  }
};

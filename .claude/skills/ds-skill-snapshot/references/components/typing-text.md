# TypingText

**Category:** Misc · **Public:** yes · **Stories:** 15

## Import
```ts
import { TypingText } from "@szum-tech/design-system";
```

## Props
| Prop | Type | Required | Default |
|---|---|---|---|
| `text` | `string` | no | — |
| `texts` | `string[]` | no | — |
| `speed` | `number` | no | — |
| `delay` | `number` | no | — |
| `showCursor` | `boolean` | no | — |
| `cursor` | `string` | no | — |
| `cursorClassName` | `string` | no | — |
| `loop` | `boolean` | no | — |
| `pauseDuration` | `number` | no | — |
| `className` | `string` | no | — |
| `onComplete` | `() => void` | no | — |
| `startOnView` | `boolean` | no | — |
| `once` | `boolean` | no | — |
| `animation` | `TypingTextAnimationVariant` | no | — |
| `inViewMargin` | `UseInViewOptions["margin"]` | no | — |

## Examples
### Default
```tsx
{
    text: "Hello, World!",
    startOnView: false
  }
```

### Custom Speed
```tsx
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
```

### With Delay
```tsx
{
    text: "This text appears after a 1 second delay.",
    delay: 1000,
    startOnView: false
  }
```

### Without Cursor
```tsx
{
    text: "No cursor is shown here.",
    showCursor: false,
    startOnView: false
  }
```

### Custom Cursor
```tsx
{
    text: "Custom styled cursor.",
    cursorClassName: "text-primary text-xl",
    startOnView: false
  }
```

### Multiple Texts
```tsx
{
    texts: ["First message", "Second message", "Third message"],
    loop: true,
    pauseDuration: 1500,
    startOnView: false
  }
```

### Looping Text
```tsx
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
```

### On Complete Callback
```tsx
{
    text: "Watch our console!",
    onComplete: fn(),
    startOnView: false
  }
```

### Hero Section
```tsx
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
```

### Terminal Style
```tsx
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
```

### Code Example
```tsx
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
```

### Chat Message
```tsx
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
```

### Data Slot Attribute
```tsx
{
    text: "Testing data-slot attribute",
    startOnView: false
  }
```

### Long Text
```tsx
{
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    speed: 20,
    startOnView: false,
    className: "max-w-lg"
  }
```

### Animation Variants
```tsx
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
          speed={60}
          delay={3500}
        />
      </div>
    </div>
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm font-medium">scaleUp</p>
      <div className="bg-app-background rounded-lg p-4">
        <TypingText text="Scale up animation" animation="scaleUp" startOnView={false} speed={60} delay={4000} />
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
```
